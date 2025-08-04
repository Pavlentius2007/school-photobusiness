"""
🎓 Онлайн-платформа обучения
Основной модуль приложения
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import engine
from app.models import Base
from app.api.v1.api import api_router

# Создание таблиц базы данных
Base.metadata.create_all(bind=engine)

# Создание FastAPI приложения
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Онлайн-платформа для обучения с системой управления курсами и платежами",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение статических файлов
app.mount("/static", StaticFiles(directory="static"), name="static")

# Подключение API роутера
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    """Корневой endpoint"""
    return {
        "message": "🎓 Добро пожаловать в онлайн-платформу обучения!",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    """Проверка здоровья приложения"""
    return {"status": "healthy", "timestamp": "2024-01-01T00:00:00Z"} 