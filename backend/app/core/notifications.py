"""
Модуль для системы уведомлений
Поддерживает Email, Telegram и внутренние уведомления
"""

import asyncio
import logging
from typing import Optional, List, Dict, Any
from enum import Enum
from datetime import datetime

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiohttp
from pydantic import BaseModel

from app.core.config import settings
from app.models.user import User
from app.models.notification import Notification
from app.crud.notification import notification_crud
from app.core.database import get_db

logger = logging.getLogger(__name__)


class NotificationType(str, Enum):
    """Типы уведомлений"""
    EMAIL = "email"
    TELEGRAM = "telegram"
    INTERNAL = "internal"


class NotificationTemplate(str, Enum):
    """Шаблоны уведомлений"""
    WELCOME = "welcome"
    COURSE_ACCESS_GRANTED = "course_access_granted"
    LESSON_COMPLETED = "lesson_completed"
    ASSIGNMENT_SUBMITTED = "assignment_submitted"
    TEST_COMPLETED = "test_completed"
    PAYMENT_SUCCESS = "payment_success"
    PAYMENT_FAILED = "payment_failed"
    COURSE_REMINDER = "course_reminder"
    DEADLINE_REMINDER = "deadline_reminder"
    SYSTEM_ANNOUNCEMENT = "system_announcement"


class NotificationData(BaseModel):
    """Данные для уведомления"""
    user_id: int
    notification_type: NotificationType
    template: NotificationTemplate
    subject: str
    message: str
    data: Optional[Dict[str, Any]] = None
    priority: int = 1  # 1-5, где 5 - высший приоритет


class BaseNotificationProvider:
    """Базовый класс для провайдеров уведомлений"""
    
    async def send(self, notification_data: NotificationData) -> bool:
        """Отправить уведомление"""
        raise NotImplementedError


class EmailNotificationProvider(BaseNotificationProvider):
    """Провайдер для Email уведомлений"""
    
    def __init__(self):
        self.smtp_server = settings.SMTP_SERVER
        self.smtp_port = settings.SMTP_PORT
        self.smtp_username = settings.SMTP_USERNAME
        self.smtp_password = settings.SMTP_PASSWORD
        self.from_email = settings.FROM_EMAIL
    
    async def send(self, notification_data: NotificationData) -> bool:
        """Отправить Email уведомление"""
        try:
            # Получаем данные пользователя
            db = next(get_db())
            user = db.query(User).filter(User.id == notification_data.user_id).first()
            if not user or not user.email:
                logger.warning(f"User {notification_data.user_id} not found or has no email")
                return False
            
            # Создаем сообщение
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = user.email
            msg['Subject'] = notification_data.subject
            
            # Форматируем сообщение с данными пользователя
            formatted_message = self._format_message(
                notification_data.message, 
                user, 
                notification_data.data
            )
            
            msg.attach(MIMEText(formatted_message, 'html'))
            
            # Отправляем через SMTP
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Email sent to {user.email}: {notification_data.subject}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to user {notification_data.user_id}: {e}")
            return False
    
    def _format_message(self, template: str, user: User, data: Optional[Dict[str, Any]] = None) -> str:
        """Форматировать сообщение с данными пользователя"""
        # Простая замена переменных в шаблоне
        message = template
        message = message.replace("{user_name}", user.full_name or user.username)
        message = message.replace("{user_email}", user.email)
        
        if data:
            for key, value in data.items():
                message = message.replace(f"{{{key}}}", str(value))
        
        return message


class TelegramNotificationProvider(BaseNotificationProvider):
    """Провайдер для Telegram уведомлений"""
    
    def __init__(self):
        self.bot_token = settings.TELEGRAM_BOT_TOKEN
        self.api_url = f"https://api.telegram.org/bot{self.bot_token}"
    
    async def send(self, notification_data: NotificationData) -> bool:
        """Отправить Telegram уведомление"""
        try:
            # Получаем данные пользователя
            db = next(get_db())
            user = db.query(User).filter(User.id == notification_data.user_id).first()
            if not user or not user.telegram_chat_id:
                logger.warning(f"User {notification_data.user_id} not found or has no telegram_chat_id")
                return False
            
            # Форматируем сообщение
            formatted_message = self._format_message(
                notification_data.message, 
                user, 
                notification_data.data
            )
            
            # Отправляем через Telegram API
            async with aiohttp.ClientSession() as session:
                payload = {
                    'chat_id': user.telegram_chat_id,
                    'text': formatted_message,
                    'parse_mode': 'HTML'
                }
                
                async with session.post(f"{self.api_url}/sendMessage", json=payload) as response:
                    if response.status == 200:
                        logger.info(f"Telegram message sent to user {notification_data.user_id}")
                        return True
                    else:
                        logger.error(f"Telegram API error: {response.status}")
                        return False
                        
        except Exception as e:
            logger.error(f"Failed to send Telegram message to user {notification_data.user_id}: {e}")
            return False
    
    def _format_message(self, template: str, user: User, data: Optional[Dict[str, Any]] = None) -> str:
        """Форматировать сообщение для Telegram"""
        message = template
        message = message.replace("{user_name}", user.full_name or user.username)
        
        if data:
            for key, value in data.items():
                message = message.replace(f"{{{key}}}", str(value))
        
        return message


class InternalNotificationProvider(BaseNotificationProvider):
    """Провайдер для внутренних уведомлений"""
    
    async def send(self, notification_data: NotificationData) -> bool:
        """Создать внутреннее уведомление"""
        try:
            db = next(get_db())
            
            # Создаем запись в базе данных
            notification = Notification(
                user_id=notification_data.user_id,
                title=notification_data.subject,
                message=notification_data.message,
                notification_type=notification_data.notification_type.value,
                data=notification_data.data,
                priority=notification_data.priority,
                is_read=False,
                created_at=datetime.utcnow()
            )
            
            db.add(notification)
            db.commit()
            db.refresh(notification)
            
            logger.info(f"Internal notification created for user {notification_data.user_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to create internal notification for user {notification_data.user_id}: {e}")
            return False


class NotificationManager:
    """Менеджер уведомлений"""
    
    def __init__(self):
        self.providers = {
            NotificationType.EMAIL: EmailNotificationProvider(),
            NotificationType.TELEGRAM: TelegramNotificationProvider(),
            NotificationType.INTERNAL: InternalNotificationProvider()
        }
        
        # Шаблоны уведомлений
        self.templates = {
            NotificationTemplate.WELCOME: {
                "subject": "Добро пожаловать на платформу обучения!",
                "message": """
                <h2>Добро пожаловать, {user_name}!</h2>
                <p>Мы рады приветствовать вас на нашей образовательной платформе.</p>
                <p>Теперь вы можете:</p>
                <ul>
                    <li>Просматривать доступные курсы</li>
                    <li>Изучать материалы в удобном темпе</li>
                    <li>Выполнять задания и тесты</li>
                    <li>Отслеживать свой прогресс</li>
                </ul>
                <p>Удачного обучения!</p>
                """
            },
            NotificationTemplate.COURSE_ACCESS_GRANTED: {
                "subject": "Доступ к курсу открыт",
                "message": """
                <h2>Поздравляем, {user_name}!</h2>
                <p>Вам открыт доступ к курсу "{course_name}".</p>
                <p>Начните обучение прямо сейчас!</p>
                """
            },
            NotificationTemplate.LESSON_COMPLETED: {
                "subject": "Урок завершен",
                "message": """
                <h2>Отлично, {user_name}!</h2>
                <p>Вы успешно завершили урок "{lesson_name}" в курсе "{course_name}".</p>
                <p>Продолжайте в том же духе!</p>
                """
            },
            NotificationTemplate.ASSIGNMENT_SUBMITTED: {
                "subject": "Задание отправлено",
                "message": """
                <h2>Задание отправлено</h2>
                <p>Ваше задание "{assignment_name}" успешно отправлено.</p>
                <p>Ожидайте проверки от преподавателя.</p>
                """
            },
            NotificationTemplate.TEST_COMPLETED: {
                "subject": "Тест завершен",
                "message": """
                <h2>Тест завершен</h2>
                <p>Вы завершили тест "{test_name}" с результатом {score}%.</p>
                <p>Результат: {result_text}</p>
                """
            },
            NotificationTemplate.PAYMENT_SUCCESS: {
                "subject": "Оплата прошла успешно",
                "message": """
                <h2>Оплата успешна!</h2>
                <p>Ваш платеж на сумму {amount} руб. прошел успешно.</p>
                <p>Доступ к курсу "{course_name}" открыт.</p>
                """
            },
            NotificationTemplate.PAYMENT_FAILED: {
                "subject": "Ошибка оплаты",
                "message": """
                <h2>Ошибка оплаты</h2>
                <p>К сожалению, ваш платеж не прошел.</p>
                <p>Попробуйте еще раз или обратитесь в поддержку.</p>
                """
            },
            NotificationTemplate.COURSE_REMINDER: {
                "subject": "Напоминание о курсе",
                "message": """
                <h2>Напоминание</h2>
                <p>Не забудьте продолжить обучение в курсе "{course_name}".</p>
                <p>Последний урок: "{last_lesson}"</p>
                """
            },
            NotificationTemplate.DEADLINE_REMINDER: {
                "subject": "Напоминание о дедлайне",
                "message": """
                <h2>Дедлайн приближается</h2>
                <p>Напоминаем о дедлайне для задания "{assignment_name}".</p>
                <p>Осталось времени: {time_left}</p>
                """
            },
            NotificationTemplate.SYSTEM_ANNOUNCEMENT: {
                "subject": "Системное объявление",
                "message": """
                <h2>{announcement_title}</h2>
                <p>{announcement_content}</p>
                """
            }
        }
    
    async def send_notification(
        self,
        user_id: int,
        template: NotificationTemplate,
        notification_types: List[NotificationType] = None,
        data: Optional[Dict[str, Any]] = None,
        priority: int = 1
    ) -> Dict[NotificationType, bool]:
        """Отправить уведомление пользователю"""
        
        if notification_types is None:
            notification_types = [NotificationType.INTERNAL]
        
        # Получаем шаблон
        template_data = self.templates.get(template)
        if not template_data:
            logger.error(f"Template {template} not found")
            return {}
        
        # Форматируем сообщение
        subject = template_data["subject"]
        message = template_data["message"]
        
        if data:
            for key, value in data.items():
                subject = subject.replace(f"{{{key}}}", str(value))
                message = message.replace(f"{{{key}}}", str(value))
        
        # Создаем данные уведомления
        notification_data = NotificationData(
            user_id=user_id,
            notification_type=NotificationType.INTERNAL,  # Будет переопределено для каждого провайдера
            template=template,
            subject=subject,
            message=message,
            data=data,
            priority=priority
        )
        
        # Отправляем через все указанные провайдеры
        results = {}
        for notification_type in notification_types:
            provider = self.providers.get(notification_type)
            if provider:
                notification_data.notification_type = notification_type
                results[notification_type] = await provider.send(notification_data)
            else:
                logger.warning(f"Provider for {notification_type} not found")
                results[notification_type] = False
        
        return results
    
    async def send_bulk_notification(
        self,
        user_ids: List[int],
        template: NotificationTemplate,
        notification_types: List[NotificationType] = None,
        data: Optional[Dict[str, Any]] = None,
        priority: int = 1
    ) -> Dict[int, Dict[NotificationType, bool]]:
        """Отправить уведомление нескольким пользователям"""
        
        results = {}
        tasks = []
        
        for user_id in user_ids:
            task = self.send_notification(
                user_id=user_id,
                template=template,
                notification_types=notification_types,
                data=data,
                priority=priority
            )
            tasks.append((user_id, task))
        
        # Выполняем все задачи асинхронно
        for user_id, task in tasks:
            results[user_id] = await task
        
        return results
    
    async def send_system_announcement(
        self,
        title: str,
        content: str,
        user_ids: Optional[List[int]] = None,
        notification_types: List[NotificationType] = None
    ) -> Dict[int, Dict[NotificationType, bool]]:
        """Отправить системное объявление"""
        
        data = {
            "announcement_title": title,
            "announcement_content": content
        }
        
        # Если user_ids не указан, отправляем всем активным пользователям
        if user_ids is None:
            db = next(get_db())
            users = db.query(User).filter(User.is_active == True).all()
            user_ids = [user.id for user in users]
        
        return await self.send_bulk_notification(
            user_ids=user_ids,
            template=NotificationTemplate.SYSTEM_ANNOUNCEMENT,
            notification_types=notification_types,
            data=data,
            priority=5  # Высокий приоритет для системных объявлений
        )


# Глобальный экземпляр менеджера уведомлений
notification_manager = NotificationManager() 