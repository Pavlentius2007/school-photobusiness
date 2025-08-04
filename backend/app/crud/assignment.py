from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.crud.base import CRUDBase
from app.models.assignment import Assignment, AssignmentSubmission
from app.schemas.assignment import AssignmentCreate, AssignmentUpdate, AssignmentSubmissionCreate, AssignmentSubmissionUpdate


class CRUDAssignment(CRUDBase[Assignment, AssignmentCreate, AssignmentUpdate]):
    def get_by_lesson(self, db: Session, *, lesson_id: int, skip: int = 0, limit: int = 100) -> List[Assignment]:
        """Получить задания урока"""
        return db.query(Assignment).filter(Assignment.lesson_id == lesson_id).offset(skip).limit(limit).all()

    def get_published(self, db: Session, *, lesson_id: int, skip: int = 0, limit: int = 100) -> List[Assignment]:
        """Получить опубликованные задания урока"""
        return db.query(Assignment).filter(
            and_(Assignment.lesson_id == lesson_id, Assignment.status == "published")
        ).offset(skip).limit(limit).all()

    def get_by_creator(self, db: Session, *, creator_id: int, skip: int = 0, limit: int = 100) -> List[Assignment]:
        """Получить задания создателя"""
        return db.query(Assignment).filter(Assignment.created_by == creator_id).offset(skip).limit(limit).all()


class CRUDAssignmentSubmission(CRUDBase[AssignmentSubmission, AssignmentSubmissionCreate, AssignmentSubmissionUpdate]):
    def get_by_assignment(self, db: Session, *, assignment_id: int, skip: int = 0, limit: int = 100) -> List[AssignmentSubmission]:
        """Получить отправки задания"""
        return db.query(AssignmentSubmission).filter(
            AssignmentSubmission.assignment_id == assignment_id
        ).offset(skip).limit(limit).all()

    def get_by_student(self, db: Session, *, student_id: int, skip: int = 0, limit: int = 100) -> List[AssignmentSubmission]:
        """Получить отправки студента"""
        return db.query(AssignmentSubmission).filter(
            AssignmentSubmission.student_id == student_id
        ).offset(skip).limit(limit).all()

    def get_by_student_and_assignment(self, db: Session, *, student_id: int, assignment_id: int) -> Optional[AssignmentSubmission]:
        """Получить отправку студента для конкретного задания"""
        return db.query(AssignmentSubmission).filter(
            and_(
                AssignmentSubmission.student_id == student_id,
                AssignmentSubmission.assignment_id == assignment_id
            )
        ).first()

    def get_ungraded(self, db: Session, *, assignment_id: int, skip: int = 0, limit: int = 100) -> List[AssignmentSubmission]:
        """Получить неоцененные отправки"""
        return db.query(AssignmentSubmission).filter(
            and_(
                AssignmentSubmission.assignment_id == assignment_id,
                AssignmentSubmission.status == "submitted"
            )
        ).offset(skip).limit(limit).all()

    def grade_submission(
        self, 
        db: Session, 
        *, 
        submission_id: int, 
        score: float, 
        feedback: str, 
        grader_id: int
    ) -> AssignmentSubmission:
        """Оценить отправку"""
        submission = self.get(db, id=submission_id)
        if submission:
            submission.score = score
            submission.feedback = feedback
            submission.graded_by = grader_id
            submission.graded_at = datetime.utcnow()
            submission.status = "graded"
            db.add(submission)
            db.commit()
            db.refresh(submission)
        return submission


assignment_crud = CRUDAssignment(Assignment)
submission_crud = CRUDAssignmentSubmission(AssignmentSubmission) 