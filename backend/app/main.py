"""
Основной файл FastAPI приложения
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Создаем экземпляр FastAPI
app = FastAPI(
    title="Онлайн-платформа обучения",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Корневой эндпоинт"""
    return {"message": "Добро пожаловать в API платформы обучения!"}

@app.get("/health")
async def health_check():
    """Проверка здоровья сервера"""
    return {"status": "healthy", "message": "Сервер работает"}

@app.get("/api/v1/test")
async def test_api():
    """Тестовый API эндпоинт"""
    return {"message": "API работает!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 