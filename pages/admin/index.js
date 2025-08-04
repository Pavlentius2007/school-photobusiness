import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  UsersIcon, 
  BookOpenIcon, 
  ChartBarIcon,
  CurrencyDollarIcon,
  CogIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 4567890,
    monthlyRevenue: 234567,
    totalCourses: 8,
    totalLessons: 35,
    pendingQuestions: 23,
    activeSubscriptions: 756
  });

  const [recentUsers] = useState([
    {
      id: 1,
      name: 'Анна Петрова',
      email: 'anna@example.com',
      plan: 'Стандарт',
      joined: '2024-01-15',
      status: 'active',
      progress: 75
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      email: 'dmitry@example.com',
      plan: 'Премиум',
      joined: '2024-01-14',
      status: 'active',
      progress: 45
    },
    {
      id: 3,
      name: 'Елена Козлова',
      email: 'elena@example.com',
      plan: 'Базовый',
      joined: '2024-01-13',
      status: 'active',
      progress: 90
    }
  ]);

  const [recentOrders] = useState([
    {
      id: 1,
      user: 'Анна Петрова',
      plan: 'Стандарт',
      amount: 49900,
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Дмитрий Соколов',
      plan: 'Премиум',
      amount: 89900,
      status: 'completed',
      date: '2024-01-14'
    },
    {
      id: 3,
      user: 'Елена Козлова',
      plan: 'Базовый',
      amount: 29900,
      status: 'pending',
      date: '2024-01-13'
    }
  ]);

  const [recentQuestions] = useState([
    {
      id: 1,
      user: 'Анна Петрова',
      question: 'Как правильно настроить освещение для групповых фото?',
      module: 'Оборудование и техника',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 2,
      user: 'Дмитрий Соколов',
      question: 'Какие документы нужны для регистрации ИП?',
      module: 'Организация бизнеса',
      status: 'answered',
      date: '2024-01-14'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  return (
    <>
      <Head>
        <title>Админ-панель - ФотоШкола</title>
        <meta name="description" content="Админ-панель ФотоШколы" />
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
                <span className="ml-4 text-sm text-gray-500">Админ-панель</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'} 
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">Администратор</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Панель администратора
            </h1>
            <p className="text-gray-600">
              Управление платформой обучения школьному фотобизнесу
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Общий доход</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Активные подписки</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Вопросы на ответ</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingQuestions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Быстрые действия</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-3">
                    <Link 
                      href="/admin/users"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <UsersIcon className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium">Управление пользователями</span>
                    </Link>
                    
                    <Link 
                      href="/admin/courses"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <BookOpenIcon className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-sm font-medium">Управление курсами</span>
                    </Link>
                    
                    <Link 
                      href="/admin/orders"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <CurrencyDollarIcon className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-sm font-medium">Заказы и платежи</span>
                    </Link>
                    
                    <Link 
                      href="/admin/questions"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="text-sm font-medium">Вопросы студентов</span>
                    </Link>
                    
                    <Link 
                      href="/admin/analytics"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <ChartBarIcon className="w-5 h-5 text-orange-600 mr-3" />
                      <span className="text-sm font-medium">Аналитика</span>
                    </Link>
                    
                    <Link 
                      href="/admin/settings"
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <CogIcon className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-sm font-medium">Настройки</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Последние пользователи</h3>
                </div>
                <div className="card-body">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Пользователь
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            План
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Прогресс
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Статус
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img 
                                    className="h-10 w-10 rounded-full" 
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                    alt="" 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {user.plan}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${user.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-900">{user.progress}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                Активен
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders and Questions */}
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Recent Orders */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Последние заказы</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.user}</p>
                        <p className="text-sm text-gray-600">{order.plan}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(order.amount)}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status === 'completed' ? (
                            <>
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Оплачен
                            </>
                          ) : (
                            <>
                              <ClockIcon className="w-3 h-3 mr-1" />
                              В обработке
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Questions */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Последние вопросы</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {recentQuestions.map((question) => (
                    <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{question.user}</p>
                          <p className="text-sm text-gray-600 mt-1">{question.question}</p>
                          <p className="text-xs text-gray-500 mt-1">{question.module}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          question.status === 'answered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {question.status === 'answered' ? (
                            <>
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Отвечен
                            </>
                          ) : (
                            <>
                              <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                              Ожидает
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 