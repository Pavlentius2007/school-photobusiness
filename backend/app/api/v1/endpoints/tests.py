from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import test_crud, question_crud, answer_crud, test_attempt_crud, user_crud
from app.schemas.test import Test, TestCreate, TestUpdate, Question, QuestionCreate, QuestionUpdate, Answer, AnswerCreate, AnswerUpdate, TestAttempt, TestAttemptCreate, TestAttemptUpdate
from app.models.user import User

router = APIRouter()


# ==================== ТЕСТЫ ====================

@router.get("/", response_model=List[Test])
def read_tests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить список тестов (для кураторов и администраторов).
    """
    if user_crud.is_student(current_user):
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    tests = test_crud.get_multi(db, skip=skip, limit=limit)
    return tests


@router.get("/lesson/{lesson_id}", response_model=List[Test])
def read_lesson_tests(
    *,
    db: Session = Depends(deps.get_db),
    lesson_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить тесты урока.
    """
    tests = test_crud.get_published(db, lesson_id=lesson_id, skip=skip, limit=limit)
    return tests


@router.post("/", response_model=Test)
def create_test(
    *,
    db: Session = Depends(deps.get_db),
    test_in: TestCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новый тест (для кураторов и администраторов).
    """
    test_in.created_by = current_user.id
    test = test_crud.create(db, obj_in=test_in)
    return test


@router.get("/{test_id}", response_model=Test)
def read_test(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить тест по ID.
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    if test.status != "published" and test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    return test


@router.put("/{test_id}", response_model=Test)
def update_test(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    test_in: TestUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить тест (для создателя и администраторов).
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого теста",
        )
    test = test_crud.update(db, db_obj=test, obj_in=test_in)
    return test


@router.delete("/{test_id}")
def delete_test(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить тест (для создателя и администраторов).
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого теста",
        )
    test_crud.remove(db, id=test_id)
    return {"message": "Тест успешно удален"}


@router.get("/my/", response_model=List[Test])
def read_my_tests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить тесты текущего куратора.
    """
    tests = test_crud.get_by_creator(db, creator_id=current_user.id, skip=skip, limit=limit)
    return tests


# ==================== ВОПРОСЫ ====================

@router.get("/{test_id}/questions", response_model=List[Question])
def read_test_questions(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить вопросы теста.
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    questions = question_crud.get_by_test(db, test_id=test_id, skip=skip, limit=limit)
    return questions


@router.post("/{test_id}/questions", response_model=Question)
def create_question(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    question_in: QuestionCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новый вопрос (для кураторов и администраторов).
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для создания вопроса в этом тесте",
        )
    question_in.test_id = test_id
    question = question_crud.create(db, obj_in=question_in)
    return question


@router.get("/questions/{question_id}", response_model=Question)
def read_question(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить вопрос по ID.
    """
    question = question_crud.get(db, id=question_id)
    if not question:
        raise HTTPException(
            status_code=404,
            detail="Вопрос не найден",
        )
    return question


@router.put("/questions/{question_id}", response_model=Question)
def update_question(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    question_in: QuestionUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить вопрос (для создателя теста и администраторов).
    """
    question = question_crud.get(db, id=question_id)
    if not question:
        raise HTTPException(
            status_code=404,
            detail="Вопрос не найден",
        )
    test = test_crud.get(db, id=question.test_id)
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого вопроса",
        )
    question = question_crud.update(db, db_obj=question, obj_in=question_in)
    return question


@router.delete("/questions/{question_id}")
def delete_question(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить вопрос (для создателя теста и администраторов).
    """
    question = question_crud.get(db, id=question_id)
    if not question:
        raise HTTPException(
            status_code=404,
            detail="Вопрос не найден",
        )
    test = test_crud.get(db, id=question.test_id)
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого вопроса",
        )
    question_crud.remove(db, id=question_id)
    return {"message": "Вопрос успешно удален"}


# ==================== ОТВЕТЫ ====================

@router.get("/questions/{question_id}/answers", response_model=List[Answer])
def read_question_answers(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить ответы вопроса.
    """
    question = question_crud.get(db, id=question_id)
    if not question:
        raise HTTPException(
            status_code=404,
            detail="Вопрос не найден",
        )
    answers = answer_crud.get_by_question(db, question_id=question_id, skip=skip, limit=limit)
    return answers


@router.post("/questions/{question_id}/answers", response_model=Answer)
def create_answer(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    answer_in: AnswerCreate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Создать новый ответ (для кураторов и администраторов).
    """
    question = question_crud.get(db, id=question_id)
    if not question:
        raise HTTPException(
            status_code=404,
            detail="Вопрос не найден",
        )
    test = test_crud.get(db, id=question.test_id)
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для создания ответа в этом вопросе",
        )
    answer_in.question_id = question_id
    answer = answer_crud.create(db, obj_in=answer_in)
    return answer


@router.put("/answers/{answer_id}", response_model=Answer)
def update_answer(
    *,
    db: Session = Depends(deps.get_db),
    answer_id: int,
    answer_in: AnswerUpdate,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Обновить ответ (для создателя теста и администраторов).
    """
    answer = answer_crud.get(db, id=answer_id)
    if not answer:
        raise HTTPException(
            status_code=404,
            detail="Ответ не найден",
        )
    question = question_crud.get(db, id=answer.question_id)
    test = test_crud.get(db, id=question.test_id)
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для редактирования этого ответа",
        )
    answer = answer_crud.update(db, db_obj=answer, obj_in=answer_in)
    return answer


@router.delete("/answers/{answer_id}")
def delete_answer(
    *,
    db: Session = Depends(deps.get_db),
    answer_id: int,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Удалить ответ (для создателя теста и администраторов).
    """
    answer = answer_crud.get(db, id=answer_id)
    if not answer:
        raise HTTPException(
            status_code=404,
            detail="Ответ не найден",
        )
    question = question_crud.get(db, id=answer.question_id)
    test = test_crud.get(db, id=question.test_id)
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для удаления этого ответа",
        )
    answer_crud.remove(db, id=answer_id)
    return {"message": "Ответ успешно удален"}


# ==================== ПОПЫТКИ ПРОХОЖДЕНИЯ ТЕСТОВ ====================

@router.post("/{test_id}/start", response_model=TestAttempt)
def start_test_attempt(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    current_user: User = Depends(deps.get_current_student_user),
) -> Any:
    """
    Начать попытку прохождения теста (для студентов).
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    if test.status != "published":
        raise HTTPException(
            status_code=400,
            detail="Тест недоступен для прохождения",
        )
    
    # Проверяем количество попыток
    existing_attempts = test_attempt_crud.get_by_student_and_test(
        db, student_id=current_user.id, test_id=test_id
    )
    if len(existing_attempts) >= test.max_attempts:
        raise HTTPException(
            status_code=400,
            detail=f"Превышено максимальное количество попыток ({test.max_attempts})",
        )
    
    attempt_in = TestAttemptCreate(
        test_id=test_id,
        student_id=current_user.id,
        attempt_number=len(existing_attempts) + 1
    )
    attempt = test_attempt_crud.create(db, obj_in=attempt_in)
    return attempt


@router.get("/attempts/my", response_model=List[TestAttempt])
def read_my_test_attempts(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_student_user),
) -> Any:
    """
    Получить попытки прохождения тестов текущего студента.
    """
    attempts = test_attempt_crud.get_by_student(db, student_id=current_user.id, skip=skip, limit=limit)
    return attempts


@router.get("/attempts/{attempt_id}", response_model=TestAttempt)
def read_test_attempt(
    *,
    db: Session = Depends(deps.get_db),
    attempt_id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить попытку прохождения теста по ID.
    """
    attempt = test_attempt_crud.get(db, id=attempt_id)
    if not attempt:
        raise HTTPException(
            status_code=404,
            detail="Попытка не найдена",
        )
    
    # Студент может видеть только свои попытки
    if user_crud.is_student(current_user) and attempt.student_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    
    # Куратор может видеть попытки к своим тестам
    if user_crud.is_curator(current_user):
        test = test_crud.get(db, id=attempt.test_id)
        if test.created_by != current_user.id and not user_crud.is_admin(current_user):
            raise HTTPException(
                status_code=403,
                detail="Недостаточно прав",
            )
    
    return attempt


@router.put("/attempts/{attempt_id}/complete", response_model=TestAttempt)
def complete_test_attempt(
    *,
    db: Session = Depends(deps.get_db),
    attempt_id: int,
    score: float,
    is_passed: bool,
    current_user: User = Depends(deps.get_current_student_user),
) -> Any:
    """
    Завершить попытку прохождения теста (для студентов).
    """
    attempt = test_attempt_crud.get(db, id=attempt_id)
    if not attempt:
        raise HTTPException(
            status_code=404,
            detail="Попытка не найдена",
        )
    
    if attempt.student_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Недостаточно прав",
        )
    
    if attempt.completed_at:
        raise HTTPException(
            status_code=400,
            detail="Попытка уже завершена",
        )
    
    test = test_crud.get(db, id=attempt.test_id)
    if score < 0 or score > 100:
        raise HTTPException(
            status_code=400,
            detail="Оценка должна быть от 0 до 100",
        )
    
    attempt = test_attempt_crud.complete_attempt(
        db, attempt_id=attempt_id, score=score, is_passed=is_passed
    )
    return attempt


@router.get("/{test_id}/attempts", response_model=List[TestAttempt])
def read_test_attempts(
    *,
    db: Session = Depends(deps.get_db),
    test_id: int,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_curator_user),
) -> Any:
    """
    Получить попытки прохождения теста (для кураторов и администраторов).
    """
    test = test_crud.get(db, id=test_id)
    if not test:
        raise HTTPException(
            status_code=404,
            detail="Тест не найден",
        )
    if test.created_by != current_user.id and not user_crud.is_admin(current_user):
        raise HTTPException(
            status_code=400,
            detail="Недостаточно прав для просмотра попыток",
        )
    attempts = test_attempt_crud.get_by_test(db, test_id=test_id, skip=skip, limit=limit)
    return attempts 