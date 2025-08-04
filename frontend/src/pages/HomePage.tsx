import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const openTelegramConsultation = () => {
    // Открываем Telegram чат с username
    const username = 'Pavlentius2007'; // Ваш username в Telegram
    const message = 'Здравствуйте! Хочу получить бесплатную консультацию по курсам фотобизнеса.';
    const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };
  
  const openPhoneCall = () => {
    // Открываем звонок на номер телефона
    const phoneNumber = '+79538628581'; // Замените на ваш номер
    window.open(`tel:${phoneNumber}`, '_self');
  };
  
  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      lineHeight: 1.6,
      color: '#1a1a1a'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Школа фотобизнеса №1
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Превратите ваше творчество в прибыльный бизнес. Обучение фотографии и дизайну от профессионалов с 10+ летним опытом.
          </p>
          <button style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(238, 90, 82, 0.4)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}>
            🚀 Начать обучение
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#2d3748'
          }}>
            Почему выбирают нас?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                icon: '🎯',
                title: 'Практический подход',
                description: 'Реальные проекты с первого дня обучения. Портфолио готово к выпуску.'
              },
              {
                icon: '💼',
                title: 'Бизнес-навыки',
                description: 'Учим не только снимать, но и продавать. Ценообразование, клиентская база, маркетинг.'
              },
              {
                icon: '👥',
                title: 'Сообщество профи',
                description: 'Нетворкинг с успешными фотографами. Взаимная поддержка и обмен опытом.'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#2d3748'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#4a5568' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#2d3748'
          }}>
            Популярные курсы
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                title: 'Особенности фотографии в школах/садах',
                price: '19,900 ₽',
                duration: '6 недель',
                level: 'Базовый',
                description: 'Полный курс по школьной фотографии с практическими навыками работы с детьми.',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                title: 'Дизайн и создание макетов',
                price: '49,900 ₽', 
                duration: '8 недель',
                level: 'Продвинутый',
                description: 'Профессиональный курс по работе с Photoshop и созданию макетов.',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              {
                title: 'Администрирование, ценообразование + инструменты управления',
                price: '98,000 ₽',
                duration: '10 недель', 
                level: 'Эксперт',
                description: 'Полный курс по управлению фотобизнесом с инструментами администрирования.',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              }
            ].map((course, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}>
                <div style={{
                  background: course.gradient,
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '4rem' }}>📷</div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      color: '#2d3748'
                    }}>
                      {course.title}
                    </h3>
                    <span style={{
                      background: '#e2e8f0',
                      color: '#4a5568',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {course.level}
                    </span>
                  </div>
                  <p style={{ 
                    color: '#4a5568', 
                    marginBottom: '1.5rem',
                    lineHeight: 1.6
                  }}>
                    {course.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        color: '#2d3748'
                      }}>
                        {course.price}
                      </span>
                    </div>
                    <div style={{ color: '#4a5568' }}>
                      ⏱️ {course.duration}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => navigate(`/course/${index + 1}`)}
                      style={{
                        flex: 1,
                        background: 'white',
                        color: '#6366f1',
                        border: '2px solid #6366f1',
                        padding: '12px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#6366f1';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#6366f1';
                      }}
                    >
                      Подробнее
                    </button>
                    <button style={{
                      flex: 1,
                      background: course.gradient,
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s'
                    }}>
                      Записаться
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { number: '1000+', label: 'Выпускников' },
              { number: '95%', label: 'Трудоустройство' },
              { number: '50+', label: 'Преподавателей' },
              { number: '5 лет', label: 'На рынке' }
            ].map((stat, index) => (
              <div key={index}>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize: '1.125rem',
                  opacity: 0.9
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#2d3748'
          }}>
            Готовы начать?
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            color: '#4a5568'
          }}>
            Получите бесплатную консультацию по организации прибыльного фотобизнеса
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={openTelegramConsultation}
              style={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              💬 Бесплатная консультация
            </button>
            <button 
              onClick={openPhoneCall}
              style={{
                background: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'background 0.3s, color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#667eea';
              }}
            >
              📱 +7 953 862-85-81
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 