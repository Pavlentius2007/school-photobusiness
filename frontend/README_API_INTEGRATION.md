# Интеграция с API - Документация

## Обзор

Этот документ описывает интеграцию фронтенда с FastAPI бэкендом для платформы школьного фотобизнеса.

## Структура API

### Базовый URL
```
http://localhost:8000/api/v1
```

### Основные эндпоинты

#### Аутентификация
- `POST /auth/login` - Вход в систему
- `POST /auth/register` - Регистрация
- `POST /auth/refresh` - Обновление токена
- `POST /auth/logout` - Выход из системы
- `GET /auth/me` - Получение текущего пользователя

#### Курсы
- `GET /courses` - Список курсов
- `GET /courses/{id}` - Детали курса
- `POST /courses` - Создание курса
- `PUT /courses/{id}` - Обновление курса
- `DELETE /courses/{id}` - Удаление курса

#### Пользователи
- `GET /users` - Список пользователей
- `GET /users/{id}` - Детали пользователя
- `PUT /users/{id}` - Обновление пользователя
- `DELETE /users/{id}` - Удаление пользователя

#### Задания
- `GET /assignments` - Список заданий
- `GET /assignments/{id}` - Детали задания
- `POST /assignments` - Создание задания
- `PUT /assignments/{id}` - Обновление задания
- `POST /assignments/{id}/submit` - Отправка задания
- `POST /assignments/{id}/grade` - Оценка задания

#### Тесты
- `GET /tests` - Список тестов
- `GET /tests/{id}` - Детали теста
- `POST /tests/{id}/start` - Начало теста
- `POST /tests/{id}/submit` - Отправка ответов

#### Сообщения
- `GET /messages` - Список сообщений
- `GET /messages/{id}` - Детали сообщения
- `POST /messages` - Отправка сообщения
- `PUT /messages/{id}/read` - Отметить как прочитанное
- `DELETE /messages/{id}` - Удаление сообщения

#### Сертификаты
- `GET /certificates` - Список сертификатов
- `GET /certificates/{id}` - Детали сертификата
- `GET /certificates/{id}/download` - Скачивание сертификата

#### Статистика
- `GET /dashboard/stats` - Статистика админа
- `GET /curator/stats` - Статистика куратора
- `GET /student/stats` - Статистика студента

#### Платежи
- `POST /payments/create` - Создание платежа
- `GET /payments/{id}/status` - Статус платежа
- `GET /payments/history` - История платежей

## Настройка

### 1. Переменные окружения

Создайте файл `.env` в корне фронтенда:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_ENV=development
```

### 2. Запуск бэкенда

Убедитесь, что FastAPI бэкенд запущен:

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. CORS настройки

Бэкенд должен быть настроен для принятия запросов с фронтенда:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Использование

### 1. API Клиент

Основной API клиент находится в `src/services/api.ts`:

```typescript
import { apiClient } from '../services/api';

// Пример использования
const courses = await apiClient.getCourses();
const user = await apiClient.getCurrentUser();
```

### 2. Хуки для API

Используйте кастомные хуки для упрощения работы с API:

```typescript
import { useCourses, useUser } from '../hooks/useApi';

function MyComponent() {
  const { data: courses, loading, error, execute } = useCourses();
  const { data: user } = useUser(1);

  useEffect(() => {
    execute({ page: 1, size: 10 });
  }, [execute]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <div>{/* Отображение данных */}</div>;
}
```

### 3. Аутентификация

Используйте контекст аутентификации:

```typescript
import { useAuth } from '../contexts/AuthContext';

function LoginComponent() {
  const { login, user, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Перенаправление после успешного входа
    } catch (error) {
      // Обработка ошибки
    }
  };
}
```

### 4. Защищенные маршруты

Используйте компонент `ProtectedRoute`:

```typescript
import ProtectedRoute from '../components/ProtectedRoute';

<Route path="/admin" element={
  <ProtectedRoute requiredRole="admin">
    <AdminPanel />
  </ProtectedRoute>
} />
```

## Типы данных

### User
```typescript
interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'curator' | 'student';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### Course
```typescript
interface Course {
  id: number;
  title: string;
  description: string;
  instructor_id: number;
  instructor_name: string;
  price: number;
  duration_hours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
```

### Assignment
```typescript
interface Assignment {
  id: number;
  course_id: number;
  course_title: string;
  title: string;
  description: string;
  due_date: string;
  max_score: number;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
  submitted_at?: string;
  graded_at?: string;
}
```

## Обработка ошибок

### 1. Автоматическая обработка

API клиент автоматически обрабатывает:
- 401 ошибки (перенаправление на страницу входа)
- Истечение токенов (автоматическое обновление)

### 2. Компонент ErrorMessage

```typescript
import ErrorMessage from '../components/ErrorMessage';

<ErrorMessage 
  message="Ошибка загрузки данных"
  onRetry={() => refetch()}
  onClose={() => setError(null)}
/>
```

### 3. LoadingSpinner

```typescript
import LoadingSpinner from '../components/LoadingSpinner';

<LoadingSpinner 
  size="medium"
  text="Загрузка курсов..."
  fullScreen={false}
/>
```

## Тестирование

### 1. Мок данные

Для разработки без бэкенда используйте мок данные:

```typescript
// В компонентах можно временно заменить API вызовы
const mockCourses = [
  {
    id: 1,
    title: "Фотография для начинающих",
    description: "Базовый курс по фотографии",
    // ... остальные поля
  }
];
```

### 2. Отладка

Используйте браузерные инструменты для отладки:
- Network tab для просмотра API запросов
- Console для логов
- React DevTools для состояния компонентов

## Безопасность

### 1. Токены

- Access токены хранятся в localStorage
- Refresh токены используются для автоматического обновления
- Токены автоматически очищаются при выходе

### 2. Валидация

- Все формы имеют клиентскую валидацию
- Серверная валидация обрабатывается через API
- XSS защита через экранирование данных

### 3. CORS

- Настроены правильные CORS заголовки
- Проверка origin на сервере

## Производительность

### 1. Кэширование

- Используйте React Query для кэширования (опционально)
- Мемоизация компонентов с React.memo
- useCallback для функций

### 2. Оптимизация

- Пагинация для больших списков
- Ленивая загрузка компонентов
- Оптимизация изображений

## Развертывание

### 1. Production

Для продакшена измените API URL:

```env
REACT_APP_API_URL=https://your-api-domain.com/api/v1
```

### 2. Docker

```dockerfile
# В Dockerfile добавьте
ENV REACT_APP_API_URL=https://your-api-domain.com/api/v1
```

## Troubleshooting

### Частые проблемы

1. **CORS ошибки**
   - Проверьте настройки CORS на бэкенде
   - Убедитесь, что origin правильный

2. **401 ошибки**
   - Проверьте токены в localStorage
   - Убедитесь, что бэкенд правильно настроен

3. **Ошибки сети**
   - Проверьте, что бэкенд запущен
   - Проверьте URL в .env файле

### Логи

Включите логирование для отладки:

```typescript
// В api.ts добавьте
console.log('API Request:', config);
console.log('API Response:', response);
``` 