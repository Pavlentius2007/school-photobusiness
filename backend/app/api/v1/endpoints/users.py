from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import user_crud
from app.schemas.user import User, UserCreate, UserUpdate
from app.models.user import UserRole

router = APIRouter()


@router.get("/", response_model=List[User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить список пользователей (только для администраторов).
    """
    users = user_crud.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: UserCreate,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Создать нового пользователя (только для администраторов).
    """
    user = user_crud.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким email уже существует в системе.",
        )
    user = user_crud.get_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким username уже существует в системе.",
        )
    user = user_crud.create(db, obj_in=user_in)
    return user


@router.put("/me", response_model=User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = None,
    first_name: str = None,
    last_name: str = None,
    bio: str = None,
    phone: str = None,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Обновить собственный профиль.
    """
    current_user_data = UserUpdate(
        password=password,
        first_name=first_name,
        last_name=last_name,
        bio=bio,
        phone=phone
    )
    user = user_crud.update(db, db_obj=current_user, obj_in=current_user_data)
    return user


@router.get("/me", response_model=User)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить текущего пользователя.
    """
    return current_user


@router.get("/{user_id}", response_model=User)
def read_user_by_id(
    user_id: int,
    current_user: User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Получить пользователя по ID.
    """
    user = user_crud.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден",
        )
    if user == current_user:
        return user
    if not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для доступа к информации о пользователе",
        )
    return user


@router.put("/{user_id}", response_model=User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: UserUpdate,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Обновить пользователя (только для администраторов).
    """
    user = user_crud.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден",
        )
    user = user_crud.update(db, db_obj=user, obj_in=user_in)
    return user


@router.delete("/{user_id}")
def delete_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Удалить пользователя (только для администраторов).
    """
    user = user_crud.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден",
        )
    if user == current_user:
        raise HTTPException(
            status_code=400,
            detail="Нельзя удалить самого себя",
        )
    user_crud.remove(db, id=user_id)
    return {"message": "Пользователь успешно удален"}


@router.get("/students/", response_model=List[User])
def read_students(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить список студентов (для кураторов и администраторов).
    """
    students = user_crud.get_students(db, skip=skip, limit=limit)
    return students


@router.get("/curators/", response_model=List[User])
def read_curators(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_admin_user),
) -> Any:
    """
    Получить список кураторов (только для администраторов).
    """
    curators = user_crud.get_curators(db, skip=skip, limit=limit)
    return curators 