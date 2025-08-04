from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

from app.models.user import UserRole


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = True
    role: Optional[UserRole] = UserRole.STUDENT
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    telegram_username: Optional[str] = None
    telegram_chat_id: Optional[str] = None


class UserCreate(UserBase):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: str 