import { useEffect } from 'react';
import { useError } from '../contexts/ErrorContext';
import { useAuth } from '../contexts/AuthContext';

export const useErrorBoundary = (componentName: string) => {
  const { addError } = useError();
  const { user } = useAuth();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      addError({
        message: event.message,
        stack: event.error?.stack,
        component: componentName,
        severity: 'error',
        userId: user?.id?.toString(),
        userAction: 'JavaScript Error'
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      addError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        component: componentName,
        severity: 'error',
        userId: user?.id?.toString(),
        userAction: 'Promise Rejection'
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [addError, componentName, user?.id]);

  const logError = (message: string, error?: Error, userAction?: string) => {
    addError({
      message,
      stack: error?.stack,
      component: componentName,
      severity: 'error',
      userId: user?.id?.toString(),
      userAction: userAction || 'Manual Error Log'
    });
  };

  const logWarning = (message: string, userAction?: string) => {
    addError({
      message,
      component: componentName,
      severity: 'warning',
      userId: user?.id?.toString(),
      userAction: userAction || 'Manual Warning Log'
    });
  };

  const logInfo = (message: string, userAction?: string) => {
    addError({
      message,
      component: componentName,
      severity: 'info',
      userId: user?.id?.toString(),
      userAction: userAction || 'Manual Info Log'
    });
  };

  return { logError, logWarning, logInfo };
}; 