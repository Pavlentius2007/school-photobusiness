from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from app.models.course import CourseStatus, LessonType


class CourseBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[float] = 0.0
    duration_hours: Optional[int] = 0
    status: Optional[CourseStatus] = CourseStatus.DRAFT
    is_featured: Optional[bool] = False
    max_students: Optional[int] = None
    requirements: Optional[str] = None
    learning_outcomes: Optional[str] = None


class CourseCreate(CourseBase):
    title: str
    slug: str
    curator_id: int


class CourseUpdate(CourseBase):
    pass


class CourseInDBBase(CourseBase):
    id: Optional[int] = None
    curator_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    published_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Course(CourseInDBBase):
    pass


class CourseWithModules(Course):
    modules: List["Module"] = []


class ModuleBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    order_index: Optional[int] = 0
    is_required: Optional[bool] = True
    estimated_hours: Optional[int] = 0


class ModuleCreate(ModuleBase):
    title: str
    course_id: int


class ModuleUpdate(ModuleBase):
    pass


class ModuleInDBBase(ModuleBase):
    id: Optional[int] = None
    course_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Module(ModuleInDBBase):
    pass


class ModuleWithLessons(Module):
    lessons: List["Lesson"] = []


class LessonBase(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    order_index: Optional[int] = 0
    video_url: Optional[str] = None
    file_url: Optional[str] = None
    duration_minutes: Optional[int] = 0
    lesson_type: Optional[LessonType] = LessonType.TEXT
    is_free: Optional[bool] = False


class LessonCreate(LessonBase):
    title: str
    module_id: int


class LessonUpdate(LessonBase):
    pass


class LessonInDBBase(LessonBase):
    id: Optional[int] = None
    module_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Lesson(LessonInDBBase):
    pass


# Обновляем схемы для циклических ссылок
CourseWithModules.model_rebuild()
ModuleWithLessons.model_rebuild() 