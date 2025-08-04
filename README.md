# 🎓 Платформа обучения фотобизнесу

Современная веб-платформа для обучения основам фотобизнеса с интерактивными курсами, тестами и домашними заданиями.

## 🚀 Быстрый старт

### Предварительные требования
- Docker и Docker Compose
- Git

### Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/your-username/learning-platform.git
cd learning-platform

# Запуск всех сервисов
./deploy.sh

# Или вручную
docker-compose up -d
```

### Доступ к приложению
- 🌐 **Сайт**: http://localhost
- 📊 **API**: http://localhost/api/v1
- 📚 **Документация API**: http://localhost/api/docs

### Данные для входа
- **Администратор**: admin@example.com / admin123
- **Куратор**: curator@example.com / curator123
- **Студент**: student@example.com / student123

## 🏗️ Архитектура

### Backend (FastAPI)
- **FastAPI** - современный веб-фреймворк
- **PostgreSQL** - основная база данных
- **Redis** - кэширование и очереди
- **SQLAlchemy** - ORM для работы с БД
- **Alembic** - миграции базы данных
- **JWT** - аутентификация и авторизация

### Frontend (React)
- **React 18** - современный UI фреймворк
- **TypeScript** - типизированный JavaScript
- **React Router** - навигация
- **Tailwind CSS** - стилизация
- **Axios** - HTTP клиент

### Инфраструктура
- **Docker** - контейнеризация
- **Nginx** - reverse proxy
- **Docker Compose** - оркестрация сервисов

## 📚 Функциональность

### 👥 Пользовательские роли
- **Администратор** - полный доступ к системе
- **Куратор** - управление курсами и контентом
- **Студент** - прохождение обучения

### 🎓 Обучение
- **Последовательное прохождение** курсов
- **Интерактивные тесты** с автоматической проверкой
- **Домашние задания** с обратной связью
- **Отслеживание прогресса** в реальном времени
- **Сертификаты** об окончании курсов

### 🔒 Безопасность
- **JWT токены** с ограниченным временем жизни
- **Ролевая система** доступа
- **Валидация** всех входных данных
- **Логирование** всех действий пользователей

## 🗂️ Структура проекта

```
learning-platform/
├── 📁 backend/                 # FastAPI бэкенд
│   ├── 📁 app/
│   │   ├── 📁 api/            # API endpoints
│   │   ├── 📁 core/           # Настройки и утилиты
│   │   ├── 📁 crud/           # CRUD операции
│   │   ├── 📁 models/         # SQLAlchemy модели
│   │   └── 📁 schemas/        # Pydantic схемы
│   ├── 📁 alembic/            # Миграции БД
│   ├── 📄 Dockerfile          # Docker образ
│   ├── 📄 requirements.txt    # Зависимости Python
│   └── 📄 init_database.py    # Инициализация БД
├── 📁 frontend/               # React фронтенд
│   ├── 📁 src/
│   │   ├── 📁 components/     # React компоненты
│   │   ├── 📁 pages/          # Страницы приложения
│   │   ├── 📁 hooks/          # React хуки
│   │   ├── 📁 services/       # API сервисы
│   │   └── 📁 contexts/       # React контексты
│   ├── 📄 Dockerfile          # Docker образ
│   └── 📄 package.json        # Зависимости Node.js
├── 📁 nginx/                  # Nginx конфигурация
├── 📄 docker-compose.yml      # Docker Compose
├── 📄 deploy.sh               # Скрипт деплоя
├── 📄 security-setup.sh       # Настройка безопасности
└── 📄 README.md               # Документация
```

## 🛠️ Разработка

### Локальная разработка

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm start
```

### База данных

```bash
# Применение миграций
cd backend
alembic upgrade head

# Создание новой миграции
alembic revision --autogenerate -m "Описание изменений"
```

### Тестирование

```bash
# Backend тесты
cd backend
pytest

# Frontend тесты
cd frontend
npm test
```

## 🚀 Деплой

### Продакшен деплой

```bash
# Настройка сервера
./security-setup.sh

# Деплой приложения
./deploy.sh
```

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# База данных
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379/0

# JWT
SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_HOSTS=["http://localhost", "http://your-domain.com"]
```

## 📊 API Endpoints

### Аутентификация
- `POST /api/v1/auth/login` - вход в систему
- `POST /api/v1/auth/register` - регистрация
- `POST /api/v1/auth/refresh` - обновление токена

### Курсы
- `GET /api/v1/courses` - список курсов
- `GET /api/v1/courses/{id}` - информация о курсе
- `POST /api/v1/courses` - создание курса (admin/curator)
- `PUT /api/v1/courses/{id}` - обновление курса (admin/curator)

### Уроки
- `GET /api/v1/lessons/{id}` - информация об уроке
- `POST /api/v1/lessons/{id}/complete` - завершение урока

### Тесты
- `GET /api/v1/tests/{id}` - информация о тесте
- `POST /api/v1/tests/{id}/start` - начало теста
- `POST /api/v1/tests/{id}/submit` - отправка ответов

Полная документация API доступна по адресу: http://localhost/api/docs

## 🔧 Конфигурация

### Настройка платежной системы
Поддерживаются следующие платежные системы:
- ЮKassa
- Сбербанк
- CloudPayments
- Stripe

### Настройка уведомлений
- Email уведомления (SMTP)
- Telegram уведомления
- Push уведомления

## 📈 Мониторинг

### Логи
```bash
# Просмотр логов
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Метрики
- Prometheus метрики
- Grafana дашборды
- Health checks

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

Если у вас есть вопросы или проблемы:
- Создайте Issue в GitHub
- Обратитесь к документации в папке `docs/`
- Проверьте логи приложения

## 🎯 Roadmap

### Версия 1.1
- [ ] Мобильное приложение
- [ ] Видео конференции
- [ ] Чат с преподавателями

### Версия 1.2
- [ ] AI помощник
- [ ] Персонализированные рекомендации
- [ ] Интеграция с CRM

### Версия 2.0
- [ ] Мультиязычность
- [ ] Белая этикетка
- [ ] API для интеграций

---

**Сделано с ❤️ для обучения фотобизнесу** 