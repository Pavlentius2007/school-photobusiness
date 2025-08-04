import React, { useState } from 'react';
import { LessonQuestion, LessonAssignment, LessonTest } from '../../data/coursesData';

interface LessonInteractiveManagerProps {
  questions?: LessonQuestion[];
  assignment?: LessonAssignment;
  test?: LessonTest;
  onQuestionsChange: (questions: LessonQuestion[]) => void;
  onAssignmentChange: (assignment: LessonAssignment | undefined) => void;
  onTestChange: (test: LessonTest | undefined) => void;
}

const LessonInteractiveManager: React.FC<LessonInteractiveManagerProps> = ({
  questions = [],
  assignment,
  test,
  onQuestionsChange,
  onAssignmentChange,
  onTestChange
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'assignment' | 'test'>('questions');

  // Управление вопросами
  const handleAddQuestion = () => {
    const newQuestion: LessonQuestion = {
      id: Date.now(),
      text: '',
      type: 'open',
      required: true,
      order_index: questions.length + 1,
      points: 1
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (questionId: number, field: keyof LessonQuestion, value: any) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    );
    onQuestionsChange(updatedQuestions);
  };

  const handleDeleteQuestion = (questionId: number) => {
    onQuestionsChange(questions.filter(q => q.id !== questionId));
  };

  const handleAddQuestionOption = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...(question.options || []), ''];
      handleUpdateQuestion(questionId, 'options', newOptions);
    }
  };

  const handleUpdateQuestionOption = (questionId: number, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      handleUpdateQuestion(questionId, 'options', newOptions);
    }
  };

  const handleDeleteQuestionOption = (questionId: number, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      handleUpdateQuestion(questionId, 'options', newOptions);
    }
  };

  // Управление заданием
  const handleCreateAssignment = () => {
    const newAssignment: LessonAssignment = {
      id: Date.now(),
      title: 'Новое задание',
      description: '',
      max_score: 10,
      created_at: new Date().toISOString()
    };
    onAssignmentChange(newAssignment);
  };

  const handleUpdateAssignment = (field: keyof LessonAssignment, value: any) => {
    if (assignment) {
      onAssignmentChange({ ...assignment, [field]: value });
    }
  };

  const handleDeleteAssignment = () => {
    onAssignmentChange(undefined);
  };

  // Управление тестом
  const handleCreateTest = () => {
    const newTest: LessonTest = {
      id: Date.now(),
      title: 'Новый тест',
      description: '',
      passing_score: 70,
      max_score: 100,
      questions: []
    };
    onTestChange(newTest);
  };

  const handleUpdateTest = (field: keyof LessonTest, value: any) => {
    if (test) {
      onTestChange({ ...test, [field]: value });
    }
  };

  const handleDeleteTest = () => {
    onTestChange(undefined);
  };

  const handleAddTestQuestion = () => {
    if (test) {
      const newQuestion: LessonQuestion = {
        id: Date.now(),
        text: '',
        type: 'single_choice',
        options: [''],
        required: true,
        order_index: test.questions.length + 1,
        points: 1
      };
      handleUpdateTest('questions', [...test.questions, newQuestion]);
    }
  };

  const handleUpdateTestQuestion = (questionId: number, field: keyof LessonQuestion, value: any) => {
    if (test) {
      const updatedQuestions = test.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      );
      handleUpdateTest('questions', updatedQuestions);
    }
  };

  const handleDeleteTestQuestion = (questionId: number) => {
    if (test) {
      const updatedQuestions = test.questions.filter(q => q.id !== questionId);
      handleUpdateTest('questions', updatedQuestions);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        marginBottom: '20px',
        color: '#374151'
      }}>
        Интерактивные элементы урока
      </h3>

      {/* Табы */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '20px'
      }}>
        {[
          { key: 'questions', label: `Вопросы (${questions.length})` },
          { key: 'assignment', label: assignment ? 'Задание ✓' : 'Задание' },
          { key: 'test', label: test ? 'Тест ✓' : 'Тест' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === tab.key ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === tab.key ? '600' : '400',
              fontSize: '14px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Содержимое табов */}
      {activeTab === 'questions' && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h4 style={{ margin: '0', color: '#374151' }}>
              Вопросы для обсуждения ({questions.length})
            </h4>
            <button
              onClick={handleAddQuestion}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              + Добавить вопрос
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151' 
                }}>
                  Вопрос {index + 1}
                </span>
                <button
                  onClick={() => handleDeleteQuestion(question.id)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Удалить
                </button>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Текст вопроса:
                </label>
                <textarea
                  value={question.text}
                  onChange={(e) => handleUpdateQuestion(question.id, 'text', e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="Введите текст вопроса..."
                />
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 100px',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Тип вопроса:
                  </label>
                  <select
                    value={question.type}
                    onChange={(e) => handleUpdateQuestion(question.id, 'type', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="open">Открытый ответ</option>
                    <option value="single_choice">Один вариант</option>
                    <option value="multiple_choice">Несколько вариантов</option>
                  </select>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Баллы:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={question.points}
                    onChange={(e) => handleUpdateQuestion(question.id, 'points', parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginTop: '25px'
                  }}>
                    <input
                      type="checkbox"
                      checked={question.required}
                      onChange={(e) => handleUpdateQuestion(question.id, 'required', e.target.checked)}
                      style={{ marginRight: '8px' }}
                    />
                    Обязательный
                  </label>
                </div>
              </div>

              {/* Варианты ответов для вопросов с выбором */}
              {(question.type === 'single_choice' || question.type === 'multiple_choice') && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <label style={{ 
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Варианты ответов:
                    </label>
                    <button
                      onClick={() => handleAddQuestionOption(question.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      + Вариант
                    </button>
                  </div>
                  
                  {(question.options || []).map((option, optionIndex) => (
                    <div key={optionIndex} style={{ 
                      display: 'flex', 
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleUpdateQuestionOption(question.id, optionIndex, e.target.value)}
                        placeholder={`Вариант ${optionIndex + 1}`}
                        style={{
                          flex: '1',
                          padding: '6px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                      <button
                        onClick={() => handleDeleteQuestionOption(question.id, optionIndex)}
                        style={{
                          padding: '6px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {questions.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Вопросы не добавлены
            </div>
          )}
        </div>
      )}

      {activeTab === 'assignment' && (
        <div>
          {!assignment ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                Домашнее задание не создано
              </p>
              <button
                onClick={handleCreateAssignment}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Создать задание
              </button>
            </div>
          ) : (
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h4 style={{ margin: '0', color: '#374151' }}>
                  Настройки задания
                </h4>
                <button
                  onClick={handleDeleteAssignment}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Удалить задание
                </button>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Название задания:
                  </label>
                  <input
                    type="text"
                    value={assignment.title}
                    onChange={(e) => handleUpdateAssignment('title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Максимальный балл:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={assignment.max_score}
                    onChange={(e) => handleUpdateAssignment('max_score', parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Срок сдачи (опционально):
                </label>
                <input
                  type="datetime-local"
                  value={assignment.due_date ? assignment.due_date.slice(0, 16) : ''}
                  onChange={(e) => handleUpdateAssignment('due_date', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Описание задания:
                </label>
                <textarea
                  value={assignment.description}
                  onChange={(e) => handleUpdateAssignment('description', e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="Опишите задание подробно..."
                />
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'test' && (
        <div>
          {!test ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                Тест для проверки знаний не создан
              </p>
              <button
                onClick={handleCreateTest}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Создать тест
              </button>
            </div>
          ) : (
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h4 style={{ margin: '0', color: '#374151' }}>
                  Настройки теста ({test.questions.length} вопросов)
                </h4>
                <button
                  onClick={handleDeleteTest}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Удалить тест
                </button>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Название теста:
                  </label>
                  <input
                    type="text"
                    value={test.title}
                    onChange={(e) => handleUpdateTest('title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Время на прохождение (мин):
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={test.time_limit_minutes || ''}
                    onChange={(e) => handleUpdateTest('time_limit_minutes', e.target.value ? parseInt(e.target.value) : undefined)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    placeholder="Без ограничения"
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Проходной балл:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={test.max_score}
                    value={test.passing_score}
                    onChange={(e) => handleUpdateTest('passing_score', parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Максимальный балл:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={test.max_score}
                    onChange={(e) => handleUpdateTest('max_score', parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Описание теста:
                </label>
                <textarea
                  value={test.description}
                  onChange={(e) => handleUpdateTest('description', e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                  placeholder="Описание теста..."
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h5 style={{ margin: '0', color: '#374151' }}>
                  Вопросы теста ({test.questions.length})
                </h5>
                <button
                  onClick={handleAddTestQuestion}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  + Добавить вопрос
                </button>
              </div>

              {test.questions.map((question, index) => (
                <div key={question.id} style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: 'white'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>
                      Вопрос {index + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteTestQuestion(question.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Удалить
                    </button>
                  </div>

                  <textarea
                    value={question.text}
                    onChange={(e) => handleUpdateTestQuestion(question.id, 'text', e.target.value)}
                    placeholder="Текст вопроса..."
                    style={{
                      width: '100%',
                      minHeight: '60px',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px',
                      marginBottom: '10px'
                    }}
                  />

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 80px',
                    gap: '10px'
                  }}>
                    <select
                      value={question.type}
                      onChange={(e) => handleUpdateTestQuestion(question.id, 'type', e.target.value)}
                      style={{
                        padding: '6px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    >
                      <option value="single_choice">Один вариант</option>
                      <option value="multiple_choice">Несколько вариантов</option>
                      <option value="open">Открытый ответ</option>
                    </select>

                    <input
                      type="number"
                      min="1"
                      value={question.points}
                      onChange={(e) => handleUpdateTestQuestion(question.id, 'points', parseInt(e.target.value))}
                      placeholder="Баллы"
                      style={{
                        padding: '6px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />

                    <label style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '12px'
                    }}>
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => handleUpdateTestQuestion(question.id, 'required', e.target.checked)}
                        style={{ marginRight: '4px' }}
                      />
                      Обязат.
                    </label>
                  </div>
                </div>
              ))}

              {test.questions.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: '#6b7280',
                  fontSize: '14px',
                  border: '1px dashed #d1d5db',
                  borderRadius: '6px'
                }}>
                  Вопросы не добавлены
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonInteractiveManager;