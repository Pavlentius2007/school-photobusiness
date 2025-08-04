import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer style={{
      background: '#2d3748',
      color: 'white',
      padding: '3rem 2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              📸 {settings.siteName}
            </h3>
            <p style={{ opacity: 0.8 }}>
              {settings.siteDescription}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Контакты
            </h4>
            <div style={{ opacity: 0.8 }}>
              <div>📱 +7 953 862-85-81</div>
              <div>📧 {settings.contactEmail}</div>
              <div>📍 Москва, ул. Примерная, 123</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Социальные сети
            </h4>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {['📘', '📸', '💼', '📺'].map((icon, index) => (
                <a key={index} href="javascript:void(0)" style={{
                  display: 'inline-block',
                  fontSize: '1.5rem',
                  opacity: 0.8,
                  transition: 'opacity 0.3s'
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid #4a5568',
          paddingTop: '2rem',
          opacity: 0.8
        }}>
          © 2024 {settings.siteName}. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 