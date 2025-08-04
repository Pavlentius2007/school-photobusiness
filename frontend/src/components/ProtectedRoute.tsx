import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'curator' | 'student';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Показываем загрузку пока проверяем аутентификацию
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 15px'
          }} />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <p style={{
            color: '#4a5568',
            fontSize: '16px',
            margin: 0
          }}>
            Загрузка...
          </p>
        </div>
      </div>
    );
  }

  // Если пользователь не аутентифицирован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Если требуется определенная роль и у пользователя её нет
  if (requiredRole && user?.role !== requiredRole) {
    // Перенаправляем на соответствующую панель в зависимости от роли
    let defaultRedirect = '/';
    switch (user?.role) {
      case 'admin':
        defaultRedirect = '/admin';
        break;
      case 'curator':
        defaultRedirect = '/curator';
        break;
      case 'student':
        defaultRedirect = '/student';
        break;
    }
    return <Navigate to={defaultRedirect} replace />;
  }

  // Если все проверки пройдены, показываем защищенный контент
  return <>{children}</>;
};

export default ProtectedRoute; 