from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
import uuid

from app.api import deps
from app.crud import payment_crud, access_crud, user_crud, course_crud
from app.schemas.payment import Payment, PaymentCreate, PaymentUpdate, UserCourseAccess, UserCourseAccessCreate, UserCourseAccessUpdate
from app.schemas.payment_request import (
    PaymentCreateRequest, PaymentResponse, PaymentStatusRequest, 
    PaymentStatusResponse, WebhookData, InstallmentOptions, 
    PaymentProviderInfo, PaymentError
)
from app.models.user import User
from app.models.payment import PaymentMethod, PaymentStatus
from app.core.payments import payment_manager, PaymentProvider, PaymentError as PaymentSystemError
from app.core.notifications import notification_manager, NotificationTemplate, NotificationType

router = APIRouter()


# ==================== ПЛАТЕЖИ ====================

@router.get("/", response_model=List[Payment])
def read_payments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить список платежей (только для администраторов).
    """
    payments = payment_crud.get_multi(db, skip=skip, limit=limit)
    return payments


@router.get("/my", response_model=List[Payment])
def read_my_payments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить платежи текущего пользователя.
    """
    payments = payment_crud.get_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
    return payments


@router.post("/", response_model=Payment)
def create_payment(
    *,
    db: Session = Depends(deps.get_db),
    payment_in: PaymentCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Создать новый платеж.
    """
    payment_in.user_id = current_user.id
    payment = payment_crud.create(db, obj_in=payment_in)
    return payment


@router.get("/{payment_id}", response_model=Payment)
def read_payment(
    *,
    db: Session = Depends(deps.get_db),
    payment_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить платеж по ID.
    """
    payment = payment_crud.get(db, id=payment_id)
    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Платеж не найден",
        )
    
    # Пользователь может видеть только свои платежи
    if payment.user_id != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    
    return payment


@router.put("/{payment_id}", response_model=Payment)
def update_payment(
    *,
    db: Session = Depends(deps.get_db),
    payment_id: int,
    payment_in: PaymentUpdate,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Обновить платеж (только для администраторов).
    """
    payment = payment_crud.get(db, id=payment_id)
    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Платеж не найден",
        )
    payment = payment_crud.update(db, db_obj=payment, obj_in=payment_in)
    return payment


@router.get("/course/{course_id}", response_model=List[Payment])
def read_course_payments(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить платежи за курс (только для администраторов).
    """
    payments = payment_crud.get_by_course(db, course_id=course_id, skip=skip, limit=limit)
    return payments


@router.get("/status/{status}", response_model=List[Payment])
def read_payments_by_status(
    *,
    db: Session = Depends(deps.get_db),
    status: str,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить платежи по статусу (только для администраторов).
    """
    payments = payment_crud.get_by_status(db, status=status, skip=skip, limit=limit)
    return payments


@router.put("/{payment_id}/status", response_model=Payment)
def update_payment_status(
    *,
    db: Session = Depends(deps.get_db),
    payment_id: int,
    status: str,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Обновить статус платежа (только для администраторов).
    """
    payment = payment_crud.update_status(db, payment_id=payment_id, status=status)
    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Платеж не найден",
        )
    return payment


@router.get("/revenue/total", response_model=dict)
def get_total_revenue(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int = None,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить общую выручку (только для администраторов).
    """
    revenue = payment_crud.get_total_revenue(db, course_id=course_id)
    return {"total_revenue": revenue}


# ==================== ДОСТУПЫ К КУРСАМ ====================

@router.get("/access/", response_model=List[UserCourseAccess])
def read_course_accesses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить список доступов к курсам (только для администраторов).
    """
    accesses = access_crud.get_multi(db, skip=skip, limit=limit)
    return accesses


@router.get("/access/my", response_model=List[UserCourseAccess])
def read_my_course_accesses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить доступы текущего пользователя к курсам.
    """
    accesses = access_crud.get_by_user(db, user_id=current_user.id, skip=skip, limit=limit)
    return accesses


@router.post("/access/", response_model=UserCourseAccess)
def create_course_access(
    *,
    db: Session = Depends(deps.get_db),
    access_in: UserCourseAccessCreate,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Создать доступ к курсу (только для администраторов).
    """
    access = access_crud.create(db, obj_in=access_in)
    return access


@router.get("/access/{access_id}", response_model=UserCourseAccess)
def read_course_access(
    *,
    db: Session = Depends(deps.get_db),
    access_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить доступ к курсу по ID.
    """
    access = access_crud.get(db, id=access_id)
    if not access:
        raise HTTPException(
            status_code=404,
            detail="Доступ не найден",
        )
    
    # Пользователь может видеть только свои доступы
    if access.user_id != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    
    return access


@router.put("/access/{access_id}", response_model=UserCourseAccess)
def update_course_access(
    *,
    db: Session = Depends(deps.get_db),
    access_id: int,
    access_in: UserCourseAccessUpdate,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Обновить доступ к курсу (только для администраторов).
    """
    access = access_crud.get(db, id=access_id)
    if not access:
        raise HTTPException(
            status_code=404,
            detail="Доступ не найден",
        )
    access = access_crud.update(db, db_obj=access, obj_in=access_in)
    return access


@router.get("/access/course/{course_id}", response_model=List[UserCourseAccess])
def read_course_accesses_by_course(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить доступы к курсу (только для администраторов).
    """
    accesses = access_crud.get_by_course(db, course_id=course_id, skip=skip, limit=limit)
    return accesses


@router.get("/access/check/{course_id}", response_model=dict)
def check_course_access(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Проверить доступ пользователя к курсу.
    """
    has_access = access_crud.check_access(db, user_id=current_user.id, course_id=course_id)
    return {"has_access": has_access}


@router.put("/access/{access_id}/revoke", response_model=UserCourseAccess)
def revoke_course_access(
    *,
    db: Session = Depends(deps.get_db),
    access_id: int,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Отозвать доступ к курсу (только для администраторов).
    """
    access = access_crud.revoke_access(db, access_id=access_id)
    if not access:
        raise HTTPException(
            status_code=404,
            detail="Доступ не найден",
        )
    return access


            @router.post("/create", response_model=PaymentResponse)
            def create_payment(
                *,
                db: Session = Depends(deps.get_db),
                payment_request: PaymentCreateRequest,
                current_user: User = Depends(deps.get_current_active_user),
            ) -> Any:
                """
                Создать платеж через выбранную платежную систему.
                """
                # Проверяем существование курса
                course = course_crud.get(db, id=payment_request.course_id)
                if not course:
                    raise HTTPException(
                        status_code=404,
                        detail="Курс не найден",
                    )

                # Проверяем, не купил ли уже пользователь этот курс
                existing_access = access_crud.get_active_access(db, user_id=current_user.id, course_id=payment_request.course_id)
                if existing_access:
                    raise HTTPException(
                        status_code=400,
                        detail="У вас уже есть доступ к этому курсу",
                    )

                try:
                    # Генерируем уникальный ID заказа
                    order_id = str(uuid.uuid4())
                    
                    # Создаем платеж через платежную систему
                    payment_result = payment_manager.create_payment(
                        provider=payment_request.payment_provider,
                        amount=payment_request.amount,
                        currency=payment_request.currency,
                        description=payment_request.description,
                        order_id=order_id,
                        return_url=payment_request.return_url,
                        installment_months=payment_request.installment_months
                    )

                    # Сохраняем платеж в базе данных
                    payment_in = PaymentCreate(
                        amount=payment_request.amount,
                        payment_method=PaymentMethod(payment_request.payment_provider.value),
                        user_id=current_user.id,
                        course_id=payment_request.course_id,
                        description=payment_request.description,
                        external_payment_id=payment_result["payment_id"],
                        status=PaymentStatus.PENDING
                    )
                    payment = payment_crud.create(db, obj_in=payment_in)

                    return PaymentResponse(
                        payment_id=payment_result["payment_id"],
                        status=payment_result["status"],
                        confirmation_url=payment_result["confirmation_url"],
                        amount=payment_result["amount"],
                        currency=payment_result["currency"],
                        provider=payment_request.payment_provider.value,
                        order_id=order_id
                    )

                except PaymentSystemError as e:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Ошибка платежной системы: {str(e)}",
                    )


            @router.post("/status", response_model=PaymentStatusResponse)
            def check_payment_status(
                *,
                db: Session = Depends(deps.get_db),
                status_request: PaymentStatusRequest,
                current_user: User = Depends(deps.get_current_active_user),
            ) -> Any:
                """
                Проверить статус платежа.
                """
                try:
                    # Проверяем статус через платежную систему
                    status = payment_manager.check_payment_status(
                        provider=status_request.provider,
                        payment_id=status_request.payment_id
                    )

                    # Обновляем статус в базе данных
                    payment = payment_crud.get_by_external_id(db, external_payment_id=status_request.payment_id)
                    if payment:
                        payment_crud.update_status(db, payment_id=payment.id, status=status.value)

                        # Если платеж успешен, создаем доступ к курсу
                        if status.value == PaymentStatus.COMPLETED:
                            existing_access = access_crud.get_active_access(
                                db, user_id=payment.user_id, course_id=payment.course_id
                            )
                            if not existing_access:
                                access_in = UserCourseAccessCreate(
                                    user_id=payment.user_id,
                                    course_id=payment.course_id,
                                    payment_id=payment.id
                                )
                                access_crud.create(db, obj_in=access_in)

                    return PaymentStatusResponse(
                        payment_id=status_request.payment_id,
                        status=status.value
                    )

                except PaymentSystemError as e:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Ошибка проверки статуса: {str(e)}",
                    )


            @router.post("/webhook/{provider}")
            def process_webhook(
                *,
                provider: str,
                request: Request,
                db: Session = Depends(deps.get_db),
            ) -> Any:
                """
                Обработка webhook от платежной системы.
                """
                try:
                    # Получаем данные webhook
                    body = await request.body()
                    data = await request.json()
                    
                    # Получаем подпись из заголовков
                    signature = request.headers.get("X-YooKassa-Signature") or request.headers.get("X-Sberbank-Signature", "")
                    
                    # Определяем провайдера
                    payment_provider = PaymentProvider(provider)
                    
                    # Обрабатываем webhook
                    webhook_result = payment_manager.process_webhook(
                        provider=payment_provider,
                        data=data,
                        signature=signature
                    )
                    
                    # Обновляем статус платежа в базе данных
                    payment = payment_crud.get_by_external_id(db, external_payment_id=webhook_result["payment_id"])
                    if payment:
                        payment_crud.update_status(db, payment_id=payment.id, status=webhook_result["status"].value)
                        
                        # Если платеж успешен, создаем доступ к курсу
                        if webhook_result["status"].value == PaymentStatus.COMPLETED:
                            existing_access = access_crud.get_active_access(
                                db, user_id=payment.user_id, course_id=payment.course_id
                            )
                            if not existing_access:
                                access_in = UserCourseAccessCreate(
                                    user_id=payment.user_id,
                                    course_id=payment.course_id,
                                    payment_id=payment.id
                                )
                                access_crud.create(db, obj_in=access_in)
                                
                                # Отправляем уведомление об успешной оплате
                                course = course_crud.get(db, id=payment.course_id)
                                if course:
                                    await notification_manager.send_notification(
                                        user_id=payment.user_id,
                                        template=NotificationTemplate.PAYMENT_SUCCESS,
                                        notification_types=[NotificationType.INTERNAL, NotificationType.EMAIL],
                                        data={
                                            "amount": payment.amount,
                                            "course_name": course.title
                                        },
                                        priority=3
                                    )
                        elif webhook_result["status"].value == PaymentStatus.FAILED:
                            # Отправляем уведомление о неудачной оплате
                            await notification_manager.send_notification(
                                user_id=payment.user_id,
                                template=NotificationTemplate.PAYMENT_FAILED,
                                notification_types=[NotificationType.INTERNAL, NotificationType.EMAIL],
                                priority=2
                            )
                    
                    return {"status": "success"}
                    
                except Exception as e:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Ошибка обработки webhook: {str(e)}",
                    )


            @router.get("/providers", response_model=List[PaymentProviderInfo])
            def get_available_providers(
                db: Session = Depends(deps.get_db),
            ) -> Any:
                """
                Получить список доступных платежных провайдеров.
                """
                providers = []
                
                for provider in payment_manager.get_available_providers():
                    if provider == PaymentProvider.YUKASSA:
                        providers.append(PaymentProviderInfo(
                            provider=provider,
                            name="ЮKassa",
                            description="Быстрые и безопасные платежи",
                            supports_installment=False,
                            min_amount=None,
                            max_amount=None,
                            supported_currencies=["RUB", "USD", "EUR"],
                            logo_url="/static/images/yukassa-logo.png"
                        ))
                    elif provider == PaymentProvider.SBERBANK:
                        providers.append(PaymentProviderInfo(
                            provider=provider,
                            name="Сбербанк",
                            description="Платежи и рассрочка",
                            supports_installment=True,
                            min_amount=Decimal("3000"),
                            max_amount=Decimal("300000"),
                            supported_currencies=["RUB"],
                            logo_url="/static/images/sberbank-logo.png"
                        ))
                
                return providers


            @router.get("/installment-options/{course_id}", response_model=InstallmentOptions)
            def get_installment_options(
                *,
                db: Session = Depends(deps.get_db),
                course_id: int,
            ) -> Any:
                """
                Получить опции рассрочки для курса.
                """
                course = course_crud.get(db, id=course_id)
                if not course:
                    raise HTTPException(
                        status_code=404,
                        detail="Курс не найден",
                    )
                
                # Проверяем, доступна ли рассрочка через Сбербанк
                sberbank_provider = payment_manager.get_provider(PaymentProvider.SBERBANK)
                if not sberbank_provider:
                    return InstallmentOptions(available=False)
                
                # Проверяем сумму курса
                course_price = Decimal(str(course.price))
                min_amount = Decimal("3000")
                max_amount = Decimal("300000")
                
                if course_price < min_amount or course_price > max_amount:
                    return InstallmentOptions(available=False)
                
                # Рассчитываем ежемесячный платеж (примерно)
                monthly_payment = course_price / 12  # 12 месяцев
                
                return InstallmentOptions(
                    available=True,
                    min_amount=min_amount,
                    max_amount=max_amount,
                    min_months=3,
                    max_months=24,
                    interest_rate=Decimal("0"),  # 0% для рассрочки
                    monthly_payment=monthly_payment
                )


            @router.post("/purchase/{course_id}", response_model=Payment)
            def purchase_course(
                *,
                db: Session = Depends(deps.get_db),
                course_id: int,
                payment_method: str,
                current_user: User = Depends(deps.get_current_active_user),
            ) -> Any:
                """
                Покупка курса (создание платежа и доступа).
                """
                # Здесь должна быть логика интеграции с платежными системами
                # Пока создаем тестовый платеж

                from app.crud import course_crud
                from app.models.payment import PaymentMethod, PaymentStatus
                from decimal import Decimal

                course = course_crud.get(db, id=course_id)
                if not course:
                    raise HTTPException(
                        status_code=404,
                        detail="Курс не найден",
                    )

                # Проверяем, не купил ли уже пользователь этот курс
                existing_access = access_crud.get_active_access(db, user_id=current_user.id, course_id=course_id)
                if existing_access:
                    raise HTTPException(
                        status_code=400,
                        detail="У вас уже есть доступ к этому курсу",
                    )

                # Создаем платеж
                payment_in = PaymentCreate(
                    amount=Decimal(str(course.price)),
                    payment_method=PaymentMethod(payment_method),
                    user_id=current_user.id,
                    course_id=course_id,
                    description=f"Покупка курса: {course.title}"
                )
                payment = payment_crud.create(db, obj_in=payment_in)

                # В реальном приложении здесь должна быть интеграция с платежной системой
                # Пока автоматически помечаем как успешный
                payment = payment_crud.update_status(db, payment_id=payment.id, status=PaymentStatus.COMPLETED)

                # Создаем доступ к курсу
                access_in = UserCourseAccessCreate(
                    user_id=current_user.id,
                    course_id=course_id,
                    payment_id=payment.id
                )
                access = access_crud.create(db, obj_in=access_in)

                return payment 