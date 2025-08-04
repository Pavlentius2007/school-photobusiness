import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SessionTimeoutModalProps {
  isVisible: boolean;
  onExtend: () => void;
  onLogout: () => void;
  timeRemaining: number;
}

const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({
  isVisible,
  onExtend,
  onLogout,
  timeRemaining
}) => {
  const [countdown, setCountdown] = useState(timeRemaining);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            onLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible, countdown, onLogout]);

  const handleExtend = async () => {
    setIsExtending(true);
    try {
      await onExtend();
    } finally {
      setIsExtending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
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
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Иконка предупреждения */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: countdown <= 30 ? 'pulse 1s infinite' : 'none'
        }}>
          ⏰
        </div>

        {/* Заголовок */}
        <h2 style={{
          margin: '0 0 1rem 0',
          color: '#1e293b',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Сессия истекает
        </h2>

        {/* Описание */}
        <p style={{
          margin: '0 0 1.5rem 0',
          color: '#64748b',
          lineHeight: '1.6'
        }}>
          Ваша сессия истечет через{' '}
          <span style={{
            color: countdown <= 30 ? '#dc2626' : '#1e293b',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            {formatTime(countdown)}
          </span>
          <br />
          Для продолжения работы нажмите "Продолжить сессию"
        </p>

        {/* Прогресс-бар */}
        <div style={{
          width: '100%',
          height: '8px',
          background: '#e2e8f0',
          borderRadius: '4px',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(countdown / timeRemaining) * 100}%`,
            height: '100%',
            background: countdown <= 30 
              ? 'linear-gradient(90deg, #dc2626, #ef4444)' 
              : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            transition: 'width 1s linear',
            borderRadius: '4px'
          }} />
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleExtend}
            disabled={isExtending}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isExtending ? 'not-allowed' : 'pointer',
              opacity: isExtending ? 0.7 : 1,
              transition: 'all 0.3s'
            }}
          >
            {isExtending ? 'Продление...' : 'Продолжить сессию'}
          </button>

          <button
            onClick={onLogout}
            style={{
              flex: 1,
              background: 'transparent',
              color: '#64748b',
              border: '1px solid #d1d5db',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Выйти
          </button>
        </div>

        {/* Дополнительная информация */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#64748b',
            lineHeight: '1.5'
          }}>
            💡 <strong>Совет:</strong> Для автоматического продления сессии 
            просто продолжайте использовать приложение
          </p>
        </div>
      </div>

      {/* CSS анимация для пульсации */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default SessionTimeoutModal; 