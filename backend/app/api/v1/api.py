"""
Основной API роутер
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, courses, assignments, tests, payments, analytics, notifications

api_router = APIRouter()

# Подключение всех эндпоинтов
api_router.include_router(auth.router, prefix="/auth", tags=["Аутентификация"])
api_router.include_router(users.router, prefix="/users", tags=["Пользователи"])
api_router.include_router(courses.router, prefix="/courses", tags=["Курсы"])
api_router.include_router(assignments.router, prefix="/assignments", tags=["Задания"])
api_router.include_router(tests.router, prefix="/tests", tags=["Тесты"])
api_router.include_router(payments.router, prefix="/payments", tags=["Платежи"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Аналитика"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Уведомления"]) 