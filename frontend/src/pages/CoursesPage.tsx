import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBaseCourses } from '../data/coursesData';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const courses = getBaseCourses();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Все курсы' },
    { id: 'basic', name: 'Базовые' },
    { id: 'advanced', name: 'Продвинутые' },
    { id: 'expert', name: 'Экспертные' }
  ];

  // Поскольку BaseCourse не содержит level, используем все курсы
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses; // Показываем все курсы, так как level нет в BaseCourse

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Наши курсы
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Выберите курс, который подходит именно вам. От основ до продвинутых техник.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                {/* Course Image Section */}
                <div 
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ background: course.gradient }}
                >
                  <div className="text-6xl">{course.image}</div>
                  {course.badge && (
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                      {course.badge}
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      Курс
                    </span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {course.price.toLocaleString()} ₽
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">4.8</span>
                      <span className="text-sm text-gray-500">(120)</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Практические задания
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Сертификат
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Поддержка
                    </div>
                  </div>

                  <button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Курсы не найдены
              </h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить фильтр или свяжитесь с нами для получения информации о новых курсах.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Показать все курсы
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Не можете выбрать курс?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Получите бесплатную консультацию и мы поможем подобрать оптимальный курс для ваших целей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                const username = 'Pavlentius2007';
                const message = 'Здравствуйте! Хочу получить консультацию по выбору курса фотобизнеса.';
                const telegramUrl = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
                window.open(telegramUrl, '_blank');
              }}
              className="bg-green-500 text-white px-8 py-4 text-lg font-bold rounded-full hover:bg-green-600 transition-all duration-300 w-full sm:w-auto flex items-center justify-center space-x-2"
            >
              <span>💬</span>
              <span>Telegram консультация</span>
            </button>
            <button 
              onClick={() => window.open('tel:+79538628581', '_self')}
              className="bg-white text-blue-600 px-8 py-4 text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto flex items-center justify-center space-x-2"
            >
              <span>📞</span>
              <span>Позвонить</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage; 