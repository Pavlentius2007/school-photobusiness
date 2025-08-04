from typing import Optional
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel

from app.models.payment import PaymentStatus, PaymentMethod, AccessStatus


class PaymentBase(BaseModel):
    amount: Optional[Decimal] = None
    currency: Optional[str] = "RUB"
    status: Optional[PaymentStatus] = PaymentStatus.PENDING
    payment_method: Optional[PaymentMethod] = None
    external_payment_id: Optional[str] = None
    description: Optional[str] = None
    receipt_url: Optional[str] = None
    error_message: Optional[str] = None


class PaymentCreate(PaymentBase):
    amount: Decimal
    payment_method: PaymentMethod
    user_id: int
    course_id: int


class PaymentUpdate(PaymentBase):
    pass


class PaymentInDBBase(PaymentBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    course_id: Optional[int] = None
    processed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Payment(PaymentInDBBase):
    pass


class UserCourseAccessBase(BaseModel):
    status: Optional[AccessStatus] = AccessStatus.ACTIVE
    expires_at: Optional[datetime] = None


class UserCourseAccessCreate(UserCourseAccessBase):
    user_id: int
    course_id: int
    payment_id: int


class UserCourseAccessUpdate(UserCourseAccessBase):
    pass


class UserCourseAccessInDBBase(UserCourseAccessBase):
    id: Optional[int] = None
    user_id: Optional[int] = None
    course_id: Optional[int] = None
    payment_id: Optional[int] = None
    access_granted_at: Optional[datetime] = None
    last_accessed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserCourseAccess(UserCourseAccessInDBBase):
    pass 