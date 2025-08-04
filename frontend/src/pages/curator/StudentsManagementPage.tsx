import React, { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  avatar: string;
  courses: string[];
  progress: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'completed';
  joinDate: string;
}

const StudentsManagementPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Имитация загрузки данных
    setStudents([
      {
        id: 1,
        name: 'Анна Петрова',
        email: 'anna.petrova@email.com',
        avatar: '👩‍🎓',
        courses: ['Основы фотографии', 'Портретная съемка'],
        progress: 75,
        lastActivity: '2 часа назад',
        status: 'active',
        joinDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Иван Сидоров',
        email: 'ivan.sidorov@email.com',
        avatar: '👨‍🎓',
        courses: ['Основы фотографии'],
        progress: 45,
        lastActivity: '1 день назад',
        status: 'active',
        joinDate: '2024-01-20'
      },
      {
        id: 3,
        name: 'Мария Козлова',
        email: 'maria.kozlova@email.com',
        avatar: '👩‍🎓',
        courses: ['Портретная съемка'],
        progress: 90,
        lastActivity: '3 часа назад',
        status: 'active',
        joinDate: '2024-01-10'
      },
      {
        id: 4,
        name: 'Дмитрий Волков',
        email: 'dmitry.volkov@email.com',
        avatar: '👨‍🎓',
        courses: ['Основы фотографии'],
        progress: 100,
        lastActivity: '1 неделю назад',
        status: 'completed',
        joinDate: '2023-12-01'
      },
      {
        id: 5,
        name: 'Елена Смирнова',
        email: 'elena.smirnova@email.com',
        avatar: '👩‍🎓',
        courses: ['Пейзажная фотография'],
        progress: 20,
        lastActivity: '2 недели назад',
        status: 'inactive',
        joinDate: '2024-02-01'
      }
    ]);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || student.courses.includes(courseFilter);
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#48bb78';
      case 'inactive': return '#e53e3e';
      case 'completed': return '#3182ce';
      default: return '#718096';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'inactive': return 'Неактивный';
      case 'completed': return 'Завершил';
      default: return status;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#48bb78';
    if (progress >= 50) return '#ed8936';
    return '#e53e3e';
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedStudent) {
      // Здесь будет логика отправки сообщения
      alert(`Сообщение отправлено студенту ${selectedStudent.name}`);
      setMessageText('');
      setShowMessageModal(false);
      setSelectedStudent(null);
    }
  };

  const allCourses = Array.from(new Set(students.flatMap(s => s.courses)));

  return (
    <div>
      <div style={{
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2d3748',
          margin: '0 0 10px 0'
        }}>
          Мои студенты
        </h1>
        <p style={{
          color: '#718096',
          fontSize: '16px',
          margin: 0
        }}>
          Управляйте студентами и отслеживайте их прогресс
        </p>
      </div>

      {/* Статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Всего студентов</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {students.length}
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              👥
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Активные</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {students.filter(s => s.status === 'active').length}
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ✅
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Завершили</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {students.filter(s => s.status === 'completed').length}
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🎓
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Средний прогресс</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: '20px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '150px'
            }}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="completed">Завершившие</option>
          </select>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '200px'
            }}
          >
            <option value="all">Все курсы</option>
            {allCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Список студентов */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f7fafc'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2d3748',
            margin: 0
          }}>
            Студенты ({filteredStudents.length})
          </h3>
        </div>

        {filteredStudents.map((student) => (
          <div key={student.id} style={{
            padding: '20px',
            borderBottom: '1px solid #f7fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {student.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '8px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  margin: 0
                }}>
                  {student.name}
                </h4>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500',
                  color: 'white',
                  background: getStatusColor(student.status)
                }}>
                  {getStatusText(student.status)}
                </span>
              </div>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                {student.email}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: '12px',
                color: '#718096'
              }}>
                <span>Курсы: {student.courses.join(', ')}</span>
                <span>Присоединился: {student.joinDate}</span>
                <span>Последняя активность: {student.lastActivity}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              minWidth: '120px'
            }}>
              <div style={{
                width: '100%',
                background: '#e2e8f0',
                borderRadius: '10px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${student.progress}%`,
                  height: '100%',
                  background: getProgressColor(student.progress),
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#2d3748'
              }}>
                {student.progress}%
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setShowMessageModal(true);
                }}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                💬 Написать
              </button>
              <button style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                📊 Прогресс
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно отправки сообщения */}
      {showMessageModal && selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              margin: '0 0 20px 0'
            }}>
              Отправить сообщение
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              padding: '15px',
              background: '#f7fafc',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {selectedStudent.avatar}
              </div>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  margin: '0 0 5px 0'
                }}>
                  {selectedStudent.name}
                </h4>
                <p style={{
                  color: '#718096',
                  fontSize: '14px',
                  margin: 0
                }}>
                  {selectedStudent.email}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                Сообщение
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  minHeight: '120px',
                  resize: 'vertical'
                }}
                placeholder="Введите ваше сообщение..."
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setSelectedStudent(null);
                  setMessageText('');
                }}
                style={{
                  padding: '12px 24px',
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Отмена
              </button>
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManagementPage; 