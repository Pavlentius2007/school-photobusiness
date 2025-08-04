import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, FullCourse as CourseDetailData } from '../data/coursesData';
import CourseMaterials from '../components/CourseMaterials';

interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: CourseLesson[];
}

interface CourseLesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'practice' | 'theory';
}

interface CourseGalleryImage {
  id: number;
  url: string;
  title: string;
  description?: string;
}



const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openTelegramConsultation = () => {
    const username = 'Pavlentius2007';
    
    // Уникальные сообщения для каждого курса
    let message = '';
    if (courseId === '1') {
      message = 'Здравствуйте! Хочу получить информацию о курсе "Особенности фотографии в школах/садах" и записаться. Интересует полный курс по школьной фотографии.';
    } else if (courseId === '2') {
      message = 'Здравствуйте! Хочу получить информацию о курсе "Дизайн и создание макетов" и записаться. Интересует курс по работе с Photoshop и созданию макетов.';
    } else if (courseId === '3') {
      message = 'Здравствуйте! Хочу получить информацию о курсе "Администрирование, ценообразование + инструменты управления" и записаться. Интересует полный курс по управлению фотобизнесом.';
    } else {
      message = 'Здравствуйте! Хочу получить информацию о курсе и записаться.';
    }
    
    const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  useEffect(() => {
    const loadCourseDetail = async () => {
      try {
        setIsLoading(true);
        
        if (courseId) {
          const courseData = getCourseById(parseInt(courseId));
          if (courseData) {
            setCourse(courseData);
          } else {
            // Если курс не найден, перенаправляем на страницу курсов
            navigate('/courses');
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки курса:', error);
        navigate('/courses');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourseDetail();
  }, [courseId, navigate]);


  const getLevelBadge = (level: string) => {
    const styles = {
      beginner: { bg: '#e8f5e8', color: '#2d5a2d', text: 'Начинающий' },
      intermediate: { bg: '#fff3cd', color: '#856404', text: 'Средний' },
      advanced: { bg: '#f8d7da', color: '#721c24', text: 'Продвинутый' }
    };
    const style = styles[level as keyof typeof styles] || styles.beginner;
    
    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        {style.text}
      </span>
    );
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'practice': return '💡';
      case 'theory': return '📚';
      default: return '📝';
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Загрузка курса...
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        gap: '20px'
      }}>
        <h2 style={{ color: '#ef4444', fontSize: '24px' }}>Курс не найден</h2>
        <button 
          onClick={() => navigate('/catalog')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Вернуться к каталогу
        </button>
      </div>
    );
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
        marginBottom: '30px', 
        color: '#6b7280', 
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span 
          style={{ cursor: 'pointer', color: '#6366f1' }}
          onClick={() => navigate('/')}
        >
          Главная
        </span>
        <span>→</span>
        <span 
          style={{ cursor: 'pointer', color: '#6366f1' }}
          onClick={() => navigate('/catalog')}
        >
          Курсы
        </span>
        <span>→</span>
        <span>{course.title}</span>
      </div>

      {/* Заголовок и краткое описание */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{ marginBottom: '20px' }}>
          {getLevelBadge(course.level)}
        </div>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          margin: '20px 0',
          color: '#1f2937',
          lineHeight: '1.2'
        }}>
          {course.title}
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#6b7280', 
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {course.shortDescription}
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{course.duration}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Длительность</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{course.lessonsCount}</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Уроков</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>∞</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Доступ</div>
          </div>
        </div>
      </div>

      {/* Галерея работ */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1f2937'
        }}>
          Примеры работ из курса
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {course.gallery.map((image, index) => (
            <div 
              key={image.id}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onClick={() => setSelectedImageIndex(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{
                width: '100%',
                height: '250px',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: 'white',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold' }}>
                    {image.title}
                  </h3>
                  {image.description && (
                    <p style={{ margin: '0', fontSize: '14px', opacity: '0.9' }}>
                      {image.description}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: '48px', opacity: '0.3' }}>📷</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Что вы изучите */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1f2937'
        }}>
          Что вы изучите
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {course.whatYouWillLearn.map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                padding: '20px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              </div>
              <span style={{ fontSize: '16px', lineHeight: '1.5', color: '#374151' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Программа курса */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1f2937'
        }}>
          Программа курса
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {course.modules.map((module, index) => (
            <div 
              key={module.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '20px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                padding: '25px',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#6366f1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: '0', 
                      fontSize: '20px', 
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      {module.title}
                    </h3>
                    <p style={{ 
                      margin: '5px 0 0 0', 
                      color: '#6b7280', 
                      fontSize: '14px'
                    }}>
                      {module.duration}
                    </p>
                  </div>
                </div>
                <p style={{ 
                  margin: '0', 
                  color: '#374151', 
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}>
                  {module.description}
                </p>
              </div>
              <div style={{ padding: '20px' }}>
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '12px 0',
                      borderBottom: '1px solid #f1f5f9'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      {getLessonTypeIcon(lesson.type)}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0', 
                        fontSize: '16px', 
                        color: '#1f2937'
                      }}>
                        {lesson.title}
                      </h4>
                    </div>
                    <span style={{ 
                      color: '#6b7280', 
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Для кого курс */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              color: '#1f2937'
            }}>
              Для кого этот курс
            </h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {course.forWhom.map((item, index) => (
                <li 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '15px',
                    padding: '15px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '8px',
                    border: '1px solid #dbeafe'
                  }}
                >
                  <span style={{ color: '#3b82f6', fontSize: '16px', marginTop: '2px' }}>👤</span>
                  <span style={{ fontSize: '16px', lineHeight: '1.5', color: '#374151' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              color: '#1f2937'
            }}>
              Что понадобится
            </h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {course.requirements.map((item, index) => (
                <li 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '15px',
                    padding: '15px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #dcfce7'
                  }}
                >
                  <span style={{ color: '#22c55e', fontSize: '16px', marginTop: '2px' }}>📋</span>
                  <span style={{ fontSize: '16px', lineHeight: '1.5', color: '#374151' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Преподаватель */}
      <section style={{ 
        marginBottom: '60px',
        backgroundColor: '#f8fafc',
        padding: '40px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1f2937'
        }}>
          Ваш преподаватель
        </h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '30px',
          maxWidth: '600px',
          margin: '0 auto',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            flexShrink: 0
          }}>
            👩‍🎨
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              color: '#1f2937'
            }}>
              {course.instructor.name}
            </h3>
            <p style={{ 
              color: '#6366f1', 
              fontSize: '16px', 
              fontWeight: '500',
              marginBottom: '15px'
            }}>
              {course.instructor.experience}
            </p>
            <p style={{ 
              color: '#374151', 
              fontSize: '16px', 
              lineHeight: '1.6',
              margin: '0'
            }}>
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Дополнительные преимущества */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: '40px',
          color: '#1f2937'
        }}>
          Что входит в курс
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎓</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
              Сертификат
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
              Получите официальный сертификат о прохождении курса
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🤝</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
              Поддержка
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
              {course.support}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>💎</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
              Доступ навсегда
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
              Пожизненный доступ ко всем материалам курса
            </p>
          </div>
        </div>
      </section>

      {/* Материалы курса */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <CourseMaterials 
            courseId={parseInt(courseId || '1')}
            materials={course.modules.flatMap(module => 
              module.lessons.flatMap(lesson => lesson.materials || [])
            )}
            courseTitle={course.title}
          />
        </div>
      </section>

      {/* Цена и записи на курс */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #6366f1',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Стоимость курса
          </h2>
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#6366f1',
            marginBottom: '30px'
          }}>
            {course.price.toLocaleString()} ₽
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={openTelegramConsultation}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '16px 40px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5856eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6366f1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Записаться на курс
            </button>
          </div>
        </div>
    </div>
  );
};

export default CourseDetailPage;