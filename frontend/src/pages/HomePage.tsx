import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const openTelegramConsultation = () => {
    const username = 'Pavlentius2007';
    const message = 'Здравствуйте! Хочу получить консультацию по курсам фотобизнеса.';
    const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };
  
  const openPhoneCall = () => {
    const phoneNumber = '+79538628581';
    window.open(`tel:${phoneNumber}`, '_self');
  };
  
  return (
    <div className="font-sans text-gray-900 leading-relaxed">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-black text-sm font-bold mb-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="mr-3 text-lg">✨</span>
              ПРЕМИУМ ОБРАЗОВАНИЕ В ФОТОГРАФИИ
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                Школа
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                фотобизнеса
              </span>
            </h1>
            
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Превратите вашу страсть к фотографии в <span className="text-amber-400 font-semibold">прибыльный бизнес</span> с помощью экспертов индустрии
            </p>
            
            {/* Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                <div className="text-xl font-semibold mb-3">Практические навыки</div>
                <div className="text-gray-300 text-sm leading-relaxed">Реальные проекты с первого дня обучения. Создайте портфолио, которое привлечет клиентов.</div>
              </div>
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💼</div>
                <div className="text-xl font-semibold mb-3">Бизнес-подход</div>
                <div className="text-gray-300 text-sm leading-relaxed">Научитесь не только снимать, но и продавать. Ценообразование, маркетинг, клиентская база.</div>
              </div>
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
                <div className="text-xl font-semibold mb-3">Экспертное сообщество</div>
                <div className="text-gray-300 text-sm leading-relaxed">Присоединитесь к сообществу успешных фотографов. Поддержка и обмен опытом 24/7.</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button 
                onClick={() => navigate('/courses')}
                className="group relative bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black px-16 py-6 text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-4 text-2xl">🚀</span>
                  Начать обучение
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={openTelegramConsultation}
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-6 text-xl font-semibold rounded-3xl hover:bg-white hover:text-gray-900 transition-all duration-500 w-full sm:w-auto"
              >
                <span className="mr-3">💬</span>
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              Почему выбирают <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">нас?</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Мы создали уникальную систему обучения, которая действительно работает
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: '🎯',
                title: 'Практический подход',
                description: 'Реальные проекты с первого дня обучения. Портфолио готово к выпуску.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '💼',
                title: 'Бизнес-навыки',
                description: 'Учим не только снимать, но и продавать. Ценообразование, клиентская база, маркетинг.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '👥',
                title: 'Сообщество профи',
                description: 'Нетворкинг с успешными фотографами. Взаимная поддержка и обмен опытом.',
                gradient: 'from-emerald-500 to-teal-500'
              },
              {
                icon: '📱',
                title: 'Современные технологии',
                description: 'Изучаем последние тренды в фотографии и дизайне. Работаем с профессиональным оборудованием.',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: '🎓',
                title: 'Сертификация',
                description: 'Получите официальный сертификат, признанный в индустрии. Повышайте свою ценность на рынке.',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                icon: '💰',
                title: 'Реальные результаты',
                description: 'Наши выпускники успешно запускают собственные проекты и зарабатывают на фотографии.',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-100 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full -translate-y-16 translate-x-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Цифры, которые говорят
              </span>
              <br />
              <span className="text-white">сами за себя</span>
            </h2>
            <p className="text-2xl text-gray-300">Результаты наших выпускников за последние годы</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { 
                number: '500+', 
                label: 'Успешных выпускников',
                subtitle: 'За все время',
                icon: '🏆',
                gradient: 'from-amber-400 to-orange-500'
              },
              { 
                number: '95%', 
                label: 'Довольных учеников',
                subtitle: 'По отзывам',
                icon: '⭐',
                gradient: 'from-blue-400 to-cyan-500'
              },
              { 
                number: '50K+', 
                label: 'Средний доход',
                subtitle: 'В месяц у выпускников',
                icon: '💰',
                gradient: 'from-green-400 to-emerald-500'
              },
              { 
                number: '10+', 
                label: 'Лет экспертизы',
                subtitle: 'В индустрии',
                icon: '🎯',
                gradient: 'from-purple-400 to-pink-500'
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 hover:bg-white/20 transition-all duration-700 transform hover:-translate-y-4"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto`}>
                  {stat.icon}
                </div>
                <div className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2 text-white">{stat.label}</div>
                <div className="text-gray-400">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              Наши <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">курсы</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Выберите программу, которая подходит именно вам и вашим целям
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {[
              {
                title: 'Особенности фотографии в школах/садах',
                subtitle: 'Базовый курс',
                price: '19,900',
                duration: '6 недель',
                description: 'Специализированный курс по детской фотографии с практическими навыками работы с детьми.',
                features: [
                  'Психология работы с детьми',
                  'Техники быстрой съемки',
                  'Готовые сценарии съемок',
                  'Система работы со школами',
                  'Практические задания',
                  'Сертификат по окончании'
                ],
                badge: 'Популярный',
                gradient: 'from-blue-500 to-cyan-500',
                color: 'blue'
              },
              {
                title: 'Дизайн и создание макетов',
                subtitle: 'Продвинутый курс',
                price: '49,900',
                duration: '8 недель',
                description: 'Полный курс по созданию дизайн-продуктов: от фотокниг до брендинга студий.',
                features: [
                  'Профессиональный Photoshop',
                  'Создание премиум-макетов',
                  'Дизайн фотокниг и альбомов',
                  'Брендинг фотостудий',
                  'Работа с типографиями',
                  'Портфолио проектов'
                ],
                badge: 'Рекомендуемый',
                gradient: 'from-purple-500 to-pink-500',
                color: 'purple'
              },
              {
                title: 'Администрирование, ценообразование + инструменты управления',
                subtitle: 'Бизнес-курс',
                price: '98,000',
                duration: '10 недель',
                description: 'Полный курс по управлению фотобизнесом с инструментами администрирования.',
                features: [
                  'Бизнес-модель фотобизнеса',
                  'CRM и автоматизация',
                  'Управление командой',
                  'Финансовое планирование',
                  'Маркетинг и продвижение',
                  'Персональный ментор'
                ],
                badge: 'VIP',
                gradient: 'from-emerald-500 to-teal-500',
                color: 'emerald'
              }
            ].map((course, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-3xl shadow-2xl transition-all duration-700 transform hover:-translate-y-6 border-2 overflow-hidden ${
                  index === 1 ? 'border-blue-200 scale-105' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {/* Badge */}
                {course.badge && (
                  <div className={`absolute top-0 right-0 px-8 py-3 text-white text-sm font-bold rounded-bl-3xl bg-gradient-to-r ${course.gradient}`}>
                    {course.badge}
                  </div>
                )}

                <div className="p-10">
                  {/* Course Header */}
                  <div className="text-center mb-10">
                    <div className="text-sm font-semibold text-gray-500 mb-3">{course.subtitle}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">{course.title}</h3>
                    
                    <div className="mb-6">
                      <div className="text-5xl font-bold text-gray-900 mb-3">{course.price}₽</div>
                      <div className="text-gray-600">{course.duration}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-10 leading-relaxed text-center text-lg">{course.description}</p>

                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {course.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700">
                        <span className={`text-blue-500 mr-4 text-xl flex-shrink-0`}>✓</span>
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    onClick={() => navigate('/courses')}
                    className={`w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-r ${course.gradient} text-white shadow-xl hover:shadow-2xl`}
                  >
                    Подробнее о курсе
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                Готовы начать?
              </span>
            </h2>
            <p className="text-2xl sm:text-3xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Получите консультацию и узнайте, как начать карьеру в фотобизнесе
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 mb-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-6">Получите бесплатную консультацию</h3>
                <p className="text-gray-300 mb-8 text-xl leading-relaxed">
                  Наши эксперты помогут подобрать оптимальный курс для ваших целей и ответят на все вопросы
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button 
                onClick={openTelegramConsultation}
                className="group relative bg-gradient-to-r from-emerald-500 to-green-500 text-white px-16 py-8 text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-4 text-2xl">💬</span>
                  Telegram консультация
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={openPhoneCall}
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-8 text-xl font-semibold rounded-3xl hover:bg-white hover:text-gray-900 transition-all duration-500 w-full sm:w-auto"
              >
                <span className="mr-3">📞</span>
                Позвонить
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/20 text-center">
              <div className="flex flex-wrap justify-center items-center gap-12 text-gray-300 text-lg">
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">🔒</span>
                  Безопасная оплата
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">⭐</span>
                  4.8/5 от 500+ отзывов
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">🎓</span>
                  Сертифицированные курсы
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
              Часто задаваемые <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">вопросы</span>
            </h2>
            <p className="text-2xl text-gray-600">
              Ответы на самые популярные вопросы о наших курсах
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                question: 'Нужно ли иметь профессиональную камеру для начала обучения?',
                answer: 'Нет, для начала обучения достаточно смартфона с хорошей камерой. Профессиональное оборудование мы изучим в процессе обучения.',
                icon: '��'
              },
              {
                question: 'Сколько времени нужно уделять обучению в неделю?',
                answer: 'Рекомендуем 10-15 часов в неделю для оптимального прогресса. Программа адаптируется под ваш график.',
                icon: '⏰'
              },
              {
                question: 'Есть ли поддержка после окончания курса?',
                answer: 'Да, мы предоставляем поддержку в течение 3 месяцев после окончания курса. Также у вас будет доступ к закрытому сообществу выпускников.',
                icon: '🤝'
              },
              {
                question: 'Можно ли оплатить курс в рассрочку?',
                answer: 'Да, мы предлагаем различные варианты оплаты, включая рассрочку без переплат и кредитование через банки-партнеры.',
                icon: '💳'
              },
              {
                question: 'Подходит ли для новичков без опыта?',
                answer: 'Конечно! Большинство наших учеников - новички. Программа построена так, чтобы с нуля довести до профессионального уровня.',
                icon: '🎯'
              },
              {
                question: 'Какой документ я получу по окончании?',
                answer: 'После успешного завершения курса вы получите официальный сертификат, который признается в индустрии фотографии.',
                icon: '🎓'
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-start space-x-8">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Остались вопросы?</h3>
              <p className="text-gray-700 mb-8 text-xl leading-relaxed">
                Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
              </p>
              <button 
                onClick={openTelegramConsultation}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 text-xl font-bold rounded-3xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-500 transform hover:-translate-y-2 shadow-xl"
              >
                Задать вопрос
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 