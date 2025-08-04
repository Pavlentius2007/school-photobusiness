import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveSuccess(false);
    
    try {
      await saveSettings();
      setSaveSuccess(true);
      
      // Скрываем уведомление через 3 секунды
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
          Настройки системы
        </h1>
        <p style={{ fontSize: '16px', color: '#718096', margin: 0 }}>
          Конфигурация платформы и системные параметры
        </p>
      </div>

      {/* Уведомление об успешном сохранении */}
      {saveSuccess && (
        <div style={{
          background: '#48bb78',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ✅ Настройки успешно сохранены
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Основные настройки */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            🏢 Основные настройки
          </h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Название сайта
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
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

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Описание сайта
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Контактный email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
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
        </div>

        {/* Настройки файлов */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            📁 Настройки файлов
          </h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>
              Максимальный размер файла (МБ)
            </label>
            <input
              type="number"
              value={settings.maxFileSize}
              onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
              min="1"
              max="100"
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
        </div>

        {/* Настройки безопасности */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            🔒 Безопасность
          </h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.enableRegistration}
                onChange={(e) => handleSettingChange('enableRegistration', e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '14px', color: '#4a5568' }}>
                Разрешить регистрацию новых пользователей
              </span>
            </label>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.enableEmailVerification}
                onChange={(e) => handleSettingChange('enableEmailVerification', e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '14px', color: '#4a5568' }}>
                Требовать подтверждение email
              </span>
            </label>
          </div>
        </div>

        {/* Системные настройки */}
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            ⚙️ Система
          </h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '14px', color: '#4a5568' }}>
                Режим обслуживания
              </span>
            </label>
            <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 30px' }}>
              Сайт будет недоступен для обычных пользователей
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.debugMode}
                onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '14px', color: '#4a5568' }}>
                Режим отладки
              </span>
            </label>
            <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 30px' }}>
              Показывать подробные ошибки (только для разработки)
            </p>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div style={{
        marginTop: '32px',
        padding: '24px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        gap: '16px',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={handleSave}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            background: isLoading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isLoading ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid transparent',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Сохранение...
            </>
          ) : (
            '💾 Сохранить настройки'
          )}
        </button>
      </div>

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
};

export default SettingsPage; 