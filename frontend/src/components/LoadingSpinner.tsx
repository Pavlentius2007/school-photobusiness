import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Загрузка...',
  fullScreen = false 
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerSize = sizeMap[size];

  const spinner = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `4px solid #e2e8f0`,
        borderTop: `4px solid #667eea`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      {text && (
        <div style={{
          fontSize: '14px',
          color: '#718096',
          fontWeight: '500'
        }}>
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {spinner}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      {spinner}
    </div>
  );
};

export default LoadingSpinner; 