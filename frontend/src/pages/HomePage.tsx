import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
              <span className="mr-2">🎓</span>
              Школьный фотобизнес - обучение для всех возрастов
            </div>
            
            {/* Main title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Освойте
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                фотобизнес
              </span>
              в школе
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Профессиональные курсы фотографии для школьников. 
              От основ до создания собственного бизнеса.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto animate-fade-in">
              <div className="flex items-center justify-center space-x-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">📸</span>
                </div>
                <span className="font-medium">Практические занятия</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <span className="font-medium">Бизнес-подход</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <span className="font-medium">Результат с первого дня</span>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/courses">
                <button className="btn-primary">
                  Начать обучение
                </button>
              </Link>
              <Link to="/about">
                <button className="btn-secondary">
                  Узнать больше
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Уникальная программа обучения, разработанная специально для школьников
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Структурированное обучение</h3>
              <p className="text-gray-600 leading-relaxed">
                Пошаговые курсы от основ фотографии до продвинутого уровня. 
                Каждый урок построен на практических примерах.
              </p>
            </div>
            
            <div className="card p-8 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Бизнес-мышление</h3>
              <p className="text-gray-600 leading-relaxed">
                Учим не только фотографировать, но и монетизировать навыки. 
                Создание портфолио и поиск клиентов.
              </p>
            </div>
            
            <div className="card p-8 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Сообщество</h3>
              <p className="text-gray-600 leading-relaxed">
                Общение с единомышленниками, обмен опытом и совместные проекты. 
                Поддержка на каждом этапе обучения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Что говорят наши ученики
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Реальные истории успеха от наших выпускников
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">АИ</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Анна Иванова</div>
                  <div className="text-sm text-gray-600">Ученица 9 класса</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600">
                "За 3 месяца научилась профессионально фотографировать и уже заработала первые 15,000 рублей на школьных мероприятиях!"
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">МП</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Михаил Петров</div>
                  <div className="text-sm text-gray-600">Ученик 11 класса</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600">
                "Отличные курсы! Теперь у меня есть стабильный доход от фотографии. Планирую развивать свой бизнес дальше."
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">ЕС</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Елена Сидорова</div>
                  <div className="text-sm text-gray-600">Ученица 10 класса</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600">
                "Преподаватели очень внимательные, объясняют все доступно. Уже сделала первые заказы на фотосессии!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Выпускников</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">5</div>
              <div className="text-lg opacity-90">Основных программ</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Довольных учеников</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши достижения и партнеры
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Официальные документы и сертификаты качества
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-sm font-medium text-gray-900">Лицензия Минобразования</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📜</span>
              </div>
              <div className="text-sm font-medium text-gray-900">Сертифицированные преподаватели</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-sm font-medium text-gray-900">Безопасные платежи</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="text-sm font-medium text-gray-900">Защита данных</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Популярные курсы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Начните с самых востребованных направлений
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card overflow-hidden hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Основы фотографии</h3>
                <p className="text-gray-600 mb-4">Базовые принципы и техники съемки</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">₽9,900</span>
                  <Link to="/courses">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Подробнее
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card overflow-hidden hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">💼</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Фотобизнес</h3>
                <p className="text-gray-600 mb-4">Создание и развитие фотобизнеса</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">₽19,900</span>
                  <Link to="/courses">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Подробнее
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card overflow-hidden hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">🎨</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Обработка фото</h3>
                <p className="text-gray-600 mb-4">Профессиональная ретушь и цветокоррекция</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">₽14,900</span>
                  <Link to="/courses">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Подробнее
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses">
              <button className="btn-primary">
                Смотреть все курсы
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на самые популярные вопросы
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Нужен ли опыт в фотографии?
              </h3>
              <p className="text-gray-600">
                Нет, наши курсы подходят для начинающих. Мы начинаем с самых основ и постепенно переходим к сложным техникам.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Какое оборудование нужно?
              </h3>
              <p className="text-gray-600">
                Для начала достаточно смартфона. По мере обучения мы расскажем о профессиональном оборудовании и поможем с выбором.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Можно ли вернуть деньги?
              </h3>
              <p className="text-gray-600">
                Да, мы предоставляем гарантию возврата средств в течение 14 дней, если курс не подошел.
              </p>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Выдается ли сертификат?
              </h3>
              <p className="text-gray-600">
                Да, по окончании курса вы получите официальный сертификат, который можно использовать в портфолио.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Свяжитесь с нами
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center text-white">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-gray-300">г. Москва, ул. Примерная, д. 123</div>
                  </div>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-gray-300">+7 (999) 123-45-67</div>
                  </div>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">info@photobusiness.school</div>
                  </div>
                </div>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="text-white font-semibold mb-4">Гарантии качества:</div>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Возврат средств в течение 14 дней
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Официальные сертификаты
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Поддержка 24/7
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="card p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Расскажите, что вас интересует"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;