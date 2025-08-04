import React, { useState, useEffect } from 'react';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeStudents: 0,
    pendingAssignments: 0,
    totalRevenue: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Имитация загрузки данных
    setStats({
      totalCourses: 5,
      activeStudents: 127,
      pendingAssignments: 23,
      totalRevenue: 45000
    });

    setRecentActivity([
      {
        id: 1,
        type: 'assignment',
        message: 'Новое домашнее задание от Анны Петровой',
        time: '2 часа назад',
        course: 'Особенности фотографии в школах/садах'
      },
      {
        id: 2,
        type: 'student',
        message: 'Иван Сидоров присоединился к курсу',
        time: '4 часа назад',
        course: 'Дизайн и создание макетов'
      },
      {
        id: 3,
        type: 'payment',
        message: 'Получен платеж за курс',
        time: '1 день назад',
        course: 'Особенности фотографии в школах/садах',
        amount: 19900
      },
      {
        id: 4,
        type: 'assignment',
        message: 'Проверено домашнее задание',
        time: '1 день назад',
        course: 'Администрирование, ценообразование + инструменты управления'
      }
    ]);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'student': return '👤';
      case 'payment': return '💰';
      default: return '📌';
    }
  };

  return (
    <div>
      <div style={{
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2d3748',
          margin: '0 0 10px 0'
        }}>
          Добро пожаловать, куратор! 👋
        </h1>
        <p style={{
          color: '#718096',
          fontSize: '16px',
          margin: 0
        }}>
          Обзор ваших курсов и активности студентов
        </p>
      </div>

      {/* Статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Мои курсы</p>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {stats.totalCourses}
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📚
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Активные студенты</p>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {stats.activeStudents}
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              👥
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Ожидают проверки</p>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {stats.pendingAssignments}
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📝
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: '0 0 5px 0', fontSize: '14px' }}>Общий доход</p>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#2d3748' }}>
                {stats.totalRevenue.toLocaleString()} ₽
              </h3>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              💰
            </div>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '30px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#2d3748',
          margin: '0 0 20px 0'
        }}>
          Быстрые действия
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <button style={{
            padding: '15px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'transform 0.2s ease'
          }}>
            ✏️ Создать новый урок
          </button>
          <button style={{
            padding: '15px 20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'transform 0.2s ease'
          }}>
            📝 Добавить задание
          </button>
          <button style={{
            padding: '15px 20px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'transform 0.2s ease'
          }}>
            👥 Просмотреть студентов
          </button>
          <button style={{
            padding: '15px 20px',
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'transform 0.2s ease'
          }}>
            📊 Посмотреть аналитику
          </button>
        </div>
      </div>

      {/* Последняя активность */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#2d3748',
          margin: '0 0 20px 0'
        }}>
          Последняя активность
        </h3>
        <div>
          {recentActivity.map((activity) => (
            <div key={activity.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #f7fafc'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '18px'
              }}>
                {getActivityIcon(activity.type)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  margin: '0 0 5px 0',
                  color: '#2d3748',
                  fontSize: '14px'
                }}>
                  {activity.message}
                </p>
                <p style={{
                  margin: 0,
                  color: '#718096',
                  fontSize: '12px'
                }}>
                  {activity.course} • {activity.time}
                </p>
              </div>
              {activity.amount && (
                <div style={{
                  color: '#48bb78',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  +{activity.amount} ₽
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 