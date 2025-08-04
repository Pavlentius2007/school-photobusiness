import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'curator' | 'student';
  status: 'active' | 'inactive' | 'banned';
  registeredAt: string;
  lastLogin: string;
  coursesCount: number;
  avatarUrl: string;
  // Новые поля для документов
  hasPaymentReceipt: boolean;
  hasSignedContract: boolean;
  // Поля для доступа к материалам
  materialAccessUntil: string | null;
  hasCourseAccess: boolean;
  // Доступ к материалам каждого курса
  courseMaterialsAccess: {
    course1: boolean;
    course2: boolean;
    course3: boolean;
  };
}

const UsersManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateCuratorModal, setShowCreateCuratorModal] = useState(false);
  const [newCuratorData, setNewCuratorData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });
  const [isCreatingCurator, setIsCreatingCurator] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedUserForDocuments, setSelectedUserForDocuments] = useState<User | null>(null);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          email: 'admin@sianoro.ru',
          firstName: 'Александр',
          lastName: 'Иванов',
          role: 'admin',
          status: 'active',
          registeredAt: '2024-01-01',
          lastLogin: '2024-02-15',
          coursesCount: 0,
          avatarUrl: 'https://via.placeholder.com/40x40',
          hasPaymentReceipt: true,
          hasSignedContract: true,
          materialAccessUntil: '2025-12-31',
          hasCourseAccess: true,
          courseMaterialsAccess: {
            course1: true,
            course2: true,
            course3: true
          }
        },
        {
          id: 2,
          email: 'anna.petrova@example.com',
          firstName: 'Анна',
          lastName: 'Петрова',
          role: 'curator',
          status: 'active',
          registeredAt: '2024-01-10',
          lastLogin: '2024-02-14',
          coursesCount: 3,
          avatarUrl: 'https://via.placeholder.com/40x40',
          hasPaymentReceipt: true,
          hasSignedContract: true,
          materialAccessUntil: '2025-12-31',
          hasCourseAccess: true,
          courseMaterialsAccess: {
            course1: true,
            course2: true,
            course3: true
          }
        },
        {
          id: 3,
          email: 'mikhail.sidorov@example.com',
          firstName: 'Михаил',
          lastName: 'Сидоров',
          role: 'curator',
          status: 'active',
          registeredAt: '2024-01-15',
          lastLogin: '2024-02-13',
          coursesCount: 2,
          avatarUrl: 'https://via.placeholder.com/40x40',
          hasPaymentReceipt: true,
          hasSignedContract: true,
          materialAccessUntil: '2025-12-31',
          hasCourseAccess: true,
          courseMaterialsAccess: {
            course1: true,
            course2: true,
            course3: true
          }
        },
        {
          id: 4,
          email: 'elena.kozлова@example.com',
          firstName: 'Елена',
          lastName: 'Козлова',
          role: 'student',
          status: 'active',
          registeredAt: '2024-01-20',
          lastLogin: '2024-02-15',
          coursesCount: 5,
          avatarUrl: 'https://via.placeholder.com/40x40',
          hasPaymentReceipt: true,
          hasSignedContract: false,
          materialAccessUntil: '2024-06-30',
          hasCourseAccess: true,
          courseMaterialsAccess: {
            course1: true,
            course2: false,
            course3: false
          }
        },
        {
          id: 5,
          email: 'dmitry.volkov@example.com',
          firstName: 'Дмитрий',
          lastName: 'Волков',
          role: 'student',
          status: 'inactive',
          registeredAt: '2024-01-25',
          lastLogin: '2024-02-01',
          coursesCount: 2,
          avatarUrl: 'https://via.placeholder.com/40x40',
          hasPaymentReceipt: false,
          hasSignedContract: false,
          materialAccessUntil: null,
          hasCourseAccess: false,
          courseMaterialsAccess: {
            course1: false,
            course2: false,
            course3: false
          }
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateCurator = async () => {
    if (!newCuratorData.email || !newCuratorData.firstName || !newCuratorData.lastName || !newCuratorData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsCreatingCurator(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
             const newCurator: User = {
         id: users.length + 1,
         email: newCuratorData.email,
         firstName: newCuratorData.firstName,
         lastName: newCuratorData.lastName,
         role: 'curator',
         status: 'active',
         registeredAt: new Date().toISOString().split('T')[0],
         lastLogin: '-',
         coursesCount: 0,
         avatarUrl: 'https://via.placeholder.com/40x40',
         hasPaymentReceipt: false,
         hasSignedContract: false,
         materialAccessUntil: null,
         hasCourseAccess: false,
         courseMaterialsAccess: {
           course1: false,
           course2: false,
           course3: false
         }
       };

      setUsers([...users, newCurator]);
      setShowCreateCuratorModal(false);
      setNewCuratorData({ email: '', firstName: '', lastName: '', password: '' });
      alert('Куратор успешно создан!');
    } catch (error) {
      alert('Ошибка при создании куратора');
    } finally {
      setIsCreatingCurator(false);
    }
  };

  const handleCuratorDataChange = (field: string, value: string) => {
    setNewCuratorData({
      ...newCuratorData,
      [field]: value
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowEditUserModal(false);
    setEditingUser(null);
  };

  const handleOpenDocuments = (user: User) => {
    setSelectedUserForDocuments(user);
    setShowDocumentsModal(true);
  };

  const handleUpdateDocuments = (userId: number, hasReceipt: boolean, hasContract: boolean) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, hasPaymentReceipt: hasReceipt, hasSignedContract: hasContract }
        : u
    ));
    setShowDocumentsModal(false);
    setSelectedUserForDocuments(null);
  };

  const handleToggleCourseAccess = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, hasCourseAccess: !u.hasCourseAccess }
        : u
    ));
  };

  const handleUpdateMaterialAccess = (userId: number, accessUntil: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, materialAccessUntil: accessUntil }
        : u
    ));
  };

  const handleToggleCourseMaterialAccess = (userId: number, courseId: 'course1' | 'course2' | 'course3') => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { 
            ...u, 
            courseMaterialsAccess: {
              ...u.courseMaterialsAccess,
              [courseId]: !u.courseMaterialsAccess[courseId]
            }
          }
        : u
    ));
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { color: '#dc2626', bg: '#fee2e2', text: 'Администратор' },
      curator: { color: '#7c3aed', bg: '#ede9fe', text: 'Куратор' },
      student: { color: '#059669', bg: '#d1fae5', text: 'Студент' }
    };
    const config = roleConfig[role as keyof typeof roleConfig];
    
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

  const getStatusBadge = (user: User) => {
    const statusConfig = {
      active: { color: '#059669', bg: '#d1fae5', text: 'Активен' },
      inactive: { color: '#6b7280', bg: '#f3f4f6', text: 'Неактивен' },
      banned: { color: '#dc2626', bg: '#fee2e2', text: 'Заблокирован' }
    };
    const config = statusConfig[user.status as keyof typeof statusConfig];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
        {user.status === 'active' && user.materialAccessUntil && (
          <span style={{
            fontSize: '10px',
            color: '#64748b'
          }}>
            До: {new Date(user.materialAccessUntil).toLocaleDateString()}
          </span>
        )}
      </div>
    );
  };

  const UserRow: React.FC<{ user: User }> = ({ user }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      background: 'white',
      borderRadius: '8px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <img 
        src={user.avatarUrl} 
        alt={`${user.firstName} ${user.lastName}`}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '16px'
        }}
      />
      
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
            {user.firstName} {user.lastName}
          </h3>
          {getRoleBadge(user.role)}
          {getStatusBadge(user)}
        </div>
        <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
          {user.email}
        </p>
        
        {/* Документы и доступ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            📄 Чек: {user.hasPaymentReceipt ? '✅' : '❌'}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            📋 Договор: {user.hasSignedContract ? '✅' : '❌'}
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            🎓 Доступ: {user.hasCourseAccess ? '✅' : '❌'}
          </span>
        </div>
        
        {/* Доступ к материалам курсов */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            📚 Курс 1: {user.courseMaterialsAccess.course1 ? '✅' : '❌'}
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            📚 Курс 2: {user.courseMaterialsAccess.course2 ? '✅' : '❌'}
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            📚 Курс 3: {user.courseMaterialsAccess.course3 ? '✅' : '❌'}
          </span>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
        <span style={{ fontSize: '14px', color: '#64748b' }}>
          📚 {user.coursesCount} курсов
        </span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
          📅 {new Date(user.registeredAt).toLocaleDateString()}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
        <button 
          onClick={() => handleEditUser(user)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #667eea',
            background: 'white',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#667eea';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#667eea';
          }}
        >
          ✏️
        </button>
        <button 
          onClick={() => handleOpenDocuments(user)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #059669',
            background: 'white',
            color: '#059669',
            cursor: 'pointer',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#059669';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#059669';
          }}
        >
          📄
        </button>
        <button style={{
          padding: '6px 12px',
          borderRadius: '4px',
          border: '1px solid #ef4444',
          background: 'white',
          color: '#ef4444',
          cursor: 'pointer',
          fontSize: '12px'
        }}>
          🗑️
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 8px 0'
            }}>
              👥 Управление пользователями
            </h1>
            <p style={{ color: '#64748b', margin: '0' }}>
              Просмотр и управление пользователями платформы
            </p>
          </div>
          <button
            onClick={() => setShowCreateCuratorModal(true)}
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            👨‍🏫 Создать куратора
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👥
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                  {users.length}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
                  Всего пользователей
                </p>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                👨‍🏫
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                  {users.filter(u => u.role === 'curator').length}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
                  Кураторов
                </p>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🎓
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                  {users.filter(u => u.role === 'student').length}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
                  Студентов
                </p>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ⚠️
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                  {users.filter(u => u.status !== 'active').length}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
                  Неактивных
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Поиск пользователей..."
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
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              background: 'white'
            }}
          >
            <option value="all">Все роли</option>
            <option value="admin">Администраторы</option>
            <option value="curator">Кураторы</option>
            <option value="student">Студенты</option>
          </select>
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
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="banned">Заблокированные</option>
          </select>
        </div>
      </div>

      {/* Список пользователей */}
      <div>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#64748b' }}>Загрузка пользователей...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Пользователи не найдены</p>
            <p style={{ color: '#94a3b8' }}>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div>
            {filteredUsers.map(user => (
              <UserRow key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно создания куратора */}
      {showCreateCuratorModal && (
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
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: '0 0 8px 0'
              }}>
                👨‍🏫 Создать куратора
              </h2>
              <p style={{ color: '#64748b', margin: '0' }}>
                Заполните данные для создания нового куратора
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Имя
              </label>
              <input
                type="text"
                value={newCuratorData.firstName}
                onChange={(e) => handleCuratorDataChange('firstName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Введите имя"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Фамилия
              </label>
              <input
                type="text"
                value={newCuratorData.lastName}
                onChange={(e) => handleCuratorDataChange('lastName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Введите фамилию"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <input
                type="email"
                value={newCuratorData.email}
                onChange={(e) => handleCuratorDataChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Введите email"
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Пароль
              </label>
              <input
                type="password"
                value={newCuratorData.password}
                onChange={(e) => handleCuratorDataChange('password', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                placeholder="Введите пароль (минимум 6 символов)"
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCreateCuratorModal(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#4a5568',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Отмена
              </button>
              <button
                onClick={handleCreateCurator}
                disabled={isCreatingCurator}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isCreatingCurator ? '#a0aec0' : 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: isCreatingCurator ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isCreatingCurator ? 'Создание...' : 'Создать куратора'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно редактирования пользователя */}
      {showEditUserModal && editingUser && (
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
            width: '90%',
            maxWidth: '600px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: '0 0 8px 0'
              }}>
                ✏️ Редактировать пользователя
              </h2>
              <p style={{ color: '#64748b', margin: '0' }}>
                {editingUser.firstName} {editingUser.lastName}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                  marginBottom: '8px'
                }}>
                  Имя
                </label>
                <input
                  type="text"
                  defaultValue={editingUser.firstName}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                  marginBottom: '8px'
                }}>
                  Фамилия
                </label>
                <input
                  type="text"
                  defaultValue={editingUser.lastName}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <input
                type="email"
                defaultValue={editingUser.email}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                  marginBottom: '8px'
                }}>
                  Статус
                </label>
                <select
                  defaultValue={editingUser.status}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                  <option value="banned">Заблокирован</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                  marginBottom: '8px'
                }}>
                  Доступ к курсам
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={editingUser.hasCourseAccess}
                    onChange={() => handleToggleCourseAccess(editingUser.id)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#4a5568' }}>
                    {editingUser.hasCourseAccess ? 'Включен' : 'Отключен'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Доступ к материалам до
              </label>
              <input
                type="date"
                defaultValue={editingUser.materialAccessUntil || ''}
                onChange={(e) => handleUpdateMaterialAccess(editingUser.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#4a5568',
                marginBottom: '16px'
              }}>
                Доступ к материалам курсов
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#4a5568' }}>
                    Курс 1: Особенности фотографии в школах/садах
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={editingUser.courseMaterialsAccess.course1}
                      onChange={() => handleToggleCourseMaterialAccess(editingUser.id, 'course1')}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '12px', color: editingUser.courseMaterialsAccess.course1 ? '#059669' : '#6b7280' }}>
                      {editingUser.courseMaterialsAccess.course1 ? 'Доступ открыт' : 'Доступ закрыт'}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#4a5568' }}>
                    Курс 2: Дизайн и создание макетов
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={editingUser.courseMaterialsAccess.course2}
                      onChange={() => handleToggleCourseMaterialAccess(editingUser.id, 'course2')}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '12px', color: editingUser.courseMaterialsAccess.course2 ? '#059669' : '#6b7280' }}>
                      {editingUser.courseMaterialsAccess.course2 ? 'Доступ открыт' : 'Доступ закрыт'}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#4a5568' }}>
                    Курс 3: Администрирование, ценообразование + инструменты управления
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={editingUser.courseMaterialsAccess.course3}
                      onChange={() => handleToggleCourseMaterialAccess(editingUser.id, 'course3')}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '12px', color: editingUser.courseMaterialsAccess.course3 ? '#059669' : '#6b7280' }}>
                      {editingUser.courseMaterialsAccess.course3 ? 'Доступ открыт' : 'Доступ закрыт'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowEditUserModal(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#4a5568',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Отмена
              </button>
              <button
                onClick={() => handleSaveUser(editingUser)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно управления документами */}
      {showDocumentsModal && selectedUserForDocuments && (
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
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: '0 0 8px 0'
              }}>
                📄 Управление документами
              </h2>
              <p style={{ color: '#64748b', margin: '0' }}>
                {selectedUserForDocuments.firstName} {selectedUserForDocuments.lastName}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  checked={selectedUserForDocuments.hasPaymentReceipt}
                  onChange={(e) => handleUpdateDocuments(
                    selectedUserForDocuments.id,
                    e.target.checked,
                    selectedUserForDocuments.hasSignedContract
                  )}
                  style={{ width: '20px', height: '20px' }}
                />
                <span style={{ fontSize: '16px', color: '#4a5568' }}>
                  Чек об оплате загружен
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={selectedUserForDocuments.hasSignedContract}
                  onChange={(e) => handleUpdateDocuments(
                    selectedUserForDocuments.id,
                    selectedUserForDocuments.hasPaymentReceipt,
                    e.target.checked
                  )}
                  style={{ width: '20px', height: '20px' }}
                />
                <span style={{ fontSize: '16px', color: '#4a5568' }}>
                  Подписанный договор загружен
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                Загрузить документы
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: '#4a5568',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📄 Загрузить чек об оплате
                </button>
                <button style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: '#4a5568',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📋 Загрузить договор
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDocumentsModal(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#4a5568',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
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

export default UsersManagementPage; 