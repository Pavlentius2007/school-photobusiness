import { useState, useEffect, Fragment, useState as useModalState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  PlayIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  AcademicCapIcon,
  StarIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // Состояние для модального окна
  const [openBlock, setOpenBlock] = useModalState(null);

  const stats = [
    { number: '500+', label: 'Выпускников' },
    { number: '50-150к', label: 'Средний доход' },
    { number: '95%', label: 'Успешных стартов' },
    { number: '8', label: 'Модулей обучения' }
  ];

  // Новая структура программы обучения
  const programBlocks = [
    {
      id: 1,
      title: 'Фотография в школах',
      short: 'Съёмка, работа с детьми, организация процесса',
      details: [
        {
          section: 'Подбор и настройка оборудования',
          items: [
            'Камера, свет, схемы размещения',
          ]
        },
        {
          section: 'Особенности работы с детьми',
          items: [
            'Портреты, группы, малыши',
            'Работа с учителями',
            'Стрессовые ситуации и как их преодолевать',
            'Тайм-менеджмент съёмочного дня и сезонное планирование'
          ]
        }
      ],
      icon: '📷'
    },
    {
      id: 2,
      title: 'Дизайн и макеты',
      short: 'Работа в Photoshop, сборка макетов, подготовка к печати',
      details: [
        {
          section: 'Работа в Photoshop / Photolab',
          items: [
            'Скрипты, горячие клавиши',
            'Отрисовка: одиночные, групповые фото, виньетки, коллажи'
          ]
        },
        {
          section: 'Сборка макетов',
          items: [
            'С нуля и под выпускные альбомы',
            'Подготовка к печати, взаимодействие с типографиями',
            'Сборка макета на сайт, 10 шаблонов в подарок'
          ]
        }
      ],
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Администрирование и сопровождение',
      short: 'Организация, финансы, юридические вопросы, партнёры',
      details: [
        {
          section: 'Полное сопровождение 1 и 2 блока',
          items: []
        },
        {
          section: 'Ценообразование, калькуляторы, работа с администрацией',
          items: []
        },
        {
          section: 'Чек-листы переговоров с директором',
          items: []
        },
        {
          section: 'Работа с партнёрами и юридическая часть',
          items: []
        },
        {
          section: 'Найм, мотивация, делегирование и контроль',
          items: []
        },
        {
          section: 'Финансовый учёт, сбор оплат, инструменты контроля',
          items: []
        },
        {
          section: 'Рекламные материалы, подготовка финальных файлов',
          items: []
        }
      ],
      icon: '🗂️'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Анна Петрова',
      location: 'Москва',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      text: 'Прошла курс 3 месяца назад. Сейчас работаю с 5 школами, доход 80-120 тысяч в месяц. Все шаблоны и документы из курса использую постоянно!',
      rating: 5
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      location: 'Санкт-Петербург',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      text: 'Отличный курс! Особенно полезны были модули по переговорам со школами и ценообразованию. Первый заказ получил через 2 недели после обучения.',
      rating: 5
    },
    {
      id: 3,
      name: 'Елена Козлова',
      location: 'Екатеринбург',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      text: 'Была в полном восторге от поддержки! Ментор помог составить бизнес-план и найти первые школы. Сейчас зарабатываю 60-90 тысяч в месяц.',
      rating: 5
    }
  ];

  // Новая структура тарифов с подробным описанием и акцентами
  const tariffs = [
    {
      id: 'basic',
      name: 'Базовый',
      color: 'green',
      icon: '📘',
      price: '₽29,900',
      description: 'Для уверенного старта: попробовать себя, сделать первые шаги. Подходит, если вы хотите начать и понять, подходит ли вам эта сфера.',
      features: [
        '✅ Доступ к блоку: Фотография в школах',
        '⏳ Срок доступа: 1 месяц',
        '❌ Без сопровождения',
        '🎁 Готовые шаблоны, чек-листы, инструкция по съёмке',
        '🖼️ 5 бонусных макетов для отработки навыков',
        '🔵 Можно перейти на более высокий тариф в течение 10 дней, оплатив только разницу'
      ],
      blocks: [1]
    },
    {
      id: 'standard',
      name: 'Стандарт',
      color: 'blue',
      icon: '⭐',
      price: '₽49,900',
      description: 'Для тех, кто уже настроен развиваться и хочет освоить не только съёмку, но и дизайн. Подходит, если вы хотите сразу предлагать готовый продукт школам.',
      features: [
        '✅ Доступ к блокам: Фотография в школах и Дизайн и макеты',
        '⏳ Срок доступа: 2 месяца',
        '💬 Поддержка в чате',
        '🧰 Доступ к калькуляторам, техническим шаблонам',
        '🧩 Домашние задания с обратной связью',
        '📄 Готовый пакет договоров и чек-листов по коммуникации со школами',
        '🟣 Можно перейти на Премиум в течение 10 дней со скидкой'
      ],
      blocks: [1, 2]
    },
    {
      id: 'premium',
      name: 'Премиум',
      color: 'yellow',
      icon: '🎓',
      price: '₽89,900',
      badge: '🔥 Самый выгодный',
      description: 'Максимум возможностей. Запуск под ключ с личным сопровождением. Подходит, если вы хотите не просто научиться, а создать полноценный прибыльный бизнес.',
      features: [
        '✅ Доступ ко всем 3 блокам: Фотография в школах, Дизайн и макеты, Администрирование и сопровождение',
        '⏳ Срок доступа: 1 год',
        '👤 Персональный ментор',
        '📞 Еженедельные созвоны по вопросам и стратегии',
        '💼 Индивидуальная помощь в запуске: реклама, переговоры, финмодель',
        '📘 Закрытый клуб выпускников и поддержка после обучения',
        '📊 Помощь с ценообразованием, учётом, запуском команды'
      ],
      blocks: [1, 2, 3]
    }
  ];
  const [selectedTariff, setSelectedTariff] = useState('premium');

  return (
    <>
      <Head>
        <title>Школьный Фотобизнес - LMS Платформа</title>
        <meta name="description" content="Научитесь зарабатывать на школьной фотографии. Полный курс от основ до запуска прибыльного бизнеса с готовыми шаблонами и поддержкой." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Ф</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ФотоШкола</span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                О курсе
              </Link>
              <Link href="#modules" className="text-gray-700 hover:text-blue-600 transition-colors">
                Модули
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Тарифы
              </Link>
              <Link href="#reviews" className="text-gray-700 hover:text-blue-600 transition-colors">
                Отзывы
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard" className="btn btn-primary">
                    Личный кабинет
                  </Link>
                  <button onClick={() => setIsLoggedIn(false)} className="text-gray-700 hover:text-blue-600">
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button onClick={() => setIsLoggedIn(true)} className="text-gray-700 hover:text-blue-600">
                    Войти
                  </button>
                  <Link href="/auth/register" className="btn btn-primary">
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Научитесь зарабатывать на{' '}
                <span className="text-yellow-400">школьной фотографии</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Полный курс для фотографов: от основ до запуска прибыльного бизнеса. 
                Готовые шаблоны, контракты и поддержка экспертов.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register" className="btn btn-lg bg-yellow-400 text-gray-900 hover:bg-yellow-300">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Начать обучение
                </Link>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Смотреть презентацию
                </button>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop" 
                alt="Школьная фотография"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">500+ выпускников</div>
                    <div className="text-sm text-gray-600">уже зарабатывают</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему школьная фотография?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Стабильный доход круглый год с гарантированным потоком клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Круглогодичный график</h3>
              <p className="text-gray-600">Осень - портреты, зима - подарки, весна - выпускные, лето - мероприятия</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Гарантированные клиенты</h3>
              <p className="text-gray-600">Каждому ребенку ежегодно нужны школьные фотографии</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Высокая прибыльность</h3>
              <p className="text-gray-600">Маржинальность до 70% при минимальных вложениях</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Быстрый старт</h3>
              <p className="text-gray-600">Первый заказ уже через 2 недели после обучения</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section (roadmap) */}
      <section id="modules" className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Путь ученика
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Каждый тариф открывает доступ к своим этапам обучения. Наведите на тариф, чтобы увидеть, какие блоки доступны.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              {tariffs.map(tariff => (
                <button
                  key={tariff.id}
                  className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${selectedTariff === tariff.id ? `border-${tariff.color}-600 bg-${tariff.color}-50 text-${tariff.color}-900` : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400'}`}
                  onClick={() => setSelectedTariff(tariff.id)}
                >
                  <span className="text-xl mr-1">{tariff.icon}</span> {tariff.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-0 relative">
            {programBlocks.map((block, idx) => {
              // Определяем, какие тарифы открывают этот блок
              const availableTariffs = tariffs.filter(t => t.blocks.includes(block.id));
              const isActive = tariffs.find(t => t.id === selectedTariff).blocks.includes(block.id);
              return (
                <Fragment key={block.id}>
                  <div
                    className={`w-full max-w-xl rounded-xl shadow-md p-6 mb-0 cursor-pointer border-2 transition flex items-center gap-4 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white opacity-60'}`}
                    onClick={() => setOpenBlock(block)}
                  >
                    <span className="text-4xl">{block.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        {block.title}
                        {block.id === 3 && (
                          <span className="ml-2 px-2 py-1 rounded bg-yellow-200 text-yellow-900 text-xs font-bold">Менторство</span>
                        )}
                      </h3>
                      <p className="text-gray-600">{block.short}</p>
                      <div className="flex gap-2 mt-2">
                        {availableTariffs.map(t => (
                          <span key={t.id} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border-2 border-${t.color}-400 bg-${t.color}-100 text-${t.color}-800`}>
                            {t.icon} {t.name}
                          </span>
                        ))}
                      </div>
                      {isActive ? (
                        <span className="inline-block mt-1 text-xs text-blue-700 font-bold">Доступно в тарифе</span>
                      ) : (
                        <span className="inline-block mt-1 text-xs text-gray-400">Недоступно в тарифе</span>
                      )}
                    </div>
                  </div>
                  {idx < programBlocks.length - 1 && (
                    <div className="flex flex-col items-center">
                      <span className="text-blue-400 text-3xl my-2">↓</span>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
        {/* Модальное окно */}
        {openBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl"
                onClick={() => setOpenBlock(null)}
                aria-label="Закрыть"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">{openBlock.icon}</span> {openBlock.title}
                {openBlock.id === 3 && (
                  <span className="ml-2 px-2 py-1 rounded bg-yellow-200 text-yellow-900 text-xs font-bold">Менторство</span>
                )}
              </h2>
              <div className="space-y-4">
                {openBlock.details.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-blue-700 mb-1">{section.section}</h3>
                    {section.items.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 ml-2">
                        {section.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-2 mb-2">
              <span role="img" aria-label="card">💳</span> Выберите свой тариф
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Каждый тариф открывает доступ к определённым блокам обучения и уровню сопровождения:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tariffs.map(tariff => (
              <div
                key={tariff.id}
                className={`relative rounded-2xl shadow-xl p-8 flex flex-col border-4 transition-all duration-300 ${selectedTariff === tariff.id ? `border-${tariff.color}-500 bg-${tariff.color}-50` : 'border-gray-200 bg-white hover:border-blue-300'} group`}
                style={{ minHeight: 480 }}
                onClick={() => setSelectedTariff(tariff.id)}
              >
                {tariff.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                    {tariff.badge}
                  </span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{tariff.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{tariff.name}</h3>
                </div>
                <div className="text-3xl font-extrabold mb-2 text-gray-900">{tariff.price}</div>
                <div className="text-gray-700 mb-4 text-base min-h-[60px]">{tariff.description}</div>
                <ul className="space-y-2 mb-6">
                  {tariff.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-800 text-sm">
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto w-full py-3 rounded-lg font-semibold text-lg shadow transition-all duration-200 ${selectedTariff === tariff.id ? `bg-${tariff.color}-500 text-white` : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                >
                  Выбрать тариф
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Отзывы наших выпускников
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Реальные истории успеха от фотографов, которые прошли обучение
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать зарабатывать на школьной фотографии?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к 500+ фотографам, которые уже успешно работают в этой нише
          </p>
          <Link href="/auth/register" className="btn btn-lg bg-yellow-400 text-gray-900 hover:bg-yellow-300">
            Начать обучение
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Ф</span>
                </div>
                <span className="text-xl font-bold">ФотоШкола</span>
              </div>
              <p className="text-gray-400">
                Обучаем фотографов зарабатывать на школьной фотографии с 2020 года
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Курс</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white">О курсе</Link></li>
                <li><Link href="#modules" className="hover:text-white">Модули</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Тарифы</Link></li>
                <li><Link href="#reviews" className="hover:text-white">Отзывы</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Контакты</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Политика конфиденциальности</Link></li>
                <li><Link href="/terms" className="hover:text-white">Пользовательское соглашение</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Telegram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">VK</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.744-.9-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.744.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ФотоШкола. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Презентация курса</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Видео презентация будет доступна в полной версии</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 