from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.crud.base import CRUDBase
from app.models.course import Course, Module, Lesson
from app.schemas.course import CourseCreate, CourseUpdate, ModuleCreate, ModuleUpdate, LessonCreate, LessonUpdate


class CRUDCourse(CRUDBase[Course, CourseCreate, CourseUpdate]):
    def get_by_slug(self, db: Session, *, slug: str) -> Optional[Course]:
        """Получить курс по slug"""
        return db.query(Course).filter(Course.slug == slug).first()

    def get_published(self, db: Session, skip: int = 0, limit: int = 100) -> List[Course]:
        """Получить список опубликованных курсов"""
        return db.query(Course).filter(Course.status == "published").offset(skip).limit(limit).all()

    def get_featured(self, db: Session, skip: int = 0, limit: int = 100) -> List[Course]:
        """Получить список рекомендуемых курсов"""
        return db.query(Course).filter(
            and_(Course.status == "published", Course.is_featured == True)
        ).offset(skip).limit(limit).all()

    def get_by_curator(self, db: Session, *, curator_id: int, skip: int = 0, limit: int = 100) -> List[Course]:
        """Получить курсы куратора"""
        return db.query(Course).filter(Course.curator_id == curator_id).offset(skip).limit(limit).all()

    def search_courses(self, db: Session, *, search_term: str, skip: int = 0, limit: int = 100) -> List[Course]:
        """Поиск курсов по названию и описанию"""
        return db.query(Course).filter(
            and_(
                Course.status == "published",
                or_(
                    Course.title.ilike(f"%{search_term}%"),
                    Course.description.ilike(f"%{search_term}%")
                )
            )
        ).offset(skip).limit(limit).all()


class CRUDModule(CRUDBase[Module, ModuleCreate, ModuleUpdate]):
    def get_by_course(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[Module]:
        """Получить модули курса"""
        return db.query(Module).filter(Module.course_id == course_id).order_by(Module.order_index).offset(skip).limit(limit).all()

    def get_with_lessons(self, db: Session, *, module_id: int) -> Optional[Module]:
        """Получить модуль с уроками"""
        return db.query(Module).filter(Module.id == module_id).first()


class CRUDLesson(CRUDBase[Lesson, LessonCreate, LessonUpdate]):
    def get_by_module(self, db: Session, *, module_id: int, skip: int = 0, limit: int = 100) -> List[Lesson]:
        """Получить уроки модуля"""
        return db.query(Lesson).filter(Lesson.module_id == module_id).order_by(Lesson.order_index).offset(skip).limit(limit).all()

    def get_free_lessons(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[Lesson]:
        """Получить бесплатные уроки курса"""
        return db.query(Lesson).join(Module).filter(
            and_(Module.course_id == course_id, Lesson.is_free == True)
        ).order_by(Module.order_index, Lesson.order_index).offset(skip).limit(limit).all()

    def get_by_course(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[Lesson]:
        """Получить все уроки курса"""
        return db.query(Lesson).join(Module).filter(Module.course_id == course_id).order_by(
            Module.order_index, Lesson.order_index
        ).offset(skip).limit(limit).all()


course_crud = CRUDCourse(Course)
module_crud = CRUDModule(Module)
lesson_crud = CRUDLesson(Lesson) 