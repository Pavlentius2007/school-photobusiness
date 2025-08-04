#!/usr/bin/env python3
"""
Скрипт для инициализации базы данных
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command, cwd=None):
    """Выполнение команды с выводом"""
    print(f"🚀 Выполняем: {command}")
    result = subprocess.run(
        command,
        shell=True,
        cwd=cwd,
        capture_output=True,
        text=True
    )
    
    if result.stdout:
        print(f"✅ Вывод: {result.stdout}")
    
    if result.stderr:
        print(f"⚠️ Ошибки: {result.stderr}")
    
    if result.returncode != 0:
        print(f"❌ Команда завершилась с ошибкой: {result.returncode}")
        return False
    
    return True

def init_database():
    """Инициализация базы данных"""
    print("🗄️ Инициализация базы данных PostgreSQL...")
    
    # Проверяем, что мы в правильной директории
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)
    
    # 1. Проверяем подключение к базе данных
    print("🔍 Проверяем подключение к базе данных...")
    if not run_command("python -c \"from app.core.database import engine; print('База данных доступна')\""):
        print("❌ Не удалось подключиться к базе данных")
        return False
    
    # 2. Инициализируем Alembic (если еще не инициализирован)
    if not Path("alembic/versions").exists():
        print("📝 Инициализируем Alembic...")
        if not run_command("alembic init alembic"):
            print("❌ Не удалось инициализировать Alembic")
            return False
    
    # 3. Запускаем миграции
    print("🔄 Применяем миграции...")
    if not run_command("alembic upgrade head"):
        print("❌ Не удалось применить миграции")
        return False
    
    # 4. Загружаем начальные данные
    print("📊 Загружаем начальные данные...")
    if not run_command("python -c \"from app.core.database import init_db; init_db()\""):
        print("❌ Не удалось загрузить начальные данные")
        return False
    
    print("✅ База данных успешно инициализирована!")
    return True

def create_admin_user():
    """Создание администратора"""
    print("👤 Создание администратора...")
    
    admin_script = """
from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

db = SessionLocal()
try:
    # Проверяем, есть ли уже администратор
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    if not admin:
        admin = User(
            email="admin@example.com",
            full_name="Администратор",
            hashed_password=get_password_hash("admin123"),
            role="admin",
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("✅ Администратор создан: admin@example.com / admin123")
    else:
        print("ℹ️ Администратор уже существует")
finally:
    db.close()
"""
    
    if run_command(f'python -c "{admin_script}"'):
        print("✅ Администратор готов")
        return True
    else:
        print("❌ Не удалось создать администратора")
        return False

def main():
    """Основная функция"""
    print("🚀 Инициализация платформы обучения")
    print("=" * 50)
    
    # Инициализация базы данных
    if not init_database():
        print("❌ Ошибка инициализации базы данных")
        sys.exit(1)
    
    # Создание администратора
    if not create_admin_user():
        print("❌ Ошибка создания администратора")
        sys.exit(1)
    
    print("=" * 50)
    print("🎉 Платформа готова к работе!")
    print("📋 Данные для входа:")
    print("   Email: admin@example.com")
    print("   Пароль: admin123")
    print("🔗 Сайт: http://localhost")
    print("📊 API: http://localhost/api/v1")

if __name__ == "__main__":
    main() 