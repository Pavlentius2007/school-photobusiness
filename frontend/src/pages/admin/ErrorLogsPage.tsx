import React, { useState } from 'react';
import { useError } from '../../contexts/ErrorContext';

const ErrorLogsPage: React.FC = () => {
  const { errors, resolveError, clearErrors, exportErrorLog, getErrorStats } = useError();
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'resolved' | 'unresolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = getErrorStats();

  const filteredErrors = errors.filter(error => {
    const matchesSeverity = filter === 'all' || error.severity === filter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'resolved' && error.resolved) ||
      (statusFilter === 'unresolved' && !error.resolved);
    const matchesSearch = error.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.component?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.userAction?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return '#e53e3e';
      case 'warning': return '#d69e2e';
      case 'info': return '#3182ce';
      default: return '#718096';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
          📊 Логи ошибок
        </h1>
        <p style={{ fontSize: '16px', color: '#718096', margin: 0 }}>
          Мониторинг и управление ошибками системы
        </p>
      </div>

      {/* Статистика */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>Всего ошибок</div>
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53e3e' }}>
            {stats.unresolved}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>Не решено</div>
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#38a169' }}>
            {stats.resolved}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>Решено</div>
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3182ce' }}>
            {stats.bySeverity.error || 0}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>Критические</div>
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Поиск
            </label>
            <input
              type="text"
              placeholder="Поиск по сообщению, компоненту..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Тип ошибки
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="all">Все типы</option>
              <option value="error">Ошибки</option>
              <option value="warning">Предупреждения</option>
              <option value="info">Информация</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Статус
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="all">Все статусы</option>
              <option value="unresolved">Не решено</option>
              <option value="resolved">Решено</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={exportErrorLog}
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📥 Экспорт
            </button>
            <button
              onClick={clearErrors}
              style={{
                padding: '12px 20px',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🗑️ Очистить
            </button>
          </div>
        </div>
      </div>

      {/* Список ошибок */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {filteredErrors.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#718096' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Ошибок не найдено
            </div>
            <div>Попробуйте изменить фильтры или поисковый запрос</div>
          </div>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredErrors.map((error) => (
              <div
                key={error.id}
                style={{
                  padding: '20px',
                  borderBottom: '1px solid #e2e8f0',
                  background: error.resolved ? '#f7fafc' : 'white',
                  opacity: error.resolved ? 0.7 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {getSeverityIcon(error.severity)}
                    </span>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: getSeverityColor(error.severity),
                        marginBottom: '4px'
                      }}>
                        {error.message}
                      </div>
                      <div style={{ fontSize: '12px', color: '#718096' }}>
                        {error.component && `Компонент: ${error.component}`}
                        {error.userAction && ` | Действие: ${error.userAction}`}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: error.resolved ? '#38a169' : '#e53e3e',
                      color: 'white'
                    }}>
                      {error.resolved ? 'Решено' : 'Не решено'}
                    </span>
                    {!error.resolved && (
                      <button
                        onClick={() => resolveError(error.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#38a169',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Решить
                      </button>
                    )}
                  </div>
                </div>
                
                <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px' }}>
                  <div>🕒 {formatDate(error.timestamp)}</div>
                  <div>🌐 {error.url}</div>
                  {error.userId && <div>👤 Пользователь: {error.userId}</div>}
                </div>

                {error.stack && (
                  <details style={{ marginTop: '12px' }}>
                    <summary style={{ cursor: 'pointer', fontSize: '14px', color: '#4a5568' }}>
                      📋 Показать стек ошибки
                    </summary>
                    <pre style={{
                      background: '#f7fafc',
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#2d3748',
                      overflow: 'auto',
                      marginTop: '8px'
                    }}>
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorLogsPage; 