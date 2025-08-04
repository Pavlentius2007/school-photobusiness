import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentSidebar: React.FC = () => {
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
          Панель студента
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          margin: '5px 0 0',
          fontSize: '14px'
        }}>
          Обучение и развитие
        </p>
      </div>

      <nav>
        <Link to="/student" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📊</span>
            <span>Мой прогресс</span>
          </div>
        </Link>

        <Link to="/student/courses" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student/courses') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student/courses') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student/courses') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📚</span>
            <span>Мои курсы</span>
          </div>
        </Link>

        <Link to="/student/catalog" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student/catalog') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student/catalog') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student/catalog') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>🔍</span>
            <span>Каталог курсов</span>
          </div>
        </Link>

        <Link to="/student/assignments" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student/assignments') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student/assignments') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student/assignments') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>📝</span>
            <span>Домашние задания</span>
          </div>
        </Link>

        <Link to="/student/tests" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student/tests') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student/tests') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student/tests') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>✅</span>
            <span>Тесты</span>
          </div>
        </Link>

        <Link to="/student/messages" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student/messages') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student/messages') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student/messages') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>💬</span>
            <span>Сообщения</span>
          </div>
        </Link>

        <Link to="/student/certificates" style={{
          display: 'block',
          padding: '15px 20px',
          color: isActive('/student/certificates') ? '#667eea' : 'white',
          textDecoration: 'none',
          background: isActive('/student/certificates') ? 'rgba(255,255,255,0.9)' : 'transparent',
          borderLeft: isActive('/student/certificates') ? '4px solid white' : '4px solid transparent',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>🏆</span>
            <span>Сертификаты</span>
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

export default StudentSidebar; 