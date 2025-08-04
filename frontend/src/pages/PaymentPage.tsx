import React from 'react';

const PaymentPage: React.FC = () => {
  const openTelegramPayment = () => {
    const username = 'Pavlentius2007';
    const message = 'Здравствуйте! Хочу получить информацию об оплате курсов. Интересуют способы оплаты и реквизиты.';
    const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  const openPhoneCall = () => {
    const phoneNumber = '+79538628581';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      lineHeight: 1.6,
      color: '#1a1a1a',
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Header */}
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
            Оплата курсов
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Удобные способы оплаты для вашего обучения
          </p>
        </div>
      </section>

      {/* Company Information */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#2d3748'
          }}>
            Информация о компании
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#f7fafc',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#2d3748'
              }}>
                Реквизиты
              </h3>
              <div style={{ color: '#4a5568' }}>
                <p><strong>ИП:</strong> Иванов Иван Иванович</p>
                <p><strong>ОГРНИП:</strong> 123456789012345</p>
                <p><strong>ИНН:</strong> 123456789012</p>
                <p><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1</p>
                <p><strong>Email:</strong> info@fotobiznes.ru</p>
                <p><strong>Телефон:</strong> +7 (953) 862-85-81</p>
              </div>
            </div>
            
            <div style={{
              background: '#f7fafc',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#2d3748'
              }}>
                Банковские реквизиты
              </h3>
              <div style={{ color: '#4a5568' }}>
                <p><strong>Банк:</strong> ПАО Сбербанк</p>
                <p><strong>Расчетный счет:</strong> 40702810123456789012</p>
                <p><strong>Корр. счет:</strong> 30101810400000000225</p>
                <p><strong>БИК:</strong> 044525225</p>
                <p><strong>Назначение платежа:</strong> Оплата за обучение</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section style={{ padding: '4rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#2d3748'
          }}>
            Способы оплаты
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                icon: '📱',
                title: 'QR-код',
                description: 'Оплатите курсы через QR-код в любом банковском приложении. Быстро, удобно и безопасно.',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              {
                icon: '🏦',
                title: 'Банковский перевод',
                description: 'Классический способ оплаты через банковский перевод по реквизитам компании.',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              },
              {
                icon: '💳',
                title: 'Рассрочка от Сбербанка',
                description: 'Оформите рассрочку на обучение без переплат и первоначального взноса.',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              }
            ].map((method, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
              >
                <div style={{
                  background: method.gradient,
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '3rem' }}>{method.icon}</div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#2d3748'
                  }}>
                    {method.title}
                  </h3>
                  <p style={{ 
                    color: '#4a5568',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#2d3748'
          }}>
            Нужна помощь с оплатой?
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            marginBottom: '3rem',
            color: '#4a5568'
          }}>
            Наши специалисты помогут выбрать оптимальный способ оплаты и ответят на все вопросы
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={openTelegramPayment}
              style={{
                background: 'linear-gradient(45deg, #0088cc, #0077b3)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 136, 204, 0.4)',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 136, 204, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 136, 204, 0.4)';
              }}
            >
              💬 Написать в Telegram
            </button>
            <button 
              onClick={openPhoneCall}
              style={{
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 90, 82, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 90, 82, 0.4)';
              }}
            >
              📞 Позвонить
            </button>
          </div>
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
            Преимущества нашей системы оплаты
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                icon: '🔒',
                title: 'Безопасность',
                description: 'Все платежи защищены современными технологиями шифрования'
              },
              {
                icon: '⚡',
                title: 'Быстрота',
                description: 'Мгновенное зачисление платежей и активация доступа к курсам'
              },
              {
                icon: '📋',
                title: 'Отчетность',
                description: 'Автоматическое сохранение чеков и привязка к вашему аккаунту'
              },
              {
                icon: '🎯',
                title: 'Удобство',
                description: 'Множество способов оплаты для вашего комфорта'
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
    </div>
  );
};

export default PaymentPage; 