import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  status: 'draft' | 'published' | 'archived';
  curator: string;
  studentsCount: number;
  createdAt: string;
  imageUrl: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  maxStudents: number;
  lessonsCount: number;
  rating: number;
}

const CoursesManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    curator: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    maxStudents: number;
    lessonsCount: number;
  }>({
    title: '',
    description: '',
    price: 0,
    curator: '',
    duration: '',
    level: 'beginner',
    category: '',
    maxStudents: 50,
    lessonsCount: 0
  });

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'Особенности фотографии в школах/садах',
          description: 'Полный курс по школьной фотографии с практическими навыками работы с детьми',
          price: 19900,
          status: 'published',
          curator: 'Анна Петрова',
          studentsCount: 25,
          createdAt: '2024-01-15',
          imageUrl: 'https://via.placeholder.com/300x200',
          duration: '6 недель',
          level: 'beginner',
          category: 'Школьная фотография',
          maxStudents: 50,
          lessonsCount: 10,
          rating: 4.8
        },
        {
          id: 2,
          title: 'Дизайн и создание макетов',
          description: 'Профессиональный курс по работе с Photoshop и созданию макетов',
          price: 49900,
          status: 'published',
          curator: 'Михаил Сидоров',
          studentsCount: 18,
          createdAt: '2024-01-20',
          imageUrl: 'https://via.placeholder.com/300x200',
          duration: '8 недель',
          level: 'intermediate',
          category: 'Дизайн',
          maxStudents: 30,
          lessonsCount: 12,
          rating: 4.9
        },
        {
          id: 3,
          title: 'Администрирование, ценообразование + инструменты управления',
          description: 'Полный курс по управлению фотобизнесом с инструментами администрирования',
          price: 98000,
          status: 'published',
          curator: 'Елена Козлова',
          studentsCount: 12,
          createdAt: '2024-02-01',
          imageUrl: 'https://via.placeholder.com/300x200',
          duration: '10 недель',
          level: 'advanced',
          category: 'Бизнес',
          maxStudents: 20,
          lessonsCount: 15,
          rating: 4.7
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: '#f59e0b', bg: '#fef3c7', text: 'Черновик' },
      published: { color: '#10b981', bg: '#d1fae5', text: 'Опубликован' },
      archived: { color: '#6b7280', bg: '#f3f4f6', text: 'Архив' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500',
        color: config.color,
        background: config.bg
      }}>
        {config.text}
      </span>
    );
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
      curator: course.curator,
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

  const handleViewCourse = (course: Course) => {
    // Здесь можно добавить навигацию к детальной странице курса
    alert(`Просмотр курса: ${course.title}`);
  };

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.curator) {
      const course: Course = {
        id: courses.length + 1,
        title: newCourse.title,
        description: newCourse.description,
        price: newCourse.price,
        status: 'draft',
        curator: newCourse.curator,
        studentsCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        imageUrl: 'https://via.placeholder.com/300x200',
        duration: newCourse.duration,
        level: newCourse.level,
        category: newCourse.category,
        maxStudents: newCourse.maxStudents,
        lessonsCount: newCourse.lessonsCount,
        rating: 0
      };
      setCourses([...courses, course]);
      setNewCourse({
        title: '',
        description: '',
        price: 0,
        curator: '',
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
    if (selectedCourse && newCourse.title && newCourse.description && newCourse.curator) {
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

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <img 
          src={course.imageUrl} 
          alt={course.title}
          style={{
            width: '80px',
            height: '60px',
            borderRadius: '8px',
            objectFit: 'cover'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
              {course.title}
            </h3>
            {getStatusBadge(course.status)}
          </div>
          <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '14px' }}>
            {course.description}
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
            <span>💰 {course.price.toLocaleString()}₽</span>
            <span>👨‍🏫 {course.curator}</span>
            <span>👥 {course.studentsCount}/{course.maxStudents}</span>
            <span>📅 {new Date(course.createdAt).toLocaleDateString()}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#94a3b8', alignItems: 'center' }}>
            <span>⏱️ {course.duration}</span>
            {getLevelBadge(course.level)}
            <span>📚 {course.lessonsCount} уроков</span>
            <span>⭐ {course.rating.toFixed(1)}</span>
            <span>🏷️ {course.category}</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button 
          onClick={() => handleEditCourse(course)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #667eea',
            background: 'white',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#667eea';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#667eea';
          }}
        >
          ✏️ Редактировать
        </button>
        <button 
          onClick={() => handleViewCourse(course)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #10b981',
            background: 'white',
            color: '#10b981',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#10b981';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#10b981';
          }}
        >
          👁️ Просмотр
        </button>
        <button 
          onClick={() => handleDeleteCourse(course)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #ef4444',
            background: 'white',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#ef4444';
          }}
        >
          🗑️ Удалить
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      padding: '24px'
    }}>
      {/* Заголовок */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 8px 0'
            }}>
              📚 Управление курсами
            </h1>
            <p style={{ color: '#64748b', margin: '0' }}>
              Создание, редактирование и управление курсами
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            ➕ Создать курс
          </button>
        </div>

        {/* Фильтры и поиск */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Поиск курсов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              minWidth: '300px'
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              background: 'white'
            }}
          >
            <option value="all">Все статусы</option>
            <option value="draft">Черновики</option>
            <option value="published">Опубликованные</option>
            <option value="archived">Архив</option>
          </select>
        </div>
      </div>

      {/* Список курсов */}
      <div>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#64748b' }}>Загрузка курсов...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Курсы не найдены</p>
            <p style={{ color: '#94a3b8' }}>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
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
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '600' }}>
              Создать новый курс
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleCreateCourse(); }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Название курса *
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px'
                  }}
                  placeholder="Введите название курса"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Описание *
                </label>
                <textarea
                  rows={4}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                  placeholder="Подробное описание курса"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value) || 0})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Куратор *
                  </label>
                  <input
                    type="text"
                    value={newCourse.curator}
                    onChange={(e) => setNewCourse({...newCourse, curator: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="Имя куратора"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Длительность
                  </label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="например: 8 недель"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Уровень сложности
                  </label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value as any})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                  >
                    <option value="beginner">Начинающий</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Категория
                  </label>
                  <input
                    type="text"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="например: Основы"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Максимум студентов
                  </label>
                  <input
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) => setNewCourse({...newCourse, maxStudents: parseInt(e.target.value) || 50})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="50"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Количество уроков
                </label>
                <input
                  type="number"
                  value={newCourse.lessonsCount}
                  onChange={(e) => setNewCourse({...newCourse, lessonsCount: parseInt(e.target.value) || 0})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px'
                  }}
                  placeholder="0"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Создать курс
                </button>
              </div>
            </form>
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
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '600' }}>
              Редактировать курс
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateCourse(); }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Название курса *
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px'
                  }}
                  placeholder="Введите название курса"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Описание *
                </label>
                <textarea
                  rows={4}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                  placeholder="Подробное описание курса"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value) || 0})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Куратор *
                  </label>
                  <input
                    type="text"
                    value={newCourse.curator}
                    onChange={(e) => setNewCourse({...newCourse, curator: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="Имя куратора"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Длительность
                  </label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="например: 8 недель"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Уровень сложности
                  </label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value as any})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                  >
                    <option value="beginner">Начинающий</option>
                    <option value="intermediate">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Категория
                  </label>
                  <input
                    type="text"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="например: Основы"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Максимум студентов
                  </label>
                  <input
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) => setNewCourse({...newCourse, maxStudents: parseInt(e.target.value) || 50})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                    placeholder="50"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Количество уроков
                </label>
                <input
                  type="number"
                  value={newCourse.lessonsCount}
                  onChange={(e) => setNewCourse({...newCourse, lessonsCount: parseInt(e.target.value) || 0})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '16px'
                  }}
                  placeholder="0"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  Сохранить изменения
                </button>
              </div>
            </form>
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