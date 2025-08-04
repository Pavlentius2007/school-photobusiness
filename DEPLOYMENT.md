# 🚀 Инструкция по деплою платформы обучения

## 📋 Требования к серверу

### Минимальные требования:
- **CPU**: 2 ядра
- **RAM**: 4 GB
- **Диск**: 20 GB свободного места
- **ОС**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+

### Рекомендуемые требования:
- **CPU**: 4 ядра
- **RAM**: 8 GB
- **Диск**: 50 GB SSD
- **ОС**: Ubuntu 22.04 LTS

## 🔧 Установка зависимостей

### 1. Обновление системы
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Установка Docker
```bash
# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Перезагрузка для применения изменений
sudo reboot
```

### 3. Установка Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🚀 Деплой приложения

### 1. Клонирование репозитория
```bash
git clone <your-repository-url>
cd школьный-фотобизнес
```

### 2. Настройка переменных окружения
```bash
# Копируем пример конфигурации
cp backend/env.example backend/.env

# Редактируем настройки
nano backend/.env
```

### 3. Запуск приложения
```bash
# Делаем скрипт исполняемым
chmod +x deploy.sh

# Запускаем деплой
./deploy.sh
```

## 🔒 Настройка безопасности

### 1. Настройка файрвола
```bash
# Установка UFW
sudo apt install ufw

# Настройка правил
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Настройка SSL (Let's Encrypt)
```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com
```

### 3. Обновление nginx конфигурации
```bash
# Редактируем конфигурацию для HTTPS
sudo nano nginx/nginx.conf
```

## 📊 Мониторинг

### Просмотр логов
```bash
# Все контейнеры
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Статус контейнеров
```bash
docker-compose ps
```

### Использование ресурсов
```bash
docker stats
```

## 🔄 Обновление приложения

### 1. Остановка приложения
```bash
docker-compose down
```

### 2. Обновление кода
```bash
git pull origin main
```

### 3. Пересборка и запуск
```bash
docker-compose up --build -d
```

## 🛠️ Устранение неполадок

### Проблемы с базой данных
```bash
# Проверка подключения
docker-compose exec postgres psql -U postgres -d learning_platform

# Сброс базы данных
docker-compose down -v
docker-compose up -d
```

### Проблемы с Redis
```bash
# Проверка Redis
docker-compose exec redis redis-cli ping
```

### Проблемы с бэкендом
```bash
# Проверка логов
docker-compose logs backend

# Перезапуск сервиса
docker-compose restart backend
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs -f`
2. Проверьте статус контейнеров: `docker-compose ps`
3. Проверьте использование ресурсов: `docker stats`
4. Обратитесь к документации или создайте issue

## 🔗 Полезные команды

```bash
# Остановка всех контейнеров
docker-compose down

# Запуск в фоновом режиме
docker-compose up -d

# Пересборка без кэша
docker-compose build --no-cache

# Очистка неиспользуемых ресурсов
docker system prune -a

# Резервное копирование базы данных
docker-compose exec postgres pg_dump -U postgres learning_platform > backup.sql
``` 