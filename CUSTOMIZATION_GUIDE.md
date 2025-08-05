# 🎨 Руководство по кастомизации платформы

## 📋 Обзор

Данное руководство поможет вам настроить платформу под ваши потребности. Все изменения можно выполнить без глубоких знаний программирования.

## 🎯 Основные области кастомизации

### 1. Брендинг и визуальное оформление
### 2. Контент и курсы
### 3. Функциональность
### 4. Интеграции

---

## 🎨 1. Брендинг и визуальное оформление

### Изменение логотипа

**Файл:** `frontend/public/logo.svg`

1. Замените файл `logo.svg` на ваш логотип
2. Убедитесь, что размер не превышает 200x60px
3. Формат: SVG (рекомендуется) или PNG

### Изменение цветовой схемы

**Файл:** `frontend/tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',  // Основной цвет
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
        }
      }
    }
  }
}
```

### Изменение названия сайта

**Файл:** `frontend/src/contexts/SettingsContext.tsx`

```typescript
const defaultSettings = {
  siteName: 'Ваше название школы',
  siteDescription: 'Описание вашей школы',
  contactEmail: 'info@vashadomena.ru',
  contactPhone: '+7 999 123-45-67',
  // ... другие настройки
};
```

### Изменение favicon

**Файл:** `frontend/public/favicon.ico`

Замените файл `favicon.ico` на ваш значок сайта.

---

## 📚 2. Контент и курсы

### Настройка курсов

**Файл:** `frontend/src/data/coursesData.ts`

```typescript
export const courses: FullCourse[] = [
  {
    id: 1,
    title: 'Название вашего курса',
    description: 'Описание курса',
    price: 25000,
    duration: '8 недель',
    level: 'beginner',
    category: 'Ваша категория',
    // ... остальные поля
  }
];
```

### Изменение контактной информации

**Файл:** `frontend/src/components/Footer.tsx`

```typescript
<div>
  <h4>Контакты</h4>
  <div>
    <div>📱 +7 999 123-45-67</div>
    <div>📧 info@vashadomena.ru</div>
    <div>📍 Ваш адрес</div>
  </div>
</div>
```

### Настройка Telegram-консультаций

**Файл:** `frontend/src/pages/CourseDetailPage.tsx`

```typescript
const openTelegramConsultation = () => {
  const username = 'ваш_username'; // Замените на ваш username
  
  const message = 'Здравствуйте! Хочу получить информацию о курсе...';
  const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, '_blank');
};
```

---

## ⚙️ 3. Функциональность

### Настройка платежной системы

**Файл:** `backend/app/core/config.py`

```python
class Settings(BaseSettings):
    # Платежные системы
    YOOMONEY_TOKEN: str = "your_yoomoney_token"
    STRIPE_SECRET_KEY: str = "your_stripe_key"
    STRIPE_PUBLISHABLE_KEY: str = "your_stripe_public_key"
    
    # Другие настройки
    DATABASE_URL: str = "postgresql://user:password@localhost/dbname"
    SECRET_KEY: str = "your_secret_key"
```

### Настройка уведомлений

**Файл:** `backend/app/core/notifications.py`

```python
class NotificationService:
    def __init__(self):
        self.email_service = EmailService()
        self.sms_service = SMSService()
    
    async def send_welcome_email(self, user: User):
        # Настройка приветственного письма
        pass
    
    async def send_course_completion(self, user: User, course: Course):
        # Настройка уведомления о завершении курса
        pass
```

### Настройка аналитики

**Файл:** `frontend/public/index.html`

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(YOUR_COUNTER_ID, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true
  });
</script>
```

---

## 🔗 4. Интеграции

### Интеграция с CRM

**Файл:** `backend/app/services/crm_service.py`

```python
class CRMService:
    def __init__(self):
        self.api_key = settings.CRM_API_KEY
        self.base_url = settings.CRM_BASE_URL
    
    async def create_lead(self, user_data: dict):
        # Создание лида в CRM
        pass
    
    async def update_customer(self, user_id: int, data: dict):
        # Обновление данных клиента
        pass
```

### Интеграция с мессенджерами

**Файл:** `backend/app/services/messenger_service.py`

```python
class MessengerService:
    def __init__(self):
        self.telegram_token = settings.TELEGRAM_BOT_TOKEN
        self.whatsapp_token = settings.WHATSAPP_TOKEN
    
    async def send_telegram_message(self, chat_id: str, message: str):
        # Отправка сообщения в Telegram
        pass
    
    async def send_whatsapp_message(self, phone: str, message: str):
        # Отправка сообщения в WhatsApp
        pass
```

---

## 🚀 5. Развертывание

### Настройка домена

**Файл:** `nginx/nginx.conf`

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Настройка SSL

```bash
# Установка Certbot
sudo apt-get install certbot python3-certbot-nginx

# Получение SSL сертификата
sudo certbot --nginx -d your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавить строку:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Настройка резервного копирования

**Файл:** `backup.sh`

```bash
#!/bin/bash

# Резервное копирование базы данных
docker-compose exec -T postgres pg_dump -U postgres database_name > backup_$(date +%Y%m%d_%H%M%S).sql

# Резервное копирование файлов
tar -czf files_backup_$(date +%Y%m%d_%H%M%S).tar.gz ./uploads/

# Отправка в облачное хранилище
aws s3 cp backup_*.sql s3://your-backup-bucket/
aws s3 cp files_backup_*.tar.gz s3://your-backup-bucket/
```

---

## 📊 6. Мониторинг и аналитика

### Настройка мониторинга

**Файл:** `docker-compose.yml`

```yaml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  
  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

### Настройка логирования

**Файл:** `backend/app/core/logging.py`

```python
import logging
from logging.handlers import RotatingFileHandler

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            RotatingFileHandler('app.log', maxBytes=10000000, backupCount=5),
            logging.StreamHandler()
        ]
    )
```

---

## 🔧 7. Производительность

### Оптимизация изображений

```bash
# Установка ImageOptim для сжатия изображений
npm install -g imagemin-cli

# Сжатие всех изображений
imagemin images/* --out-dir=optimized/
```

### Настройка кэширования

**Файл:** `frontend/src/serviceWorker.js`

```javascript
// Кэширование статических ресурсов
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/static/js/main.bundle.js',
  '/static/css/main.css',
  '/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

---

## 📱 8. Мобильная оптимизация

### Настройка PWA

**Файл:** `frontend/public/manifest.json`

```json
{
  "name": "Ваша школа фотографии",
  "short_name": "Фотошкола",
  "description": "Онлайн обучение фотографии",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🛡️ 9. Безопасность

### Настройка CORS

**Файл:** `backend/app/main.py`

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Настройка rate limiting

**Файл:** `backend/app/middleware/rate_limit.py`

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/api/login")
@limiter.limit("5/minute")
async def login(request: Request):
    # Логика входа
    pass
```

---

## 📋 10. Чек-лист кастомизации

### ✅ Брендинг:
- [ ] Заменен логотип
- [ ] Настроена цветовая схема
- [ ] Изменено название сайта
- [ ] Заменен favicon
- [ ] Настроены контакты

### ✅ Контент:
- [ ] Настроены курсы
- [ ] Изменены описания
- [ ] Настроены цены
- [ ] Добавлены изображения
- [ ] Настроены категории

### ✅ Функциональность:
- [ ] Настроена платежная система
- [ ] Настроены уведомления
- [ ] Подключена аналитика
- [ ] Настроены интеграции
- [ ] Настроена безопасность

### ✅ Развертывание:
- [ ] Настроен домен
- [ ] Установлен SSL
- [ ] Настроено резервное копирование
- [ ] Настроен мониторинг
- [ ] Протестирована производительность

---

## 🆘 Поддержка

### Если что-то не работает:

1. **Проверьте логи:**
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

2. **Перезапустите сервисы:**
   ```bash
   docker-compose restart
   ```

3. **Обратитесь в поддержку:**
   - Email: support@yourcompany.com
   - Telegram: @support_bot
   - Телефон: +7 999 123-45-67

### Полезные команды:

```bash
# Обновление кода
git pull origin main

# Пересборка контейнеров
docker-compose build --no-cache

# Очистка кэша
docker system prune -a

# Проверка статуса сервисов
docker-compose ps
```

---

## 🎯 Заключение

Следуя этому руководству, вы сможете полностью настроить платформу под ваши потребности. Все изменения безопасны и не нарушают работу системы.

**Время настройки:** 2-4 часа
**Сложность:** Средняя
**Требования:** Базовые знания веб-технологий 