# 🗄️ ER-диаграмма базы данных

## 📊 Структура базы данных

```mermaid
erDiagram
    USERS {
        int id PK
        string email UK
        string username UK
        string first_name
        string last_name
        string hashed_password
        enum role "admin|curator|student"
        boolean is_active
        datetime created_at
        datetime updated_at
        datetime last_login
        string avatar_url
        text bio
        string phone
    }

    COURSES {
        int id PK
        string title
        text description
        string slug UK
        string image_url
        decimal price
        int duration_hours
        enum status "draft|published|archived"
        datetime created_at
        datetime updated_at
        datetime published_at
        int curator_id FK
        boolean is_featured
        int max_students
        string requirements
        text learning_outcomes
    }

    MODULES {
        int id PK
        string title
        text description
        int order_index
        int course_id FK
        boolean is_required
        datetime created_at
        datetime updated_at
        int estimated_hours
    }

    LESSONS {
        int id PK
        string title
        text content
        string video_url
        string file_url
        int order_index
        int module_id FK
        int duration_minutes
        enum lesson_type "video|text|file|test"
        datetime created_at
        datetime updated_at
        boolean is_free
    }

    ASSIGNMENTS {
        int id PK
        string title
        text description
        int lesson_id FK
        datetime due_date
        int max_points
        enum submission_type "file|text|link"
        datetime created_at
        datetime updated_at
        boolean is_required
    }

    ASSIGNMENT_SUBMISSIONS {
        int id PK
        int assignment_id FK
        int student_id FK
        text content
        string file_url
        string link_url
        datetime submitted_at
        int grade
        text feedback
        datetime graded_at
        int grader_id FK
    }

    TESTS {
        int id PK
        string title
        text description
        int lesson_id FK
        int time_limit_minutes
        int passing_score
        boolean allow_retake
        datetime created_at
        datetime updated_at
    }

    QUESTIONS {
        int id PK
        int test_id FK
        string question_text
        enum question_type "single_choice|multiple_choice|text"
        int points
        int order_index
    }

    ANSWERS {
        int id PK
        int question_id FK
        string answer_text
        boolean is_correct
        int order_index
    }

    TEST_ATTEMPTS {
        int id PK
        int test_id FK
        int student_id FK
        int score
        datetime started_at
        datetime completed_at
        boolean is_passed
    }

    TEST_ANSWERS {
        int id PK
        int test_attempt_id FK
        int question_id FK
        text student_answer
        boolean is_correct
        int points_earned
    }

    PAYMENTS {
        int id PK
        int user_id FK
        int course_id FK
        decimal amount
        string currency
        enum status "pending|completed|failed|refunded"
        string payment_method
        string transaction_id
        datetime created_at
        datetime updated_at
        datetime paid_at
        text notes
    }

    USER_COURSE_ACCESS {
        int id PK
        int user_id FK
        int course_id FK
        enum access_type "paid|trial|gift"
        datetime granted_at
        datetime expires_at
        boolean is_active
        datetime last_accessed
    }

    ACTIVITY_LOGS {
        int id PK
        int user_id FK
        string action
        string resource_type
        int resource_id
        text details
        string ip_address
        string user_agent
        datetime created_at
    }

    NOTIFICATIONS {
        int id PK
        int user_id FK
        string title
        text message
        enum type "email|telegram|system"
        boolean is_read
        datetime created_at
        datetime read_at
        string action_url
    }

    COURSE_PROGRESS {
        int id PK
        int user_id FK
        int course_id FK
        int completed_lessons
        int total_lessons
        decimal completion_percentage
        datetime last_accessed
        datetime completed_at
    }

    LESSON_PROGRESS {
        int id PK
        int user_id FK
        int lesson_id FK
        boolean is_completed
        int watch_time_seconds
        datetime started_at
        datetime completed_at
    }

    %% Связи между таблицами
    USERS ||--o{ COURSES : "curator"
    USERS ||--o{ ASSIGNMENT_SUBMISSIONS : "student"
    USERS ||--o{ ASSIGNMENT_SUBMISSIONS : "grader"
    USERS ||--o{ PAYMENTS : "payer"
    USERS ||--o{ USER_COURSE_ACCESS : "student"
    USERS ||--o{ ACTIVITY_LOGS : "user"
    USERS ||--o{ NOTIFICATIONS : "recipient"
    USERS ||--o{ COURSE_PROGRESS : "student"
    USERS ||--o{ LESSON_PROGRESS : "student"
    USERS ||--o{ TEST_ATTEMPTS : "student"

    COURSES ||--o{ MODULES : "contains"
    COURSES ||--o{ PAYMENTS : "purchased"
    COURSES ||--o{ USER_COURSE_ACCESS : "accessed"
    COURSES ||--o{ COURSE_PROGRESS : "progress"

    MODULES ||--o{ LESSONS : "contains"

    LESSONS ||--o{ ASSIGNMENTS : "has"
    LESSONS ||--o{ TESTS : "has"
    LESSONS ||--o{ LESSON_PROGRESS : "progress"

    ASSIGNMENTS ||--o{ ASSIGNMENT_SUBMISSIONS : "submissions"

    TESTS ||--o{ QUESTIONS : "contains"
    TESTS ||--o{ TEST_ATTEMPTS : "attempts"

    QUESTIONS ||--o{ ANSWERS : "options"
    QUESTIONS ||--o{ TEST_ANSWERS : "student_answers"

    TEST_ATTEMPTS ||--o{ TEST_ANSWERS : "answers"
```

## 🔑 Ключевые особенности

### Индексы для оптимизации:
- `users.email` - уникальный индекс
- `users.username` - уникальный индекс
- `courses.slug` - уникальный индекс
- `user_course_access(user_id, course_id)` - составной индекс
- `activity_logs(user_id, created_at)` - составной индекс
- `payments(user_id, status)` - составной индекс

### Ограничения:
- Каскадное удаление для связанных записей
- Проверка целостности данных
- Ограничения на статусы платежей
- Валидация email и username

### Триггеры:
- Автоматическое обновление `updated_at`
- Подсчет прогресса курса
- Логирование изменений
- Отправка уведомлений

## 📈 Планируемые улучшения

### Партиционирование:
- `activity_logs` по дате
- `payments` по статусу
- `notifications` по типу

### Кэширование:
- Прогресс пользователей
- Популярные курсы
- Статистика активности

### Архивирование:
- Старые логи активности
- Завершенные платежи
- Прочитанные уведомления 