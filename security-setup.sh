#!/bin/bash

# Скрипт настройки безопасности для платформы обучения

echo "🔒 Настройка безопасности платформы обучения..."

# Проверяем права администратора
if [ "$EUID" -ne 0 ]; then
    echo "❌ Этот скрипт должен выполняться с правами администратора (sudo)"
    exit 1
fi

## 1. Обновление системы
echo "📦 Обновление системы..."
apt update && apt upgrade -y

## 2. Установка и настройка файрвола
echo "🔥 Настройка файрвола UFW..."
apt install ufw -y

# Сброс правил
ufw --force reset

# Настройка правил
ufw default deny incoming
ufw default allow outgoing

# Разрешаем SSH (важно не заблокировать себя!)
ufw allow ssh
ufw allow 22

# Разрешаем веб-трафик
ufw allow 80
ufw allow 443

# Включаем файрвол
ufw --force enable

echo "✅ Файрвол настроен и включен"

## 3. Установка fail2ban для защиты от брутфорса
echo "🛡️ Установка fail2ban..."
apt install fail2ban -y

# Создаем конфигурацию
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 3
EOF

# Перезапускаем fail2ban
systemctl restart fail2ban
systemctl enable fail2ban

echo "✅ Fail2ban настроен"

## 4. Настройка логирования
echo "📋 Настройка логирования..."

# Создаем директорию для логов
mkdir -p /var/log/learning-platform

# Настраиваем ротацию логов
cat > /etc/logrotate.d/learning-platform << EOF
/var/log/learning-platform/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload nginx
    endscript
}
EOF

echo "✅ Логирование настроено"

## 5. Настройка мониторинга
echo "📊 Настройка мониторинга..."

# Установка базовых инструментов мониторинга
apt install htop iotop nethogs -y

# Создаем скрипт мониторинга
cat > /usr/local/bin/monitor-platform.sh << 'EOF'
#!/bin/bash

# Скрипт мониторинга платформы

LOG_FILE="/var/log/learning-platform/monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] === Мониторинг платформы ===" >> $LOG_FILE

# Проверка Docker контейнеров
echo "[$DATE] Проверка контейнеров..." >> $LOG_FILE
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" >> $LOG_FILE

# Проверка использования диска
echo "[$DATE] Использование диска:" >> $LOG_FILE
df -h >> $LOG_FILE

# Проверка памяти
echo "[$DATE] Использование памяти:" >> $LOG_FILE
free -h >> $LOG_FILE

# Проверка нагрузки
echo "[$DATE] Нагрузка системы:" >> $LOG_FILE
uptime >> $LOG_FILE

echo "[$DATE] === Конец мониторинга ===" >> $LOG_FILE
echo "" >> $LOG_FILE
EOF

chmod +x /usr/local/bin/monitor-platform.sh

# Добавляем в cron (каждые 5 минут)
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/monitor-platform.sh") | crontab -

echo "✅ Мониторинг настроен"

## 6. Настройка резервного копирования
echo "💾 Настройка резервного копирования..."

# Создаем скрипт бэкапа
cat > /usr/local/bin/backup-platform.sh << 'EOF'
#!/bin/bash

# Скрипт резервного копирования

BACKUP_DIR="/var/backups/learning-platform"
DATE=$(date '+%Y%m%d_%H%M%S')

mkdir -p $BACKUP_DIR

# Бэкап базы данных
echo "Создание бэкапа базы данных..."
docker-compose exec -T postgres pg_dump -U postgres learning_platform > $BACKUP_DIR/db_backup_$DATE.sql

# Бэкап файлов
echo "Создание бэкапа файлов..."
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/uploads/

# Удаляем старые бэкапы (старше 30 дней)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Бэкап завершен: $DATE"
EOF

chmod +x /usr/local/bin/backup-platform.sh

# Добавляем в cron (ежедневно в 2:00)
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-platform.sh") | crontab -

echo "✅ Резервное копирование настроено"

## 7. Настройка SSL (если есть домен)
read -p "У вас есть домен для настройки SSL? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔐 Настройка SSL..."
    
    # Установка Certbot
    apt install certbot python3-certbot-nginx -y
    
    read -p "Введите ваш домен: " DOMAIN
    
    # Получение SSL сертификата
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # Автоматическое обновление сертификатов
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    echo "✅ SSL настроен для домена $DOMAIN"
fi

## 8. Финальные настройки безопасности
echo "🔧 Финальные настройки безопасности..."

# Отключение root логина по SSH
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Изменение порта SSH (опционально)
read -p "Изменить порт SSH? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Введите новый порт SSH (1024-65535): " SSH_PORT
    sed -i "s/#Port 22/Port $SSH_PORT/" /etc/ssh/sshd_config
    ufw allow $SSH_PORT
    echo "✅ Порт SSH изменен на $SSH_PORT"
fi

# Перезапуск SSH
systemctl restart ssh

# Настройка автоматических обновлений безопасности
apt install unattended-upgrades -y
dpkg-reconfigure -plow unattended-upgrades

echo "✅ Автоматические обновления безопасности настроены"

## 9. Создание отчета
echo "📄 Создание отчета о безопасности..."

cat > /var/log/learning-platform/security-report.txt << EOF
=== ОТЧЕТ О НАСТРОЙКЕ БЕЗОПАСНОСТИ ===
Дата: $(date)
Система: $(uname -a)

НАСТРОЕННЫЕ КОМПОНЕНТЫ:
✅ Файрвол UFW
✅ Fail2ban
✅ Логирование
✅ Мониторинг
✅ Резервное копирование
✅ Автоматические обновления

ПОРТЫ:
- 22 (SSH)
- 80 (HTTP)
- 443 (HTTPS)

РЕКОМЕНДАЦИИ:
1. Регулярно проверяйте логи: /var/log/learning-platform/
2. Мониторьте систему: htop, iotop, nethogs
3. Обновляйте систему: apt update && apt upgrade
4. Проверяйте бэкапы: /var/backups/learning-platform/
5. Настройте алерты для критических событий

КОМАНДЫ МОНИТОРИНГА:
- Статус контейнеров: docker ps
- Логи приложения: docker-compose logs -f
- Мониторинг системы: htop
- Проверка файрвола: ufw status
- Проверка fail2ban: fail2ban-client status
EOF

echo "✅ Отчет создан: /var/log/learning-platform/security-report.txt"

echo ""
echo "🎉 Настройка безопасности завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Проверьте отчет: cat /var/log/learning-platform/security-report.txt"
echo "2. Настройте домен и SSL (если не сделано)"
echo "3. Создайте первого пользователя в системе"
echo "4. Настройте мониторинг и алерты"
echo "5. Протестируйте восстановление из бэкапа"
echo ""
echo "🔒 Платформа готова к безопасной работе!" 