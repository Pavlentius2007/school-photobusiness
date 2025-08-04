"""
Модели базы данных
"""

from .base import Base
from .user import User
from .course import Course, Module, Lesson
from .assignment import Assignment, AssignmentSubmission
from .test import Test, Question, Answer, TestAttempt, TestAnswer
from .payment import Payment, UserCourseAccess
from .activity import ActivityLog, Notification, CourseProgress, LessonProgress

__all__ = [
    "Base",
    "User",
    "Course",
    "Module", 
    "Lesson",
    "Assignment",
    "AssignmentSubmission",
    "Test",
    "Question",
    "Answer",
    "TestAttempt",
    "TestAnswer",
    "Payment",
    "UserCourseAccess",
    "ActivityLog",
    "Notification",
    "CourseProgress",
    "LessonProgress"
] 