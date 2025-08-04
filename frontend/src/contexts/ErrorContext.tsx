import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ErrorLog {
  id: string;
  timestamp: Date;
  message: string;
  stack?: string;
  component?: string;
  userAction?: string;
  severity: 'error' | 'warning' | 'info';
  userId?: string;
  userAgent: string;
  url: string;
  resolved: boolean;
}

interface ErrorContextType {
  errors: ErrorLog[];
  addError: (error: Omit<ErrorLog, 'id' | 'timestamp' | 'userAgent' | 'url' | 'resolved'>) => void;
  resolveError: (errorId: string) => void;
  clearErrors: () => void;
  exportErrorLog: () => void;
  getErrorStats: () => {
    total: number;
    resolved: number;
    unresolved: number;
    bySeverity: Record<string, number>;
  };
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorLog[]>([]);

  const addError = useCallback((errorData: Omit<ErrorLog, 'id' | 'timestamp' | 'userAgent' | 'url' | 'resolved'>) => {
    const newError: ErrorLog = {
      ...errorData,
      id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      resolved: false
    };

    setErrors(prev => [newError, ...prev]);

    // Логируем в консоль для разработки
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', newError);
    }

    // В продакшене можно отправлять на сервер
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToServer(newError);
    }

    // Сохраняем в localStorage для персистентности
    const savedErrors = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    savedErrors.unshift(newError);
    localStorage.setItem('errorLogs', JSON.stringify(savedErrors.slice(0, 100))); // Храним только последние 100 ошибок
  }, []);

  const resolveError = useCallback((errorId: string) => {
    setErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, resolved: true } : error
    ));

    // Обновляем localStorage
    const savedErrors = JSON.parse(localStorage.getItem('errorLogs') || '[]');
    const updatedErrors = savedErrors.map((error: ErrorLog) => 
      error.id === errorId ? { ...error, resolved: true } : error
    );
    localStorage.setItem('errorLogs', JSON.stringify(updatedErrors));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
    localStorage.removeItem('errorLogs');
  }, []);

  const exportErrorLog = useCallback(() => {
    const dataStr = JSON.stringify(errors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `error-log-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [errors]);

  const getErrorStats = useCallback(() => {
    const stats = {
      total: errors.length,
      resolved: errors.filter(e => e.resolved).length,
      unresolved: errors.filter(e => !e.resolved).length,
      bySeverity: {} as Record<string, number>
    };

    errors.forEach(error => {
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }, [errors]);

  return (
    <ErrorContext.Provider value={{
      errors,
      addError,
      resolveError,
      clearErrors,
      exportErrorLog,
      getErrorStats
    }}>
      {children}
    </ErrorContext.Provider>
  );
}; 