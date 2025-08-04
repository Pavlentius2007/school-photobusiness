# 💾 Система хранения данных платформы обучения

## 🗄️ **База данных (PostgreSQL)**

### **Основные таблицы:**

#### **1. Пользователи и аутентификация**
```sql
users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'curator', 'student') NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
```

#### **2. Курсы и обучение**
```sql
courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    price DECIMAL(10,2) NOT NULL,
    instructor_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)

modules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)

lessons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    video_url VARCHAR(500),
    file_url VARCHAR(500),
    module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    lesson_type ENUM('video', 'text', 'file', 'test') DEFAULT 'text',
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
```

#### **3. Интерактивные элементы**
```sql
tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    time_limit_minutes INTEGER,
    passing_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)

questions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    type ENUM('open', 'single_choice', 'multiple_choice') NOT NULL,
    test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    required BOOLEAN DEFAULT true,
    options JSON, -- Для вопросов с выбором
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)

assignments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    max_score INTEGER NOT NULL,
    due_date TIMESTAMP,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
```

#### **4. Прогресс и результаты**
```sql
course_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    completed_lessons INTEGER DEFAULT 0,
    total_lessons INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, course_id)
)

lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    time_spent_minutes INTEGER DEFAULT 0,
    last_position INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
)

test_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
    score INTEGER,
    is_passed BOOLEAN,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
```

#### **5. Платежи и финансы**
```sql
payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('yukassa', 'sberbank', 'cloudpayments', 'stripe') NOT NULL,
    payment_token VARCHAR(255), -- Токен от платежной системы
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)

course_enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, course_id)
)
```

#### **6. Логирование и аудит**
```sql
activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id INTEGER,
    details JSON,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
)

notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('welcome', 'lesson_available', 'assignment_due', 'test_available', 'payment_success', 'certificate_issued') NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
)
```

## 📁 **Файловое хранилище**

### **Структура директорий:**
```
/var/www/uploads/
├── videos/                    # Видео уроки
│   ├── course_1/             # Видео для курса 1
│   ├── course_2/             # Видео для курса 2
│   └── temp/                 # Временные файлы
├── images/                   # Изображения
│   ├── lessons/              # Изображения уроков
│   ├── assignments/          # Работы студентов
│   ├── certificates/         # Сертификаты
│   └── avatars/              # Аватары пользователей
├── documents/                # Документы
│   ├── course_materials/     # Материалы курсов
│   ├── assignments/          # Задания
│   └── certificates/         # Сертификаты
└── backups/                  # Резервные копии
    ├── daily/                # Ежедневные бэкапы
    ├── weekly/               # Еженедельные бэкапы
    └── monthly/              # Ежемесячные бэкапы
```

### **Типы файлов и ограничения:**

#### **Видео файлы:**
- **Форматы**: MP4, WebM, MOV
- **Максимальный размер**: 1 GB
- **Максимальная длительность**: 60 минут
- **Качество**: 720p-1080p
- **Кодек**: H.264 для совместимости

#### **Изображения:**
- **Форматы**: JPG, PNG, GIF
- **Максимальный размер**: 5 MB
- **Разрешение**: до 4096x4096 пикселей
- **Оптимизация**: автоматическое сжатие

#### **Документы:**
- **Форматы**: PDF, DOCX, PPTX
- **Максимальный размер**: 10 MB
- **Безопасность**: проверка на вирусы

## 🔄 **Кэширование (Redis)**

### **Структура кэша:**
```redis
# Сессии пользователей
session:user:{user_id} -> {session_data}

# Кэш API ответов
cache:api:courses -> {courses_data}
cache:api:user:{user_id}:progress -> {progress_data}

# Временные данные
temp:upload:{upload_id} -> {upload_status}
temp:payment:{payment_id} -> {payment_status}

# Очереди задач
queue:email -> [email_tasks]
queue:video_processing -> [video_tasks]
```

### **Настройки кэша:**
- **TTL по умолчанию**: 1 час
- **Максимальный размер**: 512 MB
- **Политика вытеснения**: LRU (Least Recently Used)
- **Персистентность**: RDB + AOF

## 🔐 **Безопасность данных**

### **Шифрование:**
- **Пароли**: bcrypt с солью
- **Платежные данные**: AES-256
- **Файлы**: шифрование на уровне файловой системы
- **Передача**: TLS 1.3

### **Доступ к данным:**
- **Роли пользователей**: admin, curator, student
- **Права доступа**: на уровне строк и столбцов
- **Аудит**: логирование всех операций
- **Бэкапы**: шифрованные резервные копии

### **Защита от потери:**
- **Репликация**: master-slave для PostgreSQL
- **Бэкапы**: ежедневные полные + инкрементальные
- **Географическое распределение**: копии в разных дата-центрах
- **Тестирование восстановления**: еженедельно

## 📊 **Мониторинг и аналитика**

### **Метрики базы данных:**
- **Производительность**: время выполнения запросов
- **Использование**: размер таблиц, индексов
- **Подключения**: количество активных соединений
- **Блокировки**: deadlock'и и ожидания

### **Метрики файлового хранилища:**
- **Использование диска**: по типам файлов
- **Трафик**: загрузка/скачивание
- **Производительность**: скорость чтения/записи
- **Ошибки**: неудачные операции

### **Метрики кэша:**
- **Hit rate**: процент попаданий в кэш
- **Использование памяти**: текущее и максимальное
- **Операции**: количество чтений/записей
- **Соединения**: активные клиенты

## 🔄 **Резервное копирование**

### **Стратегия бэкапов:**
- **Полные бэкапы**: еженедельно
- **Инкрементальные**: ежедневно
- **Транзакционные логи**: каждые 15 минут
- **Файлы**: еженедельно

### **Хранение бэкапов:**
- **Локально**: 7 дней
- **Облако**: 30 дней
- **Архив**: 1 год
- **Шифрование**: AES-256

### **Тестирование восстановления:**
- **Автоматически**: еженедельно
- **Ручное тестирование**: ежемесячно
- **Документирование**: все процедуры восстановления

## 📈 **Масштабирование**

### **Вертикальное масштабирование:**
- **База данных**: увеличение RAM, CPU, дисков
- **Файловое хранилище**: добавление дисков
- **Кэш**: увеличение памяти Redis

### **Горизонтальное масштабирование:**
- **База данных**: репликация, шардинг
- **Файловое хранилище**: CDN, распределенное хранение
- **Кэш**: Redis Cluster

### **Автоматическое масштабирование:**
- **Мониторинг нагрузки**: автоматическое увеличение ресурсов
- **Балансировка**: распределение нагрузки между серверами
- **Географическое распределение**: кэширование в разных регионах 