import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const token = searchParams.get('token');
  
  useEffect(() => {
    if (!token) {
      setError('Отсутствует токен для сброса пароля');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!token) {
      setError('Отсутствует токен для сброса пароля');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      setLoading(false);
      return;
    }

    try {
      await resetPassword(token, formData.newPassword);
      setSuccess('Пароль успешно изменен! Перенаправление на страницу входа...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при сбросе пароля');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ marginBottom: '1rem', color: '#1e293b' }}>Ошибка</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Отсутствует токен для сброса пароля. Пожалуйста, используйте ссылку из письма.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '2rem'
      }}>
        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ margin: 0, fontSize: '1.875rem', fontWeight: 'bold', color: '#1e293b' }}>
            Сброс пароля
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>
            Введите новый пароль для вашего аккаунта
          </p>
        </div>

        {/* Сообщения об ошибках и успехе */}
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

        {loading && <LoadingSpinner text="Сброс пароля..." />}

        {/* Форма */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
              Новый пароль
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Введите новый пароль"
              required
              minLength={8}
            />
            <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Минимум 8 символов
            </small>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
              Подтвердите новый пароль
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Повторите новый пароль"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Сброс пароля...' : 'Сбросить пароль'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                color: '#667eea',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Вернуться к входу
            </button>
          </div>
        </form>

        {/* Информация о безопасности */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1e293b' }}>🔒 Рекомендации по безопасности</h3>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#64748b',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            <li>Используйте пароль длиной не менее 8 символов</li>
            <li>Включите буквы, цифры и специальные символы</li>
            <li>Не используйте личную информацию</li>
            <li>Не используйте один пароль для разных сервисов</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 