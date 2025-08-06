import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import './AdminLayout.css';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { settings } = useSettings();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/admin',
      icon: '🎛️',
      label: 'Панель управления',
      description: 'Обзор системы'
    },
    {
      path: '/admin/courses',
      icon: '📚',
      label: 'Курсы',
      description: 'Управление курсами'
    },
    {
      path: '/admin/course-content',
      icon: '📝',
      label: 'Контент курсов',
      description: 'Описания и программы'
    },
    {
      path: '/admin/users',
      icon: '👥',
      label: 'Пользователи',
      description: 'Управление пользователями'
    },
    {
      path: '/admin/payments',
      icon: '💰',
      label: 'Платежи',
      description: 'Финансовая отчетность'
    },
    {
      path: '/admin/analytics',
      icon: '📈',
      label: 'Аналитика',
      description: 'Статистика и отчеты'
    },
    {
      path: '/admin/settings',
      icon: '⚙️',
      label: 'Настройки',
      description: 'Конфигурация системы'
    },
    {
      path: '/admin/errors',
      icon: '📊',
      label: 'Логи ошибок',
      description: 'Мониторинг ошибок'
    }
  ];

  return (
    <div className="admin-sidebar">
      {/* Логотип */}
      <div className="admin-sidebar-header">
        <Link to="/admin" className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-icon">
            📸
          </div>
          <div>
            <h1 className="admin-sidebar-title">
              {settings.siteName}
            </h1>
            <p className="admin-sidebar-subtitle">
              Админ панель
            </p>
          </div>
        </Link>
      </div>

      {/* Меню */}
      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          >
            <div className="admin-sidebar-link-content">
              <div className="admin-sidebar-link-icon">
                {item.icon}
              </div>
              <div>
                <p className="admin-sidebar-link-text">
                  {item.label}
                </p>
                <p className="admin-sidebar-link-desc">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </nav>

      {/* Нижняя секция */}
      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-user">
          <div className="admin-sidebar-user-avatar">
            👤
          </div>
          <div className="admin-sidebar-user-info">
            <h4>Администратор</h4>
            <p>admin@sianoro.ru</p>
          </div>
        </div>
        
        <div>
          <Link to="/">
            <button className="admin-sidebar-logout">
              🏠 Вернуться на сайт
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 