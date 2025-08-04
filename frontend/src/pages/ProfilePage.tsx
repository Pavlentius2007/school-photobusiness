import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, changePassword, requestPasswordReset, verifyEmail, resendVerificationEmail, isEmailVerified, lastActivity, sessionTimeout } = useAuth();
  const navigate = useNavigate();

  // Состояния для форм
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [resetEmailForm, setResetEmailForm] = useState({
    email: user?.email || '',
  });

  const [verificationForm, setVerificationForm] = useState({
    token: '',
  });

  // Состояния для UI
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'verification'>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  // Обработчики форм
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserProfile({
        full_name: profileForm.full_name,
      });
      setSuccess('Профиль успешно обновлен!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError('Новый пароль должен содержать минимум 8 символов');
      setLoading(false);
      return;
    }

    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setSuccess('Пароль успешно изменен!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при смене пароля');
    } finally {
      setLoading(false);
    }
  };

  const handleResetEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await requestPasswordReset(resetEmailForm.email);
      setSuccess('Инструкции по сбросу пароля отправлены на ваш email');
      setShowResetForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при отправке запроса');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await verifyEmail(verificationForm.token);
      setSuccess('Email успешно подтвержден!');
      setVerificationForm({ token: '' });
      setShowVerificationForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при подтверждении email');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await resendVerificationEmail();
      setSuccess('Письмо с подтверждением отправлено повторно');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при отправке письма');
    } finally {
      setLoading(false);
    }
  };

  const formatLastActivity = (date: Date | null) => {
    if (!date) return 'Неизвестно';
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatSessionTimeout = (timeout: number | null) => {
    if (!timeout) return 'Не установлен';
    const minutes = Math.floor(timeout / (1000 * 60));
    return `${minutes} минут`;
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Заголовок */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>👤 Профиль пользователя</h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Управление настройками аккаунта</p>
        </div>

        {/* Навигация по вкладкам */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}>
          {[
            { id: 'profile', label: '📝 Профиль', icon: '👤' },
            { id: 'security', label: '🔒 Безопасность', icon: '🛡️' },
            { id: 'verification', label: '✅ Верификация', icon: '📧' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#667eea' : '#64748b',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.3s',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : 'none'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{tab.icon}</div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Содержимое вкладок */}
        <div style={{ padding: '2rem' }}>
          {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
          {success && (
            <div style={{
              background: '#d1fae5',
              color: '#065f46',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{success}</span>
              <button
                onClick={() => setSuccess(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#065f46',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                ✕
              </button>
            </div>
          )}

          {loading && <LoadingSpinner text="Обработка..." />}

          {/* Вкладка профиля */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Информация профиля</h2>
              
              <form onSubmit={handleProfileSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Полное имя
                  </label>
                  <input
                    type="text"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: '#f3f4f6',
                      color: '#6b7280'
                    }}
                  />
                  <small style={{ color: '#6b7280' }}>Email нельзя изменить</small>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
              </form>

              {/* Информация о сессии */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📊 Информация о сессии</h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Роль:</span>
                    <span style={{ fontWeight: 'bold' }}>{user.role === 'admin' ? 'Администратор' : user.role === 'curator' ? 'Куратор' : 'Студент'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Последняя активность:</span>
                    <span>{formatLastActivity(lastActivity)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Таймаут сессии:</span>
                    <span>{formatSessionTimeout(sessionTimeout)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Дата регистрации:</span>
                    <span>{new Date(user.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Вкладка безопасности */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Настройки безопасности</h2>
              
              {/* Смена пароля */}
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🔐 Смена пароля</h3>
                
                {!showPasswordForm ? (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Изменить пароль
                  </button>
                ) : (
                  <form onSubmit={handlePasswordSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Текущий пароль
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Новый пароль
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Подтвердите новый пароль
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.7 : 1
                        }}
                      >
                        {loading ? 'Изменение...' : 'Изменить пароль'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        }}
                        style={{
                          background: 'transparent',
                          color: '#64748b',
                          border: '1px solid #d1d5db',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Сброс пароля */}
              <div style={{
                padding: '1.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🔄 Сброс пароля</h3>
                
                {!showResetForm ? (
                  <button
                    onClick={() => setShowResetForm(true)}
                    style={{
                      background: 'transparent',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Запросить сброс пароля
                  </button>
                ) : (
                  <form onSubmit={handleResetEmailSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Email для сброса пароля
                      </label>
                      <input
                        type="email"
                        value={resetEmailForm.email}
                        onChange={(e) => setResetEmailForm({ email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.7 : 1
                        }}
                      >
                        {loading ? 'Отправка...' : 'Отправить инструкции'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowResetForm(false);
                          setResetEmailForm({ email: user?.email || '' });
                        }}
                        style={{
                          background: 'transparent',
                          color: '#64748b',
                          border: '1px solid #d1d5db',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Вкладка верификации */}
          {activeTab === 'verification' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Верификация email</h2>
              
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: isEmailVerified ? '#d1fae5' : '#fef3c7',
                border: `1px solid ${isEmailVerified ? '#a7f3d0' : '#fde68a'}`,
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem', marginRight: '1rem' }}>
                    {isEmailVerified ? '✅' : '⚠️'}
                  </span>
                  <div>
                    <h3 style={{ margin: 0, color: '#1e293b' }}>
                      {isEmailVerified ? 'Email подтвержден' : 'Email не подтвержден'}
                    </h3>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                      {isEmailVerified 
                        ? 'Ваш email адрес успешно подтвержден. Вы можете использовать все функции платформы.'
                        : 'Для полного доступа к функциям платформы необходимо подтвердить ваш email адрес.'
                      }
                    </p>
                  </div>
                </div>

                {!isEmailVerified && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={handleResendVerification}
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? 'Отправка...' : 'Отправить письмо повторно'}
                    </button>
                    
                    <button
                      onClick={() => setShowVerificationForm(true)}
                      style={{
                        background: 'transparent',
                        color: '#667eea',
                        border: '1px solid #667eea',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      Ввести код подтверждения
                    </button>
                  </div>
                )}
              </div>

              {/* Форма ввода кода подтверждения */}
              {showVerificationForm && (
                <div style={{
                  padding: '1.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📧 Ввод кода подтверждения</h3>
                  
                  <form onSubmit={handleVerificationSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                        Код подтверждения
                      </label>
                      <input
                        type="text"
                        value={verificationForm.token}
                        onChange={(e) => setVerificationForm({ token: e.target.value })}
                        placeholder="Введите код из письма"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.7 : 1
                        }}
                      >
                        {loading ? 'Подтверждение...' : 'Подтвердить email'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowVerificationForm(false);
                          setVerificationForm({ token: '' });
                        }}
                        style={{
                          background: 'transparent',
                          color: '#64748b',
                          border: '1px solid #d1d5db',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 