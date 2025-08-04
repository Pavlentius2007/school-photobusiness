import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { settings } = useSettings();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'curator':
        return '/curator';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Администратор';
      case 'curator':
        return 'Куратор';
      case 'student':
        return 'Студент';
      default:
        return role;
    }
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
    }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📸 {settings.siteName}
          </div>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: '500', 
              transition: 'opacity 0.3s',
              opacity: isActive('/') ? 1 : 0.8
            }}
          >
            Главная
          </Link>
          <Link 
            to="/courses" 
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: '500', 
              transition: 'opacity 0.3s',
              opacity: isActive('/courses') ? 1 : 0.8
            }}
          >
            Курсы
          </Link>
          <Link 
            to="/about" 
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: '500', 
              transition: 'opacity 0.3s',
              opacity: isActive('/about') ? 1 : 0.8
            }}
          >
            О нас
          </Link>
          <Link 
            to="/payment" 
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontWeight: '500', 
              transition: 'opacity 0.3s',
              opacity: isActive('/payment') ? 1 : 0.8
            }}
          >
            Оплата
          </Link>
          
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>👤</span>
                <span>{user?.full_name}</span>
                <span>▼</span>
              </button>
              
              {showUserMenu && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    padding: '1rem',
                    minWidth: '200px',
                    marginTop: '0.5rem',
                    zIndex: 1001
                  }}
                >
                  <div style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#2d3748'
                    }}>
                      {user?.full_name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#718096'
                    }}>
                      {getRoleDisplayName(user?.role || '')}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowUserMenu(false);
                      const link = getDashboardLink();
                      try {
                        navigate(link);
                      } catch (error) {
                        console.error('Navigation error:', error);
                        window.location.href = link;
                      }
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      color: '#4a5568',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'background 0.3s',
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f7fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    📊 Панель управления
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowUserMenu(false);
                      try {
                        navigate('/profile');
                      } catch (error) {
                        console.error('Navigation error:', error);
                        window.location.href = '/profile';
                      }
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      color: '#4a5568',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'background 0.3s',
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f7fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    👤 Профиль
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      color: '#e53e3e',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'background 0.3s',
                      pointerEvents: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fed7d7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    🚪 Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login">
                <button style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s'
                }}>
                  Войти
                </button>
              </Link>
              <Link to="/register">
                <button style={{
                  background: 'white',
                  color: '#667eea',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s'
                }}>
                  Регистрация
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      
      {/* Закрытие меню при клике вне его */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header; 