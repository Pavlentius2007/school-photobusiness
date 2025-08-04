from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel

from app.models.activity import ActivityType, NotificationType, NotificationStatus


class ActivityLogBase(BaseModel):
    activity_type: Optional[ActivityType] = None
    description: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


class ActivityLogCreate(ActivityLogBase):
    user_id: int
    activity_type: ActivityType


class ActivityLogUpdate(ActivityLogBase):
    pass


class ActivityLogInDBBase(ActivityLogBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    course_id: Optional[int] = None
    lesson_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ActivityLog(ActivityLogInDBBase):
    pass


class NotificationBase(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    notification_type: Optional[NotificationType] = NotificationType.SYSTEM
    status: Optional[NotificationStatus] = NotificationStatus.PENDING
    metadata: Optional[Dict[str, Any]] = None


class NotificationCreate(NotificationBase):
    title: str
    message: str
    user_id: int


class NotificationUpdate(NotificationBase):
    pass


class NotificationInDBBase(NotificationBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    sent_at: Optional[datetime] = None
    read_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Notification(NotificationInDBBase):
    pass


class CourseProgressBase(BaseModel):
    progress_percentage: Optional[float] = 0.0
    completed_lessons: Optional[int] = 0
    total_lessons: Optional[int] = 0


class CourseProgressCreate(CourseProgressBase):
    user_id: int
    course_id: int


class CourseProgressUpdate(CourseProgressBase):
    pass


class CourseProgressInDBBase(CourseProgressBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    course_id: Optional[int] = None
    last_accessed_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CourseProgress(CourseProgressInDBBase):
    pass


class LessonProgressBase(BaseModel):
    is_completed: Optional[bool] = False
    time_spent_minutes: Optional[int] = 0
    last_position: Optional[int] = 0


class LessonProgressCreate(LessonProgressBase):
    user_id: int
    lesson_id: int
    course_progress_id: int


class LessonProgressUpdate(LessonProgressBase):
    pass


class LessonProgressInDBBase(LessonProgressBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    lesson_id: Optional[int] = None
    course_progress_id: Optional[int] = None
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class LessonProgress(LessonProgressInDBBase):
    pass 