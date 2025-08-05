import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../services/api';
import { mockApiClient } from '../services/mockApi';

// Используем мок-API для разработки
const apiClient = mockApiClient;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; full_name: string; role: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  isEmailVerified: boolean;
  lastActivity: Date | null;
  sessionTimeout: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [sessionTimeout, setSessionTimeout] = useState<number | null>(null);

  // Проверка токена на валидность
  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  };

  // Получение времени истечения токена
  const getTokenExpiration = (token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Конвертируем в миллисекунды
    } catch {
      return null;
    }
  };

  // Обновление активности пользователя
  const updateActivity = () => {
    setLastActivity(new Date());
    localStorage.setItem('last_activity', new Date().toISOString());
  };

  // Проверка истечения сессии
  const checkSessionTimeout = () => {
    const lastActivityStr = localStorage.getItem('last_activity');
    if (lastActivityStr && sessionTimeout) {
      const lastActivityTime = new Date(lastActivityStr).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastActivityTime;
      
      if (timeDiff > sessionTimeout) {
        logout();
        return;
      }
    }
  };

  // Автоматическое обновление токена
  const autoRefreshToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!accessToken || !refreshToken) return;

    const expiration = getTokenExpiration(accessToken);
    if (!expiration) return;

    const currentTime = Date.now();
    const timeUntilExpiry = expiration - currentTime;
    
    // Обновляем токен за 5 минут до истечения
    if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
      try {
        const result = await apiClient.refreshToken();
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
        
        // Устанавливаем новый таймер
        const newExpiration = getTokenExpiration(result.access_token);
        if (newExpiration) {
          const newTimeUntilExpiry = newExpiration - Date.now();
          setTimeout(autoRefreshToken, newTimeUntilExpiry - 5 * 60 * 1000);
        }
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        logout();
      }
    } else if (timeUntilExpiry > 0) {
      // Устанавливаем таймер для следующей проверки
      setTimeout(autoRefreshToken, timeUntilExpiry - 5 * 60 * 1000);
    }
  };

  // Инициализация аутентификации
  const initializeAuth = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!accessToken || !refreshToken) {
        setIsLoading(false);
        return;
      }

      // Проверяем валидность токена
      if (!isTokenValid(accessToken)) {
        // Пытаемся обновить токен
        try {
          const result = await apiClient.refreshToken();
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('refresh_token', result.refresh_token);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsLoading(false);
          return;
        }
      }

      // Получаем данные пользователя
      const userData = await apiClient.getCurrentUser();
      setUser(userData);
      setIsEmailVerified(userData.is_active || false);
      
      // Устанавливаем время последней активности
      const lastActivityStr = localStorage.getItem('last_activity');
      if (lastActivityStr) {
        setLastActivity(new Date(lastActivityStr));
      } else {
        updateActivity();
      }

      // Устанавливаем таймаут сессии (30 минут)
      setSessionTimeout(30 * 60 * 1000);

      // Запускаем автоматическое обновление токена
      autoRefreshToken();

      // Устанавливаем интервал проверки сессии
      const sessionCheckInterval = setInterval(checkSessionTimeout, 60000); // Проверяем каждую минуту

      // Очистка интервала при размонтировании
      return () => clearInterval(sessionCheckInterval);

    } catch (error) {
      console.error('Ошибка инициализации аутентификации:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Обработчики событий для отслеживания активности
  useEffect(() => {
    const handleUserActivity = () => {
      updateActivity();
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await apiClient.login(email, password);
      
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
      
      setUser(result.user);
      setIsEmailVerified(result.user.is_active || false);
      updateActivity();
      
      // Запускаем автоматическое обновление токена
      autoRefreshToken();
      
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; full_name: string; role: string }) => {
    try {
      setIsLoading(true);
      const result = await apiClient.register(userData);
      
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
      
      setUser(result.user);
      setIsEmailVerified(result.user.is_active || false);
      updateActivity();
      
      // Запускаем автоматическое обновление токена
      autoRefreshToken();
      
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('last_activity');
      setUser(null);
      setIsEmailVerified(false);
      setLastActivity(null);
      setSessionTimeout(null);
    }
  };

  const refreshAuth = async () => {
    try {
      const result = await apiClient.refreshToken();
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
      
      const userData = await apiClient.getCurrentUser();
      setUser(userData);
      setIsEmailVerified(userData.is_active || false);
      updateActivity();
      
    } catch (error) {
      console.error('Ошибка обновления аутентификации:', error);
      logout();
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    if (!user) throw new Error('Пользователь не авторизован');
    
    try {
      const updatedUser = await apiClient.updateUser(user.id, userData);
      setUser(updatedUser);
      setIsEmailVerified(updatedUser.is_active || false);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await apiClient.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.error('Ошибка смены пароля:', error);
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await apiClient.requestPasswordReset(email);
    } catch (error) {
      console.error('Ошибка запроса сброса пароля:', error);
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await apiClient.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Ошибка сброса пароля:', error);
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      await apiClient.verifyEmail(token);
      if (user) {
        setUser({ ...user, is_active: true });
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.error('Ошибка верификации email:', error);
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      await apiClient.resendVerificationEmail();
    } catch (error) {
      console.error('Ошибка повторной отправки email:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshAuth,
    updateUserProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    isEmailVerified,
    lastActivity,
    sessionTimeout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}; 