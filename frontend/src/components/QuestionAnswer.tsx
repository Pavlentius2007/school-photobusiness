import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  type: 'open' | 'single_choice' | 'multiple_choice';
  options?: string[];
  required: boolean;
  order_index: number;
}

interface Answer {
  question_id: number;
  text_answer?: string;
  selected_options?: number[];
  attached_files?: File[];
}

interface QuestionAnswerProps {
  questions: Question[];
  lessonId: number;
  onAnswersSubmit: (answers: Answer[]) => void;
  isSubmitted?: boolean;
  submittedAnswers?: Answer[];
  isReadOnly?: boolean;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  questions,
  lessonId,
  onAnswersSubmit,
  isSubmitted = false,
  submittedAnswers = [],
  isReadOnly = false
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<{ [key: number]: File[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Инициализация ответов при загрузке
  React.useEffect(() => {
    if (submittedAnswers.length > 0) {
      setAnswers(submittedAnswers);
    } else {
      const initialAnswers = questions.map(question => ({
        question_id: question.id,
        text_answer: '',
        selected_options: [],
        attached_files: []
      }));
      setAnswers(initialAnswers);
    }
  }, [questions, submittedAnswers]);

  const handleTextAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => prev.map(answer => 
      answer.question_id === questionId 
        ? { ...answer, text_answer: value }
        : answer
    ));
  };

  const handleOptionSelect = (questionId: number, optionIndex: number, isMultiple: boolean) => {
    setAnswers(prev => prev.map(answer => {
      if (answer.question_id === questionId) {
        if (isMultiple) {
          const currentOptions = answer.selected_options || [];
          const newOptions = currentOptions.includes(optionIndex)
            ? currentOptions.filter(opt => opt !== optionIndex)
            : [...currentOptions, optionIndex];
          return { ...answer, selected_options: newOptions };
        } else {
          return { ...answer, selected_options: [optionIndex] };
        }
      }
      return answer;
    }));
  };

  const handleFileAttach = (questionId: number, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (file.size > maxSize) {
        alert(`Файл ${file.name} слишком большой. Максимальный размер: 5MB`);
        return false;
      }
      
      if (!validTypes.includes(file.type)) {
        alert(`Файл ${file.name} имеет неподдерживаемый формат. Разрешены: JPG, PNG, PDF, DOCX`);
        return false;
      }
      
      return true;
    });

    setAttachedFiles(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), ...validFiles]
    }));

    setAnswers(prev => prev.map(answer => 
      answer.question_id === questionId 
        ? { ...answer, attached_files: [...(answer.attached_files || []), ...validFiles] }
        : answer
    ));
  };

  const handleFileRemove = (questionId: number, fileIndex: number) => {
    setAttachedFiles(prev => ({
      ...prev,
      [questionId]: prev[questionId]?.filter((_, index) => index !== fileIndex) || []
    }));

    setAnswers(prev => prev.map(answer => 
      answer.question_id === questionId 
        ? { 
            ...answer, 
            attached_files: answer.attached_files?.filter((_, index) => index !== fileIndex) || []
          }
        : answer
    ));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Проверяем обязательные вопросы
      const requiredQuestions = questions.filter(q => q.required);
      const hasAllRequired = requiredQuestions.every(question => {
        const answer = answers.find(a => a.question_id === question.id);
        if (question.type === 'open') {
          return answer?.text_answer?.trim();
        } else {
          return answer?.selected_options && answer.selected_options.length > 0;
        }
      });

      if (!hasAllRequired) {
        alert('Пожалуйста, ответьте на все обязательные вопросы');
        return;
      }

      await onAnswersSubmit(answers);
    } catch (error) {
      console.error('Ошибка при отправке ответов:', error);
      alert('Произошла ошибка при отправке ответов');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'open': return 'Открытый вопрос';
      case 'single_choice': return 'Один правильный ответ';
      case 'multiple_choice': return 'Несколько правильных ответов';
      default: return type;
    }
  };

  const getAnswerForQuestion = (questionId: number) => {
    return answers.find(a => a.question_id === questionId);
  };

  const getSubmittedAnswerForQuestion = (questionId: number) => {
    return submittedAnswers.find(a => a.question_id === questionId);
  };

  if (questions.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        В этом уроке нет вопросов для ответа
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#f8fafc', 
        border: '1px solid #e2e8f0', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          color: '#1e293b', 
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Вопросы к уроку
        </h3>
        <p style={{ 
          margin: '0', 
          color: '#64748b', 
          fontSize: '14px'
        }}>
          Ответьте на вопросы для закрепления материала
        </p>
      </div>

      {questions.map((question, index) => {
        const answer = getAnswerForQuestion(question.id);
        const submittedAnswer = getSubmittedAnswerForQuestion(question.id);
        const currentAnswer = isSubmitted ? submittedAnswer : answer;

        return (
          <div key={question.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginRight: '10px'
                }}>
                  {index + 1}
                </span>
                <span style={{
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {getQuestionTypeLabel(question.type)}
                </span>
                {question.required && (
                  <span style={{
                    color: '#ef4444',
                    marginLeft: '8px',
                    fontSize: '14px'
                  }}>
                    *
                  </span>
                )}
              </div>
              
              <h4 style={{
                margin: '0 0 15px 0',
                color: '#1e293b',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '1.4'
              }}>
                {question.text}
              </h4>
            </div>

            {/* Открытый вопрос */}
            {question.type === 'open' && (
              <div>
                <textarea
                  value={currentAnswer?.text_answer || ''}
                  onChange={(e) => !isReadOnly && handleTextAnswerChange(question.id, e.target.value)}
                  placeholder="Введите ваш ответ..."
                  disabled={isReadOnly}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    backgroundColor: isReadOnly ? '#f9fafb' : 'white'
                  }}
                />
              </div>
            )}

            {/* Вопрос с выбором */}
            {(question.type === 'single_choice' || question.type === 'multiple_choice') && question.options && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 0',
                    cursor: isReadOnly ? 'default' : 'pointer'
                  }}>
                    <input
                      type={question.type === 'single_choice' ? 'radio' : 'checkbox'}
                      name={`question-${question.id}`}
                      checked={currentAnswer?.selected_options?.includes(optionIndex) || false}
                      onChange={() => !isReadOnly && handleOptionSelect(question.id, optionIndex, question.type === 'multiple_choice')}
                      disabled={isReadOnly}
                      style={{
                        marginRight: '10px',
                        transform: 'scale(1.1)'
                      }}
                    />
                    <span style={{
                      color: '#374151',
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Прикрепление файлов */}
            <div style={{ marginTop: '15px' }}>
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
                accept=".jpg,.jpeg,.png,.pdf,.docx"
                onChange={(e) => !isReadOnly && handleFileAttach(question.id, e.target.files)}
                disabled={isReadOnly}
                style={{
                  display: 'none'
                }}
                id={`file-input-${question.id}`}
              />
              
              <label
                htmlFor={`file-input-${question.id}`}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: isReadOnly ? '#f3f4f6' : '#3b82f6',
                  color: isReadOnly ? '#9ca3af' : 'white',
                  borderRadius: '6px',
                  cursor: isReadOnly ? 'default' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  marginBottom: '10px'
                }}
              >
                Выбрать файлы
              </label>

              {/* Список прикрепленных файлов */}
              {(currentAnswer?.attached_files && currentAnswer.attached_files.length > 0) && (
                <div style={{ marginTop: '10px' }}>
                  <p style={{
                    margin: '0 0 8px 0',
                    color: '#6b7280',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    Прикрепленные файлы:
                  </p>
                  {currentAnswer.attached_files.map((file, fileIndex) => (
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
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => handleFileRemove(question.id, fileIndex)}
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
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Кнопка отправки */}
      {!isSubmitted && !isReadOnly && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
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
            {isSubmitting ? 'Отправка...' : 'Отправить ответы'}
          </button>
        </div>
      )}

      {/* Статус отправки */}
      {isSubmitted && (
        <div style={{
          backgroundColor: '#d1fae5',
          border: '1px solid #a7f3d0',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            margin: '0',
            color: '#065f46',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✓ Ответы отправлены на проверку
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer; 