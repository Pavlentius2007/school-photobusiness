from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import course_crud, module_crud, lesson_crud
from app.core.notifications import notification_manager, NotificationTemplate, NotificationType
from app.schemas.course import Course, CourseCreate, CourseUpdate, Module, ModuleCreate, ModuleUpdate, Lesson, LessonCreate, LessonUpdate
from app.models.user import User

router = APIRouter()


# ==================== КУРСЫ ====================

@router.get("/", response_model=List[Course])
def read_courses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить список курсов.
    """
    courses = course_crud.get_published(db, skip=skip, limit=limit)
    return courses


@router.get("/featured", response_model=List[Course])
def read_featured_courses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Получить рекомендуемые курсы (публичный доступ).
    """
    courses = course_crud.get_featured(db, skip=skip, limit=limit)
    return courses


@router.get("/search", response_model=List[Course])
def search_courses(
    *,
    db: Session = Depends(deps.get_db),
    q: str,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Поиск курсов (публичный доступ).
    """
    courses = course_crud.search_courses(db, search_term=q, skip=skip, limit=limit)
    return courses


@router.post("/", response_model=Course)
def create_course(
    *,
    db: Session = Depends(deps.get_db),
    course_in: CourseCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новый курс (для кураторов и администраторов).
    """
    course = course_crud.get_by_slug(db, slug=course_in.slug)
    if course:
        raise HTTPException(
            status_code=400,
            detail="Курс с таким slug уже существует.",
        )
    course = course_crud.create(db, obj_in=course_in)
    return course


@router.get("/{course_id}", response_model=Course)
def read_course(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить курс по ID.
    """
    course = course_crud.get(db, id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    if course.status != "published" and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    return course


@router.put("/{course_id}", response_model=Course)
def update_course(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    course_in: CourseUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить курс (для кураторов и администраторов).
    """
    course = course_crud.get(db, id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого курса",
        )
    course = course_crud.update(db, db_obj=course, obj_in=course_in)
    return course


@router.delete("/{course_id}")
def delete_course(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить курс (для кураторов и администраторов).
    """
    course = course_crud.get(db, id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого курса",
        )
    course_crud.remove(db, id=course_id)
    return {"message": "Курс успешно удален"}


@router.get("/my/", response_model=List[Course])
def read_my_courses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить курсы текущего куратора.
    """
    courses = course_crud.get_by_curator(db, curator_id=current_user.id, skip=skip, limit=limit)
    return courses


# ==================== МОДУЛИ ====================

@router.get("/{course_id}/modules", response_model=List[Module])
def read_modules(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить модули курса.
    """
    course = course_crud.get(db, id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    modules = module_crud.get_by_course(db, course_id=course_id, skip=skip, limit=limit)
    return modules


@router.post("/{course_id}/modules", response_model=Module)
def create_module(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    module_in: ModuleCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новый модуль (для кураторов и администраторов).
    """
    course = course_crud.get(db, id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для создания модуля в этом курсе",
        )
    module_in.course_id = course_id
    module = module_crud.create(db, obj_in=module_in)
    return module


@router.get("/modules/{module_id}", response_model=Module)
def read_module(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить модуль по ID.
    """
    module = module_crud.get(db, id=module_id)
    if not module:
        raise HTTPException(
            status_code=404,
            detail="Модуль не найден",
        )
    return module


@router.put("/modules/{module_id}", response_model=Module)
def update_module(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    module_in: ModuleUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить модуль (для кураторов и администраторов).
    """
    module = module_crud.get(db, id=module_id)
    if not module:
        raise HTTPException(
            status_code=404,
            detail="Модуль не найден",
        )
    course = course_crud.get(db, id=module.course_id)
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого модуля",
        )
    module = module_crud.update(db, db_obj=module, obj_in=module_in)
    return module


@router.delete("/modules/{module_id}")
def delete_module(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить модуль (для кураторов и администраторов).
    """
    module = module_crud.get(db, id=module_id)
    if not module:
        raise HTTPException(
            status_code=404,
            detail="Модуль не найден",
        )
    course = course_crud.get(db, id=module.course_id)
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого модуля",
        )
    module_crud.remove(db, id=module_id)
    return {"message": "Модуль успешно удален"}


# ==================== УРОКИ ====================

@router.get("/modules/{module_id}/lessons", response_model=List[Lesson])
def read_lessons(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить уроки модуля.
    """
    module = module_crud.get(db, id=module_id)
    if not module:
        raise HTTPException(
            status_code=404,
            detail="Модуль не найден",
        )
    lessons = lesson_crud.get_by_module(db, module_id=module_id, skip=skip, limit=limit)
    return lessons


@router.post("/modules/{module_id}/lessons", response_model=Lesson)
def create_lesson(
    *,
    db: Session = Depends(deps.get_db),
    module_id: int,
    lesson_in: LessonCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новый урок (для кураторов и администраторов).
    """
    module = module_crud.get(db, id=module_id)
    if not module:
        raise HTTPException(
            status_code=404,
            detail="Модуль не найден",
        )
    course = course_crud.get(db, id=module.course_id)
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для создания урока в этом модуле",
        )
    lesson_in.module_id = module_id
    lesson = lesson_crud.create(db, obj_in=lesson_in)
    return lesson


@router.get("/lessons/{lesson_id}", response_model=Lesson)
def read_lesson(
    *,
    db: Session = Depends(deps.get_db),
    lesson_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить урок по ID.
    """
    lesson = lesson_crud.get(db, id=lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Урок не найден",
        )
    return lesson


@router.put("/lessons/{lesson_id}", response_model=Lesson)
def update_lesson(
    *,
    db: Session = Depends(deps.get_db),
    lesson_id: int,
    lesson_in: LessonUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить урок (для кураторов и администраторов).
    """
    lesson = lesson_crud.get(db, id=lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Урок не найден",
        )
    module = module_crud.get(db, id=lesson.module_id)
    course = course_crud.get(db, id=module.course_id)
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого урока",
        )
    lesson = lesson_crud.update(db, db_obj=lesson, obj_in=lesson_in)
    return lesson


@router.delete("/lessons/{lesson_id}")
def delete_lesson(
    *,
    db: Session = Depends(deps.get_db),
    lesson_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить урок (для кураторов и администраторов).
    """
    lesson = lesson_crud.get(db, id=lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Урок не найден",
        )
    module = module_crud.get(db, id=lesson.module_id)
    course = course_crud.get(db, id=module.course_id)
    if course.curator_id != current_user.id and not course_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого урока",
        )
    lesson_crud.remove(db, id=lesson_id)
    return {"message": "Урок успешно удален"}


@router.get("/{course_id}/free-lessons", response_model=List[Lesson])
def read_free_lessons(
    *,
    db: Session = Depends(deps.get_db),
    course_id: int,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Получить бесплатные уроки курса (публичный доступ).
    """
    course = course_crud.get(db, id=course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Курс не найден",
        )
    lessons = lesson_crud.get_free_lessons(db, course_id=course_id, skip=skip, limit=limit)
    return lessons


@router.post("/lessons/{lesson_id}/complete", response_model=dict)
async def complete_lesson(
    *,
    db: Session = Depends(deps.get_db),
    lesson_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Отметить урок как завершенный.
    """
    # Проверяем существование урока
    lesson = lesson_crud.get(db, id=lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Урок не найден",
        )
    
    # Проверяем доступ к курсу
    from app.crud import access_crud
    has_access = access_crud.check_access(db, user_id=current_user.id, course_id=lesson.module.course_id)
    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="Нет доступа к этому курсу",
        )
    
    # Отмечаем урок как завершенный (здесь должна быть логика сохранения прогресса)
    # lesson_progress_crud.mark_completed(db, user_id=current_user.id, lesson_id=lesson_id)
    
    # Отправляем уведомление о завершении урока
    await notification_manager.send_notification(
        user_id=current_user.id,
        template=NotificationTemplate.LESSON_COMPLETED,
        notification_types=[NotificationType.INTERNAL, NotificationType.EMAIL],
        data={
            "lesson_name": lesson.title,
            "course_name": lesson.module.course.title
        },
        priority=2
    )
    
    return {"message": "Урок отмечен как завершенный"} 