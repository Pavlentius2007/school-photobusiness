from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
import enum

from .base import Base, BaseModel

class AssignmentType(str, enum.Enum):
    HOMEWORK = "homework"
    PROJECT = "project"
    ESSAY = "essay"
    PRESENTATION = "presentation"

class AssignmentStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    CLOSED = "closed"

class SubmissionStatus(str, enum.Enum):
    SUBMITTED = "submitted"
    GRADED = "graded"
    LATE = "late"
    MISSED = "missed"

class Assignment(Base, BaseModel):
    __tablename__ = "assignments"
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    instructions = Column(Text, nullable=True)
    assignment_type = Column(Enum(AssignmentType), default=AssignmentType.HOMEWORK, nullable=False)
    status = Column(Enum(AssignmentStatus), default=AssignmentStatus.DRAFT, nullable=False)
    max_score = Column(Integer, default=100, nullable=False)
    due_date = Column(DateTime, nullable=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Отношения
    lesson = relationship("Lesson", back_populates="assignments")
    creator = relationship("User", foreign_keys=[created_by])
    submissions = relationship("AssignmentSubmission", back_populates="assignment", cascade="all, delete-orphan")

class AssignmentSubmission(Base, BaseModel):
    __tablename__ = "assignment_submissions"
    
    content = Column(Text, nullable=True)
    file_url = Column(String(500), nullable=True)
    score = Column(Float, nullable=True)
    feedback = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    graded_at = Column(DateTime, nullable=True)
    status = Column(Enum(SubmissionStatus), default=SubmissionStatus.SUBMITTED, nullable=False)
    
    # Внешние ключи
    assignment_id = Column(Integer, ForeignKey("assignments.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    graded_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Отношения
    assignment = relationship("Assignment", back_populates="submissions")
    student = relationship("User", foreign_keys=[student_id])
    grader = relationship("User", foreign_keys=[graded_by]) 