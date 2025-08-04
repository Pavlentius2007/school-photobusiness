import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

interface Course {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  progress_percentage: number;
  completed_lessons: number;
  total_lessons: number;
  last_accessed_at: string;
  enrolled_at: string;
}

interface RecentActivity {
  id: number;
  type: 'lesson_complete' | 'course_enroll' | 'assignment_submit' | 'test_complete';
  title: string;
  description: string;
  created_at: string;
  course_id?: number;
  lesson_id?: number;
}

// Удаляем неиспользуемый интерфейс CourseProgress

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'activity' | 'progress'>('courses');

  // Загрузка данных дашборда
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Здесь будут API запросы
        // Пока используем моковые данные
        const mockCourses: Course[] = [
          {
            id: 1,
            title: 'Основы школьной фотографии',
            description: 'Полный курс по школьной фотографии от основ до продвинутых техник',
            image_url: '/api/media/course-1.jpg',
            progress_percentage: 65,
            completed_lessons: 13,
            total_lessons: 20,
            last_accessed_at: '2024-01-15T10:30:00Z',
            enrolled_at: '2024-01-01T09:00:00Z'
          },
          {
            id: 2,
            title: 'Дизайн и создание макетов',
            description: 'Научитесь создавать профессиональные макеты для школьных фотографий',
            image_url: '/api/media/course-2.jpg',
            progress_percentage: 25,
            completed_lessons: 5,
            total_lessons: 20,
            last_accessed_at: '2024-01-14T15:45:00Z',
            enrolled_at: '2024-01-05T14:20:00Z'
          },
          {
            id: 3,
            title: 'Администрирование фотобизнеса',
            description: 'Управление проектами, ценообразование и развитие бизнеса',
            image_url: '/api/media/course-3.jpg',
            progress_percentage: 0,
            completed_lessons: 0,
            total_lessons: 15,
            last_accessed_at: '2024-01-10T11:15:00Z',
            enrolled_at: '2024-01-10T11:15:00Z'
          }
        ];

        const mockActivity: RecentActivity[] = [
          {
            id: 1,
            type: 'lesson_complete',
            title: 'Завершен урок "Основы композиции"',
            description: 'Курс: Основы школьной фотографии',
            created_at: '2024-01-15T10:30:00Z',
            course_id: 1,
            lesson_id: 5
          },
          {
            id: 2,
            type: 'assignment_submit',
            title: 'Отправлено домашнее задание',
            description: 'Курс: Дизайн и создание макетов',
            created_at: '2024-01-14T15:45:00Z',
            course_id: 2,
            lesson_id: 3
          },
          {
            id: 3,
            type: 'test_complete',
            title: 'Пройден тест "Техники освещения"',
            description: 'Результат: 85% (17/20)',
            created_at: '2024-01-13T09:20:00Z',
            course_id: 1,
            lesson_id: 8
          },
          {
            id: 4,
            type: 'course_enroll',
            title: 'Запись на курс "Администрирование фотобизнеса"',
            description: 'Курс успешно оплачен и активирован',
            created_at: '2024-01-10T11:15:00Z',
            course_id: 3
          }
        ];

        setEnrolledCourses(mockCourses);
        setRecentActivity(mockActivity);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Форматирование даты
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Только что';
    if (diffInHours < 24) return `${diffInHours} ч назад`;
    if (diffInHours < 48) return 'Вчера';
    
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Получение иконки для типа активности
  const getActivityIcon = (type: string): string => {
    switch (type) {
      case 'lesson_complete': return '✅';
      case 'assignment_submit': return '📝';
      case 'test_complete': return '📊';
      case 'course_enroll': return '🎓';
      default: return '📌';
    }
  };

  // Получение цвета для типа активности
  const getActivityColor = (type: string): string => {
    switch (type) {
      case 'lesson_complete': return '#10b981';
      case 'assignment_submit': return '#3b82f6';
      case 'test_complete': return '#8b5cf6';
      case 'course_enroll': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  // Переход к курсу
  const goToCourse = (courseId: number) => {
    navigate(`/student/course/${courseId}`);
  };

  // Продолжить обучение
  const continueLearning = (course: Course) => {
    // Переходим к первому уроку курса (пока используем ID 1, позже нужно будет получать реальный ID первого урока)
    navigate(`/student/course/${course.id}/lesson/1`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Заголовок */}
      <div style={{
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: '0 0 10px 0'
        }}>
          Добро пожаловать в личный кабинет!
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0'
        }}>
          Продолжайте обучение и отслеживайте свой прогресс
        </p>
      </div>

      {/* Статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '24px',
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          border: '1px solid #dbeafe',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
            {enrolledCourses.length}
          </div>
          <div style={{ fontSize: '14px', color: '#374151' }}>
            Активных курсов
          </div>
        </div>

        <div style={{
          padding: '24px',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          border: '1px solid #dcfce7',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#166534', marginBottom: '8px' }}>
            {enrolledCourses.reduce((sum, course) => sum + course.completed_lessons, 0)}
          </div>
          <div style={{ fontSize: '14px', color: '#374151' }}>
            Завершенных уроков
          </div>
        </div>

                  <div style={{
            padding: '24px',
            backgroundColor: '#fef3c7',
            borderRadius: '12px',
            border: '1px solid #fde68a',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
              {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress_percentage, 0) / enrolledCourses.length)}%
            </div>
            <div style={{ fontSize: '14px', color: '#374151' }}>
              Средний прогресс
            </div>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#f3e8ff',
            borderRadius: '12px',
            border: '1px solid #e9d5ff',
            textAlign: 'center'
          }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7c3aed', marginBottom: '8px' }}>
            {recentActivity.filter(a => a.type === 'test_complete').length}
          </div>
          <div style={{ fontSize: '14px', color: '#374151' }}>
            Пройденных тестов
          </div>
        </div>
      </div>

      {/* Табы */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e5e7eb',
        marginBottom: '30px'
      }}>
        {[
          { id: 'courses', label: 'Мои курсы', icon: '📚' },
          { id: 'activity', label: 'Последние активности', icon: '📊' },
          { id: 'progress', label: 'Прогресс обучения', icon: '📈' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === tab.id ? '#6366f1' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#6b7280',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Контент табов */}
      {activeTab === 'courses' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {enrolledCourses.map(course => (
            <div
              key={course.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Изображение курса */}
              <div style={{
                height: '200px',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <span style={{ fontSize: '48px', opacity: '0.3' }}>📷</span>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 8px',
                  backgroundColor: course.progress_percentage === 100 ? '#10b981' : '#6366f1',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {course.progress_percentage === 100 ? 'Завершен' : `${course.progress_percentage}%`}
                </div>
              </div>

              {/* Информация о курсе */}
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {course.title}
                </h3>
                <p style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}>
                  {course.description}
                </p>

                {/* Прогресс */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    <span>Прогресс</span>
                    <span>{course.completed_lessons}/{course.total_lessons} уроков</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: '#10b981',
                      width: `${course.progress_percentage}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Кнопки */}
                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button
                    onClick={() => continueLearning(course)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      backgroundColor: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5856eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
                  >
                    {course.progress_percentage === 0 ? 'Начать обучение' : 'Продолжить'}
                  </button>
                  <button
                    onClick={() => goToCourse(course.id)}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      color: '#6366f1',
                      border: '1px solid #6366f1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6366f1';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#6366f1';
                    }}
                  >
                    Обзор
                  </button>
                </div>

                {/* Последний доступ */}
                <div style={{
                  marginTop: '12px',
                  fontSize: '12px',
                  color: '#9ca3af',
                  textAlign: 'center'
                }}>
                  Последний доступ: {formatDate(course.last_accessed_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          {recentActivity.map(activity => (
            <div
              key={activity.id}
              style={{
                padding: '20px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: getActivityColor(activity.type) + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0
              }}>
                {getActivityIcon(activity.type)}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  margin: '0 0 4px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {activity.title}
                </h4>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {activity.description}
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>
                  {formatDate(activity.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'progress' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {enrolledCourses.map(course => (
            <div
              key={course.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '24px'
              }}
            >
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {course.title}
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Общий прогресс</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                    {course.progress_percentage}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '12px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    backgroundColor: course.progress_percentage === 100 ? '#10b981' : '#6366f1',
                    width: `${course.progress_percentage}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                    {course.completed_lessons}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Завершено
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6366f1' }}>
                    {course.total_lessons - course.completed_lessons}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Осталось
                  </div>
                </div>
              </div>

              {course.progress_percentage === 100 && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#d1fae5',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '14px', color: '#065f46', fontWeight: '600' }}>
                    🎉 Курс завершен!
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard; 