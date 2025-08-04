import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maxFileSize: number;
  enableRegistration: boolean;
  enableEmailVerification: boolean;
  maintenanceMode: boolean;
  debugMode: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  saveSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  siteName: 'SIANORO',
  siteDescription: 'Школьный фотобизнес',
  contactEmail: 'admin@sianoro.ru',
  maxFileSize: 10,
  enableRegistration: true,
  enableEmailVerification: true,
  maintenanceMode: false,
  debugMode: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    // Загружаем настройки из localStorage при инициализации
    const savedSettings = localStorage.getItem('siteSettings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const saveSettings = async (): Promise<void> => {
    // Сохраняем в localStorage
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    
    // В реальном приложении здесь был бы API вызов
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Сохраняем настройки в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}; 