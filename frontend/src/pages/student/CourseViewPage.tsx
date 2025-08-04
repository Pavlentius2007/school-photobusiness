import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse, useCourseModules, useCourseProgress, apiUtils } from '../../hooks/useApi';
import { Course, Module, Lesson } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const CourseViewPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  
  // API хуки
  const { 
    data: course, 
    loading: courseLoading, 
    error: courseError, 
    execute: loadCourse 
  } = useCourse(parseInt(courseId || '0'));
  
  const { 
    data: modules, 
    loading: modulesLoading, 
    error: modulesError, 
    execute: loadModules 
  } = useCourseModules(parseInt(courseId || '0'));
  
  const { 
    data: progress, 
    loading: progressLoading, 
    error: progressError, 
    execute: loadProgress 
  } = useCourseProgress(parseInt(courseId || '0'));

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    if (courseId) {
      loadCourse();
      loadModules();
      loadProgress();
    }
  }, [courseId, loadCourse, loadModules, loadProgress]);

  // Устанавливаем первый модуль как выбранный при загрузке
  useEffect(() => {
    if (modules && modules.length > 0 && !selectedModule) {
      setSelectedModule(modules[0].id);
    }
  }, [modules, selectedModule]);

  // Обработчик перехода к уроку
  const handleLessonClick = (lessonId: number) => {
    navigate(`/student/course/${courseId}/lesson/${lessonId}`);
  };

  // Получаем выбранный модуль
  const currentModule = modules?.find(m => m.id === selectedModule);

  // Проверяем, доступен ли урок (последовательное прохождение)
  const isLessonAvailable = (lessonIndex: number, moduleIndex: number) => {
    if (lessonIndex === 0 && moduleIndex === 0) return true;
    
    // Если это первый урок в модуле, проверяем последний урок предыдущего модуля
    if (lessonIndex === 0 && moduleIndex > 0) {
      const previousModule = modules?.[moduleIndex - 1];
      if (previousModule && previousModule.lessons) {
        const lastLesson = previousModule.lessons[previousModule.lessons.length - 1];
        return lastLesson?.is_completed || false;
      }
    }
    
    // Проверяем предыдущий урок в том же модуле
    if (lessonIndex > 0 && currentModule?.lessons) {
      const previousLesson = currentModule.lessons[lessonIndex - 1];
      return previousLesson?.is_completed || false;
    }
    
    return false;
  };

  // Получаем статус урока
  const getLessonStatus = (lesson: Lesson) => {
    if (lesson.is_completed) return 'completed';
    if (lesson.is_started) return 'in_progress';
    return 'not_started';
  };

  // Получаем цвет статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in_progress': return '#f59e0b';
      case 'not_started': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Получаем текст статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'in_progress': return 'В процессе';
      case 'not_started': return 'Не начат';
      default: return 'Неизвестно';
    }
  };

  if (courseLoading || modulesLoading) {
    return <LoadingSpinner />;
  }

  if (courseError || modulesError) {
    return <ErrorMessage message={courseError || modulesError || 'Ошибка загрузки курса'} />;
  }

  if (!course || !modules) {
    return <ErrorMessage message="Курс не найден" />;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Хлебные крошки */}
      <div style={{ marginBottom: '20px' }}>
        <nav style={{ fontSize: '14px', color: '#6b7280' }}>
          <span 
            style={{ cursor: 'pointer', color: '#3b82f6' }}
            onClick={() => navigate('/student')}
          >
            Главная
          </span>
          <span style={{ margin: '0 8px' }}>›</span>
          <span 
            style={{ cursor: 'pointer', color: '#3b82f6' }}
            onClick={() => navigate('/student/courses')}
          >
            Мои курсы
          </span>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: '#374151' }}>{course.title}</span>
        </nav>
      </div>

      {/* Заголовок курса */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1f2937',
          marginBottom: '12px'
        }}>
          {course.title}
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#6b7280',
          marginBottom: '20px',
          lineHeight: '1.6'
        }}>
          {course.description}
        </p>

        {/* Прогресс курса */}
        {progress && (
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Прогресс курса
              </span>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#059669'
              }}>
                {progress.progress_percentage}%
              </span>
            </div>
            <div style={{
              backgroundColor: '#f3f4f6',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: '#10b981',
                height: '100%',
                width: `${progress.progress_percentage}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              <span>Завершено уроков: {progress.completed_lessons}</span>
              <span>Всего уроков: {progress.total_lessons}</span>
            </div>
          </div>
        )}
      </div>

      {/* Основной контент */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* Боковая панель с модулями */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '20px',
          position: 'sticky',
          top: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Модули курса
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {modules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: selectedModule === module.id ? '#f3f4f6' : 'transparent',
                  border: '1px solid',
                  borderColor: selectedModule === module.id ? '#d1d5db' : 'transparent',
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedModule !== module.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedModule !== module.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>
                  Модуль {index + 1}: {module.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {module.lessons?.length || 0} уроков
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Контент модуля */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px'
        }}>
          {currentModule ? (
            <>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                {currentModule.title}
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                {currentModule.description}
              </p>

              {/* Список уроков */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentModule.lessons?.map((lesson, lessonIndex) => {
                  const status = getLessonStatus(lesson);
                  const isAvailable = isLessonAvailable(lessonIndex, modules.findIndex(m => m.id === currentModule.id));
                  
                  return (
                    <div
                      key={lesson.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        opacity: isAvailable ? 1 : 0.6,
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => isAvailable && handleLessonClick(lesson.id)}
                      onMouseEnter={(e) => {
                        if (isAvailable) {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isAvailable) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#1f2937',
                          margin: 0
                        }}>
                          Урок {lessonIndex + 1}: {lesson.title}
                        </h4>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: getStatusColor(status) + '20',
                          color: getStatusColor(status),
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {getStatusText(status)}
                        </span>
                      </div>
                      
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginBottom: '12px',
                        lineHeight: '1.5'
                      }}>
                        {lesson.description}
                      </p>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          fontSize: '12px',
                          color: '#6b7280'
                        }}>
                          <span>📹 {lesson.lesson_type}</span>
                          <span>⏱ {apiUtils.formatDuration(lesson.duration_minutes)}</span>
                        </div>
                        
                        {!isAvailable && (
                          <span style={{
                            fontSize: '12px',
                            color: '#f59e0b',
                            fontWeight: '500'
                          }}>
                            🔒 Заблокирован
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Выберите модуль
              </h3>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Выберите модуль из списка слева для просмотра уроков
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage; 