import React, { useState, useEffect } from 'react';
import { getFullCourses, FullCourse as CourseContentData, CourseModule, CourseLesson, CourseMaterial, LessonQuestion, LessonAssignment, LessonTest } from '../../data/coursesData';
import LessonInteractiveManager from '../../components/admin/LessonInteractiveManager';

const CourseContentManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseContentData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Состояние для редактирования
  const [editingCourse, setEditingCourse] = useState<CourseContentData | null>(null);
  
  // Состояние для управления материалами
  const [selectedLessonForMaterials, setSelectedLessonForMaterials] = useState<{moduleId: number, lessonId: number} | null>(null);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  
  // Состояние для управления интерактивными элементами урока
  const [selectedLessonForInteractive, setSelectedLessonForInteractive] = useState<{moduleId: number, lessonId: number} | null>(null);
  const [showInteractiveModal, setShowInteractiveModal] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      // Загружаем данные из централизованного хранилища
      const coursesData = getFullCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCourse = (course: CourseContentData) => {
    setSelectedCourse(course);
    setEditingCourse({ ...course });
    setShowEditModal(true);
    setActiveTab('basic');
  };

  const handleSaveCourse = () => {
    if (editingCourse) {
      setCourses(prev => prev.map(course => 
        course.id === editingCourse.id ? editingCourse : course
      ));
      setShowEditModal(false);
      setSelectedCourse(null);
      setEditingCourse(null);
    }
  };

  const handleAddModule = () => {
    if (editingCourse) {
      const newModule: CourseModule = {
        id: Date.now(),
        title: "Новый модуль",
        description: "Описание модуля",
        duration: "1 неделя",
        lessons: []
      };
      setEditingCourse({
        ...editingCourse,
        modules: [...editingCourse.modules, newModule]
      });
    }
  };

  const handleDeleteModule = (moduleId: number) => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.filter(m => m.id !== moduleId)
      });
    }
  };

  const handleAddLesson = (moduleId: number) => {
    if (editingCourse) {
      const newLesson: CourseLesson = {
        id: Date.now(),
        title: "Новый урок",
        duration: "30 мин",
        type: "theory"
      };
      
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.map(module =>
          module.id === moduleId
            ? { ...module, lessons: [...module.lessons, newLesson] }
            : module
        )
      });
    }
  };

  const updateModule = (moduleId: number, field: string, value: string) => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.map(module =>
          module.id === moduleId ? { ...module, [field]: value } : module
        )
      });
    }
  };

  const updateLesson = (moduleId: number, lessonId: number, field: string, value: string) => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
                )
              }
            : module
        )
      });
    }
  };

  // Функции для управления материалами
  const handleOpenMaterials = (moduleId: number, lessonId: number) => {
    setSelectedLessonForMaterials({ moduleId, lessonId });
    setShowMaterialsModal(true);
  };

  // Функции для управления интерактивными элементами
  const handleOpenInteractive = (moduleId: number, lessonId: number) => {
    setSelectedLessonForInteractive({ moduleId, lessonId });
    setShowInteractiveModal(true);
  };

  const handleUpdateLessonQuestions = (questions: LessonQuestion[]) => {
    if (editingCourse && selectedLessonForInteractive) {
      const { moduleId, lessonId } = selectedLessonForInteractive;
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.id === lessonId ? { ...lesson, questions } : lesson
                )
              }
            : module
        )
      });
    }
  };

  const handleUpdateLessonAssignment = (assignment: LessonAssignment | undefined) => {
    if (editingCourse && selectedLessonForInteractive) {
      const { moduleId, lessonId } = selectedLessonForInteractive;
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.id === lessonId ? { ...lesson, assignment } : lesson
                )
              }
            : module
        )
      });
    }
  };

  const handleUpdateLessonTest = (test: LessonTest | undefined) => {
    if (editingCourse && selectedLessonForInteractive) {
      const { moduleId, lessonId } = selectedLessonForInteractive;
      setEditingCourse({
        ...editingCourse,
        modules: editingCourse.modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.map(lesson =>
                  lesson.id === lessonId ? { ...lesson, test } : lesson
                )
              }
            : module
        )
      });
    }
  };

  const handleUploadMaterial = (file: File) => {
    if (!selectedLessonForMaterials || !editingCourse) return;

    const newMaterial: CourseMaterial = {
      id: Date.now(),
      name: file.name,
      type: getFileType(file.name),
      url: URL.createObjectURL(file), // В реальном приложении здесь будет загрузка на сервер
      size: formatFileSize(file.size),
      uploadedAt: new Date().toISOString()
    };

    setEditingCourse({
      ...editingCourse,
      modules: editingCourse.modules.map(module =>
        module.id === selectedLessonForMaterials.moduleId
          ? {
              ...module,
              lessons: module.lessons.map(lesson =>
                lesson.id === selectedLessonForMaterials.lessonId
                  ? {
                      ...lesson,
                      materials: [...(lesson.materials || []), newMaterial]
                    }
                  : lesson
              )
            }
          : module
      )
    });
  };

  const handleDeleteMaterial = (materialId: number) => {
    if (!selectedLessonForMaterials || !editingCourse) return;

    setEditingCourse({
      ...editingCourse,
      modules: editingCourse.modules.map(module =>
        module.id === selectedLessonForMaterials.moduleId
          ? {
              ...module,
              lessons: module.lessons.map(lesson =>
                lesson.id === selectedLessonForMaterials.lessonId
                  ? {
                      ...lesson,
                      materials: lesson.materials?.filter(m => m.id !== materialId) || []
                    }
                  : lesson
              )
            }
          : module
      )
    });
  };

  const getFileType = (fileName: string): 'video' | 'pdf' | 'image' | 'document' | 'presentation' => {
    const ext = fileName.toLowerCase().split('.').pop();
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext || '')) return 'video';
    if (['pdf'].includes(ext || '')) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return 'image';
    if (['ppt', 'pptx'].includes(ext || '')) return 'presentation';
    return 'document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Загрузка курсов...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
          Управление контентом курсов
        </h1>
      </div>

      {/* Список курсов */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {courses.map(course => (
          <div 
            key={course.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}
          >
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: '#1f2937'
            }}>
              {course.title}
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '14px', 
              marginBottom: '16px',
              lineHeight: '1.5'
            }}>
              {course.shortDescription}
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Модулей: {course.modules.length}
              </span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Уроков: {course.modules.reduce((total, module) => total + module.lessons.length, 0)}
              </span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Материалов: {course.modules.reduce((total, module) => 
                  total + module.lessons.reduce((lessonTotal, lesson) => 
                    lessonTotal + (lesson.materials?.length || 0), 0
                  ), 0
                )}
              </span>
            </div>
            <button
              onClick={() => handleEditCourse(course)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5856eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6366f1';
              }}
            >
              Редактировать контент
            </button>
          </div>
        ))}
      </div>

      {/* Модальное окно редактирования */}
      {showEditModal && editingCourse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Заголовок модального окна */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                Редактирование: {editingCourse.title}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Вкладки */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}>
              {[
                { id: 'basic', label: 'Основное' },
                { id: 'content', label: 'Что изучите' },
                { id: 'audience', label: 'Аудитория' },
                { id: 'modules', label: 'Модули' },
                { id: 'materials', label: 'Материалы' },
                { id: 'instructor', label: 'Преподаватель' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '16px 24px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeTab === tab.id ? '#6366f1' : '#6b7280'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Содержимое вкладок */}
            <div style={{ 
              flex: 1, 
              overflow: 'auto', 
              padding: '24px' 
            }}>
              {activeTab === 'basic' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Название курса
                    </label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Краткое описание
                    </label>
                    <textarea
                      value={editingCourse.shortDescription}
                      onChange={(e) => setEditingCourse({...editingCourse, shortDescription: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Полное описание
                    </label>
                    <textarea
                      value={editingCourse.fullDescription}
                      onChange={(e) => setEditingCourse({...editingCourse, fullDescription: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '150px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                    Что изучат студенты
                  </h3>
                  {editingCourse.whatYouWillLearn.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...editingCourse.whatYouWillLearn];
                          newItems[index] = e.target.value;
                          setEditingCourse({...editingCourse, whatYouWillLearn: newItems});
                        }}
                        style={{
                          flex: 1,
                          padding: '10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                      <button
                        onClick={() => {
                          const newItems = editingCourse.whatYouWillLearn.filter((_, i) => i !== index);
                          setEditingCourse({...editingCourse, whatYouWillLearn: newItems});
                        }}
                        style={{
                          padding: '10px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setEditingCourse({
                        ...editingCourse,
                        whatYouWillLearn: [...editingCourse.whatYouWillLearn, 'Новый пункт']
                      });
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Добавить пункт
                  </button>
                </div>
              )}

              {activeTab === 'audience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div>
                    <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                      Для кого курс
                    </h3>
                    {editingCourse.forWhom.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newItems = [...editingCourse.forWhom];
                            newItems[index] = e.target.value;
                            setEditingCourse({...editingCourse, forWhom: newItems});
                          }}
                          style={{
                            flex: 1,
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                        <button
                          onClick={() => {
                            const newItems = editingCourse.forWhom.filter((_, i) => i !== index);
                            setEditingCourse({...editingCourse, forWhom: newItems});
                          }}
                          style={{
                            padding: '10px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditingCourse({
                          ...editingCourse,
                          forWhom: [...editingCourse.forWhom, 'Новая категория']
                        });
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Добавить категорию
                    </button>
                  </div>

                  <div>
                    <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                      Требования
                    </h3>
                    {editingCourse.requirements.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newItems = [...editingCourse.requirements];
                            newItems[index] = e.target.value;
                            setEditingCourse({...editingCourse, requirements: newItems});
                          }}
                          style={{
                            flex: 1,
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                        <button
                          onClick={() => {
                            const newItems = editingCourse.requirements.filter((_, i) => i !== index);
                            setEditingCourse({...editingCourse, requirements: newItems});
                          }}
                          style={{
                            padding: '10px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditingCourse({
                          ...editingCourse,
                          requirements: [...editingCourse.requirements, 'Новое требование']
                        });
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Добавить требование
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'modules' && (
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '20px' 
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                      Модули курса
                    </h3>
                    <button
                      onClick={handleAddModule}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Добавить модуль
                    </button>
                  </div>

                  {editingCourse.modules.map((module, moduleIndex) => (
                    <div 
                      key={module.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                          Модуль {moduleIndex + 1}
                        </h4>
                        <button
                          onClick={() => handleDeleteModule(module.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Удалить модуль
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                        <input
                          type="text"
                          placeholder="Название модуля"
                          value={module.title}
                          onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                          style={{
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                        <textarea
                          placeholder="Описание модуля"
                          value={module.description}
                          onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                          style={{
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            minHeight: '60px',
                            resize: 'vertical'
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Длительность (например: 2 недели)"
                          value={module.duration}
                          onChange={(e) => updateModule(module.id, 'duration', e.target.value)}
                          style={{
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>

                      <div style={{ marginLeft: '20px' }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          marginBottom: '12px' 
                        }}>
                          <h5 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>
                            Уроки
                          </h5>
                          <button
                            onClick={() => handleAddLesson(module.id)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#6366f1',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Добавить урок
                          </button>
                        </div>

                        {module.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lesson.id}
                            style={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              padding: '12px',
                              marginBottom: '8px'
                            }}
                          >
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '60px' }}>
                                Урок {lessonIndex + 1}:
                              </span>
                              <input
                                type="text"
                                placeholder="Название урока"
                                value={lesson.title}
                                onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: '6px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '4px',
                                  fontSize: '12px'
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Длительность"
                                value={lesson.duration}
                                onChange={(e) => updateLesson(module.id, lesson.id, 'duration', e.target.value)}
                                style={{
                                  width: '80px',
                                  padding: '6px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '4px',
                                  fontSize: '12px'
                                }}
                              />
                              <select
                                value={lesson.type}
                                onChange={(e) => updateLesson(module.id, lesson.id, 'type', e.target.value)}
                                style={{
                                  padding: '6px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '4px',
                                  fontSize: '12px'
                                }}
                              >
                                <option value="theory">Теория</option>
                                <option value="practice">Практика</option>
                                <option value="video">Видео</option>
                              </select>
                              <button
                                onClick={() => handleOpenMaterials(module.id, lesson.id)}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#8b5cf6',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  marginRight: '8px'
                                }}
                              >
                                📁 Материалы
                              </button>
                              <button
                                onClick={() => handleOpenInteractive(module.id, lesson.id)}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#f59e0b',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px'
                                }}
                              >
                                🎯 Интерактив
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                    Управление материалами курса
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                    Выберите урок в разделе "Модули" и нажмите кнопку "📁 Материалы" для загрузки файлов.
                  </p>
                  
                  <div style={{ 
                    backgroundColor: '#f9fafb', 
                    border: '2px dashed #d1d5db', 
                    borderRadius: '8px', 
                    padding: '40px', 
                    textAlign: 'center' 
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                      Материалы курса
                    </h4>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      Здесь будут отображаться все загруженные материалы для уроков курса
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Имя преподавателя
                    </label>
                    <input
                      type="text"
                      value={editingCourse.instructor.name}
                      onChange={(e) => setEditingCourse({
                        ...editingCourse,
                        instructor: {...editingCourse.instructor, name: e.target.value}
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Опыт
                    </label>
                    <input
                      type="text"
                      value={editingCourse.instructor.experience}
                      onChange={(e) => setEditingCourse({
                        ...editingCourse,
                        instructor: {...editingCourse.instructor, experience: e.target.value}
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Биография
                    </label>
                    <textarea
                      value={editingCourse.instructor.bio}
                      onChange={(e) => setEditingCourse({
                        ...editingCourse,
                        instructor: {...editingCourse.instructor, bio: e.target.value}
                      })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '100px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Поддержка студентов
                    </label>
                    <textarea
                      value={editingCourse.support}
                      onChange={(e) => setEditingCourse({...editingCourse, support: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Кнопки действий */}
            <div style={{
              padding: '24px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Отмена
              </button>
              <button
                onClick={handleSaveCourse}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#10b981',
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

      {/* Модальное окно управления материалами */}
      {showMaterialsModal && selectedLessonForMaterials && editingCourse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Заголовок модального окна */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                Материалы урока
              </h2>
              <button
                onClick={() => setShowMaterialsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Содержимое модального окна */}
            <div style={{ 
              flex: 1, 
              overflow: 'auto', 
              padding: '24px' 
            }}>
              {/* Загрузка файлов */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Загрузить новый материал
                </h3>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUploadMaterial(file);
                      e.target.value = ''; // Сброс input
                    }
                  }}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.mkv,.jpg,.jpeg,.png,.gif"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    cursor: 'pointer'
                  }}
                />
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                  Поддерживаемые форматы: PDF, DOC, PPT, видео (MP4, AVI, MOV), изображения (JPG, PNG, GIF)
                </p>
              </div>

              {/* Список материалов */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Загруженные материалы
                </h3>
                {(() => {
                  const lesson = editingCourse.modules
                    .find(m => m.id === selectedLessonForMaterials.moduleId)
                    ?.lessons.find(l => l.id === selectedLessonForMaterials.lessonId);
                  
                  if (!lesson?.materials || lesson.materials.length === 0) {
                    return (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        color: '#6b7280',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📁</div>
                        <p>Материалы не загружены</p>
                      </div>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {lesson.materials.map((material) => (
                        <div
                          key={material.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#f9fafb'
                          }}
                        >
                          <div style={{ 
                            fontSize: '20px', 
                            marginRight: '12px',
                            color: getMaterialIconColor(material.type)
                          }}>
                            {getMaterialIcon(material.type)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                              {material.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              {material.size} • {new Date(material.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => window.open(material.url, '_blank')}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Просмотр
                            </button>
                            <button
                              onClick={() => handleDeleteMaterial(material.id)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Кнопки действий */}
            <div style={{
              padding: '24px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowMaterialsModal(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для интерактивных элементов */}
      {showInteractiveModal && selectedLessonForInteractive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Заголовок модального окна */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                Интерактивные элементы урока
              </h2>
              <button
                onClick={() => setShowInteractiveModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Содержимое модального окна */}
            <div style={{ 
              flex: 1, 
              overflow: 'auto', 
              padding: '24px' 
            }}>
                             {(() => {
                 if (!editingCourse) {
                   return <div>Курс не найден</div>;
                 }
                 
                 const lesson = editingCourse.modules
                   .find(m => m.id === selectedLessonForInteractive.moduleId)
                   ?.lessons.find(l => l.id === selectedLessonForInteractive.lessonId);
                 
                 if (!lesson) {
                   return <div>Урок не найден</div>;
                 }

                 return (
                   <LessonInteractiveManager
                     questions={lesson.questions}
                     assignment={lesson.assignment}
                     test={lesson.test}
                     onQuestionsChange={handleUpdateLessonQuestions}
                     onAssignmentChange={handleUpdateLessonAssignment}
                     onTestChange={handleUpdateLessonTest}
                   />
                 );
               })()}
            </div>

            {/* Кнопки действий */}
            <div style={{
              padding: '24px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowInteractiveModal(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Вспомогательные функции для отображения материалов
const getMaterialIcon = (type: string): string => {
  switch (type) {
    case 'video': return '🎥';
    case 'pdf': return '📄';
    case 'image': return '🖼️';
    case 'presentation': return '📊';
    case 'document': return '📝';
    default: return '📁';
  }
};

const getMaterialIconColor = (type: string): string => {
  switch (type) {
    case 'video': return '#ef4444';
    case 'pdf': return '#3b82f6';
    case 'image': return '#10b981';
    case 'presentation': return '#f59e0b';
    case 'document': return '#8b5cf6';
    default: return '#6b7280';
  }
};

export default CourseContentManagementPage;