from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from app.models.test import QuestionType, TestStatus


class TestBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    instructions: Optional[str] = None
    status: Optional[TestStatus] = TestStatus.DRAFT
    time_limit_minutes: Optional[int] = None
    passing_score: Optional[int] = 70
    max_attempts: Optional[int] = 1
    shuffle_questions: Optional[bool] = False
    show_results: Optional[bool] = True


class TestCreate(TestBase):
    title: str
    lesson_id: int
    created_by: int


class TestUpdate(TestBase):
    pass


class TestInDBBase(TestBase):
    id: Optional[int] = None
    lesson_id: Optional[int] = None
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Test(TestInDBBase):
    pass


class QuestionBase(BaseModel):
    text: Optional[str] = None
    question_type: Optional[QuestionType] = QuestionType.SINGLE_CHOICE
    points: Optional[int] = 1
    order_index: Optional[int] = 0
    is_required: Optional[bool] = True


class QuestionCreate(QuestionBase):
    text: str
    test_id: int


class QuestionUpdate(QuestionBase):
    pass


class QuestionInDBBase(QuestionBase):
    id: Optional[int] = None
    test_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Question(QuestionInDBBase):
    pass


class AnswerBase(BaseModel):
    text: Optional[str] = None
    is_correct: Optional[bool] = False
    order_index: Optional[int] = 0


class AnswerCreate(AnswerBase):
    text: str
    question_id: int


class AnswerUpdate(AnswerBase):
    pass


class AnswerInDBBase(AnswerBase):
    id: Optional[int] = None
    question_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Answer(AnswerInDBBase):
    pass


class TestAttemptBase(BaseModel):
    score: Optional[float] = None
    is_passed: Optional[bool] = None
    attempt_number: Optional[int] = 1


class TestAttemptCreate(TestAttemptBase):
    test_id: int
    student_id: int


class TestAttemptUpdate(TestAttemptBase):
    pass


class TestAttemptInDBBase(TestAttemptBase):
    id: Optional[int] = None
    test_id: Optional[int] = None
    student_id: Optional[int] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TestAttempt(TestAttemptInDBBase):
    pass


class TestAnswerBase(BaseModel):
    answer_text: Optional[str] = None
    is_correct: Optional[bool] = None
    points_earned: Optional[float] = 0


class TestAnswerCreate(TestAnswerBase):
    test_attempt_id: int
    question_id: int
    selected_answer_id: Optional[int] = None


class TestAnswerUpdate(TestAnswerBase):
    pass


class TestAnswerInDBBase(TestAnswerBase):
    id: Optional[int] = None
    test_attempt_id: Optional[int] = None
    question_id: Optional[int] = None
    selected_answer_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TestAnswer(TestAnswerInDBBase):
    pass 