from typing import Optional, Dict, Any
from decimal import Decimal
from pydantic import BaseModel, validator

from app.core.payments import PaymentProvider


class PaymentCreateRequest(BaseModel):
    """Схема для создания платежа"""
    amount: Decimal
    currency: str = "RUB"
    description: str
    course_id: int
    payment_provider: PaymentProvider
    return_url: str
    installment_months: Optional[int] = None
    
    @validator('amount')
    def validate_amount(cls, v):
        if v <= 0:
            raise ValueError('Сумма должна быть больше нуля')
        return v
    
    @validator('currency')
    def validate_currency(cls, v):
        if v.upper() not in ['RUB', 'USD', 'EUR']:
            raise ValueError('Неподдерживаемая валюта')
        return v.upper()
    
    @validator('installment_months')
    def validate_installment_months(cls, v):
        if v is not None and (v < 3 or v > 24):
            raise ValueError('Рассрочка должна быть от 3 до 24 месяцев')
        return v


class PaymentResponse(BaseModel):
    """Схема ответа при создании платежа"""
    payment_id: str
    status: str
    confirmation_url: str
    amount: str
    currency: str
    provider: str
    order_id: str


class PaymentStatusRequest(BaseModel):
    """Схема для проверки статуса платежа"""
    payment_id: str
    provider: PaymentProvider


class PaymentStatusResponse(BaseModel):
    """Схема ответа при проверке статуса платежа"""
    payment_id: str
    status: str
    amount: Optional[str] = None
    currency: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class WebhookData(BaseModel):
    """Схема данных webhook"""
    provider: PaymentProvider
    data: Dict[str, Any]
    signature: str


class InstallmentOptions(BaseModel):
    """Схема для опций рассрочки"""
    available: bool
    min_amount: Optional[Decimal] = None
    max_amount: Optional[Decimal] = None
    min_months: int = 3
    max_months: int = 24
    interest_rate: Optional[Decimal] = None
    monthly_payment: Optional[Decimal] = None


class PaymentProviderInfo(BaseModel):
    """Схема информации о платежном провайдере"""
    provider: PaymentProvider
    name: str
    description: str
    supports_installment: bool
    min_amount: Optional[Decimal] = None
    max_amount: Optional[Decimal] = None
    supported_currencies: list[str]
    logo_url: Optional[str] = None


class PaymentError(BaseModel):
    """Схема ошибки платежа"""
    error_code: str
    error_message: str
    provider: Optional[str] = None
    payment_id: Optional[str] = None 