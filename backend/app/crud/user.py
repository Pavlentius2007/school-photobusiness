from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        """Получить пользователя по email"""
        return db.query(User).filter(User.email == email).first()

    def get_by_username(self, db: Session, *, username: str) -> Optional[User]:
        """Получить пользователя по username"""
        return db.query(User).filter(User.username == username).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        """Создать нового пользователя с хешированным паролем"""
        db_obj = User(
            email=obj_in.email,
            username=obj_in.username,
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            hashed_password=get_password_hash(obj_in.password),
            role=obj_in.role if hasattr(obj_in, 'role') else None
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        """Аутентификация пользователя"""
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: User) -> bool:
        """Проверить активность пользователя"""
        return user.is_active

    def is_admin(self, user: User) -> bool:
        """Проверить, является ли пользователь администратором"""
        return user.role.value == "admin"

    def is_curator(self, user: User) -> bool:
        """Проверить, является ли пользователь куратором"""
        return user.role.value == "curator"

    def get_students(self, db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """Получить список студентов"""
        return db.query(User).filter(User.role == "student").offset(skip).limit(limit).all()

    def get_curators(self, db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """Получить список кураторов"""
        return db.query(User).filter(User.role == "curator").offset(skip).limit(limit).all()

    def get_admins(self, db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """Получить список администраторов"""
        return db.query(User).filter(User.role == "admin").offset(skip).limit(limit).all()

    def update_last_login(self, db: Session, *, user_id: int) -> User:
        """Обновить время последнего входа"""
        user = self.get(db, id=user_id)
        if user:
            from datetime import datetime
            user.last_login = datetime.utcnow()
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    def get_current_user(self, db: Session, user_id: int) -> Optional[User]:
        """Получить текущего пользователя (для зависимостей)"""
        return self.get(db, id=user_id)


user_crud = CRUDUser(User) 