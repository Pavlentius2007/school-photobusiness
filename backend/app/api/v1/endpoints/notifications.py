"""
API эндпоинты для управления уведомлениями
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.core.notifications import notification_manager, NotificationTemplate, NotificationType
from app.crud.notification import notification_crud
from app.schemas.notification import (
    Notification as NotificationSchema,
    NotificationCreate,
    NotificationUpdate,
    NotificationList
)
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=List[NotificationSchema])
async def get_notifications(
    skip: int = 0,
    limit: int = 100,
    is_read: Optional[bool] = None,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Получить уведомления пользователя"""
    filters = {"user_id": current_user.id}
    if is_read is not None:
        filters["is_read"] = is_read
    
    notifications = notification_crud.get_multi(
        db, skip=skip, limit=limit, filters=filters
    )
    return notifications


@router.get("/unread", response_model=List[NotificationSchema])
async def get_unread_notifications(
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Получить непрочитанные уведомления пользователя"""
    notifications = notification_crud.get_multi(
        db, filters={"user_id": current_user.id, "is_read": False}
    )
    return notifications


@router.get("/{notification_id}", response_model=NotificationSchema)
async def get_notification(
    notification_id: int,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Получить конкретное уведомление"""
    notification = notification_crud.get(db, id=notification_id)
    if not notification or notification.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Уведомление не найдено"
        )
    return notification


@router.put("/{notification_id}/read", response_model=NotificationSchema)
async def mark_as_read(
    notification_id: int,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Отметить уведомление как прочитанное"""
    notification = notification_crud.get(db, id=notification_id)
    if not notification or notification.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Уведомление не найдено"
        )
    
    notification_update = NotificationUpdate(is_read=True)
    notification = notification_crud.update(db, db_obj=notification, obj_in=notification_update)
    return notification


@router.put("/read-all", response_model=dict)
async def mark_all_as_read(
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Отметить все уведомления как прочитанные"""
    count = notification_crud.mark_all_as_read(db, user_id=current_user.id)
    return {"message": f"Отмечено {count} уведомлений как прочитанные"}


@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: int,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Удалить уведомление"""
    notification = notification_crud.get(db, id=notification_id)
    if not notification or notification.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Уведомление не найдено"
        )
    
    notification_crud.remove(db, id=notification_id)
    return {"message": "Уведомление удалено"}


@router.delete("/")
async def delete_all_notifications(
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db)
):
    """Удалить все уведомления пользователя"""
    count = notification_crud.delete_all_by_user(db, user_id=current_user.id)
    return {"message": f"Удалено {count} уведомлений"}


# Административные эндпоинты (только для админов)
@router.post("/send", response_model=dict)
async def send_notification(
    user_id: int,
    template: NotificationTemplate,
    notification_types: List[NotificationType] = [NotificationType.INTERNAL],
    data: Optional[dict] = None,
    priority: int = 1,
    current_user: User = Depends(deps.get_current_active_superuser),
    db: Session = Depends(deps.get_db)
):
    """Отправить уведомление пользователю (только для админов)"""
    # Проверяем, что пользователь существует
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    results = await notification_manager.send_notification(
        user_id=user_id,
        template=template,
        notification_types=notification_types,
        data=data,
        priority=priority
    )
    
    return {
        "message": "Уведомление отправлено",
        "results": results
    }


@router.post("/send-bulk", response_model=dict)
async def send_bulk_notification(
    user_ids: List[int],
    template: NotificationTemplate,
    notification_types: List[NotificationType] = [NotificationType.INTERNAL],
    data: Optional[dict] = None,
    priority: int = 1,
    current_user: User = Depends(deps.get_current_active_superuser),
    db: Session = Depends(deps.get_db)
):
    """Отправить уведомление нескольким пользователям (только для админов)"""
    # Проверяем, что все пользователи существуют
    users = db.query(User).filter(User.id.in_(user_ids)).all()
    if len(users) != len(user_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Некоторые пользователи не найдены"
        )
    
    results = await notification_manager.send_bulk_notification(
        user_ids=user_ids,
        template=template,
        notification_types=notification_types,
        data=data,
        priority=priority
    )
    
    return {
        "message": f"Уведомления отправлены {len(user_ids)} пользователям",
        "results": results
    }


@router.post("/announcement", response_model=dict)
async def send_system_announcement(
    title: str,
    content: str,
    user_ids: Optional[List[int]] = None,
    notification_types: List[NotificationType] = [NotificationType.INTERNAL],
    current_user: User = Depends(deps.get_current_active_superuser),
    db: Session = Depends(deps.get_db)
):
    """Отправить системное объявление (только для админов)"""
    if user_ids:
        # Проверяем, что все пользователи существуют
        users = db.query(User).filter(User.id.in_(user_ids)).all()
        if len(users) != len(user_ids):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Некоторые пользователи не найдены"
            )
    
    results = await notification_manager.send_system_announcement(
        title=title,
        content=content,
        user_ids=user_ids,
        notification_types=notification_types
    )
    
    return {
        "message": "Системное объявление отправлено",
        "results": results
    }


@router.get("/templates/list", response_model=dict)
async def get_notification_templates(
    current_user: User = Depends(deps.get_current_active_superuser)
):
    """Получить список доступных шаблонов уведомлений (только для админов)"""
    templates = {}
    for template in NotificationTemplate:
        template_data = notification_manager.templates.get(template)
        if template_data:
            templates[template.value] = {
                "subject": template_data["subject"],
                "description": f"Шаблон для {template.value}"
            }
    
    return {"templates": templates}


@router.get("/stats", response_model=dict)
async def get_notification_stats(
    current_user: User = Depends(deps.get_current_active_superuser),
    db: Session = Depends(deps.get_db)
):
    """Получить статистику уведомлений (только для админов)"""
    total_notifications = notification_crud.count(db)
    unread_notifications = notification_crud.count(db, filters={"is_read": False})
    
    # Статистика по типам
    type_stats = notification_crud.get_stats_by_type(db)
    
    return {
        "total_notifications": total_notifications,
        "unread_notifications": unread_notifications,
        "type_stats": type_stats
    } 