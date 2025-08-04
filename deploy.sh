#!/bin/bash

# Скрипт для деплоя платформы обучения на сервер

echo "🚀 Начинаем деплой платформы обучения..."

# Проверяем наличие Docker и Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker и попробуйте снова."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose и попробуйте снова."
    exit 1
fi

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Удаляем старые образы (опционально)
read -p "Удалить старые образы? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Удаляем старые образы..."
    docker-compose down --rmi all
fi

# Собираем и запускаем контейнеры
echo "🔨 Собираем и запускаем контейнеры..."
docker-compose up --build -d

# Ждем запуска базы данных
echo "⏳ Ждем запуска базы данных..."
sleep 10

# Проверяем статус контейнеров
echo "📊 Проверяем статус контейнеров..."
docker-compose ps

# Проверяем логи
echo "📋 Логи последних 10 строк:"
docker-compose logs --tail=10

echo "✅ Деплой завершен!"
echo "🌐 Сайт доступен по адресу: http://localhost"
echo "🔧 API доступен по адресу: http://localhost/api/v1"
echo "📊 Мониторинг контейнеров: docker-compose ps"
echo "📋 Просмотр логов: docker-compose logs -f" 