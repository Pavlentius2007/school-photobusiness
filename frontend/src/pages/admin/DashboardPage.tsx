import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from '../../hooks/useErrorBoundary';

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalPayments: number;
  activeStudents: number;
}

const DashboardPage: React.FC = () => {
  const { logError, logWarning, logInfo } = useErrorBoundary('DashboardPage');

  const testError = () => {
    logError('Тестовая критическая ошибка', new Error('Это тестовая ошибка для демонстрации'), 'Test Error Button');
  };

  const testWarning = () => {
    logWarning('Тестовое предупреждение системы', 'Test Warning Button');
  };

  const testInfo = () => {
    logInfo('Тестовая информационная запись', 'Test Info Button');
  };

  const testUnhandledError = () => {
    // Имитируем необработанную ошибку
    setTimeout(() => {
      throw new Error('Необработанная ошибка для тестирования');
    }, 100);
  };

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalPayments: 0,
    activeStudents: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalCourses: 23,
        totalPayments: 456,
        activeStudents: 892
      });
      setRecentActivity([
        { id: 1, type: 'user_registration', message: 'Новый пользователь зарегистрировался', time: '2 минуты назад' },
        { id: 2, type: 'course_purchase', message: 'Курс "Особенности фотографии в школах/садах" куплен', time: '5 минут назад' },
        { id: 3, type: 'assignment_submitted', message: 'Сдано домашнее задание', time: '10 минут назад' },
        { id: 4, type: 'payment_received', message: 'Получен платеж 19900₽', time: '15 минут назад' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const StatCard: React.FC<{ title: string; value: number; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      flex: 1,
      minWidth: '200px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>{title}</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '0', color: '#1e293b' }}>
            {isLoading ? '...' : value.toLocaleString()}
          </p>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const QuickActionButton: React.FC<{ title: string; icon: string; link: string; color: string }> = ({ title, icon, link, color }) => (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto',
          fontSize: '20px'
        }}>
          {icon}
        </div>
        <p style={{ margin: '0', color: '#1e293b', fontWeight: '500' }}>{title}</p>
      </div>
    </Link>
  );

  return (
    <div style={{
      padding: '24px'
    }}>
      {/* Заголовок */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          🎛️ Панель администратора
        </h1>
        <p style={{ color: '#64748b', margin: '0' }}>
          Управление платформой обучения
        </p>
      </div>

      {/* Тестовые кнопки для демонстрации системы ошибок */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
          🧪 Тестирование системы ошибок
        </h3>
        <p style={{ fontSize: '14px', color: '#718096', marginBottom: '16px' }}>
          Используйте эти кнопки для тестирования системы логирования ошибок. 
          Все ошибки будут записаны и доступны в разделе "Логи ошибок".
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={testError}
            style={{
              padding: '12px 20px',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ❌ Тест ошибки
          </button>
          <button
            onClick={testWarning}
            style={{
              padding: '12px 20px',
              background: '#d69e2e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ⚠️ Тест предупреждения
          </button>
          <button
            onClick={testInfo}
            style={{
              padding: '12px 20px',
              background: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ℹ️ Тест информации
          </button>
          <button
            onClick={testUnhandledError}
            style={{
              padding: '12px 20px',
              background: '#805ad5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            💥 Необработанная ошибка
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: '#1e293b' }}>
          📊 Общая статистика
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <StatCard
            title="Всего пользователей"
            value={stats.totalUsers}
            icon="👥"
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <StatCard
            title="Курсов"
            value={stats.totalCourses}
            icon="📚"
            color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
          <StatCard
            title="Платежей"
            value={stats.totalPayments}
            icon="💰"
            color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
          <StatCard
            title="Активных студентов"
            value={stats.activeStudents}
            icon="🎓"
            color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          />
        </div>
      </div>

      {/* Быстрые действия */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: '#1e293b' }}>
          ⚡ Быстрые действия
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <QuickActionButton
            title="Управление курсами"
            icon="📚"
            link="/admin/courses"
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <QuickActionButton
            title="Пользователи"
            icon="👥"
            link="/admin/users"
            color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
          <QuickActionButton
            title="Платежи"
            icon="💰"
            link="/admin/payments"
            color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
          <QuickActionButton
            title="Аналитика"
            icon="📈"
            link="/admin/analytics"
            color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          />
        </div>
      </div>

      {/* Последняя активность */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0', color: '#1e293b' }}>
          🔔 Последняя активность
        </h2>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          {recentActivity.map((activity) => (
            <div key={activity.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                fontSize: '14px'
              }}>
                {activity.type === 'user_registration' && '👤'}
                {activity.type === 'course_purchase' && '📚'}
                {activity.type === 'assignment_submitted' && '📝'}
                {activity.type === 'payment_received' && '💰'}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0', color: '#1e293b', fontWeight: '500' }}>
                  {activity.message}
                </p>
                <p style={{ margin: '0', color: '#64748b', fontSize: '12px' }}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 