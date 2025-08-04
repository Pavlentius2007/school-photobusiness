from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
import enum

from .base import Base, BaseModel

class QuestionType(str, enum.Enum):
    SINGLE_CHOICE = "single_choice"
    MULTIPLE_CHOICE = "multiple_choice"
    TEXT = "text"
    TRUE_FALSE = "true_false"

class TestStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    CLOSED = "closed"

class Test(Base, BaseModel):
    __tablename__ = "tests"
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    instructions = Column(Text, nullable=True)
    status = Column(Enum(TestStatus), default=TestStatus.DRAFT, nullable=False)
    time_limit_minutes = Column(Integer, nullable=True)  # null = без ограничения времени
    passing_score = Column(Integer, default=70, nullable=False)
    max_attempts = Column(Integer, default=1, nullable=False)
    shuffle_questions = Column(Boolean, default=False, nullable=False)
    show_results = Column(Boolean, default=True, nullable=False)
    
    # Внешние ключи
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Отношения
    lesson = relationship("Lesson", back_populates="tests")
    creator = relationship("User", foreign_keys=[created_by])
    questions = relationship("Question", back_populates="test", cascade="all, delete-orphan")
    attempts = relationship("TestAttempt", back_populates="test", cascade="all, delete-orphan")

class Question(Base, BaseModel):
    __tablename__ = "questions"
    
    text = Column(Text, nullable=False)
    question_type = Column(Enum(QuestionType), nullable=False)
    points = Column(Integer, default=1, nullable=False)
    order_index = Column(Integer, default=0, nullable=False)
    is_required = Column(Boolean, default=True, nullable=False)
    
    # Внешние ключи
    test_id = Column(Integer, ForeignKey("tests.id"), nullable=False)
    
    # Отношения
    test = relationship("Test", back_populates="questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete-orphan")
    test_answers = relationship("TestAnswer", back_populates="question", cascade="all, delete-orphan")

class Answer(Base, BaseModel):
    __tablename__ = "answers"
    
    text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False, nullable=False)
    order_index = Column(Integer, default=0, nullable=False)
    
    # Внешние ключи
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    
    # Отношения
    question = relationship("Question", back_populates="answers")

class TestAttempt(Base, BaseModel):
    __tablename__ = "test_attempts"
    
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)
    score = Column(Float, nullable=True)
    is_passed = Column(Boolean, nullable=True)
    attempt_number = Column(Integer, default=1, nullable=False)
    
    # Внешние ключи
    test_id = Column(Integer, ForeignKey("tests.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Отношения
    test = relationship("Test", back_populates="attempts")
    student = relationship("User", foreign_keys=[student_id])
    answers = relationship("TestAnswer", back_populates="attempt", cascade="all, delete-orphan")

class TestAnswer(Base, BaseModel):
    __tablename__ = "test_answers"
    
    answer_text = Column(Text, nullable=True)  # Для текстовых ответов
    is_correct = Column(Boolean, nullable=True)
    points_earned = Column(Float, default=0, nullable=False)
    
    # Внешние ключи
    test_attempt_id = Column(Integer, ForeignKey("test_attempts.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    selected_answer_id = Column(Integer, ForeignKey("answers.id"), nullable=True)  # Для выбора ответов
    
    # Отношения
    attempt = relationship("TestAttempt", back_populates="answers")
    question = relationship("Question", back_populates="test_answers")
    selected_answer = relationship("Answer") 