import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from '../../hooks/useErrorBoundary';
import '../../components/AdminLayout.css';

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
    <div className="admin-stat-card">
      <div className="admin-stat-header">
        <div className="admin-stat-info">
          <h3>{title}</h3>
          <p className="admin-stat-value">
            {isLoading ? '...' : value.toLocaleString()}
          </p>
        </div>
        <div className={`admin-stat-icon admin-stat-icon-${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const QuickActionButton: React.FC<{ title: string; icon: string; link: string; color: string }> = ({ title, icon, link, color }) => (
    <Link to={link} className="admin-action-btn">
      <div className={`admin-action-icon admin-action-icon-${color}`}>
        {icon}
      </div>
      <span>{title}</span>
    </Link>
  );

  return (
    <div className="admin-dashboard">
      {/* Заголовок */}
      <div className="admin-header">
        <h1 className="admin-title">
          🎛️ Панель администратора
        </h1>
        <p className="admin-subtitle">
          Управление платформой обучения
        </p>
      </div>

      {/* Тестовые кнопки для демонстрации системы ошибок */}
      <div className="admin-test-section">
        <h3 className="admin-test-title">
          🧪 Тестирование системы ошибок
        </h3>
        <p className="admin-test-desc">
          Используйте эти кнопки для тестирования системы логирования ошибок. 
          Все ошибки будут записаны и доступны в разделе "Логи ошибок".
        </p>
        <div className="admin-test-buttons">
          <button
            onClick={testError}
            className="admin-test-btn admin-test-btn-error"
          >
            ❌ Тест ошибки
          </button>
          <button
            onClick={testWarning}
            className="admin-test-btn admin-test-btn-warning"
          >
            ⚠️ Тест предупреждения
          </button>
          <button
            onClick={testInfo}
            className="admin-test-btn admin-test-btn-info"
          >
            ℹ️ Тест информации
          </button>
          <button
            onClick={testUnhandledError}
            className="admin-test-btn admin-test-btn-unhandled"
          >
            💥 Необработанная ошибка
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="admin-section">
        <h2 className="admin-section-title">
          📊 Общая статистика
        </h2>
        <div className="admin-stats-grid">
          <StatCard
            title="Всего пользователей"
            value={stats.totalUsers}
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Курсов"
            value={stats.totalCourses}
            icon="📚"
            color="purple"
          />
          <StatCard
            title="Платежей"
            value={stats.totalPayments}
            icon="💰"
            color="green"
          />
          <StatCard
            title="Активных студентов"
            value={stats.activeStudents}
            icon="🎓"
            color="orange"
          />
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="admin-section">
        <h2 className="admin-section-title">
          ⚡ Быстрые действия
        </h2>
        <div className="admin-actions-grid">
          <QuickActionButton
            title="Управление курсами"
            icon="📚"
            link="/admin/courses"
            color="blue"
          />
          <QuickActionButton
            title="Пользователи"
            icon="👥"
            link="/admin/users"
            color="purple"
          />
          <QuickActionButton
            title="Платежи"
            icon="💰"
            link="/admin/payments"
            color="green"
          />
          <QuickActionButton
            title="Аналитика"
            icon="📈"
            link="/admin/analytics"
            color="orange"
          />
        </div>
      </div>

      {/* Последняя активность */}
      <div className="admin-section">
        <h2 className="admin-section-title">
          🔔 Последняя активность
        </h2>
        <div className="admin-stat-card">
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