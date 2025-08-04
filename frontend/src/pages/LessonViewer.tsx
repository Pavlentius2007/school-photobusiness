import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import QuestionAnswer from '../components/QuestionAnswer';
import AssignmentSubmission from '../components/AssignmentSubmission';
import TestTaker from '../components/TestTaker';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface Lesson {
  id: number;
  title: string;
  content: string;
  video_url?: string;
  file_url?: string;
  lesson_type: 'video' | 'text' | 'file' | 'test';
  duration_minutes: number;
  order_index: number;
  module_id: number;
  questions?: Question[];
  assignment?: Assignment;
  test?: Test;
}

interface Question {
  id: number;
  text: string;
  type: 'open' | 'single_choice' | 'multiple_choice';
  options?: string[];
  required: boolean;
  order_index: number;
  points: number;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  max_score: number;
  due_date?: string;
  attached_files?: string[];
  created_at: string;
}

interface Test {
  id: number;
  title: string;
  description: string;
  time_limit_minutes?: number;
  passing_score: number;
  max_score: number;
  questions: Question[];
}

interface Module {
  id: number;
  title: string;
  description: string;
  order_index: number;
  course_id: number;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

interface LessonProgress {
  lesson_id: number;
  is_completed: boolean;
  completed_at?: string;
  time_spent_minutes: number;
  last_position: number;
}

const LessonViewer: React.FC = () => {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'questions' | 'assignment' | 'test'>('content');
  const [questionsSubmitted, setQuestionsSubmitted] = useState(false);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  // Загрузка данных урока
  useEffect(() => {
    const loadLessonData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Здесь будет API запрос для загрузки курса и урока
        // Пока используем моковые данные
        const mockCourse: Course = {
          id: parseInt(courseId || '1'),
          title: 'Основы школьной фотографии',
          description: 'Полный курс по школьной фотографии',
          modules: [
            {
              id: 1,
              title: 'Введение в школьную фотографию',
              description: 'Базовые принципы и техники',
              order_index: 1,
              course_id: parseInt(courseId || '1'),
              lessons: [
                {
                  id: parseInt(lessonId || '1'),
                  title: 'Что такое школьная фотография',
                  content: `
                    <h2>Добро пожаловать в мир школьной фотографии!</h2>
                    <p>Школьная фотография - это особый жанр фотографии, который требует не только технических навыков, но и понимания психологии детей и подростков.</p>
                    
                    <h3>Основные особенности:</h3>
                    <ul>
                      <li>Работа с большими группами детей</li>
                      <li>Ограниченное время на съемку</li>
                      <li>Различные возрастные группы</li>
                      <li>Специфические требования школ</li>
                    </ul>
                    
                    <h3>Что вы изучите в этом уроке:</h3>
                    <p>В данном уроке мы рассмотрим основные принципы школьной фотографии, поговорим о подготовке к съемке и обсудим технические аспекты работы.</p>
                  `,
                  video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  lesson_type: 'video',
                  duration_minutes: 15,
                  order_index: 1,
                  module_id: 1,
                  questions: [
                    {
                      id: 1,
                      text: 'Какие основные особенности школьной фотографии вы запомнили?',
                      type: 'open',
                      required: true,
                      order_index: 1,
                      points: 5
                    },
                    {
                      id: 2,
                      text: 'Какой возраст детей наиболее сложен для съемки?',
                      type: 'single_choice',
                      options: ['Дошкольники', 'Младшие школьники', 'Подростки', 'Все одинаково сложны'],
                      required: true,
                      order_index: 2,
                      points: 3
                    }
                  ],
                  assignment: {
                    id: 1,
                    title: 'Практическое задание: Анализ школьных фотографий',
                    description: 'Найдите 5 примеров школьных фотографий в интернете и проанализируйте их с точки зрения композиции, освещения и эмоций детей. Опишите, что можно улучшить в каждой фотографии.',
                    max_score: 10,
                    due_date: '2024-12-31T23:59:59Z',
                    created_at: '2024-01-01T00:00:00Z'
                  },
                  test: {
                    id: 1,
                    title: 'Проверка знаний по основам школьной фотографии',
                    description: 'Тест на закрепление материала урока',
                    time_limit_minutes: 15,
                    passing_score: 7,
                    max_score: 10,
                    questions: [
                      {
                        id: 1,
                        text: 'Что является главной особенностью школьной фотографии?',
                        type: 'single_choice',
                        options: ['Работа с большими группами', 'Сложное освещение', 'Дорогое оборудование', 'Долгая подготовка'],
                        required: true,
                        order_index: 1,
                        points: 2
                      },
                      {
                        id: 2,
                        text: 'Какие факторы влияют на успешность школьной съемки?',
                        type: 'multiple_choice',
                        options: ['Время на съемку', 'Возраст детей', 'Погодные условия', 'Размер группы'],
                        required: true,
                        order_index: 2,
                        points: 3
                      },
                      {
                        id: 3,
                        text: 'Опишите основные принципы работы с детьми на съемке',
                        type: 'open',
                        required: true,
                        order_index: 3,
                        points: 5
                      }
                    ]
                  }
                }
              ]
            }
          ]
        };

        setCourse(mockCourse);
        
        const module = mockCourse.modules.find(m => m.id === 1);
        if (!module) {
          throw new Error('Модуль не найден');
        }
        setCurrentModule(module);
        
        const lesson = module.lessons.find(l => l.id === parseInt(lessonId || '1'));
        if (!lesson) {
          throw new Error('Урок не найден');
        }
        setCurrentLesson(lesson);

        // Загружаем прогресс урока
        const mockProgress: LessonProgress = {
          lesson_id: lesson.id,
          is_completed: false,
          time_spent_minutes: 0,
          last_position: 0
        };
        setLessonProgress(mockProgress);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки урока');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId && lessonId) {
      loadLessonData();
    }
  }, [courseId, lessonId]);

  // Обработка прогресса видео
  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress);
    
    // Если видео просмотрено на 90% или больше, считаем урок завершенным
    if (progress >= 90 && !isLessonCompleted) {
      handleLessonComplete();
    }
  };

  // Обработка завершения видео
  const handleVideoComplete = () => {
    handleLessonComplete();
  };

  // Обработчики для интерактивных элементов
  const handleQuestionsSubmit = async (answers: any[]) => {
    try {
      // Здесь будет API запрос для сохранения ответов
      console.log('Ответы на вопросы отправлены:', answers);
      setQuestionsSubmitted(true);
      
      // Проверяем, можно ли завершить урок
      checkLessonCompletion();
    } catch (err) {
      console.error('Ошибка при отправке ответов:', err);
    }
  };

  const handleAssignmentSubmit = async (submission: any) => {
    try {
      // Здесь будет API запрос для сохранения задания
      console.log('Задание отправлено:', submission);
      setAssignmentSubmitted(true);
      
      // Проверяем, можно ли завершить урок
      checkLessonCompletion();
    } catch (err) {
      console.error('Ошибка при отправке задания:', err);
    }
  };

  const handleTestSubmit = async (attempt: any) => {
    try {
      // Здесь будет API запрос для сохранения теста
      console.log('Тест отправлен:', attempt);
      setTestCompleted(true);
      
      // Проверяем, можно ли завершить урок
      checkLessonCompletion();
    } catch (err) {
      console.error('Ошибка при отправке теста:', err);
    }
  };

  // Проверка завершения урока
  const checkLessonCompletion = () => {
    if (!currentLesson) return;

    const hasVideo = currentLesson.video_url;
    const hasQuestions = currentLesson.questions && currentLesson.questions.length > 0;
    const hasAssignment = currentLesson.assignment;
    const hasTest = currentLesson.test;

    const videoCompleted = !hasVideo || isLessonCompleted;
    const questionsCompleted = !hasQuestions || questionsSubmitted;
    const assignmentCompleted = !hasAssignment || assignmentSubmitted;
    const isTestCompleted = !hasTest || testCompleted;

    if (videoCompleted && questionsCompleted && assignmentCompleted && isTestCompleted) {
      handleLessonComplete();
    }
  };

  // Завершение урока
  const handleLessonComplete = async () => {
    try {
      setIsLessonCompleted(true);
      
      // Здесь будет API запрос для сохранения прогресса
      console.log('Урок завершен:', currentLesson?.id);
      
      // Обновляем локальное состояние
      if (lessonProgress) {
        setLessonProgress({
          ...lessonProgress,
          is_completed: true,
          completed_at: new Date().toISOString()
        });
      }
      
    } catch (err) {
      console.error('Ошибка при завершении урока:', err);
    }
  };

  // Навигация к следующему уроку
  const goToNextLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    const currentIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    const nextLesson = currentModule.lessons[currentIndex + 1];
    
    if (nextLesson) {
      navigate(`/student/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      // Если это последний урок в модуле, переходим к следующему модулю
      const currentModuleIndex = course!.modules.findIndex(m => m.id === currentModule.id);
      const nextModule = course!.modules[currentModuleIndex + 1];
      
      if (nextModule && nextModule.lessons.length > 0) {
        navigate(`/student/course/${courseId}/lesson/${nextModule.lessons[0].id}`);
      } else {
        // Курс завершен
        navigate(`/student/course/${courseId}`);
      }
    }
  };

  // Навигация к предыдущему уроку
  const goToPreviousLesson = () => {
    if (!currentModule || !currentLesson) return;
    
    const currentIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    const prevLesson = currentModule.lessons[currentIndex - 1];
    
    if (prevLesson) {
      navigate(`/student/course/${courseId}/lesson/${prevLesson.id}`);
    } else {
      // Если это первый урок в модуле, переходим к предыдущему модулю
      const currentModuleIndex = course!.modules.findIndex(m => m.id === currentModule.id);
      const prevModule = course!.modules[currentModuleIndex - 1];
      
      if (prevModule && prevModule.lessons.length > 0) {
        const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
        navigate(`/student/course/${courseId}/lesson/${lastLesson.id}`);
      }
    }
  };

  // Проверка доступности навигации
  const canGoNext = () => {
    if (!currentModule || !currentLesson) return false;
    const currentIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    return currentIndex < currentModule.lessons.length - 1 || 
           course!.modules.findIndex(m => m.id === currentModule.id) < course!.modules.length - 1;
  };

  const canGoPrevious = () => {
    if (!currentModule || !currentLesson) return false;
    const currentIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);
    return currentIndex > 0 || 
           course!.modules.findIndex(m => m.id === currentModule.id) > 0;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!currentLesson || !currentModule || !course) {
    return <ErrorMessage message="Урок не найден" />;
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Хлебные крошки */}
      <div style={{
        marginBottom: '20px',
        color: '#6b7280',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span 
          style={{ cursor: 'pointer', color: '#6366f1' }}
          onClick={() => navigate('/student')}
        >
          Дашборд
        </span>
        <span>→</span>
        <span 
          style={{ cursor: 'pointer', color: '#6366f1' }}
          onClick={() => navigate(`/student/course/${courseId}`)}
        >
          {course.title}
        </span>
        <span>→</span>
        <span 
          style={{ cursor: 'pointer', color: '#6366f1' }}
          onClick={() => navigate(`/student/course/${courseId}`)}
        >
          {currentModule.title}
        </span>
        <span>→</span>
        <span>{currentLesson.title}</span>
      </div>

      {/* Заголовок урока */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h1 style={{
          margin: '0 0 10px 0',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          {currentLesson.title}
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>📚 {currentModule.title}</span>
          <span>⏱️ {currentLesson.duration_minutes} мин</span>
          {lessonProgress?.is_completed && (
            <span style={{ color: '#10b981', fontWeight: '600' }}>
              ✅ Завершен
            </span>
          )}
        </div>
      </div>

      {/* Видео (если есть) */}
      {currentLesson.video_url && (
        <div style={{ marginBottom: '30px' }}>
          <VideoPlayer
            videoUrl={currentLesson.video_url}
            onProgress={handleVideoProgress}
            onComplete={handleVideoComplete}
            title={currentLesson.title}
            description={`Урок ${currentLesson.order_index} из модуля "${currentModule.title}"`}
          />
        </div>
      )}

      {/* Табы для интерактивных элементов */}
      {(currentLesson.questions || currentLesson.assignment || currentLesson.test) && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setActiveTab('content')}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === 'content' ? '#3b82f6' : 'transparent',
                color: activeTab === 'content' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                marginRight: '4px'
              }}
            >
              📖 Контент
            </button>
            {currentLesson.questions && currentLesson.questions.length > 0 && (
              <button
                onClick={() => setActiveTab('questions')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: activeTab === 'questions' ? '#3b82f6' : 'transparent',
                  color: activeTab === 'questions' ? 'white' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginRight: '4px'
                }}
              >
                ❓ Вопросы {questionsSubmitted && '✅'}
              </button>
            )}
            {currentLesson.assignment && (
              <button
                onClick={() => setActiveTab('assignment')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: activeTab === 'assignment' ? '#3b82f6' : 'transparent',
                  color: activeTab === 'assignment' ? 'white' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginRight: '4px'
                }}
              >
                📝 Задание {assignmentSubmitted && '✅'}
              </button>
            )}
            {currentLesson.test && (
              <button
                onClick={() => setActiveTab('test')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: activeTab === 'test' ? '#3b82f6' : 'transparent',
                  color: activeTab === 'test' ? 'white' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginRight: '4px'
                }}
              >
                🧪 Тест {testCompleted && '✅'}
              </button>
            )}
          </div>

          {/* Содержимое табов */}
          {activeTab === 'content' && currentLesson.content && (
            <div style={{
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div 
                dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#374151'
                }}
              />
            </div>
          )}

          {activeTab === 'questions' && currentLesson.questions && (
            <QuestionAnswer
              questions={currentLesson.questions}
              lessonId={currentLesson.id}
              onAnswersSubmit={handleQuestionsSubmit}
              isSubmitted={questionsSubmitted}
            />
          )}

          {activeTab === 'assignment' && currentLesson.assignment && (
            <AssignmentSubmission
              assignment={currentLesson.assignment}
              onSubmit={handleAssignmentSubmit}
            />
          )}

          {activeTab === 'test' && currentLesson.test && (
            <TestTaker
              test={currentLesson.test}
              onSubmit={handleTestSubmit}
            />
          )}
        </div>
      )}

      {/* Контент урока (если нет интерактивных элементов) */}
      {currentLesson.content && !(currentLesson.questions || currentLesson.assignment || currentLesson.test) && (
        <div style={{
          marginBottom: '30px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div 
            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            style={{
              fontSize: '16px',
              lineHeight: '1.7',
              color: '#374151'
            }}
          />
        </div>
      )}

      {/* Файлы для скачивания */}
      {currentLesson.file_url && (
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          border: '1px solid #dbeafe'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e40af'
          }}>
            📎 Материалы урока
          </h3>
          <a
            href={currentLesson.file_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            📥 Скачать материалы
          </a>
        </div>
      )}

      {/* Навигация между уроками */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <button
          onClick={goToPreviousLesson}
          disabled={!canGoPrevious()}
          style={{
            padding: '12px 24px',
            backgroundColor: canGoPrevious() ? '#6b7280' : '#e5e7eb',
            color: canGoPrevious() ? 'white' : '#9ca3af',
            border: 'none',
            borderRadius: '8px',
            cursor: canGoPrevious() ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Предыдущий урок
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
            Прогресс урока
          </div>
          <div style={{
            width: '200px',
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: '#10b981',
              width: `${lessonProgress?.is_completed ? 100 : videoProgress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            {lessonProgress?.is_completed ? '100%' : `${Math.round(videoProgress)}%`}
          </div>
        </div>

        <button
          onClick={goToNextLesson}
          disabled={!canGoNext() || !isLessonCompleted}
          style={{
            padding: '12px 24px',
            backgroundColor: canGoNext() && isLessonCompleted ? '#10b981' : '#e5e7eb',
            color: canGoNext() && isLessonCompleted ? 'white' : '#9ca3af',
            border: 'none',
            borderRadius: '8px',
            cursor: canGoNext() && isLessonCompleted ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Следующий урок →
        </button>
      </div>

      {/* Уведомление о завершении */}
      {isLessonCompleted && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#d1fae5',
          border: '1px solid #a7f3d0',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '16px', color: '#065f46', fontWeight: '600' }}>
            🎉 Урок завершен!
          </div>
          <div style={{ fontSize: '14px', color: '#047857', marginTop: '4px' }}>
            Теперь вы можете перейти к следующему уроку
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer; 