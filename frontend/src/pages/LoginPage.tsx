import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@sianoro.ru');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      
      // Определяем куда перенаправить пользователя в зависимости от роли
      let redirectPath = '/dashboard';
      
      if (email === 'admin@sianoro.ru') {
        redirectPath = '/admin';
      } else if (email === 'anna@sianoro.ru' || email === 'maria@sianoro.ru') {
        redirectPath = '/curator';
      } else {
        redirectPath = '/student';
      }
      
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при входе. Проверьте email и пароль.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            Вход в систему
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Введите свои данные для входа
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fed7d7',
            border: '1px solid #feb2b2',
            color: '#c53030',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              placeholder="Введите ваш email"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              placeholder="Введите ваш пароль"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '20px'
            }}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => navigate('/reset-password')}
              style={{
                background: 'transparent',
                color: '#667eea',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Забыли пароль?
            </button>
          </div>
        </form>

        <div style={{
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#718096',
            margin: '0 0 10px 0'
          }}>
            Нет аккаунта?
          </p>
          <Link to="/register" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Зарегистрироваться
          </Link>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <Link to="/" style={{
            color: '#a0aec0',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            ← Вернуться на главную
          </Link>
        </div>

        {/* Тестовые аккаунты для разработки */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f7fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            🧪 Тестовые аккаунты
          </h3>
          <div style={{
            display: 'grid',
            gap: '10px'
          }}>
            <button
              onClick={() => {
                setEmail('admin@sianoro.ru');
                setPassword('admin123');
              }}
              style={{
                background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              👑 Админ (admin@sianoro.ru)
            </button>
            <button
              onClick={() => {
                setEmail('anna@sianoro.ru');
                setPassword('anna123');
              }}
              style={{
                background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📚 Куратор (anna@sianoro.ru)
            </button>
            <button
              onClick={() => {
                setEmail('elena@sianoro.ru');
                setPassword('elena123');
              }}
              style={{
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              👨‍🎓 Студент (elena@sianoro.ru)
            </button>
          </div>
          <p style={{
            fontSize: '11px',
            color: '#a0aec0',
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: 0
          }}>
            Нажмите на кнопку, затем "Войти"
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 