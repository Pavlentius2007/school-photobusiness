import React, { useState, useEffect } from 'react';
import { useError } from '../contexts/ErrorContext';

const ErrorNotification: React.FC = () => {
  const { errors } = useError();
  const [showNotification, setShowNotification] = useState(false);
  const [currentError, setCurrentError] = useState<any>(null);

  useEffect(() => {
    // Показываем уведомление только для критических ошибок
    const criticalErrors = errors.filter(error => 
      error.severity === 'error' && !error.resolved
    );

    if (criticalErrors.length > 0 && !showNotification) {
      setCurrentError(criticalErrors[0]);
      setShowNotification(true);
    }
  }, [errors, showNotification]);

  const handleClose = () => {
    setShowNotification(false);
    setCurrentError(null);
  };

  if (!showNotification || !currentError) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#e53e3e',
      color: 'white',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 10000,
      maxWidth: '400px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ fontSize: '16px', fontWeight: '600' }}>
          ⚠️ Ошибка системы
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0',
            marginLeft: '12px'
          }}
        >
          ×
        </button>
      </div>
      <div style={{ fontSize: '14px', marginBottom: '8px' }}>
        {currentError.message}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>
        Время: {new Date(currentError.timestamp).toLocaleTimeString()}
      </div>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ErrorNotification; 