import React, { useState } from 'react';

const MessagesPage: React.FC = () => {
  const [messages] = useState([
    {
      id: 1,
      from: 'Анна Петрова',
      subject: 'Обратная связь по заданию',
      content: 'Отличная работа над заданием по композиции! Ваши фотографии демонстрируют хорошее понимание правил композиции. Особенно понравилась работа с ведущими линиями.',
      course: 'Фотография для начинающих',
      timestamp: '2024-02-10T14:30:00',
      read: false,
      type: 'feedback',
      priority: 'normal'
    },
    {
      id: 2,
      from: 'Система',
      subject: 'Новый урок доступен',
      content: 'Урок 8 "Работа со светом" курса "Фотография для начинающих" теперь доступен для изучения.',
      course: 'Фотография для начинающих',
      timestamp: '2024-02-09T10:15:00',
      read: true,
      type: 'system',
      priority: 'normal'
    },
    {
      id: 3,
      from: 'Михаил Сидоров',
      subject: 'Вопрос по портретной съемке',
      content: 'Здравствуйте! У вас есть вопросы по последнему уроку по портретной съемке? Готов помочь с любыми техническими моментами.',
      course: 'Портретная съемка',
      timestamp: '2024-02-08T16:45:00',
      read: false,
      type: 'instructor',
      priority: 'high'
    },
    {
      id: 4,
      from: 'Елена Козлова',
      subject: 'Напоминание о тесте',
      content: 'Напоминаю, что завтра состоится тест по студийному оборудованию. Убедитесь, что вы изучили все материалы.',
      course: 'Студийная съемка',
      timestamp: '2024-02-07T12:20:00',
      read: true,
      type: 'reminder',
      priority: 'high'
    },
    {
      id: 5,
      from: 'Система',
      subject: 'Сертификат получен',
      content: 'Поздравляем! Вы успешно завершили курс "Пейзажная фотография" и получили сертификат.',
      course: 'Пейзажная фотография',
      timestamp: '2024-02-06T09:30:00',
      read: true,
      type: 'certificate',
      priority: 'normal'
    },
    {
      id: 6,
      from: 'Дмитрий Волков',
      subject: 'Дополнительные материалы',
      content: 'Привет! Подготовил для вас дополнительные материалы по пейзажной съемке. Они помогут углубить знания по теме.',
      course: 'Пейзажная фотография',
      timestamp: '2024-02-05T15:10:00',
      read: true,
      type: 'materials',
      priority: 'normal'
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.type === filter;
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback': return '📝';
      case 'system': return '🔔';
      case 'instructor': return '👨‍🏫';
      case 'reminder': return '⏰';
      case 'certificate': return '🏆';
      case 'materials': return '📚';
      default: return '💬';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e53e3e';
      case 'normal': return '#667eea';
      case 'low': return '#a0aec0';
      default: return '#667eea';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Только что';
    if (diffInHours < 24) return `${diffInHours} ч назад`;
    if (diffInHours < 48) return 'Вчера';
    return date.toLocaleDateString('ru-RU');
  };

  const markAsRead = (messageId: number) => {
    // В реальном приложении здесь был бы API вызов
    console.log(`Marking message ${messageId} as read`);
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
          Сообщения
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#718096',
          margin: 0
        }}>
          Общайтесь с кураторами и получайте уведомления
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '30px'
      }}>
        {/* Список сообщений */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          {/* Заголовок и фильтры */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e2e8f0',
            background: '#f7fafc'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2d3748',
                margin: 0
              }}>
                Входящие ({messages.length})
              </h2>
              {unreadCount > 0 && (
                <span style={{
                  background: '#e53e3e',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {unreadCount}
                </span>
              )}
            </div>

            {/* Поиск */}
            <input
              type="text"
              placeholder="Поиск сообщений..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                marginBottom: '15px'
              }}
            />

            {/* Фильтры */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <button
                onClick={() => setFilter('all')}
                style={{
                  background: filter === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: filter === 'all' ? 'white' : '#4a5568',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                Все сообщения
              </button>
              <button
                onClick={() => setFilter('instructor')}
                style={{
                  background: filter === 'instructor' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: filter === 'instructor' ? 'white' : '#4a5568',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                От кураторов
              </button>
              <button
                onClick={() => setFilter('system')}
                style={{
                  background: filter === 'system' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: filter === 'system' ? 'white' : '#4a5568',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                Системные
              </button>
              <button
                onClick={() => setFilter('feedback')}
                style={{
                  background: filter === 'feedback' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: filter === 'feedback' ? 'white' : '#4a5568',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                Обратная связь
              </button>
            </div>
          </div>

          {/* Список сообщений */}
          <div style={{
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {filteredMessages.map(message => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message.id);
                  if (!message.read) markAsRead(message.id);
                }}
                style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  background: selectedMessage === message.id ? '#f7fafc' : 'white',
                  transition: 'all 0.3s ease',
                  borderLeft: message.read ? 'none' : '4px solid #667eea'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <span style={{
                    fontSize: '20px',
                    marginTop: '2px'
                  }}>
                    {getTypeIcon(message.type)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '5px'
                    }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: message.read ? '#4a5568' : '#2d3748',
                        margin: '0 0 3px 0',
                        lineHeight: '1.3'
                      }}>
                        {message.subject}
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        color: '#a0aec0'
                      }}>
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: '#718096',
                      margin: '0 0 5px 0',
                      fontWeight: message.read ? 'normal' : 'bold'
                    }}>
                      {message.from}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: 0
                    }}>
                      {message.course}
                    </p>
                    {message.priority === 'high' && (
                      <span style={{
                        background: '#e53e3e',
                        color: 'white',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        marginTop: '5px',
                        display: 'inline-block'
                      }}>
                        Важно
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Детали сообщения */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          {selectedMessage ? (
            (() => {
              const message = messages.find(m => m.id === selectedMessage);
              if (!message) return null;
              
              return (
                <>
                  <div style={{
                    padding: '25px',
                    borderBottom: '1px solid #e2e8f0',
                    background: '#f7fafc'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <span style={{
                        fontSize: '32px'
                      }}>
                        {getTypeIcon(message.type)}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h2 style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: '#2d3748',
                          margin: '0 0 5px 0'
                        }}>
                          {message.subject}
                        </h2>
                        <p style={{
                          fontSize: '14px',
                          color: '#718096',
                          margin: 0
                        }}>
                          {message.from} • {message.course}
                        </p>
                      </div>
                      <div style={{
                        textAlign: 'right'
                      }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#a0aec0',
                          margin: '0 0 3px 0'
                        }}>
                          {formatDate(message.timestamp)}
                        </p>
                        {message.priority === 'high' && (
                          <span style={{
                            background: '#e53e3e',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                          }}>
                            Важно
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: '25px'
                  }}>
                    <div style={{
                      background: '#f7fafc',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '20px'
                    }}>
                      <p style={{
                        fontSize: '16px',
                        color: '#4a5568',
                        lineHeight: '1.6',
                        margin: 0
                      }}>
                        {message.content}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '10px'
                    }}>
                      <button style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>
                        Ответить
                      </button>
                      <button style={{
                        background: '#f7fafc',
                        color: '#4a5568',
                        border: '1px solid #e2e8f0',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>
                        Переслать
                      </button>
                      <button style={{
                        background: '#f7fafc',
                        color: '#e53e3e',
                        border: '1px solid #e2e8f0',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>
                        Удалить
                      </button>
                    </div>
                  </div>
                </>
              );
            })()
          ) : (
            <div style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: '#a0aec0'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                💬
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Выберите сообщение
              </h3>
              <p style={{
                fontSize: '14px',
                margin: 0
              }}>
                Выберите сообщение из списка слева для просмотра
              </p>
            </div>
          )}
        </div>
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
          Статистика сообщений
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
              {messages.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Всего сообщений
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
              {unreadCount}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Непрочитанных
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
              {messages.filter(m => m.type === 'instructor').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              От кураторов
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
              {messages.filter(m => m.priority === 'high').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Важных сообщений
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 