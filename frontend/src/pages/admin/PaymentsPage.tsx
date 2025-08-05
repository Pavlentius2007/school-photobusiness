import React, { useState, useEffect, useCallback, useRef } from 'react';
import { mockApiClient } from '../../services/mockApi';
import { useErrorBoundary } from '../../hooks/useErrorBoundary';

interface Payment {
  id: string;
  user_name: string;
  user_email: string;
  course_title: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  completed_at?: string;
  receipt_url?: string;
}

interface NewPayment {
  user_name: string;
  user_email: string;
  course_title: string;
  amount: number;
  payment_method: string;
  receipt_file?: File;
}

const PaymentsPage: React.FC = () => {
  const { logError, logWarning } = useErrorBoundary('PaymentsPage');
  
  const stableLogError = useCallback((message: string, error?: Error, userAction?: string) => {
    logError(message, error, userAction);
  }, [logError]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const hasLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPayment, setNewPayment] = useState<NewPayment>({
    user_name: '',
    user_email: '',
    course_title: '',
    amount: 0,
    payment_method: 'ЮKassa'
  });

  const loadPayments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await mockApiClient.getPayments();
      setPayments(response.items);
    } catch (error) {
      console.error('Ошибка загрузки платежей:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) return;
    
    const fetchPayments = async () => {
      try {
        await loadPayments();
        hasLoaded.current = true;
      } catch (error) {
        stableLogError('Ошибка загрузки платежей', error as Error, 'Load Payments');
      }
    };
    fetchPayments();
  }, []);

  const handleAddPayment = async () => {
    if (!newPayment.user_name || !newPayment.user_email || !newPayment.course_title || newPayment.amount <= 0) {
      logWarning('Попытка добавить платеж с неполными данными', 'Add Payment Validation');
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const payment: Payment = {
      id: `PAY-${Date.now()}`,
      user_name: newPayment.user_name,
      user_email: newPayment.user_email,
      course_title: newPayment.course_title,
      amount: newPayment.amount,
      status: 'completed',
      payment_method: newPayment.payment_method,
      created_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      receipt_url: newPayment.receipt_file ? URL.createObjectURL(newPayment.receipt_file) : undefined
    };

    // В реальном приложении здесь был бы API вызов
    setPayments((prev: Payment[]) => [payment, ...prev]);
    setShowAddModal(false);
    setNewPayment({
      user_name: '',
      user_email: '',
      course_title: '',
      amount: 0,
      payment_method: 'ЮKassa'
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPayment((prev: NewPayment) => ({ ...prev, receipt_file: file }));
    }
  };

  const downloadReceipt = (receiptUrl: string, paymentId: string) => {
    const link = document.createElement('a');
    link.href = receiptUrl;
    link.download = `receipt-${paymentId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#48bb78';
      case 'pending': return '#ed8936';
      case 'failed': return '#e53e3e';
      case 'refunded': return '#a0aec0';
      default: return '#a0aec0';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Оплачен';
      case 'pending': return 'Ожидает';
      case 'failed': return 'Ошибка';
      case 'refunded': return 'Возврат';
      default: return 'Неизвестно';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Фильтрация платежей
  const filteredPayments = payments.filter((payment: Payment) => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = 
      payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Расчет статистики
  const totalRevenue = payments
    .filter((p: Payment) => p.status === 'completed')
    .reduce((sum: number, p: Payment) => sum + p.amount, 0);

  const pendingPayments = payments.filter((p: Payment) => p.status === 'pending').length;
  const failedPayments = payments.filter((p: Payment) => p.status === 'failed').length;

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
          Управление платежами
        </h1>
        <p style={{ fontSize: '16px', color: '#718096', margin: 0 }}>
          Мониторинг финансовых операций
        </p>
      </div>

      {/* Статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              💰
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Общая выручка
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                {formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ⏳
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Ожидают оплаты
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                {pendingPayments}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ❌
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#718096', margin: '0 0 4px 0' }}>
                Ошибки оплаты
              </p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                {failedPayments}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center',
            flex: 1
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <input
                type="text"
                placeholder="Поиск по ID, имени, email или курсу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="all">Все статусы</option>
              <option value="completed">Оплаченные</option>
              <option value="pending">Ожидающие</option>
              <option value="failed">Ошибки</option>
              <option value="refunded">Возвраты</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ➕ Добавить платеж
          </button>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
            История платежей ({filteredPayments.length})
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  ID платежа
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Пользователь
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Курс
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Сумма
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Статус
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Способ оплаты
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Дата
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Чек
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748', fontWeight: 'bold' }}>
                    {payment.id}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{payment.user_name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#718096' }}>{payment.user_email}</p>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>
                    {payment.course_title}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748', fontWeight: 'bold' }}>
                    {formatCurrency(payment.amount)}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>
                    <span style={{
                      background: getStatusColor(payment.status),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>
                    {payment.payment_method}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0' }}>
                        {formatDate(payment.created_at)}
                      </p>
                      {payment.completed_at && (
                        <p style={{ margin: 0, fontSize: '12px', color: '#718096' }}>
                          Завершен: {formatDate(payment.completed_at)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>
                    {payment.receipt_url ? (
                      <button
                        onClick={() => downloadReceipt(payment.receipt_url!, payment.id)}
                        style={{
                          background: '#48bb78',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        📄 Скачать
                      </button>
                    ) : (
                      <span style={{ color: '#a0aec0', fontSize: '12px' }}>Нет чека</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#718096'
          }}>
            <p style={{ fontSize: '16px', margin: 0 }}>
              Платежи не найдены
            </p>
          </div>
        )}
      </div>

      {/* Модальное окно добавления платежа */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
                Добавить платеж
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#a0aec0'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Имя пользователя *
                </label>
                <input
                  type="text"
                  value={newPayment.user_name}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, user_name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Введите имя пользователя"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Email пользователя *
                </label>
                <input
                  type="email"
                  value={newPayment.user_email}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, user_email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Введите email пользователя"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Название курса *
                </label>
                <input
                  type="text"
                  value={newPayment.course_title}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, course_title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Введите название курса"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Сумма (₽) *
                </label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="Введите сумму"
                  min="0"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Способ оплаты
                </label>
                <select
                  value={newPayment.payment_method}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, payment_method: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white'
                  }}
                >
                  <option value="ЮKassa">ЮKassa</option>
                  <option value="Сбербанк">Сбербанк</option>
                  <option value="Тинькофф">Тинькофф</option>
                  <option value="Наличные">Наличные</option>
                  <option value="Банковский перевод">Банковский перевод</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>
                  Чек об оплате (опционально)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white'
                  }}
                />
                {newPayment.receipt_file && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#48bb78' }}>
                    Файл выбран: {newPayment.receipt_file.name}
                  </p>
                )}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: '24px'
            }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '12px 24px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white',
                  color: '#4a5568',
                  cursor: 'pointer'
                }}
              >
                Отмена
              </button>
              <button
                onClick={handleAddPayment}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Добавить платеж
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage; 