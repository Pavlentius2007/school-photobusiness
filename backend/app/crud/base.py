from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD объект с методами по умолчанию для Create, Read, Update, Delete (CRUD).
        
        **Параметры**
        * `model`: SQLAlchemy модель класса
        * `schema`: Pydantic модель (схема) класса
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        """Получить объект по ID"""
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        """Получить список объектов с пагинацией"""
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        """Создать новый объект"""
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        """Обновить объект"""
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> ModelType:
        """Удалить объект"""
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj

    def count(self, db: Session) -> int:
        """Подсчитать количество объектов"""
        return db.query(self.model).count()

    def exists(self, db: Session, id: int) -> bool:
        """Проверить существование объекта"""
        return db.query(self.model).filter(self.model.id == id).first() is not None

    def get_by_field(self, db: Session, field: str, value: Any) -> Optional[ModelType]:
        """Получить объект по произвольному полю"""
        return db.query(self.model).filter(getattr(self.model, field) == value).first()

    def get_multi_by_field(
        self, db: Session, field: str, value: Any, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        """Получить список объектов по произвольному полю"""
        return (
            db.query(self.model)
            .filter(getattr(self.model, field) == value)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def search(
        self, db: Session, search_term: str, fields: List[str], skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        """Поиск по нескольким полям"""
        conditions = []
        for field in fields:
            if hasattr(self.model, field):
                conditions.append(getattr(self.model, field).ilike(f"%{search_term}%"))
        
        if conditions:
            return (
                db.query(self.model)
                .filter(or_(*conditions))
                .offset(skip)
                .limit(limit)
                .all()
            )
        return [] 