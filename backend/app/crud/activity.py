from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func

from app.crud.base import CRUDBase
from app.models.activity import ActivityLog, Notification, CourseProgress, LessonProgress
from app.schemas.activity import ActivityLogCreate, NotificationCreate, CourseProgressCreate, LessonProgressCreate


class CRUDActivityLog(CRUDBase[ActivityLog, ActivityLogCreate, ActivityLogCreate]):
    def get_by_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[ActivityLog]:
        """Получить активность пользователя"""
        return db.query(ActivityLog).filter(ActivityLog.user_id == user_id).order_by(ActivityLog.created_at.desc()).offset(skip).limit(limit).all()

    def get_by_course(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[ActivityLog]:
        """Получить активность по курсу"""
        return db.query(ActivityLog).filter(ActivityLog.course_id == course_id).order_by(ActivityLog.created_at.desc()).offset(skip).limit(limit).all()

    def get_by_type(self, db: Session, *, activity_type: str, skip: int = 0, limit: int = 100) -> List[ActivityLog]:
        """Получить активность по типу"""
        return db.query(ActivityLog).filter(ActivityLog.activity_type == activity_type).order_by(ActivityLog.created_at.desc()).offset(skip).limit(limit).all()

    def log_activity(
        self, 
        db: Session, 
        *, 
        user_id: int, 
        activity_type: str, 
        description: str = None, 
        course_id: int = None, 
        lesson_id: int = None,
        activity_metadata: dict = None,
        ip_address: str = None,
        user_agent: str = None
    ) -> ActivityLog:
        """Записать активность пользователя"""
        activity = ActivityLog(
            user_id=user_id,
            activity_type=activity_type,
            description=description,
            course_id=course_id,
            lesson_id=lesson_id,
            activity_metadata=activity_metadata,
            ip_address=ip_address,
            user_agent=user_agent
        )
        db.add(activity)
        db.commit()
        db.refresh(activity)
        return activity


class CRUDNotification(CRUDBase[Notification, NotificationCreate, NotificationCreate]):
    def get_by_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[Notification]:
        """Получить уведомления пользователя"""
        return db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.created_at.desc()).offset(skip).limit(limit).all()

    def get_unread(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[Notification]:
        """Получить непрочитанные уведомления"""
        return db.query(Notification).filter(
            and_(Notification.user_id == user_id, Notification.status == "pending")
        ).order_by(Notification.created_at.desc()).offset(skip).limit(limit).all()

    def mark_as_read(self, db: Session, *, notification_id: int) -> Notification:
        """Отметить уведомление как прочитанное"""
        notification = self.get(db, id=notification_id)
        if notification:
            notification.status = "read"
            notification.read_at = datetime.utcnow()
            db.add(notification)
            db.commit()
            db.refresh(notification)
        return notification

    def mark_as_sent(self, db: Session, *, notification_id: int) -> Notification:
        """Отметить уведомление как отправленное"""
        notification = self.get(db, id=notification_id)
        if notification:
            notification.status = "sent"
            notification.sent_at = datetime.utcnow()
            db.add(notification)
            db.commit()
            db.refresh(notification)
        return notification


class CRUDCourseProgress(CRUDBase[CourseProgress, CourseProgressCreate, CourseProgressCreate]):
    def get_by_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[CourseProgress]:
        """Получить прогресс пользователя по курсам"""
        return db.query(CourseProgress).filter(CourseProgress.user_id == user_id).order_by(CourseProgress.updated_at.desc()).offset(skip).limit(limit).all()

    def get_by_course(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[CourseProgress]:
        """Получить прогресс всех пользователей по курсу"""
        return db.query(CourseProgress).filter(CourseProgress.course_id == course_id).order_by(CourseProgress.progress_percentage.desc()).offset(skip).limit(limit).all()

    def get_user_course_progress(self, db: Session, *, user_id: int, course_id: int) -> Optional[CourseProgress]:
        """Получить прогресс пользователя по конкретному курсу"""
        return db.query(CourseProgress).filter(
            and_(CourseProgress.user_id == user_id, CourseProgress.course_id == course_id)
        ).first()

    def update_progress(
        self, 
        db: Session, 
        *, 
        user_id: int, 
        course_id: int, 
        completed_lessons: int = None, 
        total_lessons: int = None
    ) -> CourseProgress:
        """Обновить прогресс по курсу"""
        progress = self.get_user_course_progress(db, user_id=user_id, course_id=course_id)
        
        if not progress:
            progress = CourseProgress(
                user_id=user_id,
                course_id=course_id,
                completed_lessons=completed_lessons or 0,
                total_lessons=total_lessons or 0
            )
            db.add(progress)
        else:
            if completed_lessons is not None:
                progress.completed_lessons = completed_lessons
            if total_lessons is not None:
                progress.total_lessons = total_lessons
        
        # Обновляем процент прогресса
        if progress.total_lessons > 0:
            progress.progress_percentage = (progress.completed_lessons / progress.total_lessons) * 100
        else:
            progress.progress_percentage = 0.0
        
        progress.last_accessed_at = datetime.utcnow()
        
        # Проверяем завершение курса
        if progress.completed_lessons >= progress.total_lessons and progress.total_lessons > 0:
            progress.completed_at = datetime.utcnow()
        
        db.commit()
        db.refresh(progress)
        return progress


class CRUDLessonProgress(CRUDBase[LessonProgress, LessonProgressCreate, LessonProgressCreate]):
    def get_by_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[LessonProgress]:
        """Получить прогресс пользователя по урокам"""
        return db.query(LessonProgress).filter(LessonProgress.user_id == user_id).order_by(LessonProgress.updated_at.desc()).offset(skip).limit(limit).all()

    def get_by_lesson(self, db: Session, *, lesson_id: int, skip: int = 0, limit: int = 100) -> List[LessonProgress]:
        """Получить прогресс всех пользователей по уроку"""
        return db.query(LessonProgress).filter(LessonProgress.lesson_id == lesson_id).offset(skip).limit(limit).all()

    def get_user_lesson_progress(self, db: Session, *, user_id: int, lesson_id: int) -> Optional[LessonProgress]:
        """Получить прогресс пользователя по конкретному уроку"""
        return db.query(LessonProgress).filter(
            and_(LessonProgress.user_id == user_id, LessonProgress.lesson_id == lesson_id)
        ).first()

    def mark_as_completed(self, db: Session, *, user_id: int, lesson_id: int, course_progress_id: int) -> LessonProgress:
        """Отметить урок как завершенный"""
        progress = self.get_user_lesson_progress(db, user_id=user_id, lesson_id=lesson_id)
        
        if not progress:
            progress = LessonProgress(
                user_id=user_id,
                lesson_id=lesson_id,
                course_progress_id=course_progress_id,
                is_completed=True,
                completed_at=datetime.utcnow()
            )
            db.add(progress)
        else:
            progress.is_completed = True
            progress.completed_at = datetime.utcnow()
        
        db.commit()
        db.refresh(progress)
        return progress

    def update_position(self, db: Session, *, user_id: int, lesson_id: int, position: int, course_progress_id: int) -> LessonProgress:
        """Обновить позицию в уроке"""
        progress = self.get_user_lesson_progress(db, user_id=user_id, lesson_id=lesson_id)
        
        if not progress:
            progress = LessonProgress(
                user_id=user_id,
                lesson_id=lesson_id,
                course_progress_id=course_progress_id,
                last_position=position
            )
            db.add(progress)
        else:
            progress.last_position = position
        
        db.commit()
        db.refresh(progress)
        return progress


activity_crud = CRUDActivityLog(ActivityLog)
notification_crud = CRUDNotification(Notification)
progress_crud = CRUDCourseProgress(CourseProgress) 