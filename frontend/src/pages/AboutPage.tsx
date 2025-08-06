import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              О нашей школе
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Мы помогаем школьникам освоить фотографию и создать собственный бизнес
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Наша миссия
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Мы верим, что каждый школьник может стать успешным фотографом и предпринимателем. 
                Наша миссия - дать молодым людям не только технические навыки фотографии, 
                но и бизнес-мышление для создания собственного дела.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                За 3 года работы мы помогли более 50 ученикам начать карьеру в фотографии 
                и заработать первые деньги на своем хобби.
              </p>
              <Link to="/courses">
                <button className="btn-primary">
                  Начать обучение
                </button>
              </Link>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
                    <div className="text-gray-600">Года опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-gray-600">Выпускников</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-gray-600">Довольных учеников</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
                    <div className="text-gray-600">Программ обучения</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши преподаватели
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессиональные фотографы с многолетним опытом
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-4xl font-bold">МП</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Мария Петрова</h3>
              <p className="text-blue-600 font-medium mb-3">Основатель школы</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                15+ лет в фотографии, работала с ведущими брендами, автор 3 книг о фотобизнесе. 
                Специализируется на портретной и коммерческой фотографии.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">📷</a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">📧</a>
              </div>
            </div>
            
            <div className="card p-8 text-center hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-4xl font-bold">АС</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Алексей Сидоров</h3>
              <p className="text-purple-600 font-medium mb-3">Преподаватель</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                10+ лет опыта в свадебной и семейной фотографии. 
                Эксперт по работе с естественным светом и эмоциональной фотографии.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">📷</a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">📧</a>
              </div>
            </div>
            
            <div className="card p-8 text-center hover:-translate-y-2">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-4xl font-bold">ЕК</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Елена Козлова</h3>
              <p className="text-green-600 font-medium mb-3">Преподаватель</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                8+ лет в fashion и beauty фотографии. 
                Специалист по обработке фотографий и цветокоррекции.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">📷</a>
                <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">📧</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Принципы, на которых строится наше обучение
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Практичность</h3>
              <p className="text-gray-600 text-sm">
                Каждый урок направлен на получение реальных навыков, которые можно сразу применить
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Инновации</h3>
              <p className="text-gray-600 text-sm">
                Используем современные технологии и подходы к обучению
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Поддержка</h3>
              <p className="text-gray-600 text-sm">
                Поддерживаем каждого ученика на всех этапах обучения
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Результат</h3>
              <p className="text-gray-600 text-sm">
                Фокусируемся на достижении конкретных результатов и целей
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              История развития
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Как мы росли и развивались
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2021
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Основание школы</h3>
                <p className="text-gray-600">
                  Мария Петрова основала школу фотографии для школьников. Первый курс собрал 10 учеников.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  2022
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Расширение команды</h3>
                <p className="text-gray-600">
                  К команде присоединились Алексей Сидоров и Елена Козлова. Количество учеников выросло до 30.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  2023
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Онлайн платформа</h3>
                <p className="text-gray-600">
                  Запустили онлайн платформу для обучения. Теперь доступны курсы из любой точки мира.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  2024
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Новые программы</h3>
                <p className="text-gray-600">
                  Добавили курсы по видеосъемке и социальным сетям. Более 50 успешных выпускников.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы присоединиться к нам?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Начните свой путь в фотографии и создайте собственный бизнес
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <button className="btn-primary">
                Посмотреть курсы
              </button>
            </Link>
            <Link to="/register">
              <button className="btn-secondary">
                Зарегистрироваться
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 