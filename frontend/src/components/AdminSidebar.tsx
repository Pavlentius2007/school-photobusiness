import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

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
    <div style={{
      width: '280px',
      height: '100vh',
      background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '24px 0',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto'
    }}>
      {/* Логотип */}
      <div style={{ padding: '0 24px', marginBottom: '32px' }}>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📸
            </div>
            <div>
              <h1 style={{
                margin: '0',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {settings.siteName}
              </h1>
              <p style={{
                margin: '0',
                fontSize: '12px',
                color: '#94a3b8'
              }}>
                Админ панель
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Меню */}
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'block',
              textDecoration: 'none',
              padding: '12px 24px',
              margin: '4px 0',
              borderRadius: '0 8px 8px 0',
              transition: 'all 0.3s ease',
              background: isActive(item.path) 
                ? 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' 
                : 'transparent',
              borderLeft: isActive(item.path) ? '4px solid #667eea' : '4px solid transparent'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: isActive(item.path) 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{
                  margin: '0',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isActive(item.path) ? 'white' : '#e2e8f0'
                }}>
                  {item.label}
                </p>
                <p style={{
                  margin: '0',
                  fontSize: '11px',
                  color: isActive(item.path) ? 'rgba(255, 255, 255, 0.8)' : '#94a3b8'
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </nav>

      {/* Нижняя секция */}
      <div style={{
        marginTop: 'auto',
        padding: '24px',
        borderTop: '1px solid #475569'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}>
            👤
          </div>
          <div>
            <p style={{
              margin: '0',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}>
              Администратор
            </p>
            <p style={{
              margin: '0',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              admin@sianoro.ru
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '12px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #475569',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              🏠 Вернуться на сайт
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 