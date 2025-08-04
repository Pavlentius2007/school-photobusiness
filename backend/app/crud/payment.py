from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func

from app.crud.base import CRUDBase
from app.models.payment import Payment, UserCourseAccess
from app.schemas.payment import PaymentCreate, PaymentUpdate, UserCourseAccessCreate, UserCourseAccessUpdate


class CRUDPayment(CRUDBase[Payment, PaymentCreate, PaymentUpdate]):
    def get_by_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[Payment]:
        """Получить платежи пользователя"""
        return db.query(Payment).filter(Payment.user_id == user_id).order_by(Payment.created_at.desc()).offset(skip).limit(limit).all()

    def get_by_course(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[Payment]:
        """Получить платежи за курс"""
        return db.query(Payment).filter(Payment.course_id == course_id).order_by(Payment.created_at.desc()).offset(skip).limit(limit).all()

    def get_by_status(self, db: Session, *, status: str, skip: int = 0, limit: int = 100) -> List[Payment]:
        """Получить платежи по статусу"""
        return db.query(Payment).filter(Payment.status == status).order_by(Payment.created_at.desc()).offset(skip).limit(limit).all()

    def get_by_external_id(self, db: Session, *, external_id: str) -> Optional[Payment]:
        """Получить платеж по внешнему ID"""
        return db.query(Payment).filter(Payment.external_payment_id == external_id).first()

    def update_status(self, db: Session, *, payment_id: int, status: str, processed_at: datetime = None) -> Payment:
        """Обновить статус платежа"""
        payment = self.get(db, id=payment_id)
        if payment:
            payment.status = status
            if processed_at:
                payment.processed_at = processed_at
            else:
                payment.processed_at = datetime.utcnow()
            db.add(payment)
            db.commit()
            db.refresh(payment)
        return payment

    def get_total_revenue(self, db: Session, *, course_id: Optional[int] = None, start_date: Optional[datetime] = None, end_date: Optional[datetime] = None) -> float:
        """Получить общую выручку"""
        query = db.query(func.sum(Payment.amount)).filter(Payment.status == "completed")
        
        if course_id:
            query = query.filter(Payment.course_id == course_id)
        
        if start_date:
            query = query.filter(Payment.created_at >= start_date)
        
        if end_date:
            query = query.filter(Payment.created_at <= end_date)
        
        result = query.scalar()
        return float(result) if result else 0.0


class CRUDUserCourseAccess(CRUDBase[UserCourseAccess, UserCourseAccessCreate, UserCourseAccessUpdate]):
    def get_by_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[UserCourseAccess]:
        """Получить доступы пользователя к курсам"""
        return db.query(UserCourseAccess).filter(UserCourseAccess.user_id == user_id).order_by(UserCourseAccess.access_granted_at.desc()).offset(skip).limit(limit).all()

    def get_by_course(self, db: Session, *, course_id: int, skip: int = 0, limit: int = 100) -> List[UserCourseAccess]:
        """Получить доступы к курсу"""
        return db.query(UserCourseAccess).filter(UserCourseAccess.course_id == course_id).order_by(UserCourseAccess.access_granted_at.desc()).offset(skip).limit(limit).all()

    def get_active_access(self, db: Session, *, user_id: int, course_id: int) -> Optional[UserCourseAccess]:
        """Получить активный доступ пользователя к курсу"""
        return db.query(UserCourseAccess).filter(
            and_(
                UserCourseAccess.user_id == user_id,
                UserCourseAccess.course_id == course_id,
                UserCourseAccess.status == "active"
            )
        ).first()

    def check_access(self, db: Session, *, user_id: int, course_id: int) -> bool:
        """Проверить доступ пользователя к курсу"""
        access = self.get_active_access(db, user_id=user_id, course_id=course_id)
        if not access:
            return False
        
        # Проверяем срок действия
        if access.expires_at and access.expires_at < datetime.utcnow():
            access.status = "expired"
            db.add(access)
            db.commit()
            return False
        
        return True

    def update_last_accessed(self, db: Session, *, access_id: int) -> UserCourseAccess:
        """Обновить время последнего доступа"""
        access = self.get(db, id=access_id)
        if access:
            access.last_accessed_at = datetime.utcnow()
            db.add(access)
            db.commit()
            db.refresh(access)
        return access

    def revoke_access(self, db: Session, *, access_id: int) -> UserCourseAccess:
        """Отозвать доступ"""
        access = self.get(db, id=access_id)
        if access:
            access.status = "cancelled"
            db.add(access)
            db.commit()
            db.refresh(access)
        return access


payment_crud = CRUDPayment(Payment)
access_crud = CRUDUserCourseAccess(UserCourseAccess) 