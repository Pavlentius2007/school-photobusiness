import React, { useState } from 'react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  max_score: number;
  due_date?: string;
  attached_files?: string[];
  created_at: string;
}

interface AssignmentSubmission {
  id?: number;
  assignment_id: number;
  student_answer: string;
  attached_files?: File[];
  submitted_at?: string;
  status: 'awaiting_review' | 'accepted' | 'needs_revision';
  score?: number;
  teacher_feedback?: string;
}

interface AssignmentSubmissionProps {
  assignment: Assignment;
  submission?: AssignmentSubmission;
  onSubmit: (submission: AssignmentSubmission) => void;
  isReadOnly?: boolean;
}

const AssignmentSubmissionComponent: React.FC<AssignmentSubmissionProps> = ({
  assignment,
  submission,
  onSubmit,
  isReadOnly = false
}) => {
  const [studentAnswer, setStudentAnswer] = useState(submission?.student_answer || '');
  const [attachedFiles, setAttachedFiles] = useState<File[]>(submission?.attached_files || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileAttach = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validTypes = [
        'image/jpeg', 
        'image/png', 
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (file.size > maxSize) {
        alert(`Файл ${file.name} слишком большой. Максимальный размер: 5MB`);
        return false;
      }
      
      if (!validTypes.includes(file.type)) {
        alert(`Файл ${file.name} имеет неподдерживаемый формат. Разрешены: JPG, PNG, PDF, DOCX, TXT`);
        return false;
      }
      
      return true;
    });

    setAttachedFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileRemove = (fileIndex: number) => {
    setAttachedFiles(prev => prev.filter((_, index) => index !== fileIndex));
  };

  const handleSubmit = async () => {
    if (!studentAnswer.trim()) {
      alert('Пожалуйста, введите ответ на задание');
      return;
    }

    if (studentAnswer.length > 2000) {
      alert('Ответ слишком длинный. Максимальная длина: 2000 символов');
      return;
    }

    setIsSubmitting(true);
    try {
      const newSubmission: AssignmentSubmission = {
        assignment_id: assignment.id,
        student_answer: studentAnswer,
        attached_files: attachedFiles,
        status: 'awaiting_review'
      };

      await onSubmit(newSubmission);
    } catch (error) {
      console.error('Ошибка при отправке задания:', error);
      alert('Произошла ошибка при отправке задания');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'awaiting_review': return 'Ожидает проверки';
      case 'accepted': return 'Принято';
      case 'needs_revision': return 'Требует доработки';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting_review': return '#f59e0b';
      case 'accepted': return '#10b981';
      case 'needs_revision': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = assignment.due_date && new Date(assignment.due_date) < new Date();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Заголовок задания */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
          <h2 style={{
            margin: '0',
            color: '#1e293b',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {assignment.title}
          </h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {assignment.max_score} баллов
            </div>
          </div>
        </div>

        <p style={{
          margin: '0 0 15px 0',
          color: '#374151',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          {assignment.description}
        </p>

        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#6b7280' }}>
          <span>Создано: {formatDate(assignment.created_at)}</span>
          {assignment.due_date && (
            <span style={{ color: isOverdue ? '#ef4444' : '#6b7280' }}>
              Срок сдачи: {formatDate(assignment.due_date)}
              {isOverdue && ' (просрочено)'}
            </span>
          )}
        </div>

        {/* Прикрепленные файлы от преподавателя */}
        {assignment.attached_files && assignment.attached_files.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <p style={{
              margin: '0 0 8px 0',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Файлы от преподавателя:
            </p>
            {assignment.attached_files.map((file, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 10px',
                backgroundColor: '#f1f5f9',
                borderRadius: '4px',
                marginBottom: '4px'
              }}>
                <span style={{
                  color: '#374151',
                  fontSize: '13px',
                  flex: '1'
                }}>
                  {file}
                </span>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    textDecoration: 'none'
                  }}
                >
                  Скачать
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Статус отправки */}
      {submission && (
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{
              backgroundColor: getStatusColor(submission.status),
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {getStatusLabel(submission.status)}
            </span>
            {submission.score && (
              <span style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {submission.score}/{assignment.max_score} баллов
              </span>
            )}
          </div>
          
          {submission.submitted_at && (
            <p style={{
              margin: '0 0 10px 0',
              color: '#64748b',
              fontSize: '13px'
            }}>
              Отправлено: {formatDate(submission.submitted_at)}
            </p>
          )}

          {submission.teacher_feedback && (
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '12px',
              marginTop: '10px'
            }}>
              <p style={{
                margin: '0 0 8px 0',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Комментарий преподавателя:
              </p>
              <p style={{
                margin: '0',
                color: '#374151',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {submission.teacher_feedback}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Форма ответа */}
      {(!submission || submission.status === 'needs_revision') && !isReadOnly && (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Ваш ответ
          </h3>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Ответ на задание: *
            </label>
            <textarea
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Введите ваш ответ на задание..."
              maxLength={2000}
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <div style={{
              textAlign: 'right',
              marginTop: '4px',
              color: '#6b7280',
              fontSize: '12px'
            }}>
              {studentAnswer.length}/2000 символов
            </div>
          </div>

          {/* Прикрепление файлов */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Прикрепить файлы (опционально):
            </label>
            
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.docx,.txt"
              onChange={(e) => handleFileAttach(e.target.files)}
              style={{
                display: 'none'
              }}
              id="assignment-files"
            />
            
            <label
              htmlFor="assignment-files"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                marginBottom: '10px'
              }}
            >
              Выбрать файлы
            </label>

            {/* Список прикрепленных файлов */}
            {attachedFiles.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <p style={{
                  margin: '0 0 8px 0',
                  color: '#6b7280',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  Прикрепленные файлы:
                </p>
                {attachedFiles.map((file, fileIndex) => (
                  <div key={fileIndex} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 10px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }}>
                    <span style={{
                      color: '#374151',
                      fontSize: '13px',
                      flex: '1'
                    }}>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleFileRemove(fileIndex)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginLeft: '8px'
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Кнопка отправки */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isSubmitting ? 'default' : 'pointer',
                minWidth: '200px'
              }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить на проверку'}
            </button>
          </div>
        </div>
      )}

      {/* Просмотр отправленного ответа */}
      {submission && isReadOnly && (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Ваш ответ
          </h3>

          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '15px'
          }}>
            <p style={{
              margin: '0',
              color: '#374151',
              fontSize: '14px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {submission.student_answer}
            </p>
          </div>

          {/* Прикрепленные файлы */}
          {submission.attached_files && submission.attached_files.length > 0 && (
            <div>
              <p style={{
                margin: '0 0 8px 0',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Прикрепленные файлы:
              </p>
              {submission.attached_files.map((file, fileIndex) => (
                <div key={fileIndex} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 10px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}>
                  <span style={{
                    color: '#374151',
                    fontSize: '13px'
                  }}>
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmissionComponent; 