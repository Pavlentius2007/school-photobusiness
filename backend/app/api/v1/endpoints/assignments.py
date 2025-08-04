from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import assignment_crud, submission_crud, user_crud
from app.core.notifications import notification_manager, NotificationTemplate, NotificationType
from app.schemas.assignment import Assignment, AssignmentCreate, AssignmentUpdate, AssignmentSubmission, AssignmentSubmissionCreate, AssignmentSubmissionUpdate
from app.models.user import User

router = APIRouter()


# ==================== ЗАДАНИЯ ====================

@router.get("/", response_model=List[Assignment])
def read_assignments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить список заданий (для кураторов и администраторов).
    """
    if user_crud.is_student(current_user):
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    assignments = assignment_crud.get_multi(db, skip=skip, limit=limit)
    return assignments


@router.get("/lesson/{lesson_id}", response_model=List[Assignment])
def read_lesson_assignments(
    *,
    db: Session = Depends(deps.get_db),
    lesson_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить задания урока.
    """
    assignments = assignment_crud.get_published(db, lesson_id=lesson_id, skip=skip, limit=limit)
    return assignments


@router.post("/", response_model=Assignment)
def create_assignment(
    *,
    db: Session = Depends(deps.get_db),
    assignment_in: AssignmentCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новое задание (для кураторов и администраторов).
    """
    assignment_in.created_by = current_user.id
    assignment = assignment_crud.create(db, obj_in=assignment_in)
    return assignment


@router.get("/{assignment_id}", response_model=Assignment)
def read_assignment(
    *,
    db: Session = Depends(deps.get_db),
    assignment_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить задание по ID.
    """
    assignment = assignment_crud.get(db, id=assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    if assignment.status != "published" and assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    return assignment


@router.put("/{assignment_id}", response_model=Assignment)
def update_assignment(
    *,
    db: Session = Depends(deps.get_db),
    assignment_id: int,
    assignment_in: AssignmentUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить задание (для создателя и администраторов).
    """
    assignment = assignment_crud.get(db, id=assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    if assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого задания",
        )
    assignment = assignment_crud.update(db, db_obj=assignment, obj_in=assignment_in)
    return assignment


@router.delete("/{assignment_id}")
def delete_assignment(
    *,
    db: Session = Depends(deps.get_db),
    assignment_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить задание (для создателя и администраторов).
    """
    assignment = assignment_crud.get(db, id=assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    if assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого задания",
        )
    assignment_crud.remove(db, id=assignment_id)
    return {"message": "Задание успешно удалено"}


@router.get("/my/", response_model=List[Assignment])
def read_my_assignments(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить задания текущего куратора.
    """
    assignments = assignment_crud.get_by_creator(db, creator_id=current_user.id, skip=skip, limit=limit)
    return assignments


# ==================== ОТПРАВКИ ЗАДАНИЙ ====================

@router.get("/{assignment_id}/submissions", response_model=List[AssignmentSubmission])
def read_assignment_submissions(
    *,
    db: Session = Depends(deps.get_db),
    assignment_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить отправки задания (для кураторов и администраторов).
    """
    assignment = assignment_crud.get(db, id=assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    if assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для просмотра отправок",
        )
    submissions = submission_crud.get_by_assignment(db, assignment_id=assignment_id, skip=skip, limit=limit)
    return submissions


@router.get("/{assignment_id}/submissions/ungraded", response_model=List[AssignmentSubmission])
def read_ungraded_submissions(
    *,
    db: Session = Depends(deps.get_db),
    assignment_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить неоцененные отправки (для кураторов и администраторов).
    """
    assignment = assignment_crud.get(db, id=assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    if assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для просмотра отправок",
        )
    submissions = submission_crud.get_ungraded(db, assignment_id=assignment_id, skip=skip, limit=limit)
    return submissions


@router.post("/{assignment_id}/submit", response_model=AssignmentSubmission)
def submit_assignment(
    *,
    db: Session = Depends(deps.get_db),
    assignment_id: int,
    submission_in: AssignmentSubmissionCreate,
    current_user: User = Depends(deps.get_current_student_user),
) -> Any:
    """
    Отправить задание (для студентов).
    """
    assignment = assignment_crud.get(db, id=assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Задание не найдено",
        )
    if assignment.status != "published":
        raise HTTPException(
            status_code=400,
            detail="Задание недоступно для отправки",
        )
    
    # Проверяем, не отправлял ли уже студент это задание
    existing_submission = submission_crud.get_by_student_and_assignment(
        db, student_id=current_user.id, assignment_id=assignment_id
    )
    if existing_submission:
        raise HTTPException(
            status_code=400,
            detail="Вы уже отправили это задание",
        )
    
    submission_in.assignment_id = assignment_id
    submission_in.student_id = current_user.id
    submission = submission_crud.create(db, obj_in=submission_in)
    
    # Отправляем уведомление о сдаче задания
    await notification_manager.send_notification(
        user_id=current_user.id,
        template=NotificationTemplate.ASSIGNMENT_SUBMITTED,
        notification_types=[NotificationType.INTERNAL, NotificationType.EMAIL],
        data={
            "assignment_name": assignment.title
        },
        priority=2
    )
    
    return submission


@router.get("/submissions/my", response_model=List[AssignmentSubmission])
def read_my_submissions(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_student_user),
) -> Any:
    """
    Получить отправки текущего студента.
    """
    submissions = submission_crud.get_by_student(db, student_id=current_user.id, skip=skip, limit=limit)
    return submissions


@router.get("/submissions/{submission_id}", response_model=AssignmentSubmission)
def read_submission(
    *,
    db: Session = Depends(deps.get_db),
    submission_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить отправку по ID.
    """
    submission = submission_crud.get(db, id=submission_id)
    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Отправка не найдена",
        )
    
    # Студент может видеть только свои отправки
    if user_crud.is_student(current_user) and submission.student_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    
    # Куратор может видеть отправки к своим заданиям
    if user_crud.is_curator(current_user):
        assignment = assignment_crud.get(db, id=submission.assignment_id)
        if assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
            raise HTTPException(
                status_code=403,
                detail="Недостаточно прав",
            )
    
    return submission


@router.put("/submissions/{submission_id}/grade", response_model=AssignmentSubmission)
def grade_submission(
    *,
    db: Session = Depends(deps.get_db),
    submission_id: int,
    score: float,
    feedback: str,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Оценить отправку (для кураторов и администраторов).
    """
    submission = submission_crud.get(db, id=submission_id)
    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Отправка не найдена",
        )
    
    assignment = assignment_crud.get(db, id=submission.assignment_id)
    if assignment.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для оценки этой отправки",
        )
    
    if score < 0 or score > assignment.max_score:
        raise HTTPException(
            status_code=400,
            detail=f"Оценка должна быть от 0 до {assignment.max_score}",
        )
    
    submission = submission_crud.grade_submission(
        db, submission_id=submission_id, score=score, feedback=feedback, grader_id=current_user.id
    )
    return submission


@router.put("/submissions/{submission_id}", response_model=AssignmentSubmission)
def update_submission(
    *,
    db: Session = Depends(deps.get_db),
    submission_id: int,
    submission_in: AssignmentSubmissionUpdate,
    current_user: User = Depends(deps.get_current_student_user),
) -> Any:
    """
    Обновить отправку (только для студента, если она еще не оценена).
    """
    submission = submission_crud.get(db, id=submission_id)
    if not submission:
        raise HTTPException(
            status_code=404,
            detail="Отправка не найдена",
        )
    
    if submission.student_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    
    if submission.status == "graded":
        raise HTTPException(
            status_code=400,
            detail="Нельзя изменить уже оцененную отправку",
        )
    
    submission = submission_crud.update(db, db_obj=submission, obj_in=submission_in)
    return submission 