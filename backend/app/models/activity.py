from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, Enum, Float, JSON
from sqlalchemy.orm import relationship
import enum

from .base import Base, BaseModel

class ActivityType(str, enum.Enum):
    LOGIN = "login"
    COURSE_ENROLL = "course_enroll"
    LESSON_COMPLETE = "lesson_complete"
    ASSIGNMENT_SUBMIT = "assignment_submit"
    TEST_COMPLETE = "test_complete"
    PAYMENT_MADE = "payment_made"
    COURSE_ACCESS = "course_access"

class NotificationType(str, enum.Enum):
    EMAIL = "email"
    TELEGRAM = "telegram"
    SYSTEM = "system"

class NotificationStatus(str, enum.Enum):
    PENDING = "pending"
    SENT = "sent"
    FAILED = "failed"
    READ = "read"

class ActivityLog(Base, BaseModel):
    __tablename__ = "activity_logs"
    
    activity_type = Column(Enum(ActivityType), nullable=False)
    description = Column(Text, nullable=True)
    metadata = Column(JSON, nullable=True)  # Дополнительные данные в JSON формате
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    
    # Внешние ключи
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)
    
    # Отношения
    user = relationship("User", foreign_keys=[user_id])
    course = relationship("Course")
    lesson = relationship("Lesson")

class Notification(Base, BaseModel):
    __tablename__ = "notifications"
    
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(Enum(NotificationType), nullable=False)
    status = Column(Enum(NotificationStatus), default=NotificationStatus.PENDING, nullable=False)
    sent_at = Column(DateTime, nullable=True)
    read_at = Column(DateTime, nullable=True)
    metadata = Column(JSON, nullable=True)
    
    # Внешние ключи
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Отношения
    user = relationship("User", foreign_keys=[user_id])

class CourseProgress(Base, BaseModel):
    __tablename__ = "course_progress"
    
    progress_percentage = Column(Float, default=0.0, nullable=False)
    completed_lessons = Column(Integer, default=0, nullable=False)
    total_lessons = Column(Integer, default=0, nullable=False)
    last_accessed_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Внешние ключи
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    
    # Отношения
    user = relationship("User", foreign_keys=[user_id])
    course = relationship("Course")
    lesson_progress = relationship("LessonProgress", back_populates="course_progress", cascade="all, delete-orphan")

class LessonProgress(Base, BaseModel):
    __tablename__ = "lesson_progress"
    
    is_completed = Column(Boolean, default=False, nullable=False)
    completed_at = Column(DateTime, nullable=True)
    time_spent_minutes = Column(Integer, default=0, nullable=False)
    last_position = Column(Integer, default=0, nullable=False)  # Позиция в видео/контенте
    
    # Внешние ключи
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    course_progress_id = Column(Integer, ForeignKey("course_progress.id"), nullable=False)
    
    # Отношения
    user = relationship("User", foreign_keys=[user_id])
    lesson = relationship("Lesson")
    course_progress = relationship("CourseProgress", back_populates="lesson_progress") 