import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyCourses, useSearchCourses, apiUtils } from '../../hooks/useApi';
import { Course } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  // API хуки
  const { data: myCourses, loading: coursesLoading, error: coursesError, execute: loadMyCourses } = useMyCourses();
  const { data: searchResults, loading: searchLoading, error: searchError, execute: searchCourses } = useSearchCourses();

  // Загружаем курсы при монтировании компонента
  useEffect(() => {
    loadMyCourses();
  }, [loadMyCourses]);

  // Обновляем отфильтрованные курсы при изменении данных
  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredCourses(searchResults || []);
    } else {
      setFilteredCourses(myCourses || []);
    }
  }, [myCourses, searchResults, searchQuery]);

  // Обработчик поиска
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      await searchCourses(query);
    }
  };

  // Обработчик перехода к курсу
  const handleCourseClick = (courseId: number) => {
    navigate(`/student/course/${courseId}`);
  };

  // Обработчик продолжения обучения
  const handleContinueLearning = (courseId: number) => {
    navigate(`/student/course/${courseId}/lesson/1`);
  };

  if (coursesLoading && !myCourses) {
    return <LoadingSpinner />;
  }

  if (coursesError) {
    return <ErrorMessage message={coursesError} />;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Заголовок */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '600', 
          color: '#1f2937',
          marginBottom: '10px'
        }}>
          Мои курсы
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280',
          margin: 0
        }}>
          Продолжайте обучение или начните новый курс
        </p>
      </div>

      {/* Поиск */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          position: 'relative',
          maxWidth: '500px'
        }}>
          <input
            type="text"
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              paddingLeft: '40px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
            }}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }}>
            🔍
          </div>
          {searchLoading && (
            <div style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}>
              ⏳
            </div>
          )}
        </div>
      </div>

      {/* Результаты поиска */}
      {searchError && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          marginBottom: '20px'
        }}>
          {searchError}
        </div>
      )}

      {/* Список курсов */}
      {filteredCourses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '500', 
            marginBottom: '8px',
            color: '#374151'
          }}>
            {searchQuery ? 'Курсы не найдены' : 'У вас пока нет курсов'}
          </h3>
          <p style={{ fontSize: '16px', margin: 0 }}>
            {searchQuery 
              ? 'Попробуйте изменить поисковый запрос' 
              : 'Запишитесь на курс, чтобы начать обучение'
            }
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => handleCourseClick(course.id)}
            >
              {/* Заголовок курса */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>
                {course.title}
              </h3>

              {/* Описание */}
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '16px',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {course.short_description || course.description}
              </p>

              {/* Статус курса */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: course.status === 'published' ? '#dcfce7' : '#fef3c7',
                  color: course.status === 'published' ? '#166534' : '#92400e',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {course.status === 'published' ? 'Активный' : 'Черновик'}
                </span>
              </div>

              {/* Цена */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#059669'
                }}>
                  {course.price > 0 ? `${course.price} ₽` : 'Бесплатно'}
                </span>
              </div>

              {/* Кнопки действий */}
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCourseClick(course.id);
                  }}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                  }}
                >
                  Просмотр курса
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContinueLearning(course.id);
                  }}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                  }}
                >
                  Продолжить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Индикатор загрузки поиска */}
      {searchLoading && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: '#6b7280'
        }}>
          <LoadingSpinner />
          <p style={{ marginTop: '8px' }}>Поиск курсов...</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage; 