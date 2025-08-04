import React, { useState } from 'react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'pending' | 'submitted' | 'completed';
  course: string;
  instructor: string;
  submittedAt: string | null;
  grade: number | null;
  feedback: string | null;
  attachments: string[];
  type: string;
}

const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Практическое задание: Основы композиции',
      course: 'Фотография для начинающих',
      instructor: 'Анна Петрова',
      description: 'Создайте серию из 5 фотографий, демонстрирующих различные правила композиции: правило третей, симметрию, ведущие линии.',
      dueDate: '2024-02-15',
      status: 'pending',
      submittedAt: null,
      grade: null,
      feedback: null,
      attachments: ['assignment_1.pdf'],
      type: 'practical'
    },
    {
      id: 2,
      title: 'Теоретический тест: Экспозиция',
      course: 'Фотография для начинающих',
      instructor: 'Анна Петрова',
      description: 'Пройдите тест по основам экспозиции. Вопросы касаются диафрагмы, выдержки и ISO.',
      dueDate: '2024-02-10',
      status: 'completed',
      submittedAt: '2024-02-08T14:30:00',
      grade: 85,
      feedback: 'Отличная работа! Хорошо усвоены основы экспозиции.',
      attachments: [],
      type: 'test'
    },
    {
      id: 3,
      title: 'Портретная съемка: Работа со светом',
      course: 'Портретная съемка',
      instructor: 'Михаил Сидоров',
      description: 'Создайте портрет с использованием естественного света. Обратите внимание на направление света и тени.',
      dueDate: '2024-02-20',
      status: 'in_progress',
      submittedAt: null,
      grade: null,
      feedback: null,
      attachments: ['portrait_guidelines.pdf'],
      type: 'practical'
    },
    {
      id: 4,
      title: 'Анализ фотографий',
      course: 'Портретная съемка',
      instructor: 'Михаил Сидоров',
      description: 'Проанализируйте 3 портретные фотографии известных фотографов. Опишите технические и художественные приемы.',
      dueDate: '2024-02-12',
      status: 'completed',
      submittedAt: '2024-02-11T16:45:00',
      grade: 92,
      feedback: 'Глубокий анализ! Хорошо подмечены детали и техники.',
      attachments: ['analysis_template.docx'],
      type: 'analysis'
    },
    {
      id: 5,
      title: 'Студийная съемка: Настройка оборудования',
      course: 'Студийная съемка',
      instructor: 'Елена Козлова',
      description: 'Изучите инструкции по настройке студийного оборудования и создайте схему освещения.',
      dueDate: '2024-02-25',
      status: 'not_started',
      submittedAt: null,
      grade: null,
      feedback: null,
      attachments: ['studio_setup.pdf', 'lighting_schemes.pdf'],
      type: 'practical'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionText, setSubmissionText] = useState('');

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#48bb78';
      case 'in_progress': return '#ed8936';
      case 'pending': return '#667eea';
      case 'not_started': return '#a0aec0';
      default: return '#a0aec0';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in_progress': return 'В работе';
      case 'pending': return 'Ожидает проверки';
      case 'not_started': return 'Не начато';
      default: return 'Неизвестно';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'practical': return '📸';
      case 'test': return '✅';
      case 'analysis': return '📝';
      default: return '📋';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const handleSubmitAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
  };

  const handleViewDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedAssignment || !submissionText.trim()) return;
    
    setIsLoading(true);
    
    // Имитация отправки задания
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Обновляем статус задания
    setAssignments(prev => prev.map(assignment => 
      assignment.id === selectedAssignment.id 
        ? { 
            ...assignment, 
            status: 'pending',
            submittedAt: new Date().toISOString()
          }
        : assignment
    ));
    
    setIsLoading(false);
    setSubmitSuccess(true);
    setShowSubmitModal(false);
    setSubmissionText('');
    
    // Скрываем сообщение об успехе через 3 секунды
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div>
      <div style={{
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2d3748',
          marginBottom: '10px'
        }}>
          Домашние задания
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#718096',
          margin: 0
        }}>
          Выполняйте задания и отслеживайте свой прогресс
        </p>
      </div>

      {/* Фильтры */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              background: filter === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f7fafc',
              color: filter === 'all' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Все задания ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('not_started')}
            style={{
              background: filter === 'not_started' ? 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)' : '#f7fafc',
              color: filter === 'not_started' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Не начатые ({assignments.filter(a => a.status === 'not_started').length})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            style={{
              background: filter === 'in_progress' ? 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)' : '#f7fafc',
              color: filter === 'in_progress' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            В работе ({assignments.filter(a => a.status === 'in_progress').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              background: filter === 'pending' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f7fafc',
              color: filter === 'pending' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Ожидают проверки ({assignments.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              background: filter === 'completed' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : '#f7fafc',
              color: filter === 'completed' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Завершенные ({assignments.filter(a => a.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Список заданий */}
      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '24px',
                  marginRight: '15px'
                }}>
                  {getTypeIcon(assignment.type)}
                </span>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '0 0 5px 0'
                  }}>
                    {assignment.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    {assignment.course} • {assignment.instructor}
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getStatusText(assignment.status)}
                </span>
                {assignment.grade && (
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {assignment.grade}/100
                  </span>
                )}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 15px 0',
                lineHeight: '1.5'
              }}>
                {assignment.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Срок сдачи:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: isOverdue(assignment.dueDate) ? '#e53e3e' : '#4a5568',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {formatDate(assignment.dueDate)}
                    {isOverdue(assignment.dueDate) && ' (Просрочено)'}
                  </p>
                </div>
                
                {assignment.submittedAt && (
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: '0 0 3px 0'
                    }}>
                      Сдано:
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      margin: 0
                    }}>
                      {formatDate(assignment.submittedAt)}
                    </p>
                  </div>
                )}

                {assignment.attachments.length > 0 && (
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: '0 0 3px 0'
                    }}>
                      Материалы:
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px'
                    }}>
                      {assignment.attachments.map((file, index) => (
                        <span key={index} style={{
                          background: '#f7fafc',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          color: '#4a5568',
                          border: '1px solid #e2e8f0'
                        }}>
                          📎 {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {assignment.feedback && (
                <div style={{
                  background: '#f7fafc',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px'
                }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 5px 0',
                    fontWeight: 'bold'
                  }}>
                    Обратная связь:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {assignment.feedback}
                  </p>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                {assignment.status === 'not_started' && (
                  <button style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1,
                    transition: 'all 0.3s ease'
                  }}>
                    Начать выполнение
                  </button>
                )}
                
                {assignment.status === 'in_progress' && (
                  <button 
                    onClick={() => handleSubmitAssignment(assignment)}
                    style={{
                      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      flex: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Сдать задание
                  </button>
                )}
                
                {assignment.status === 'completed' && (
                  <button 
                    onClick={() => handleViewDetails(assignment)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      flex: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Просмотреть детали
                  </button>
                )}
                
                <button style={{
                  background: '#f7fafc',
                  color: '#4a5568',
                  border: '1px solid #e2e8f0',
                  padding: '10px 15px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  💬
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginTop: '30px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2d3748',
          marginBottom: '20px'
        }}>
          Статистика заданий
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#667eea',
              marginBottom: '5px'
            }}>
              {assignments.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Всего заданий
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#48bb78',
              marginBottom: '5px'
            }}>
              {assignments.filter(a => a.status === 'completed').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Завершенных
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#ed8936',
              marginBottom: '5px'
            }}>
              {assignments.filter(a => a.status === 'in_progress').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              В работе
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#e53e3e',
              marginBottom: '5px'
            }}>
              {assignments.filter(a => isOverdue(a.dueDate) && a.status !== 'completed').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Просроченных
            </div>
          </div>
        </div>
      </div>

      {/* Уведомление об успешной отправке */}
      {submitSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Задание успешно отправлено!
          </span>
        </div>
      )}

      {/* Модальное окно для отправки задания */}
      {selectedAssignment && showSubmitModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90%',
            overflowY: 'auto',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '15px'
            }}>
              Отправить задание
            </h2>
            <h3 style={{
              fontSize: '18px',
              color: '#4a5568',
              marginBottom: '20px'
            }}>
              {selectedAssignment.title}
            </h3>
            <div style={{
              background: '#f7fafc',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#4a5568',
                margin: '0 0 10px 0'
              }}>
                {selectedAssignment.description}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#a0aec0',
                margin: 0
              }}>
                Срок сдачи: {formatDate(selectedAssignment.dueDate)}
              </p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Ваш ответ:
              </label>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Опишите выполненную работу или прикрепите ссылку на файлы..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleSubmit}
                disabled={isLoading || !submissionText.trim()}
              >
                {isLoading ? 'Отправка...' : 'Отправить'}
              </button>
              <button
                style={{
                  background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setShowSubmitModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для просмотра деталей */}
      {selectedAssignment && showDetailsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90%',
            overflowY: 'auto',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '15px'
            }}>
              {selectedAssignment.title}
            </h2>
            <div style={{
              background: '#f7fafc',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#4a5568',
                margin: '0 0 15px 0',
                lineHeight: '1.6'
              }}>
                {selectedAssignment.description}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                fontSize: '14px'
              }}>
                <div>
                  <span style={{ color: '#a0aec0' }}>Курс:</span>
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                    {selectedAssignment.course}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#a0aec0' }}>Инструктор:</span>
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                    {selectedAssignment.instructor}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#a0aec0' }}>Срок сдачи:</span>
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                    {formatDate(selectedAssignment.dueDate)}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#a0aec0' }}>Тип:</span>
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                    {getTypeIcon(selectedAssignment.type)} {selectedAssignment.type}
                  </div>
                </div>
              </div>
            </div>
            {selectedAssignment.grade && (
              <div style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: '5px'
                }}>
                  {selectedAssignment.grade}/100
                </div>
                <div style={{
                  fontSize: '16px',
                  opacity: 0.9
                }}>
                  Оценка
                </div>
              </div>
            )}
            {selectedAssignment.feedback && (
              <div style={{
                background: '#f7fafc',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '10px'
                }}>
                  Отзыв инструктора:
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#4a5568',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {selectedAssignment.feedback}
                </p>
              </div>
            )}
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onClick={() => setShowDetailsModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage; 