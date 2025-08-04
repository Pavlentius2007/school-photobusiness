"""
CRUD операции для уведомлений
"""

from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.crud.base import CRUDBase
from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate


class CRUDNotification(CRUDBase[Notification, NotificationCreate, NotificationUpdate]):
    """CRUD операции для уведомлений"""
    
    def get_by_user(self, db: Session, user_id: int, skip: int = 0, limit: int = 100):
        """Получить уведомления пользователя"""
        return db.query(self.model).filter(
            self.model.user_id == user_id
        ).offset(skip).limit(limit).all()
    
    def get_unread_by_user(self, db: Session, user_id: int):
        """Получить непрочитанные уведомления пользователя"""
        return db.query(self.model).filter(
            self.model.user_id == user_id,
            self.model.is_read == False
        ).all()
    
    def mark_all_as_read(self, db: Session, user_id: int) -> int:
        """Отметить все уведомления пользователя как прочитанные"""
        result = db.query(self.model).filter(
            self.model.user_id == user_id,
            self.model.is_read == False
        ).update({"is_read": True})
        db.commit()
        return result
    
    def delete_all_by_user(self, db: Session, user_id: int) -> int:
        """Удалить все уведомления пользователя"""
        result = db.query(self.model).filter(
            self.model.user_id == user_id
        ).delete()
        db.commit()
        return result
    
    def get_stats_by_type(self, db: Session) -> dict:
        """Получить статистику уведомлений по типам"""
        stats = db.query(
            self.model.notification_type,
            func.count(self.model.id).label('count')
        ).group_by(self.model.notification_type).all()
        
        return {stat.notification_type: stat.count for stat in stats}
    
    def get_by_priority(self, db: Session, priority: int, skip: int = 0, limit: int = 100):
        """Получить уведомления по приоритету"""
        return db.query(self.model).filter(
            self.model.priority == priority
        ).offset(skip).limit(limit).all()
    
    def get_recent_notifications(self, db: Session, user_id: int, days: int = 7):
        """Получить недавние уведомления пользователя"""
        from datetime import datetime, timedelta
        
        cutoff_date = datetime.utcnow() - timedelta(days=days)
        return db.query(self.model).filter(
            self.model.user_id == user_id,
            self.model.created_at >= cutoff_date
        ).order_by(self.model.created_at.desc()).all()


notification_crud = CRUDNotification(Notification) 