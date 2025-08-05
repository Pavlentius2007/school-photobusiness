@echo off
echo 🚀 Запуск платформы обучения (режим разработки)
echo.

echo 📦 Проверка Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python не установлен! Установите Python 3.8+
    pause
    exit /b 1
)

echo ✅ Python найден

echo.
echo 📦 Проверка Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не установлен! Установите Node.js
    pause
    exit /b 1
)

echo ✅ Node.js найден

echo.
echo 🗄️ Запуск PostgreSQL (требуется установленный PostgreSQL)
echo ⚠️ Убедитесь, что PostgreSQL запущен на порту 5432
echo.

echo 📦 Установка зависимостей бэкенда...
cd backend
pip install -r requirements.txt

echo.
echo 🚀 Запуск бэкенда...
start "Backend" cmd /k "python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

cd ..

echo.
echo 📦 Установка зависимостей фронтенда...
cd frontend
npm install

echo.
echo 🎯 Запуск фронтенда...
start "Frontend" cmd /k "npm start"

cd ..

echo.
echo ✅ Проект запущен!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo 🧪 Тестовые аккаунты:
echo 👑 Админ: admin@sianoro.ru / admin123
echo 📚 Куратор: anna@sianoro.ru / anna123
echo 👨‍🎓 Студент: elena@sianoro.ru / elena123
echo.
echo Нажмите любую клавишу для выхода...
pause 