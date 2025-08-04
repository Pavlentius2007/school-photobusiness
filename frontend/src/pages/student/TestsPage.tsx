import React, { useState } from 'react';

interface Test {
  id: number;
  title: string;
  course: string;
  instructor: string;
  description: string;
  questions: number;
  timeLimit: number;
  passingScore: number;
  status: string;
  score: number | null;
  maxScore: number;
  completedAt: string | null;
  attempts: number;
  certificate: boolean;
}

const TestsPage: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: 1,
      title: 'Тест: Основы экспозиции',
      course: 'Фотография для начинающих',
      instructor: 'Анна Петрова',
      description: 'Проверьте свои знания основ экспозиции: диафрагма, выдержка, ISO.',
      questions: 20,
      timeLimit: 30,
      passingScore: 70,
      status: 'completed',
      score: 85,
      maxScore: 100,
      completedAt: '2024-02-08T14:30:00',
      attempts: 1,
      certificate: true
    },
    {
      id: 2,
      title: 'Тест: Композиция в фотографии',
      course: 'Фотография для начинающих',
      instructor: 'Анна Петрова',
      description: 'Изучите правила композиции и их применение в фотографии.',
      questions: 15,
      timeLimit: 25,
      passingScore: 75,
      status: 'available',
      score: null,
      maxScore: 100,
      completedAt: null,
      attempts: 0,
      certificate: false
    },
    {
      id: 3,
      title: 'Тест: Портретная съемка',
      course: 'Портретная съемка',
      instructor: 'Михаил Сидоров',
      description: 'Проверьте знания по портретной съемке: свет, позирование, психология.',
      questions: 25,
      timeLimit: 40,
      passingScore: 80,
      status: 'in_progress',
      score: null,
      maxScore: 100,
      completedAt: null,
      attempts: 1,
      certificate: false
    },
    {
      id: 4,
      title: 'Тест: Студийное оборудование',
      course: 'Студийная съемка',
      instructor: 'Елена Козлова',
      description: 'Изучите виды студийного оборудования и их применение.',
      questions: 18,
      timeLimit: 30,
      passingScore: 70,
      status: 'locked',
      score: null,
      maxScore: 100,
      completedAt: null,
      attempts: 0,
      certificate: false
    },
    {
      id: 5,
      title: 'Тест: Постобработка фотографий',
      course: 'Портретная съемка',
      instructor: 'Михаил Сидоров',
      description: 'Основы постобработки: цветокоррекция, ретушь, стилизация.',
      questions: 22,
      timeLimit: 35,
      passingScore: 75,
      status: 'available',
      score: null,
      maxScore: 100,
      completedAt: null,
      attempts: 0,
      certificate: false
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const filteredTests = tests.filter(test => {
    if (filter === 'all') return true;
    return test.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#48bb78';
      case 'in_progress': return '#ed8936';
      case 'available': return '#667eea';
      case 'locked': return '#a0aec0';
      default: return '#a0aec0';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'in_progress': return 'В процессе';
      case 'available': return 'Доступен';
      case 'locked': return 'Заблокирован';
      default: return 'Неизвестно';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getScoreColor = (score: number, passingScore: number) => {
    if (score >= passingScore) return '#48bb78';
    return '#e53e3e';
  };

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    setShowTestModal(true);
  };

  const handleViewResults = (test: Test) => {
    setSelectedTest(test);
    setShowResultsModal(true);
  };

  const handleCompleteTest = async () => {
    if (!selectedTest) return;
    
    setIsLoading(true);
    
    // Имитация прохождения теста
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Генерируем случайный результат
    const newScore = Math.floor(Math.random() * 40) + 60; // 60-100 баллов
    const isPassed = newScore >= selectedTest.passingScore;
    
    // Обновляем тест
    setTests(prev => prev.map(test => 
      test.id === selectedTest.id 
        ? { 
            ...test, 
            status: 'completed',
            score: newScore,
            completedAt: new Date().toISOString(),
            attempts: test.attempts + 1
          }
        : test
    ));
    
    setIsLoading(false);
    setTestSuccess(true);
    setShowTestModal(false);
    
    // Скрываем сообщение об успехе через 3 секунды
    setTimeout(() => setTestSuccess(false), 3000);
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
          Тесты
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#718096',
          margin: 0
        }}>
          Проверяйте свои знания и получайте сертификаты
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
            Все тесты ({tests.length})
          </button>
          <button
            onClick={() => setFilter('available')}
            style={{
              background: filter === 'available' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f7fafc',
              color: filter === 'available' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Доступные ({tests.filter(t => t.status === 'available').length})
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
            В процессе ({tests.filter(t => t.status === 'in_progress').length})
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
            Завершенные ({tests.filter(t => t.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('locked')}
            style={{
              background: filter === 'locked' ? 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)' : '#f7fafc',
              color: filter === 'locked' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Заблокированные ({tests.filter(t => t.status === 'locked').length})
          </button>
        </div>
      </div>

      {/* Список тестов */}
      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {filteredTests.map(test => (
          <div key={test.id} style={{
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
                  ✅
                </span>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '0 0 5px 0'
                  }}>
                    {test.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    {test.course} • {test.instructor}
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
                  {getStatusText(test.status)}
                </span>
                {test.score && (
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: getScoreColor(test.score, test.passingScore)
                  }}>
                    {test.score}/{test.maxScore}
                  </span>
                )}
                {test.certificate && (
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    🏆 Сертификат
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
                {test.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Вопросов:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {test.questions}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Время:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0
                  }}>
                    {test.timeLimit} мин
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Проходной балл:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0
                  }}>
                    {test.passingScore}%
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Попыток:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0
                  }}>
                    {test.attempts}
                  </p>
                </div>
                {test.completedAt && (
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: '0 0 3px 0'
                    }}>
                      Завершен:
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      margin: 0
                    }}>
                      {formatDate(test.completedAt)}
                    </p>
                  </div>
                )}
              </div>

              {test.score && (
                <div style={{
                  background: '#f7fafc',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#4a5568'
                    }}>
                      Результат:
                    </span>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: getScoreColor(test.score, test.passingScore)
                    }}>
                      {test.score}/{test.maxScore} ({Math.round((test.score / test.maxScore) * 100)}%)
                    </span>
                  </div>
                  <div style={{
                    background: '#e2e8f0',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: getScoreColor(test.score, test.passingScore),
                      height: '100%',
                      width: `${(test.score / test.maxScore) * 100}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '5px 0 0 0'
                  }}>
                    Проходной балл: {test.passingScore}%
                  </p>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                {test.status === 'available' && (
                  <button 
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
                    onClick={() => handleStartTest(test)}
                  >
                    Начать тест
                  </button>
                )}
                
                {test.status === 'in_progress' && (
                  <button 
                    style={{
                      background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
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
                    onClick={() => handleStartTest(test)}
                  >
                    Продолжить тест
                  </button>
                )}
                
                {test.status === 'completed' && (
                  <button 
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
                    onClick={() => handleViewResults(test)}
                  >
                    Просмотреть результаты
                  </button>
                )}
                
                {test.status === 'locked' && (
                  <button 
                    disabled
                    style={{
                      background: '#a0aec0',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'not-allowed',
                      flex: 1,
                      opacity: 0.6
                    }}
                  >
                    Заблокирован
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
                  📊
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
          Статистика тестов
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
              {tests.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Всего тестов
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
              {tests.filter(t => t.status === 'completed').length}
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
              {tests.filter(t => t.certificate).length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Сертификатов
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
              color: '#9f7aea',
              marginBottom: '5px'
            }}>
              {Math.round(tests.filter(t => t.score).reduce((acc, test) => acc + (test.score || 0), 0) / tests.filter(t => t.score).length)}%
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Средний балл
            </div>
          </div>
        </div>
      </div>

      {/* Уведомление об успешном прохождении теста */}
      {testSuccess && (
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
            Тест успешно пройден!
          </span>
        </div>
      )}

      {/* Модальное окно для прохождения теста */}
      {selectedTest && showTestModal && (
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
            textAlign: 'center',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '15px'
            }}>
              {selectedTest.title}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              marginBottom: '20px'
            }}>
              {selectedTest.description}
            </p>
            <div style={{
              background: '#f7fafc',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                textAlign: 'left'
              }}>
                <div>
                  <span style={{ fontSize: '14px', color: '#a0aec0' }}>Вопросов:</span>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>
                    {selectedTest.questions}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '14px', color: '#a0aec0' }}>Время:</span>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>
                    {selectedTest.timeLimit} мин
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '14px', color: '#a0aec0' }}>Проходной балл:</span>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>
                    {selectedTest.passingScore}%
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '14px', color: '#a0aec0' }}>Попыток:</span>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>
                    {selectedTest.attempts}
                  </div>
                </div>
              </div>
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
                onClick={handleCompleteTest}
                disabled={isLoading}
              >
                {isLoading ? 'Прохождение...' : 'Начать тест'}
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
                onClick={() => setShowTestModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для просмотра результатов */}
      {selectedTest && showResultsModal && (
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
            textAlign: 'center',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '15px'
            }}>
              Результаты теста
            </h2>
            <h3 style={{
              fontSize: '18px',
              color: '#4a5568',
              marginBottom: '20px'
            }}>
              {selectedTest.title}
            </h3>
            <div style={{
              background: '#f7fafc',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: getScoreColor(selectedTest.score || 0, selectedTest.passingScore),
                marginBottom: '10px'
              }}>
                {selectedTest.score}/{selectedTest.maxScore}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '10px'
              }}>
                {Math.round(((selectedTest.score || 0) / selectedTest.maxScore) * 100)}%
              </div>
              <div style={{
                background: '#e2e8f0',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '10px'
              }}>
                <div style={{
                  background: getScoreColor(selectedTest.score || 0, selectedTest.passingScore),
                  height: '100%',
                  width: `${((selectedTest.score || 0) / selectedTest.maxScore) * 100}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{
                fontSize: '14px',
                color: '#a0aec0'
              }}>
                Проходной балл: {selectedTest.passingScore}%
              </div>
            </div>
            {selectedTest.certificate && (
              <div style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                🏆 Сертификат получен!
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
                transition: 'all 0.3s ease'
              }}
              onClick={() => setShowResultsModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsPage; 