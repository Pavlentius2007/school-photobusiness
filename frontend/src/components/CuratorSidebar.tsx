import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CuratorSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div style={{
      width: '250px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px 0',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{
        padding: '0 20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{
          color: 'white',
          margin: 0,
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Панель куратора
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          margin: '5px 0 0',
          fontSize: '14px'
        }}>
          Управление курсами и студентами
        </p>
      </div>

      <nav>
        <Link to="/curator" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/curator') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/curator') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/curator') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📊</span>
            <span>Обзор</span>
          </div>
        </Link>

        <Link to="/curator/courses" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/curator/courses') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/curator/courses') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/curator/courses') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📚</span>
            <span>Мои курсы</span>
          </div>
        </Link>

        <Link to="/curator/students" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/curator/students') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/curator/students') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/curator/students') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>👥</span>
            <span>Студенты</span>
          </div>
        </Link>

        <Link to="/curator/assignments" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/curator/assignments') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/curator/assignments') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/curator/assignments') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📝</span>
            <span>Домашние задания</span>
          </div>
        </Link>

        <Link to="/curator/content" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/curator/content') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/curator/content') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/curator/content') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>✏️</span>
            <span>Создание контента</span>
          </div>
        </Link>

        <Link to="/curator/analytics" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/curator/analytics') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/curator/analytics') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/curator/analytics') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📈</span>
            <span>Аналитика</span>
          </div>
        </Link>
      </nav>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }}>
        <Link to="/" style={{
          display: 'block',
          padding: '12px 15px',
          color: 'rgba(255,255,255,0.8)',
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}>
          ← Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default CuratorSidebar; 