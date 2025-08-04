import React, { useState, useEffect } from 'react';

interface Assignment {
  id: number;
  title: string;
  course: string;
  student: string;
  studentEmail: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  grade?: number;
  feedback?: string;
  files: string[];
}

const AssignmentsManagementPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    grade: 0,
    feedback: '',
    status: 'reviewed'
  });

  useEffect(() => {
    // Имитация загрузки данных
    setAssignments([
      {
        id: 1,
        title: 'Практическое задание: Портретная съемка',
        course: 'Портретная съемка',
        student: 'Анна Петрова',
        studentEmail: 'anna.petrova@email.com',
        submittedAt: '2024-02-15 14:30',
        status: 'pending',
        files: ['portrait_1.jpg', 'portrait_2.jpg', 'description.pdf']
      },
      {
        id: 2,
        title: 'Домашнее задание: Основы композиции',
        course: 'Основы фотографии',
        student: 'Иван Сидоров',
        studentEmail: 'ivan.sidorov@email.com',
        submittedAt: '2024-02-14 16:45',
        status: 'reviewed',
        grade: 85,
        feedback: 'Отличная работа! Хорошо проработана композиция. Рекомендую обратить внимание на освещение.',
        files: ['composition_1.jpg', 'composition_2.jpg']
      },
      {
        id: 3,
        title: 'Финальный проект: Дизайн макетов',
        course: 'Дизайн и создание макетов',
        student: 'Мария Козлова',
        studentEmail: 'maria.kozlova@email.com',
        submittedAt: '2024-02-13 12:20',
        status: 'approved',
        grade: 95,
        feedback: 'Превосходная работа! Профессиональный подход к съемке. Рекомендую для портфолио.',
        files: ['wedding_series.zip']
      },
      {
        id: 4,
        title: 'Задание: Пейзажная фотография',
        course: 'Пейзажная фотография',
        student: 'Дмитрий Волков',
        studentEmail: 'dmitry.volkov@email.com',
        submittedAt: '2024-02-12 09:15',
        status: 'rejected',
        grade: 60,
        feedback: 'Работа требует доработки. Обратите внимание на технические аспекты съемки.',
        files: ['landscape_1.jpg', 'landscape_2.jpg']
      },
      {
        id: 5,
        title: 'Практика: Работа со светом',
        course: 'Основы фотографии',
        student: 'Елена Смирнова',
        studentEmail: 'elena.smirnova@email.com',
        submittedAt: '2024-02-11 18:30',
        status: 'pending',
        files: ['lighting_1.jpg', 'lighting_2.jpg', 'lighting_3.jpg']
      }
    ]);
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || assignment.course === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ed8936';
      case 'reviewed': return '#3182ce';
      case 'approved': return '#48bb78';
      case 'rejected': return '#e53e3e';
      default: return '#718096';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает проверки';
      case 'reviewed': return 'Проверено';
      case 'approved': return 'Одобрено';
      case 'rejected': return 'Отклонено';
      default: return status;
    }
  };

  const handleReview = () => {
    if (selectedAssignment && reviewData.feedback.trim()) {
      const updatedAssignments = assignments.map(assignment => {
        if (assignment.id === selectedAssignment.id) {
          return {
            ...assignment,
            status: reviewData.status as 'pending' | 'reviewed' | 'approved' | 'rejected',
            grade: reviewData.grade,
            feedback: reviewData.feedback
          };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      setReviewData({ grade: 0, feedback: '', status: 'reviewed' });
      setShowReviewModal(false);
      setSelectedAssignment(null);
    }
  };

  const allCourses = Array.from(new Set(assignments.map(a => a.course)));

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
          Домашние задания
        </h1>
        <p style={{
          color: '#718096',
          fontSize: '16px',
          margin: 0
        }}>
          Проверяйте и оценивайте работы студентов
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
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Всего заданий</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {assignments.length}
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
              📝
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
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Ожидают проверки</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {assignments.filter(a => a.status === 'pending').length}
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
              ⏳
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
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Одобрено</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {assignments.filter(a => a.status === 'approved').length}
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
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Средняя оценка</p>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade || 0), 0) / assignments.filter(a => a.grade).length) || 0}
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
            placeholder="Поиск по названию задания или студенту..."
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
              minWidth: '180px'
            }}
          >
            <option value="all">Все статусы</option>
            <option value="pending">Ожидают проверки</option>
            <option value="reviewed">Проверено</option>
            <option value="approved">Одобрено</option>
            <option value="rejected">Отклонено</option>
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

      {/* Список заданий */}
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
            Задания ({filteredAssignments.length})
          </h3>
        </div>

        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} style={{
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
              📝
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
                  {assignment.title}
                </h4>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500',
                  color: 'white',
                  background: getStatusColor(assignment.status)
                }}>
                  {getStatusText(assignment.status)}
                </span>
                {assignment.grade && (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: 'white',
                    background: assignment.grade >= 80 ? '#48bb78' : assignment.grade >= 60 ? '#ed8936' : '#e53e3e'
                  }}>
                    {assignment.grade}/100
                  </span>
                )}
              </div>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                {assignment.student} • {assignment.course}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: '12px',
                color: '#718096'
              }}>
                <span>Отправлено: {assignment.submittedAt}</span>
                <span>Файлов: {assignment.files.length}</span>
                {assignment.feedback && (
                  <span style={{ color: '#3182ce' }}>Есть отзыв</span>
                )}
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {assignment.status === 'pending' ? (
                <button
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setShowReviewModal(true);
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
                  ✏️ Проверить
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setReviewData({
                      grade: assignment.grade || 0,
                      feedback: assignment.feedback || '',
                      status: assignment.status
                    });
                    setShowReviewModal(true);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  👁️ Просмотреть
                </button>
              )}
              <button style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                📁 Файлы
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно проверки */}
      {showReviewModal && selectedAssignment && (
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
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              margin: '0 0 20px 0'
            }}>
              {selectedAssignment.status === 'pending' ? 'Проверить задание' : 'Просмотр задания'}
            </h3>

            <div style={{
              marginBottom: '20px',
              padding: '15px',
              background: '#f7fafc',
              borderRadius: '8px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#2d3748',
                margin: '0 0 10px 0'
              }}>
                {selectedAssignment.title}
              </h4>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                <strong>Студент:</strong> {selectedAssignment.student} ({selectedAssignment.studentEmail})
              </p>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                <strong>Курс:</strong> {selectedAssignment.course}
              </p>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: 0
              }}>
                <strong>Отправлено:</strong> {selectedAssignment.submittedAt}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                Оценка (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={reviewData.grade}
                onChange={(e) => setReviewData({...reviewData, grade: parseInt(e.target.value) || 0})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="Введите оценку"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                Статус
              </label>
              <select
                value={reviewData.status}
                onChange={(e) => setReviewData({...reviewData, status: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="reviewed">Проверено</option>
                <option value="approved">Одобрено</option>
                <option value="rejected">Отклонено</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                Отзыв
              </label>
              <textarea
                value={reviewData.feedback}
                onChange={(e) => setReviewData({...reviewData, feedback: e.target.value})}
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
                placeholder="Введите отзыв о работе..."
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedAssignment(null);
                  setReviewData({ grade: 0, feedback: '', status: 'reviewed' });
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
                onClick={handleReview}
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
                {selectedAssignment.status === 'pending' ? 'Проверить' : 'Обновить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsManagementPage; 