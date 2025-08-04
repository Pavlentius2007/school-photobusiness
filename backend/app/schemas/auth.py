"""
Схемы для аутентификации
"""

from typing import Optional
from pydantic import BaseModel, EmailStr, validator

from app.schemas.user import User


class Token(BaseModel):
    """Схема токена"""
    access_token: str
    token_type: str
    user: Optional[User] = None


class UserCreate(BaseModel):
    """Схема создания пользователя"""
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Пароль должен содержать минимум 8 символов')
        return v
    
    @validator('username')
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError('Username должен содержать минимум 3 символа')
        if not v.isalnum():
            raise ValueError('Username должен содержать только буквы и цифры')
        return v


class UserLogin(BaseModel):
    """Схема входа пользователя"""
    email: EmailStr
    password: str


class TokenData(BaseModel):
    """Данные токена"""
    user_id: Optional[int] = None 