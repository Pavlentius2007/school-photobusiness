"""
Pydantic схемы для валидации данных
"""

from .auth import Token, UserCreate, UserLogin
from .user import User, UserUpdate, UserInDB
from .course import Course, CourseCreate, CourseUpdate, Module, ModuleCreate, Lesson, LessonCreate
from .payment import Payment, PaymentCreate, UserCourseAccess
from .assignment import Assignment, AssignmentCreate, AssignmentSubmission, AssignmentSubmissionCreate
from .test import Test, TestCreate, Question, QuestionCreate, TestAttempt, TestAttemptCreate

__all__ = [
    "Token",
    "UserCreate", 
    "UserLogin",
    "User",
    "UserUpdate",
    "UserInDB",
    "Course",
    "CourseCreate",
    "CourseUpdate",
    "Module",
    "ModuleCreate",
    "Lesson",
    "LessonCreate",
    "Payment",
    "PaymentCreate",
    "UserCourseAccess",
    "Assignment",
    "AssignmentCreate",
    "AssignmentSubmission",
    "AssignmentSubmissionCreate",
    "Test",
    "TestCreate",
    "Question",
    "QuestionCreate",
    "TestAttempt",
    "TestAttemptCreate"
] 