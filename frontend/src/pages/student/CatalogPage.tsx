import React, { useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  category: string;
  level: string;
  image: string;
  enrolled: boolean;
}

const CatalogPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Особенности фотографии в школах/садах',
      description: 'Полный курс по школьной фотографии с практическими навыками работы с детьми. Освойте выбор техники, настройки камеры, работу с освещением и создание портретов и коллажей.',
      instructor: 'Анна Петрова',
      price: 19900,
      duration: '6 недель',
      lessons: 10,
      students: 25,
      rating: 4.8,
      reviews: 15,
      category: 'Школьная фотография',
      level: 'Базовый',
      image: '📚',
      enrolled: false
    },
    {
      id: 2,
      title: 'Дизайн и создание макетов',
      description: 'Профессиональный курс по работе с Photoshop и созданию макетов. Научитесь создавать портреты, коллажи, виньетки и профессиональные макеты для печати.',
      instructor: 'Михаил Сидоров',
      price: 49900,
      duration: '8 недель',
      lessons: 12,
      students: 18,
      rating: 4.9,
      reviews: 12,
      category: 'Дизайн',
      level: 'Продвинутый',
      image: '🎨',
      enrolled: false
    },
    {
      id: 3,
      title: 'Администрирование, ценообразование + инструменты управления',
      description: 'Полный курс по управлению фотобизнесом с инструментами администрирования. Изучите ценообразование, работу с администрацией, партнерства и финансовый контроль.',
      instructor: 'Елена Козлова',
      price: 98000,
      duration: '10 недель',
      lessons: 15,
      students: 12,
      rating: 4.7,
      reviews: 8,
      category: 'Бизнес',
      level: 'Эксперт',
      image: '💼',
      enrolled: true
    },

  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const categories = ['all', 'Основы', 'Портрет', 'Студия', 'Пейзаж', 'Макро'];
  const levels = ['all', 'Начинающий', 'Средний', 'Продвинутый'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollModal(true);
  };

  const handleEnroll = async () => {
    if (!selectedCourse) return;
    
    setIsLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Обновляем состояние курса
    setCourses(prev => prev.map(course => 
      course.id === selectedCourse.id 
        ? { ...course, enrolled: true }
        : course
    ));
    
    setIsLoading(false);
    setEnrollSuccess(true);
    setShowEnrollModal(false);
    
    // Скрываем сообщение об успехе через 3 секунды
    setTimeout(() => setEnrollSuccess(false), 3000);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSortBy('popular');
  };

  return (
    <div>
      {/* Уведомление об успешной записи */}
      {enrollSuccess && (
        <div style={{
          background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', marginRight: '10px' }}>✅</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Вы успешно записались на курс!
            </span>
          </div>
          <button
            onClick={() => setEnrollSuccess(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2d3748',
          marginBottom: '10px'
        }}>
          Каталог курсов
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#718096',
          margin: 0
        }}>
          Найдите подходящий курс для развития ваших навыков фотографии
        </p>
      </div>

      {/* Поиск и фильтры */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: '20px',
          alignItems: 'end'
        }}>
          {/* Поиск */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#4a5568',
              marginBottom: '8px'
            }}>
              Поиск курсов
            </label>
            <input
              type="text"
              placeholder="Название курса, описание или инструктор..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
            />
          </div>

          {/* Категория */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#4a5568',
              marginBottom: '8px'
            }}>
              Категория
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Все категории' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Уровень */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#4a5568',
              marginBottom: '8px'
            }}>
              Уровень
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'Все уровни' : level}
                </option>
              ))}
            </select>
          </div>

          {/* Сортировка */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#4a5568',
              marginBottom: '8px'
            }}>
              Сортировка
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="popular">По популярности</option>
              <option value="rating">По рейтингу</option>
              <option value="price_low">По цене (дешевле)</option>
              <option value="price_high">По цене (дороже)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Результаты поиска */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <p style={{
          fontSize: '16px',
          color: '#4a5568',
          margin: 0
        }}>
          Найдено курсов: <strong>{sortedCourses.length}</strong>
        </p>
        <button
          onClick={clearFilters}
          style={{
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
            color: '#4a5568',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Очистить фильтры
        </button>
      </div>

      {/* Список курсов */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {sortedCourses.map(course => (
          <div key={course.id} style={{
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
                  fontSize: '32px',
                  marginRight: '15px'
                }}>
                  {course.image}
                </span>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '0 0 5px 0'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    margin: 0,
                    opacity: 0.9
                  }}>
                    {course.instructor}
                  </p>
                </div>
              </div>
              {course.enrolled && (
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  Записан
                </span>
              )}
            </div>

            <div style={{ padding: '20px' }}>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                margin: '0 0 15px 0',
                lineHeight: '1.5'
              }}>
                {course.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Категория:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {course.category}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Уровень:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {course.level}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Длительность:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0
                  }}>
                    {course.duration}
                  </p>
                </div>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Уроков:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#4a5568',
                    margin: 0
                  }}>
                    {course.lessons}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#ed8936',
                    marginRight: '5px'
                  }}>
                    ⭐
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#4a5568'
                  }}>
                    {course.rating}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    marginLeft: '5px'
                  }}>
                    ({course.reviews} отзывов)
                  </span>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#a0aec0'
                }}>
                  {course.students} студентов
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    margin: '0 0 3px 0'
                  }}>
                    Стоимость:
                  </p>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    margin: 0
                  }}>
                    {formatPrice(course.price)} ₽
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
                    color: '#4a5568',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 1,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleCourseClick(course)}
                >
                  Подробнее
                </button>
                <button 
                  style={{
                    background: course.enrolled 
                      ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    flex: 2,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleEnrollClick(course)}
                >
                  {course.enrolled ? 'Перейти к курсу' : 'Записаться'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>
            🔍
          </div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            Курсы не найдены
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      )}

      {/* Модальное окно для деталей курса */}
      {selectedCourse && showCourseModal && (
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
            maxWidth: '600px',
            maxHeight: '90%',
            overflowY: 'auto',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '15px'
            }}>
              {selectedCourse.title}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              marginBottom: '15px'
            }}>
              {selectedCourse.description}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Инструктор: {selectedCourse.instructor}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Категория: {selectedCourse.category}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Уровень: {selectedCourse.level}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Длительность: {selectedCourse.duration}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Уроков: {selectedCourse.lessons}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Рейтинг: {selectedCourse.rating} (отзывов: {selectedCourse.reviews})
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Студентов: {selectedCourse.students}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#718096',
              marginBottom: '15px'
            }}>
              Стоимость: {formatPrice(selectedCourse.price)} ₽
            </p>
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
                width: '100%',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleEnrollClick(selectedCourse)}
            >
              {selectedCourse.enrolled ? 'Перейти к курсу' : 'Записаться на курс'}
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
                width: '100%',
                marginTop: '10px',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setShowCourseModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно для записи на курс */}
      {selectedCourse && showEnrollModal && (
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
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '15px'
            }}>
              Запись на курс
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              marginBottom: '20px'
            }}>
              Вы уверены, что хотите записаться на "{selectedCourse.title}"?
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '20px'
            }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '45%',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleEnroll}
                disabled={isLoading}
              >
                {isLoading ? 'Запись...' : 'Записаться'}
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
                  width: '45%',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setShowEnrollModal(false)}
              >
                Отмена
              </button>
            </div>
            {enrollSuccess && (
              <div style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                Вы успешно записались на курс!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage; 