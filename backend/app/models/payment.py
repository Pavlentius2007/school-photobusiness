from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, Enum, Float, Numeric
from sqlalchemy.orm import relationship
import enum

from .base import Base, BaseModel

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class PaymentMethod(str, enum.Enum):
    YUKASSA = "yukassa"
    CLOUDPAYMENTS = "cloudpayments"
    STRIPE = "stripe"
    PAYPAL = "paypal"
    BANK_TRANSFER = "bank_transfer"

class AccessStatus(str, enum.Enum):
    ACTIVE = "active"
    EXPIRED = "expired"
    SUSPENDED = "suspended"
    CANCELLED = "cancelled"

class Payment(Base, BaseModel):
    __tablename__ = "payments"
    
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), default="RUB", nullable=False)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)
    payment_method = Column(Enum(PaymentMethod), nullable=False)
    external_payment_id = Column(String(255), nullable=True)  # ID платежа в платежной системе
    description = Column(Text, nullable=True)
    receipt_url = Column(String(500), nullable=True)
    error_message = Column(Text, nullable=True)
    processed_at = Column(DateTime, nullable=True)
    
    # Внешние ключи
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    
    # Отношения
    user = relationship("User", foreign_keys=[user_id])
    course = relationship("Course")
    access = relationship("UserCourseAccess", back_populates="payment", uselist=False)

class UserCourseAccess(Base, BaseModel):
    __tablename__ = "user_course_access"
    
    access_granted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=True)  # null = бессрочный доступ
    status = Column(Enum(AccessStatus), default=AccessStatus.ACTIVE, nullable=False)
    last_accessed_at = Column(DateTime, nullable=True)
    
    # Внешние ключи
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    payment_id = Column(Integer, ForeignKey("payments.id"), nullable=False)
    
    # Отношения
    user = relationship("User", foreign_keys=[user_id])
    course = relationship("Course")
    payment = relationship("Payment", back_populates="access") 