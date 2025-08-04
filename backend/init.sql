-- Инициализация базы данных для платформы обучения

-- Создание расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание таблиц (если не существуют)
-- Примечание: основные таблицы создаются через Alembic миграции

-- Создание базовых ролей пользователей
INSERT INTO users (id, email, full_name, hashed_password, role, is_active, created_at, updated_at)
VALUES 
    (1, 'admin@example.com', 'Администратор', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS8s6O', 'admin', true, NOW(), NOW()),
    (2, 'curator@example.com', 'Куратор', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS8s6O', 'curator', true, NOW(), NOW()),
    (3, 'student@example.com', 'Студент', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS8s6O', 'student', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых курсов
INSERT INTO courses (id, title, slug, description, short_description, status, price, instructor_id, created_at, updated_at)
VALUES 
    (1, 'Особенности фотографии в школах/садах', 'school-photography', 'Полный курс по школьной фотографии с практическими навыками работы с детьми', 'Научитесь работать с детьми в школах и садах', 'published', 19900, 2, NOW(), NOW()),
    (2, 'Дизайн и создание макетов', 'design-layouts', 'Профессиональный курс по работе с Photoshop и созданию макетов', 'Создавайте профессиональные макеты', 'published', 49900, 2, NOW(), NOW()),
    (3, 'Администрирование, ценообразование + инструменты управления', 'business-administration', 'Полный курс по управлению фотобизнесом с инструментами администрирования', 'Управляйте своим фотобизнесом эффективно', 'published', 98000, 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых модулей
INSERT INTO modules (id, title, description, course_id, order_index, created_at, updated_at)
VALUES 
    (1, 'Введение в школьную фотографию', 'Базовые принципы работы с детьми', 1, 1, NOW(), NOW()),
    (2, 'Практические навыки съемки', 'Техники и приемы съемки в школах', 1, 2, NOW(), NOW()),
    (3, 'Основы дизайна', 'Принципы создания макетов', 2, 1, NOW(), NOW()),
    (4, 'Работа в Photoshop', 'Практические навыки работы с графикой', 2, 2, NOW(), NOW()),
    (5, 'Бизнес-планирование', 'Основы планирования фотобизнеса', 3, 1, NOW(), NOW()),
    (6, 'Инструменты управления', 'Программы и сервисы для бизнеса', 3, 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых уроков
INSERT INTO lessons (id, title, description, content, module_id, lesson_type, order_index, duration_minutes, created_at, updated_at)
VALUES 
    (1, 'Знакомство с платформой', 'Вводный урок о возможностях платформы', 'Добро пожаловать на платформу обучения!', 1, 'text', 1, 15, NOW(), NOW()),
    (2, 'Особенности детской фотографии', 'Основные принципы съемки детей', 'Дети - особые модели для фотографа...', 1, 'video', 2, 45, NOW(), NOW()),
    (3, 'Работа с группами', 'Техники съемки групповых фотографий', 'Групповая съемка требует особого подхода...', 2, 'video', 1, 60, NOW(), NOW()),
    (4, 'Основы композиции', 'Правила построения кадра', 'Композиция - основа хорошей фотографии...', 3, 'text', 1, 30, NOW(), NOW()),
    (5, 'Инструменты Photoshop', 'Обзор основных инструментов', 'Photoshop предлагает множество инструментов...', 4, 'video', 1, 90, NOW(), NOW()),
    (6, 'Планирование бизнеса', 'Создание бизнес-плана', 'Правильное планирование - залог успеха...', 5, 'text', 1, 45, NOW(), NOW()),
    (7, 'CRM системы', 'Выбор и настройка CRM', 'CRM система поможет организовать работу...', 6, 'video', 1, 75, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых тестов
INSERT INTO tests (id, title, description, lesson_id, time_limit_minutes, passing_score, max_score, status, created_by, created_at, updated_at)
VALUES 
    (1, 'Тест по основам фотографии', 'Проверка знаний основ фотографии', 2, 30, 70, 100, 'published', 2, NOW(), NOW()),
    (2, 'Тест по Photoshop', 'Проверка навыков работы в Photoshop', 5, 45, 80, 100, 'published', 2, NOW(), NOW()),
    (3, 'Тест по бизнес-планированию', 'Проверка знаний основ бизнеса', 6, 20, 75, 100, 'published', 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых вопросов
INSERT INTO questions (id, text, type, test_id, points, order_index, required, options, created_at, updated_at)
VALUES 
    (1, 'Что такое диафрагма?', 'open', 1, 10, 1, true, NULL, NOW(), NOW()),
    (2, 'Какой режим съемки лучше использовать для портретов?', 'single_choice', 1, 15, 2, true, '["Автоматический", "Приоритет диафрагмы", "Приоритет выдержки", "Ручной"]', NOW(), NOW()),
    (3, 'Какие инструменты используются для ретуши кожи?', 'multiple_choice', 2, 20, 1, true, '["Healing Brush", "Clone Stamp", "Patch Tool", "Blur Tool"]', NOW(), NOW()),
    (4, 'Что включает в себя бизнес-план?', 'open', 3, 25, 1, true, NULL, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых ответов
INSERT INTO answers (id, text, question_id, is_correct, order_index, created_at, updated_at)
VALUES 
    (1, 'Приоритет диафрагмы', 2, true, 1, NOW(), NOW()),
    (2, 'Healing Brush', 3, true, 1, NOW(), NOW()),
    (3, 'Clone Stamp', 3, true, 2, NOW(), NOW()),
    (4, 'Patch Tool', 3, true, 3, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых заданий
INSERT INTO assignments (id, title, description, lesson_id, max_score, status, created_by, created_at, updated_at)
VALUES 
    (1, 'Практическое задание: съемка портрета', 'Снимите портрет ребенка в естественном освещении', 2, 100, 'published', 2, NOW(), NOW()),
    (2, 'Создание макета визитки', 'Создайте макет визитки фотографа в Photoshop', 4, 100, 'published', 2, NOW(), NOW()),
    (3, 'Бизнес-план фотобизнеса', 'Составьте план развития вашего фотобизнеса', 6, 100, 'published', 2, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых зачислений студентов
INSERT INTO course_enrollments (id, student_id, course_id, enrolled_at, status, progress_percentage, last_accessed)
VALUES 
    (1, 3, 1, NOW(), 'active', 0, NOW()),
    (2, 3, 2, NOW(), 'active', 0, NOW()),
    (3, 3, 3, NOW(), 'active', 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых уведомлений
INSERT INTO notifications (id, user_id, title, message, notification_type, is_read, created_at)
VALUES 
    (1, 3, 'Добро пожаловать!', 'Добро пожаловать на платформу обучения!', 'welcome', false, NOW()),
    (2, 3, 'Новый урок доступен', 'Урок "Особенности детской фотографии" теперь доступен', 'lesson_available', false, NOW()),
    (3, 2, 'Новое задание', 'Студент отправил задание на проверку', 'assignment_submitted', false, NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых платежей
INSERT INTO payments (id, user_id, course_id, amount, payment_method, status, payment_date, created_at)
VALUES 
    (1, 3, 1, 19900, 'yukassa', 'completed', NOW(), NOW()),
    (2, 3, 2, 49900, 'yukassa', 'completed', NOW(), NOW()),
    (3, 3, 3, 98000, 'yukassa', 'completed', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых сертификатов
INSERT INTO certificates (id, user_id, course_id, certificate_number, issued_date, score, max_score, status, created_at)
VALUES 
    (1, 3, 1, 'CERT-001-2024', NOW(), 95, 100, 'issued', NOW()),
    (2, 3, 2, 'CERT-002-2024', NOW(), 88, 100, 'issued', NOW()),
    (3, 3, 3, 'CERT-003-2024', NOW(), 92, 100, 'issued', NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых сообщений
INSERT INTO messages (id, from_user_id, to_user_id, subject, content, message_type, priority, is_read, created_at)
VALUES 
    (1, 2, 3, 'Добро пожаловать!', 'Добро пожаловать на платформу! Мы рады помочь вам в обучении.', 'welcome', 'normal', false, NOW()),
    (2, 3, 2, 'Вопрос по курсу', 'Здравствуйте! У меня есть вопрос по первому уроку...', 'question', 'normal', false, NOW()),
    (3, 2, 3, 'Ответ на ваш вопрос', 'Спасибо за вопрос! Вот подробный ответ...', 'answer', 'normal', false, NOW())
ON CONFLICT (id) DO NOTHING;

-- Создание базовых активностей
INSERT INTO activity_logs (id, user_id, action, resource_type, resource_id, details, created_at)
VALUES 
    (1, 3, 'login', 'user', 3, '{"ip": "192.168.1.1", "user_agent": "Mozilla/5.0..."}', NOW()),
    (2, 3, 'enroll_course', 'course', 1, '{"course_title": "Особенности фотографии в школах/садах"}', NOW()),
    (3, 3, 'start_lesson', 'lesson', 1, '{"lesson_title": "Знакомство с платформой"}', NOW()),
    (4, 2, 'create_assignment', 'assignment', 1, '{"assignment_title": "Практическое задание: съемка портрета"}', NOW())
ON CONFLICT (id) DO NOTHING;

COMMIT; 