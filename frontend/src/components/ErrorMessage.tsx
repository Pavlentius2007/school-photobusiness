import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onClose }) => {
  return (
    <div style={{
      background: '#fed7d7',
      border: '1px solid #feb2b2',
      color: '#c53030',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '4px'
        }}>
          Ошибка
        </div>
        <div style={{
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {message}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '8px'
      }}>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              background: '#c53030',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#a0aec0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#c53030';
            }}
          >
            Повторить
          </button>
        )}
        
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: '#c53030',
              border: '1px solid #c53030',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c53030';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#c53030';
            }}
          >
            Закрыть
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 