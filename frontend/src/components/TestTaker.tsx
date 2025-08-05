import React, { useState, useCallback } from 'react';

interface Question {
  id: number;
  text: string;
  type: 'open' | 'single_choice' | 'multiple_choice';
  options?: string[];
  correct_answers?: number[];
  points: number;
  order_index: number;
  required: boolean;
}

interface Test {
  id: number;
  title: string;
  description: string;
  time_limit_minutes?: number;
  passing_score: number;
  max_score: number;
  questions: Question[];
}

interface TestAnswer {
  question_id: number;
  text_answer?: string;
  selected_options?: number[];
  attached_files?: File[];
}

interface TestAttempt {
  id?: number;
  test_id: number;
  answers: TestAnswer[];
  score?: number;
  is_passed?: boolean;
  completed_at?: string;
  time_spent_minutes?: number;
}

interface TestTakerProps {
  test: Test;
  attempt?: TestAttempt;
  onSubmit: (attempt: TestAttempt) => void;
  isReadOnly?: boolean;
}

const TestTaker: React.FC<TestTakerProps> = ({
  test,
  attempt,
  onSubmit,
  isReadOnly = false
}) => {
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    test.time_limit_minutes ? test.time_limit_minutes * 60 : null
  );
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Инициализация ответов
  React.useEffect(() => {
    if (attempt?.answers && attempt.answers.length > 0) {
      setAnswers(attempt.answers);
    } else {
      const initialAnswers = test.questions.map(question => ({
        question_id: question.id,
        text_answer: '',
        selected_options: [],
        attached_files: []
      }));
      setAnswers(initialAnswers);
    }
  }, [test.questions, attempt]);

  // Таймер
  React.useEffect(() => {
    if (timeRemaining === null || isReadOnly) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isReadOnly]);

  // Запуск таймера при первом взаимодействии
  React.useEffect(() => {
    if (!startTime && !isReadOnly && test.time_limit_minutes) {
      setStartTime(new Date());
    }
  }, [isReadOnly, test.time_limit_minutes, startTime]);

  const handleAutoSubmit = useCallback(async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const timeSpent = startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 60000) : 0;
      
      const newAttempt: TestAttempt = {
        test_id: test.id,
        answers: answers,
        time_spent_minutes: timeSpent
      };

      await onSubmit(newAttempt);
    } catch (error) {
      console.error('Ошибка при автоматической отправке теста:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, startTime, test.id, answers, onSubmit]);

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

    setAnswers(prev => prev.map(answer => 
      answer.question_id === questionId 
        ? { ...answer, attached_files: [...(answer.attached_files || []), ...validFiles] }
        : answer
    ));
  };

  const handleFileRemove = (questionId: number, fileIndex: number) => {
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
    // Проверяем обязательные вопросы
    const requiredQuestions = test.questions.filter(q => q.required);
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

    setIsSubmitting(true);
    try {
      const timeSpent = startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 60000) : 0;
      
      const newAttempt: TestAttempt = {
        test_id: test.id,
        answers: answers,
        time_spent_minutes: timeSpent
      };

      await onSubmit(newAttempt);
    } catch (error) {
      console.error('Ошибка при отправке теста:', error);
      alert('Произошла ошибка при отправке теста');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'open': return 'Открытый ответ';
      case 'single_choice': return 'Один правильный ответ';
      case 'multiple_choice': return 'Несколько правильных ответов';
      default: return type;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = test.questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.question_id === currentQuestion.id);

  if (isReadOnly && attempt) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {/* Результаты теста */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            margin: '0 0 10px 0',
            color: '#1e293b',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Результаты теста: {test.title}
          </h2>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <div style={{
              backgroundColor: attempt.is_passed ? '#10b981' : '#ef4444',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {attempt.is_passed ? 'Тест пройден' : 'Тест не пройден'}
            </div>
            <div style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {attempt.score || 0}/{test.max_score} баллов
            </div>
          </div>

          <p style={{
            margin: '0',
            color: '#64748b',
            fontSize: '14px'
          }}>
            Проходной балл: {test.passing_score} из {test.max_score}
          </p>
        </div>

        {/* Ответы на вопросы */}
        {test.questions.map((question, index) => {
          const answer = attempt.answers.find(a => a.question_id === question.id);
          const isCorrect = question.correct_answers && answer?.selected_options;
          const isAnswerCorrect = isCorrect ? 
            JSON.stringify(question.correct_answers?.sort()) === JSON.stringify(answer.selected_options?.sort()) : 
            undefined;

          return (
            <div key={question.id} style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px'
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
                  {question.correct_answers && (
                    <span style={{
                      backgroundColor: isAnswerCorrect ? '#10b981' : '#ef4444',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      marginLeft: '8px'
                    }}>
                      {isAnswerCorrect ? 'Правильно' : 'Неправильно'}
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

              {/* Ответ студента */}
              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <p style={{
                  margin: '0 0 8px 0',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Ваш ответ:
                </p>
                
                {question.type === 'open' && (
                  <p style={{
                    margin: '0',
                    color: '#374151',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {answer?.text_answer || 'Ответ не дан'}
                  </p>
                )}

                {(question.type === 'single_choice' || question.type === 'multiple_choice') && question.options && (
                  <div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px 0'
                      }}>
                        <input
                          type={question.type === 'single_choice' ? 'radio' : 'checkbox'}
                          checked={answer?.selected_options?.includes(optionIndex) || false}
                          disabled
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Прикрепленные файлы */}
                {answer?.attached_files && answer.attached_files.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{
                      margin: '0 0 8px 0',
                      color: '#6b7280',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      Прикрепленные файлы:
                    </p>
                    {answer.attached_files.map((file, fileIndex) => (
                      <div key={fileIndex} style={{
                        padding: '4px 8px',
                        backgroundColor: '#f3f4f6',
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

              {/* Правильный ответ (если есть) */}
              {question.correct_answers && question.options && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '6px',
                  padding: '15px'
                }}>
                  <p style={{
                    margin: '0 0 8px 0',
                    color: '#166534',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Правильный ответ:
                  </p>
                  <div>
                    {question.correct_answers.map((correctIndex) => (
                      <div key={correctIndex} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px 0'
                      }}>
                        <input
                          type={question.type === 'single_choice' ? 'radio' : 'checkbox'}
                          checked={true}
                          disabled
                          style={{
                            marginRight: '10px',
                            transform: 'scale(1.1)'
                          }}
                        />
                        <span style={{
                          color: '#166534',
                          fontSize: '14px',
                          lineHeight: '1.4',
                          fontWeight: '500'
                        }}>
                          {question.options?.[correctIndex] || `Вариант ${correctIndex + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Заголовок теста */}
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
            {test.title}
          </h2>
          {timeRemaining !== null && (
            <div style={{
              backgroundColor: timeRemaining < 300 ? '#ef4444' : '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        <p style={{
          margin: '0 0 15px 0',
          color: '#374151',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          {test.description}
        </p>

        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#6b7280' }}>
          <span>Вопросов: {test.questions.length}</span>
          <span>Максимум баллов: {test.max_score}</span>
          <span>Проходной балл: {test.passing_score}</span>
          {test.time_limit_minutes && (
            <span>Время: {test.time_limit_minutes} мин</span>
          )}
        </div>
      </div>

      {/* Прогресс */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{
            color: '#374151',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Вопрос {currentQuestionIndex + 1} из {test.questions.length}
          </span>
          <span style={{
            color: '#6b7280',
            fontSize: '13px'
          }}>
            {Math.round(((currentQuestionIndex + 1) / test.questions.length) * 100)}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%`,
            height: '100%',
            backgroundColor: '#3b82f6',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Текущий вопрос */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
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
              {currentQuestionIndex + 1}
            </span>
            <span style={{
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {getQuestionTypeLabel(currentQuestion.type)}
            </span>
            {currentQuestion.required && (
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
            {currentQuestion.text}
          </h4>
        </div>

        {/* Открытый вопрос */}
        {currentQuestion.type === 'open' && (
          <div>
            <textarea
              value={currentAnswer?.text_answer || ''}
              onChange={(e) => handleTextAnswerChange(currentQuestion.id, e.target.value)}
              placeholder="Введите ваш ответ..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>
        )}

        {/* Вопрос с выбором */}
        {(currentQuestion.type === 'single_choice' || currentQuestion.type === 'multiple_choice') && currentQuestion.options && (
          <div>
            {currentQuestion.options.map((option, optionIndex) => (
              <label key={optionIndex} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 0',
                cursor: 'pointer'
              }}>
                <input
                  type={currentQuestion.type === 'single_choice' ? 'radio' : 'checkbox'}
                  name={`question-${currentQuestion.id}`}
                  checked={currentAnswer?.selected_options?.includes(optionIndex) || false}
                  onChange={() => handleOptionSelect(currentQuestion.id, optionIndex, currentQuestion.type === 'multiple_choice')}
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
            onChange={(e) => handleFileAttach(currentQuestion.id, e.target.files)}
            style={{
              display: 'none'
            }}
            id={`test-file-input-${currentQuestion.id}`}
          />
          
          <label
            htmlFor={`test-file-input-${currentQuestion.id}`}
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
                  <button
                    type="button"
                    onClick={() => handleFileRemove(currentQuestion.id, fileIndex)}
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
      </div>

      {/* Навигация */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          style={{
            backgroundColor: currentQuestionIndex === 0 ? '#f3f4f6' : '#3b82f6',
            color: currentQuestionIndex === 0 ? '#9ca3af' : 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: currentQuestionIndex === 0 ? 'default' : 'pointer'
          }}
        >
          ← Предыдущий
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {currentQuestionIndex < test.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Следующий →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isSubmitting ? 'default' : 'pointer'
              }}
            >
              {isSubmitting ? 'Отправка...' : 'Завершить тест'}
            </button>
          )}
        </div>
      </div>

      {/* Предупреждение о времени */}
      {timeRemaining !== null && timeRemaining < 300 && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            margin: '0',
            color: '#dc2626',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ⚠️ Внимание! До окончания теста осталось менее 5 минут
          </p>
        </div>
      )}
    </div>
  );
};

export default TestTaker; 