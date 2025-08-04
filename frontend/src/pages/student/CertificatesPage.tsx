import React, { useState } from 'react';

const CertificatesPage: React.FC = () => {
  const [certificates] = useState([
    {
      id: 1,
      title: 'Сертификат по пейзажной фотографии',
      course: 'Пейзажная фотография',
      instructor: 'Дмитрий Волков',
      issuedDate: '2024-02-06',
      score: 92,
      maxScore: 100,
      certificateNumber: 'CERT-2024-001',
      status: 'issued',
      downloadUrl: '#',
      image: '🏔️',
      description: 'Сертификат подтверждает успешное завершение курса по пейзажной фотографии с отличными результатами.'
    },
    {
      id: 2,
      title: 'Сертификат по основам экспозиции',
      course: 'Фотография для начинающих',
      instructor: 'Анна Петрова',
      issuedDate: '2024-01-25',
      score: 85,
      maxScore: 100,
      certificateNumber: 'CERT-2024-002',
      status: 'issued',
      downloadUrl: '#',
      image: '📸',
      description: 'Сертификат подтверждает освоение основ экспозиции в фотографии.'
    },
    {
      id: 3,
      title: 'Сертификат по портретной съемке',
      course: 'Портретная съемка',
      instructor: 'Михаил Сидоров',
      issuedDate: null,
      score: null,
      maxScore: 100,
      certificateNumber: null,
      status: 'in_progress',
      downloadUrl: null,
      image: '👤',
      description: 'Курс в процессе изучения. Сертификат будет выдан после завершения.'
    },
    {
      id: 4,
      title: 'Сертификат по студийной съемке',
      course: 'Студийная съемка',
      instructor: 'Елена Козлова',
      issuedDate: null,
      score: null,
      maxScore: 100,
      certificateNumber: null,
      status: 'not_started',
      downloadUrl: null,
      image: '💡',
      description: 'Курс не начат. Начните обучение для получения сертификата.'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  const filteredCertificates = certificates.filter(certificate => {
    if (filter === 'all') return true;
    return certificate.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return '#48bb78';
      case 'in_progress': return '#ed8936';
      case 'not_started': return '#a0aec0';
      default: return '#a0aec0';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'issued': return 'Выдан';
      case 'in_progress': return 'В процессе';
      case 'not_started': return 'Не начат';
      default: return 'Неизвестно';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const downloadCertificate = (certificateId: number) => {
    // В реальном приложении здесь был бы API вызов для скачивания
    console.log(`Downloading certificate ${certificateId}`);
  };

  const shareCertificate = (certificateId: number) => {
    // В реальном приложении здесь была бы функция шаринга
    console.log(`Sharing certificate ${certificateId}`);
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
          Сертификаты
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#718096',
          margin: 0
        }}>
          Ваши достижения и подтверждения навыков
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
            Все сертификаты ({certificates.length})
          </button>
          <button
            onClick={() => setFilter('issued')}
            style={{
              background: filter === 'issued' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : '#f7fafc',
              color: filter === 'issued' ? 'white' : '#4a5568',
              border: '1px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Выданные ({certificates.filter(c => c.status === 'issued').length})
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
            В процессе ({certificates.filter(c => c.status === 'in_progress').length})
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
            Не начатые ({certificates.filter(c => c.status === 'not_started').length})
          </button>
        </div>
      </div>

      {/* Список сертификатов */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {filteredCertificates.map(certificate => (
          <div key={certificate.id} style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedCertificate(selectedCertificate === certificate.id ? null : certificate.id)}
          >
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
                  fontSize: '32px',
                  marginRight: '15px'
                }}>
                  {certificate.image}
                </span>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '0 0 5px 0'
                  }}>
                    {certificate.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    {certificate.instructor}
                  </p>
                </div>
              </div>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getStatusText(certificate.status)}
              </span>
            </div>

            <div style={{ padding: '20px' }}>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 15px 0',
                lineHeight: '1.5'
              }}>
                {certificate.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Курс:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {certificate.course}
                  </p>
                </div>
                
                {certificate.issuedDate && (
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: '0 0 3px 0'
                    }}>
                      Дата выдачи:
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      margin: 0
                    }}>
                      {formatDate(certificate.issuedDate)}
                    </p>
                  </div>
                )}

                {certificate.score && (
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: '0 0 3px 0'
                    }}>
                      Результат:
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      {certificate.score}/{certificate.maxScore}
                    </p>
                  </div>
                )}

                {certificate.certificateNumber && (
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0aec0',
                      margin: '0 0 3px 0'
                    }}>
                      Номер сертификата:
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      margin: 0
                    }}>
                      {certificate.certificateNumber}
                    </p>
                  </div>
                )}
              </div>

              {certificate.score && (
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
                      Прогресс:
                    </span>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#48bb78'
                    }}>
                      {Math.round((certificate.score / certificate.maxScore) * 100)}%
                    </span>
                  </div>
                  <div style={{
                    background: '#e2e8f0',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(90deg, #48bb78 0%, #38a169 100%)',
                      height: '100%',
                      width: `${(certificate.score / certificate.maxScore) * 100}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                {certificate.status === 'issued' && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadCertificate(certificate.id);
                      }}
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
                      Скачать PDF
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        shareCertificate(certificate.id);
                      }}
                      style={{
                        background: '#f7fafc',
                        color: '#4a5568',
                        border: '1px solid #e2e8f0',
                        padding: '10px 15px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      📤
                    </button>
                  </>
                )}
                
                {certificate.status === 'in_progress' && (
                  <button style={{
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
                  }}>
                    Продолжить обучение
                  </button>
                )}
                
                {certificate.status === 'not_started' && (
                  <button style={{
                    background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
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
                    Начать обучение
                  </button>
                )}
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
          Статистика сертификатов
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
              {certificates.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Всего курсов
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
              {certificates.filter(c => c.status === 'issued').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              Полученных сертификатов
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
              {certificates.filter(c => c.status === 'in_progress').length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#718096'
            }}>
              В процессе
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
              {Math.round(certificates.filter(c => c.score).reduce((acc, cert) => acc + (cert.score || 0), 0) / certificates.filter(c => c.score).length)}%
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

      {/* Информация о сертификатах */}
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
          О сертификатах
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '10px'
            }}>
              🏆 Что такое сертификат?
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#4a5568',
              lineHeight: '1.5',
              margin: 0
            }}>
              Сертификат подтверждает успешное завершение курса и освоение необходимых навыков. Это официальный документ, который можно добавить в портфолио.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '10px'
            }}>
              📋 Как получить сертификат?
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#4a5568',
              lineHeight: '1.5',
              margin: 0
            }}>
              Для получения сертификата необходимо завершить все уроки курса, выполнить все задания и пройти финальный тест с результатом не менее 70%.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            background: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '10px'
            }}>
              🔗 Использование сертификатов
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#4a5568',
              lineHeight: '1.5',
              margin: 0
            }}>
              Сертификаты можно скачать в формате PDF, поделиться в социальных сетях или добавить в профессиональное портфолио для демонстрации навыков.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage; 