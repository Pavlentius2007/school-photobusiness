import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  BookOpenIcon, 
  ClockIcon, 
  CheckCircleIcon,
  PlayIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [userProgress, setUserProgress] = useState({
    completedLessons: 12,
    totalLessons: 35,
    currentModule: 3,
    totalModules: 8,
    certificates: 2,
    questionsAsked: 5,
    timeSpent: '24ч 30м'
  });

  const [modules] = useState([
    {
      id: 1,
      title: 'Основы школьного фотобизнеса',
      progress: 100,
      status: 'completed',
      lessons: 5,
      completedLessons: 5,
      icon: '📊'
    },
    {
      id: 2,
      title: 'Организация бизнеса',
      progress: 100,
      status: 'completed',
      lessons: 4,
      completedLessons: 4,
      icon: '🏢'
    },
    {
      id: 3,
      title: 'Оборудование и техника',
      progress: 60,
      status: 'in-progress',
      lessons: 6,
      completedLessons: 3,
      icon: '📷'
    },
    {
      id: 4,
      title: 'Работа с клиентами',
      progress: 0,
      status: 'locked',
      lessons: 4,
      completedLessons: 0,
      icon: '🤝'
    },
    {
      id: 5,
      title: 'Съемочный процесс',
      progress: 0,
      status: 'locked',
      lessons: 5,
      completedLessons: 0,
      icon: '🎬'
    },
    {
      id: 6,
      title: 'Обработка и печать',
      progress: 0,
      status: 'locked',
      lessons: 4,
      completedLessons: 0,
      icon: '🎨'
    },
    {
      id: 7,
      title: 'Ценообразование и продажи',
      progress: 0,
      status: 'locked',
      lessons: 3,
      completedLessons: 0,
      icon: '💰'
    },
    {
      id: 8,
      title: 'Маркетинг и продвижение',
      progress: 0,
      status: 'locked',
      lessons: 4,
      completedLessons: 0,
      icon: '📈'
    }
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Завершен урок "Выбор оборудования"',
      time: '2 часа назад',
      module: 'Оборудование и техника'
    },
    {
      id: 2,
      type: 'test_passed',
      title: 'Пройден тест по модулю "Организация бизнеса"',
      time: '1 день назад',
      module: 'Организация бизнеса'
    },
    {
      id: 3,
      type: 'question_asked',
      title: 'Задан вопрос куратору',
      time: '2 дня назад',
      module: 'Основы школьного фотобизнеса'
    }
  ]);

  const overallProgress = Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100);

  return (
    <>
      <Head>
        <title>Личный кабинет - ФотоШкола</title>
        <meta name="description" content="Личный кабинет студента ФотоШколы" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
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

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'} 
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">Пользователь</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Добро пожаловать, Пользователь!
            </h1>
            <p className="text-gray-600">
              Продолжайте обучение и развивайте свой фотобизнес
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Прогресс курса</p>
                    <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Завершено уроков</p>
                    <p className="text-2xl font-bold text-gray-900">{userProgress.completedLessons}/{userProgress.totalLessons}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Время обучения</p>
                    <p className="text-2xl font-bold text-gray-900">{userProgress.timeSpent}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Модули пройдены</p>
                    <p className="text-2xl font-bold text-gray-900">{userProgress.currentModule}/{userProgress.totalModules}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Modules Section */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold text-gray-900">Модули курса</h2>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div key={module.id} className={`p-4 rounded-lg border ${
                        module.status === 'completed' ? 'border-green-200 bg-green-50' :
                        module.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                        'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{module.icon}</span>
                            <div>
                              <h3 className="font-medium text-gray-900">{module.title}</h3>
                              <p className="text-sm text-gray-600">
                                {module.completedLessons}/{module.lessons} уроков
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  module.status === 'completed' ? 'bg-green-500' :
                                  module.status === 'in-progress' ? 'bg-blue-500' :
                                  'bg-gray-300'
                                }`}
                                style={{ width: `${module.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{module.progress}%</span>
                          </div>
                        </div>
                        
                        {module.status === 'in-progress' && (
                          <div className="mt-3">
                            <Link 
                              href={`/dashboard/module/${module.id}`}
                              className="btn btn-sm btn-primary"
                            >
                              <PlayIcon className="w-4 h-4 mr-1" />
                              Продолжить
                            </Link>
                          </div>
                        )}
                        
                        {module.status === 'locked' && (
                          <div className="mt-3">
                            <span className="text-sm text-gray-500">
                              Доступен после завершения предыдущего модуля
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Быстрые действия</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-3">
                    <Link 
                      href="/dashboard/current-lesson"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <PlayIcon className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Продолжить обучение</span>
                    </Link>
                    
                    <Link 
                      href="/dashboard/questions"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm font-medium">Задать вопрос</span>
                    </Link>
                    
                    <Link 
                      href="/dashboard/materials"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <DocumentTextIcon className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-sm font-medium">Материалы курса</span>
                    </Link>
                    
                    <Link 
                      href="/dashboard/community"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <UserGroupIcon className="w-5 h-5 text-orange-600 mr-3" />
                      <span className="text-sm font-medium">Сообщество</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Последняя активность</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.module}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Общий прогресс</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Курс</span>
                        <span>{overallProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{userProgress.certificates}</p>
                          <p className="text-xs text-gray-600">Сертификаты</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{userProgress.questionsAsked}</p>
                          <p className="text-xs text-gray-600">Вопросов задано</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 