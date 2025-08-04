import React, { useState, useEffect } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  studentsCount: number;
  lessonsCount: number;
  price: number;
  createdAt: string;
  image: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  maxStudents: number;
  rating: number;
}

const CoursesManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<{
    title: string;
    description: string;
    price: number;
    status: 'active' | 'draft' | 'archived';
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    maxStudents: number;
    lessonsCount: number;
  }>({
    title: '',
    description: '',
    price: 0,
    status: 'draft',
    duration: '',
    level: 'beginner',
    category: '',
    maxStudents: 50,
    lessonsCount: 0
  });

  useEffect(() => {
    // Имитация загрузки данных
    setCourses([
              {
          id: 1,
          title: 'Особенности фотографии в школах/садах',
          description: 'Полный курс по школьной фотографии с практическими навыками работы с детьми',
          status: 'active',
          studentsCount: 25,
          lessonsCount: 10,
          price: 19900,
          createdAt: '2024-01-15',
          image: '📚',
          duration: '6 недель',
          level: 'beginner',
          category: 'Школьная фотография',
          maxStudents: 50,
          rating: 4.8
        },
        {
          id: 2,
          title: 'Дизайн и создание макетов',
          description: 'Профессиональный курс по работе с Photoshop и созданию макетов',
          status: 'active',
          studentsCount: 18,
          lessonsCount: 12,
          price: 49900,
          createdAt: '2024-02-01',
          image: '🎨',
          duration: '8 недель',
          level: 'intermediate',
          category: 'Дизайн',
          maxStudents: 30,
          rating: 4.9
        },
        {
          id: 3,
          title: 'Администрирование, ценообразование + инструменты управления',
          description: 'Полный курс по управлению фотобизнесом с инструментами администрирования',
          status: 'active',
          studentsCount: 12,
          lessonsCount: 15,
          price: 98000,
          createdAt: '2024-02-10',
          image: '💼',
          duration: '10 недель',
          level: 'advanced',
          category: 'Бизнес',
          maxStudents: 20,
          rating: 4.7
        },

    ]);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#48bb78';
      case 'draft': return '#ed8936';
      case 'archived': return '#e53e3e';
      default: return '#718096';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'draft': return 'Черновик';
      case 'archived': return 'Архивный';
      default: return status;
    }
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      beginner: { color: '#10b981', bg: '#d1fae5', text: 'Начинающий' },
      intermediate: { color: '#f59e0b', bg: '#fef3c7', text: 'Средний' },
      advanced: { color: '#ef4444', bg: '#fee2e2', text: 'Продвинутый' }
    };
    const config = levelConfig[level as keyof typeof levelConfig];
    
    return (
      <span style={{
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: '500',
        color: config.color,
        background: config.bg
      }}>
        {config.text}
      </span>
    );
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      price: course.price,
      status: course.status,
      duration: course.duration,
      level: course.level,
      category: course.category,
      maxStudents: course.maxStudents,
      lessonsCount: course.lessonsCount
    });
    setShowEditModal(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleViewStats = (course: Course) => {
    alert(`Статистика курса: ${course.title}\nСтудентов: ${course.studentsCount}\nРейтинг: ${course.rating}`);
  };

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const course: Course = {
        id: courses.length + 1,
        title: newCourse.title,
        description: newCourse.description,
        status: newCourse.status as 'active' | 'draft' | 'archived',
        studentsCount: 0,
        lessonsCount: newCourse.lessonsCount,
        price: newCourse.price,
        createdAt: new Date().toISOString().split('T')[0],
        image: '📚',
        duration: newCourse.duration,
        level: newCourse.level,
        category: newCourse.category,
        maxStudents: newCourse.maxStudents,
        rating: 0
      };
      setCourses([...courses, course]);
      setNewCourse({ 
        title: '', 
        description: '', 
        price: 0, 
        status: 'draft',
        duration: '',
        level: 'beginner',
        category: '',
        maxStudents: 50,
        lessonsCount: 0
      });
      setShowCreateModal(false);
    }
  };

  const handleUpdateCourse = () => {
    if (selectedCourse && newCourse.title && newCourse.description) {
      setCourses(courses.map(course => 
        course.id === selectedCourse.id 
          ? { ...course, ...newCourse }
          : course
      ));
      setShowEditModal(false);
      setSelectedCourse(null);
    }
  };

  const confirmDeleteCourse = () => {
    if (selectedCourse) {
      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      setShowDeleteModal(false);
      setSelectedCourse(null);
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2d3748',
            margin: '0 0 10px 0'
          }}>
            Мои курсы
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            margin: 0
          }}>
            Управляйте своими курсами и контентом
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
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
          + Создать курс
        </button>
      </div>

      {/* Фильтры и поиск */}
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
          gridTemplateColumns: '1fr auto',
          gap: '20px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
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
            <option value="draft">Черновики</option>
            <option value="archived">Архивные</option>
          </select>
        </div>
      </div>

      {/* Список курсов */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                {course.image}
              </div>
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
                {course.description}
              </p>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'white',
                  background: getStatusColor(course.status)
                }}>
                  {getStatusText(course.status)}
                </span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#2d3748'
                }}>
                  {course.price.toLocaleString()} ₽
                </span>
              </div>

              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '12px',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '12px', color: '#718096' }}>⏱️ {course.duration}</span>
                {getLevelBadge(course.level)}
                <span style={{ fontSize: '12px', color: '#718096' }}>🏷️ {course.category}</span>
                <span style={{ fontSize: '12px', color: '#718096' }}>⭐ {course.rating.toFixed(1)}</span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#2d3748'
                  }}>
                    {course.studentsCount}/{course.maxStudents}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#718096'
                  }}>
                    Студентов
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#2d3748'
                  }}>
                    {course.lessonsCount}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#718096'
                  }}>
                    Уроков
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px'
              }}>
                <button 
                  onClick={() => handleEditCourse(course)}
                  style={{
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ✏️ Редактировать
                </button>
                <button 
                  onClick={() => handleViewStats(course)}
                  style={{
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  📊 Статистика
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course)}
                  style={{
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  🗑️ Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно создания курса */}
      {showCreateModal && (
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
              Создать новый курс
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                Название курса *
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="Введите название курса"
                required
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
                Описание *
              </label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                placeholder="Введите описание курса"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Цена (₽) *
                </label>
                <input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value) || 0})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="0"
                  required
                />
              </div>
              <div>
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
                  value={newCourse.status}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'active' || value === 'draft' || value === 'archived') {
                      setNewCourse({...newCourse, status: value});
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="draft">Черновик</option>
                  <option value="active">Активный</option>
                  <option value="archived">Архивный</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Длительность
                </label>
                <input
                  type="text"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="например: 8 недель"
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Уровень сложности
                </label>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({...newCourse, level: e.target.value as any})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="beginner">Начинающий</option>
                  <option value="intermediate">Средний</option>
                  <option value="advanced">Продвинутый</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Категория
                </label>
                <input
                  type="text"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="например: Основы"
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Максимум студентов
                </label>
                <input
                  type="number"
                  value={newCourse.maxStudents}
                  onChange={(e) => setNewCourse({...newCourse, maxStudents: parseInt(e.target.value) || 50})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="50"
                />
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
                Количество уроков
              </label>
              <input
                type="number"
                value={newCourse.lessonsCount}
                onChange={(e) => setNewCourse({...newCourse, lessonsCount: parseInt(e.target.value) || 0})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="0"
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowCreateModal(false)}
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
                onClick={handleCreateCourse}
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
                Создать курс
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно редактирования курса */}
      {showEditModal && selectedCourse && (
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
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d3748',
              margin: '0 0 20px 0'
            }}>
              Редактировать курс
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748'
              }}>
                Название курса *
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="Введите название курса"
                required
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
                Описание *
              </label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                placeholder="Введите описание курса"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Цена (₽) *
                </label>
                <input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value) || 0})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="0"
                  required
                />
              </div>
              <div>
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
                  value={newCourse.status}
                  onChange={(e) => setNewCourse({...newCourse, status: e.target.value as 'active' | 'draft' | 'archived'})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="draft">Черновик</option>
                  <option value="active">Активный</option>
                  <option value="archived">Архивный</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Длительность
                </label>
                <input
                  type="text"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="например: 8 недель"
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Уровень сложности
                </label>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({...newCourse, level: e.target.value as any})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="beginner">Начинающий</option>
                  <option value="intermediate">Средний</option>
                  <option value="advanced">Продвинутый</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Категория
                </label>
                <input
                  type="text"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="например: Основы"
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#2d3748'
                }}>
                  Максимум студентов
                </label>
                <input
                  type="number"
                  value={newCourse.maxStudents}
                  onChange={(e) => setNewCourse({...newCourse, maxStudents: parseInt(e.target.value) || 50})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="50"
                />
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
                Количество уроков
              </label>
              <input
                type="number"
                value={newCourse.lessonsCount}
                onChange={(e) => setNewCourse({...newCourse, lessonsCount: parseInt(e.target.value) || 0})}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="0"
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowEditModal(false)}
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
                onClick={handleUpdateCourse}
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
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      {showDeleteModal && selectedCourse && (
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
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '600', color: '#ef4444' }}>
              Удалить курс?
            </h2>
            <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '16px' }}>
              Вы уверены, что хотите удалить курс "{selectedCourse.title}"? Это действие нельзя отменить.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Отмена
              </button>
              <button
                onClick={confirmDeleteCourse}
                style={{
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagementPage; 