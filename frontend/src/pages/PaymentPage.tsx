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
    <div className="font-sans text-gray-800 leading-relaxed min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-20 px-8 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-25 rounded-full text-sm font-medium mb-6 shadow-lg">
            <span className="mr-2">💳</span>
            Безопасная оплата
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Оплата курсов
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Удобные способы оплаты для вашего обучения. Выберите подходящий вариант и начните свой путь в фотобизнесе.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              Защищенные платежи
            </div>
            <div className="flex items-center">
              <span className="mr-2">⚡</span>
              Мгновенная активация
            </div>
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              Мобильная оплата
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-gray-800">
            Информация о компании
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Реквизиты
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">👤</span>
                  <div>
                    <div className="text-sm text-gray-500">ИП</div>
                    <div className="font-medium text-gray-800">Иванов Иван Иванович</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">📋</span>
                  <div>
                    <div className="text-sm text-gray-500">ОГРНИП</div>
                    <div className="font-medium text-gray-800">123456789012345</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">🆔</span>
                  <div>
                    <div className="text-sm text-gray-500">ИНН</div>
                    <div className="font-medium text-gray-800">123456789012</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">📍</span>
                  <div>
                    <div className="text-sm text-gray-500">Адрес</div>
                    <div className="font-medium text-gray-800">г. Москва, ул. Примерная, д. 1</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">📧</span>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-800">info@fotobiznes.ru</div>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-400 mr-3">📱</span>
                  <div>
                    <div className="text-sm text-gray-500">Телефон</div>
                    <div className="font-medium text-gray-800">+7 (953) 862-85-81</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🏦</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Банковские реквизиты
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">🏛️</span>
                  <div>
                    <div className="text-sm text-gray-500">Банк</div>
                    <div className="font-medium text-gray-800">ПАО Сбербанк</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">💳</span>
                  <div>
                    <div className="text-sm text-gray-500">Расчетный счет</div>
                    <div className="font-medium text-gray-800 font-mono">40702810123456789012</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">🏦</span>
                  <div>
                    <div className="text-sm text-gray-500">Корр. счет</div>
                    <div className="font-medium text-gray-800 font-mono">30101810400000000225</div>
                  </div>
                </div>
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-400 mr-3">🔢</span>
                  <div>
                    <div className="text-sm text-gray-500">БИК</div>
                    <div className="font-medium text-gray-800 font-mono">044525225</div>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-400 mr-3">📝</span>
                  <div>
                    <div className="text-sm text-gray-500">Назначение платежа</div>
                    <div className="font-medium text-gray-800">Оплата за обучение</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-gray-800">
            Способы оплаты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📱',
                title: 'QR-код',
                description: 'Оплатите курсы через QR-код в любом банковском приложении. Быстро, удобно и безопасно.',
                gradient: 'from-blue-600 to-purple-700'
              },
              {
                icon: '🏦',
                title: 'Банковский перевод',
                description: 'Классический способ оплаты через банковский перевод по реквизитам компании.',
                gradient: 'from-pink-500 to-red-500'
              },
              {
                icon: '💳',
                title: 'Рассрочка от Сбербанка',
                description: 'Оформите рассрочку на обучение без переплат и первоначального взноса.',
                gradient: 'from-pink-400 to-yellow-400'
              }
            ].map((method, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${method.gradient} h-36 flex items-center justify-center text-white`}>
                  <div className="text-5xl">{method.icon}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
            Нужна помощь с оплатой?
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            Наши специалисты помогут выбрать оптимальный способ оплаты и ответят на все вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button 
              onClick={openTelegramPayment}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none py-4 px-8 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              💬 Написать в Telegram
            </button>
            <button 
              onClick={openPhoneCall}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white border-none py-4 px-8 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              📞 Позвонить
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-gray-800">
            Преимущества нашей системы оплаты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage; 