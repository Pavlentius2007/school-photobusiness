from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func

from app.crud.base import CRUDBase
from app.models.test import Test, Question, Answer, TestAttempt, TestAnswer
from app.schemas.test import TestCreate, TestUpdate, QuestionCreate, QuestionUpdate, AnswerCreate, AnswerUpdate, TestAttemptCreate, TestAttemptUpdate


class CRUDTest(CRUDBase[Test, TestCreate, TestUpdate]):
    def get_by_lesson(self, db: Session, *, lesson_id: int, skip: int = 0, limit: int = 100) -> List[Test]:
        """Получить тесты урока"""
        return db.query(Test).filter(Test.lesson_id == lesson_id).offset(skip).limit(limit).all()

    def get_published(self, db: Session, *, lesson_id: int, skip: int = 0, limit: int = 100) -> List[Test]:
        """Получить опубликованные тесты урока"""
        return db.query(Test).filter(
            and_(Test.lesson_id == lesson_id, Test.status == "published")
        ).offset(skip).limit(limit).all()

    def get_by_creator(self, db: Session, *, creator_id: int, skip: int = 0, limit: int = 100) -> List[Test]:
        """Получить тесты создателя"""
        return db.query(Test).filter(Test.created_by == creator_id).offset(skip).limit(limit).all()


class CRUDQuestion(CRUDBase[Question, QuestionCreate, QuestionUpdate]):
    def get_by_test(self, db: Session, *, test_id: int, skip: int = 0, limit: int = 100) -> List[Question]:
        """Получить вопросы теста"""
        return db.query(Question).filter(Question.test_id == test_id).order_by(Question.order_index).offset(skip).limit(limit).all()

    def get_with_answers(self, db: Session, *, question_id: int) -> Optional[Question]:
        """Получить вопрос с ответами"""
        return db.query(Question).filter(Question.id == question_id).first()


class CRUDAnswer(CRUDBase[Answer, AnswerCreate, AnswerUpdate]):
    def get_by_question(self, db: Session, *, question_id: int, skip: int = 0, limit: int = 100) -> List[Answer]:
        """Получить ответы вопроса"""
        return db.query(Answer).filter(Answer.question_id == question_id).order_by(Answer.order_index).offset(skip).limit(limit).all()

    def get_correct_answers(self, db: Session, *, question_id: int) -> List[Answer]:
        """Получить правильные ответы вопроса"""
        return db.query(Answer).filter(
            and_(Answer.question_id == question_id, Answer.is_correct == True)
        ).all()


class CRUDTestAttempt(CRUDBase[TestAttempt, TestAttemptCreate, TestAttemptUpdate]):
    def get_by_test(self, db: Session, *, test_id: int, skip: int = 0, limit: int = 100) -> List[TestAttempt]:
        """Получить попытки теста"""
        return db.query(TestAttempt).filter(TestAttempt.test_id == test_id).offset(skip).limit(limit).all()

    def get_by_student(self, db: Session, *, student_id: int, skip: int = 0, limit: int = 100) -> List[TestAttempt]:
        """Получить попытки студента"""
        return db.query(TestAttempt).filter(TestAttempt.student_id == student_id).offset(skip).limit(limit).all()

    def get_by_student_and_test(self, db: Session, *, student_id: int, test_id: int) -> List[TestAttempt]:
        """Получить попытки студента для конкретного теста"""
        return db.query(TestAttempt).filter(
            and_(TestAttempt.student_id == student_id, TestAttempt.test_id == test_id)
        ).all()

    def get_latest_attempt(self, db: Session, *, student_id: int, test_id: int) -> Optional[TestAttempt]:
        """Получить последнюю попытку студента для теста"""
        return db.query(TestAttempt).filter(
            and_(TestAttempt.student_id == student_id, TestAttempt.test_id == test_id)
        ).order_by(TestAttempt.created_at.desc()).first()

    def complete_attempt(
        self, 
        db: Session, 
        *, 
        attempt_id: int, 
        score: float, 
        is_passed: bool
    ) -> TestAttempt:
        """Завершить попытку теста"""
        attempt = self.get(db, id=attempt_id)
        if attempt:
            attempt.completed_at = datetime.utcnow()
            attempt.score = score
            attempt.is_passed = is_passed
            db.add(attempt)
            db.commit()
            db.refresh(attempt)
        return attempt


class CRUDTestAnswer(CRUDBase[TestAnswer, TestAttemptCreate, TestAttemptUpdate]):
    def get_by_attempt(self, db: Session, *, attempt_id: int, skip: int = 0, limit: int = 100) -> List[TestAnswer]:
        """Получить ответы попытки"""
        return db.query(TestAnswer).filter(TestAnswer.test_attempt_id == attempt_id).offset(skip).limit(limit).all()

    def get_by_question_and_attempt(self, db: Session, *, question_id: int, attempt_id: int) -> Optional[TestAnswer]:
        """Получить ответ на конкретный вопрос в попытке"""
        return db.query(TestAnswer).filter(
            and_(TestAnswer.question_id == question_id, TestAnswer.test_attempt_id == attempt_id)
        ).first()


test_crud = CRUDTest(Test)
question_crud = CRUDQuestion(Question)
answer_crud = CRUDAnswer(Answer)
test_attempt_crud = CRUDTestAttempt(TestAttempt) 