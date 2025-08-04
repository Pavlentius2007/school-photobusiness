"""
Модель пользователя
"""

from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Enum
from sqlalchemy.orm import relationship
import enum

from .base import Base, BaseModel


class UserRole(str, enum.Enum):
    """Роли пользователей"""
    ADMIN = "admin"
    CURATOR = "curator"
    STUDENT = "student"


class User(Base, BaseModel):
    """Модель пользователя"""
    
    __tablename__ = "users"
    
    # Основная информация
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    
    # Роль и статус
    role = Column(Enum(UserRole), default=UserRole.STUDENT, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Дополнительная информация
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    phone = Column(String(20), nullable=True)
    telegram_username = Column(String(100), unique=True, index=True, nullable=True)
    telegram_chat_id = Column(String(100), unique=True, index=True, nullable=True)
    
    # Временные метки
    last_login = Column(DateTime, nullable=True)
    
    # Связи
    courses_curated = relationship("Course", back_populates="curator")
    payments = relationship("Payment", back_populates="user")
    course_access = relationship("UserCourseAccess", back_populates="user")
    activity_logs = relationship("ActivityLog", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    course_progress = relationship("CourseProgress", back_populates="user")
    lesson_progress = relationship("LessonProgress", back_populates="user")
    assignment_submissions = relationship("AssignmentSubmission", back_populates="student")
    graded_submissions = relationship("AssignmentSubmission", foreign_keys="AssignmentSubmission.grader_id", back_populates="grader")
    test_attempts = relationship("TestAttempt", back_populates="student")
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
    
    @property
    def full_name(self) -> str:
        """Полное имя пользователя"""
        return f"{self.first_name} {self.last_name}"
    
    @property
    def is_admin(self) -> bool:
        """Проверка на администратора"""
        return self.role == UserRole.ADMIN
    
    @property
    def is_curator(self) -> bool:
        """Проверка на куратора"""
        return self.role == UserRole.CURATOR
    
    @property
    def is_student(self) -> bool:
        """Проверка на студента"""
        return self.role == UserRole.STUDENT 