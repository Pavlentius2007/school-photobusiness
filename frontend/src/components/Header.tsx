import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { settings } = useSettings();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-toggle')) {
        setShowMobileMenu(false);
      }
      if (!target.closest('.user-menu') && !target.closest('.user-toggle')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-orange-300 transition-all duration-300">
              📸 {settings.siteName}
            </div>
          </Link>

          {/* Десктопная навигация */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-white font-medium transition-all duration-300 hover:text-yellow-300 relative ${
                isActive('/') ? 'text-yellow-300' : 'hover:scale-105'
              }`}
            >
              Главная
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></div>
              )}
            </Link>
            <Link 
              to="/courses" 
              className={`text-white font-medium transition-all duration-300 hover:text-yellow-300 relative ${
                isActive('/courses') ? 'text-yellow-300' : 'hover:scale-105'
              }`}
            >
              Курсы
              {isActive('/courses') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></div>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`text-white font-medium transition-all duration-300 hover:text-yellow-300 relative ${
                isActive('/about') ? 'text-yellow-300' : 'hover:scale-105'
              }`}
            >
              О нас
              {isActive('/about') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></div>
              )}
            </Link>
            <Link 
              to="/payment" 
              className={`text-white font-medium transition-all duration-300 hover:text-yellow-300 relative ${
                isActive('/payment') ? 'text-yellow-300' : 'hover:scale-105'
              }`}
            >
              Оплата
              {isActive('/payment') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-300 rounded-full"></div>
              )}
            </Link>
          </div>

          {/* Пользовательское меню (десктоп) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="user-toggle bg-white/10 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full cursor-pointer font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center space-x-2"
                >
                  <span>👤</span>
                  <span className="hidden lg:inline">{user?.full_name}</span>
                  <span className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl p-4 min-w-48 z-50 animate-fade-in">
                    <div className="pb-2 border-b border-gray-200 mb-2">
                      <div className="text-sm font-bold text-gray-800">
                        {user?.full_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getRoleDisplayName(user?.role || '')}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate(getDashboardLink());
                      }}
                      className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      📊 Панель управления
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      👤 Профиль
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      🚪 Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className="bg-transparent text-white border-2 border-white px-4 py-2 rounded-full cursor-pointer font-medium transition-all duration-300 hover:bg-white hover:text-blue-600 hover:scale-105">
                    Войти
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none px-4 py-2 rounded-full cursor-pointer font-bold transition-all duration-300 hover:from-yellow-500 hover:to-orange-600 hover:scale-105 shadow-lg">
                    Регистрация
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Мобильная кнопка меню */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="mobile-toggle text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
              aria-label="Открыть меню"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${showMobileMenu ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${showMobileMenu ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <div className={`mobile-menu md:hidden transition-all duration-300 ease-in-out ${showMobileMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="pb-4 space-y-2">
            <Link 
              to="/" 
              className={`block px-3 py-3 text-white font-medium rounded-lg transition-colors duration-200 ${
                isActive('/') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              Главная
            </Link>
            <Link 
              to="/courses" 
              className={`block px-3 py-3 text-white font-medium rounded-lg transition-colors duration-200 ${
                isActive('/courses') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              Курсы
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-3 text-white font-medium rounded-lg transition-colors duration-200 ${
                isActive('/about') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              О нас
            </Link>
            <Link 
              to="/payment" 
              className={`block px-3 py-3 text-white font-medium rounded-lg transition-colors duration-200 ${
                isActive('/payment') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              Оплата
            </Link>
            
            {/* Мобильное пользовательское меню */}
            {isAuthenticated ? (
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="px-3 py-2 text-sm text-white/80">
                  {user?.full_name} ({getRoleDisplayName(user?.role || '')})
                </div>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    navigate(getDashboardLink());
                  }}
                  className="w-full text-left px-3 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  📊 Панель управления
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  👤 Профиль
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-3 text-red-200 font-medium rounded-lg hover:bg-red-500/20 transition-colors duration-200"
                >
                  🚪 Выйти
                </button>
              </div>
            ) : (
              <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                <Link to="/login">
                  <button className="w-full bg-transparent text-white border-2 border-white px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-white hover:text-blue-600">
                    Войти
                  </button>
                </Link>
                <Link to="/register">
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none px-4 py-3 rounded-lg cursor-pointer font-bold transition-all duration-300 hover:from-yellow-500 hover:to-orange-600">
                    Регистрация
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 