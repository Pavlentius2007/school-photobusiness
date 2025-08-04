import React, { useState, useEffect } from 'react';
import { mockApiClient } from '../../services/mockApi';

const AnalyticsPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalStudents: 0,
    totalCourses: 0,
    completionRate: 0,
    averageScore: 0,
    monthlyGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const dashboardStats = await mockApiClient.getDashboardStats();
      
      // Расчет дополнительной статистики
      const completionRate = calculateCompletionRate();
      const averageScore = calculateAverageScore();
      const monthlyGrowth = calculateMonthlyGrowth();
      
      setStats({
        totalRevenue: dashboardStats.total_revenue,
        totalStudents: dashboardStats.total_students,
        totalCourses: dashboardStats.total_courses,
        completionRate,
        averageScore,
        monthlyGrowth
      });
    } catch (error) {
      console.error('Ошибка загрузки аналитики:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Расчет процента завершения курсов
  const calculateCompletionRate = (): number => {
    // Имитируем данные о завершении курсов
    const totalEnrollments = 25;
    const completedCourses = 18;
    return Math.round((completedCourses / totalEnrollments) * 100);
  };

  // Расчет средней оценки
  const calculateAverageScore = (): number => {
    // Имитируем данные об оценках
    const scores = [85, 92, 78, 88, 95, 82, 90, 87];
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average);
  };

  // Расчет роста за месяц
  const calculateMonthlyGrowth = (): number => {
    // Имитируем данные о росте
    const lastMonth = 120;
    const thisMonth = 135;
    return Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
          Аналитика и отчеты
        </h1>
        <p style={{ fontSize: '16px', color: '#718096', margin: 0 }}>
          Статистика и аналитические данные платформы
        </p>
      </div>

      {/* Основные метрики */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              💰
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Общая выручка
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
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
              👥
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Всего студентов
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                {stats.totalStudents}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📚
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Активных курсов
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                {stats.totalCourses}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              📈
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Рост за месяц
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                +{stats.monthlyGrowth}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Детальная статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            Процент завершения курсов
          </h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `conic-gradient(#48bb78 ${stats.completionRate * 3.6}deg, #e2e8f0 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              position: 'relative'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#2d3748'
              }}>
                {stats.completionRate}%
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
              Студенты завершили курсы
            </p>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            Средняя оценка
          </h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#48bb78',
              marginBottom: '8px'
            }}>
              {stats.averageScore}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: '12px'
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} style={{
                  fontSize: '20px',
                  color: star <= Math.floor(stats.averageScore) ? '#f6e05e' : '#e2e8f0'
                }}>
                  ⭐
                </span>
              ))}
            </div>
            <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
              Из 5 возможных баллов
            </p>
          </div>
        </div>
      </div>

      {/* Графики и диаграммы */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginTop: '20px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
          📊 Графики и диаграммы
        </h3>
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '2px dashed #e2e8f0'
        }}>
          <p style={{ fontSize: '16px', color: '#718096', margin: 0 }}>
            Здесь будут отображаться интерактивные графики и диаграммы
          </p>
          <p style={{ fontSize: '14px', color: '#a0aec0', margin: '8px 0 0 0' }}>
            (Интеграция с Chart.js или D3.js)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 