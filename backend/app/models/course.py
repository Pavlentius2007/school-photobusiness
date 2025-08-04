"""
Модели курсов, модулей и уроков
"""

from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
import enum

from .base import Base, BaseModel


class CourseStatus(str, enum.Enum):
    """Статусы курсов"""
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"


class LessonType(str, enum.Enum):
    """Типы уроков"""
    VIDEO = "video"
    TEXT = "text"
    FILE = "file"
    TEST = "test"


class Course(Base, BaseModel):
    """Модель курса"""
    
    __tablename__ = "courses"
    
    # Основная информация
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    image_url = Column(String(500), nullable=True)
    
    # Цена и продолжительность
    price = Column(Float, default=0.0, nullable=False)
    duration_hours = Column(Integer, default=0, nullable=False)
    
    # Статус и метаданные
    status = Column(Enum(CourseStatus), default=CourseStatus.DRAFT, nullable=False)
    published_at = Column(DateTime, nullable=True)
    is_featured = Column(Boolean, default=False, nullable=False)
    max_students = Column(Integer, nullable=True)
    
    # Требования и результаты
    requirements = Column(Text, nullable=True)
    learning_outcomes = Column(Text, nullable=True)
    
    # Связи
    curator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    curator = relationship("User", back_populates="courses_curated")
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="course")
    course_access = relationship("UserCourseAccess", back_populates="course")
    course_progress = relationship("CourseProgress", back_populates="course")
    
    def __repr__(self):
        return f"<Course(id={self.id}, title='{self.title}', status='{self.status}')>"
    
    @property
    def total_lessons(self) -> int:
        """Общее количество уроков в курсе"""
        return sum(len(module.lessons) for module in self.modules)
    
    @property
    def is_published(self) -> bool:
        """Проверка на опубликованный курс"""
        return self.status == CourseStatus.PUBLISHED


class Module(Base, BaseModel):
    """Модель модуля курса"""
    
    __tablename__ = "modules"
    
    # Основная информация
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    order_index = Column(Integer, default=0, nullable=False)
    
    # Метаданные
    is_required = Column(Boolean, default=True, nullable=False)
    estimated_hours = Column(Integer, default=0, nullable=False)
    
    # Связи
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    course = relationship("Course", back_populates="modules")
    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Module(id={self.id}, title='{self.title}', course_id={self.course_id})>"


class Lesson(Base, BaseModel):
    """Модель урока"""
    
    __tablename__ = "lessons"
    
    # Основная информация
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=True)
    order_index = Column(Integer, default=0, nullable=False)
    
    # Медиа контент
    video_url = Column(String(500), nullable=True)
    file_url = Column(String(500), nullable=True)
    
    # Метаданные
    lesson_type = Column(Enum(LessonType), default=LessonType.TEXT, nullable=False)
    duration_minutes = Column(Integer, default=0, nullable=False)
    is_free = Column(Boolean, default=False, nullable=False)
    
    # Связи
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)
    module = relationship("Module", back_populates="lessons")
    assignments = relationship("Assignment", back_populates="lesson", cascade="all, delete-orphan")
    tests = relationship("Test", back_populates="lesson", cascade="all, delete-orphan")
    lesson_progress = relationship("LessonProgress", back_populates="lesson")
    
    def __repr__(self):
        return f"<Lesson(id={self.id}, title='{self.title}', type='{self.lesson_type}')>"
    
    @property
    def course(self):
        """Получение курса через модуль"""
        return self.module.course if self.module else None 