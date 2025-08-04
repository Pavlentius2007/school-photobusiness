from typing import Optional
from datetime import datetime
from pydantic import BaseModel

from app.models.assignment import AssignmentType, AssignmentStatus, SubmissionStatus


class AssignmentBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    instructions: Optional[str] = None
    assignment_type: Optional[AssignmentType] = AssignmentType.HOMEWORK
    status: Optional[AssignmentStatus] = AssignmentStatus.DRAFT
    max_score: Optional[int] = 100
    due_date: Optional[datetime] = None


class AssignmentCreate(AssignmentBase):
    title: str
    lesson_id: int
    created_by: int


class AssignmentUpdate(AssignmentBase):
    pass


class AssignmentInDBBase(AssignmentBase):
    id: Optional[int] = None
    lesson_id: Optional[int] = None
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Assignment(AssignmentInDBBase):
    pass


class AssignmentSubmissionBase(BaseModel):
    content: Optional[str] = None
    file_url: Optional[str] = None
    score: Optional[float] = None
    feedback: Optional[str] = None
    status: Optional[SubmissionStatus] = SubmissionStatus.SUBMITTED


class AssignmentSubmissionCreate(AssignmentSubmissionBase):
    assignment_id: int
    student_id: int


class AssignmentSubmissionUpdate(AssignmentSubmissionBase):
    pass


class AssignmentSubmissionInDBBase(AssignmentSubmissionBase):
    id: Optional[int] = None
    assignment_id: Optional[int] = None
    student_id: Optional[int] = None
    graded_by: Optional[int] = None
    submitted_at: Optional[datetime] = None
    graded_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AssignmentSubmission(AssignmentSubmissionInDBBase):
    pass 