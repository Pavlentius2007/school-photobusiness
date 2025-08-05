import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-gray-800 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* О нас */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">
              📸 {settings.siteName}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {settings.siteDescription}
            </p>
          </div>

          {/* Контакты */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">
              Контакты
            </h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span>📱</span>
                <a 
                  href="tel:+79538628581" 
                  className="hover:text-white transition-colors duration-300"
                >
                  +7 953 862-85-81
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span>📧</span>
                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span>📍</span>
                <span>Москва, ул. Примерная, 123</span>
              </div>
            </div>
          </div>

          {/* Социальные сети */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">
              Социальные сети
            </h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                { icon: '📘', label: 'Facebook', url: '#' },
                { icon: '📸', label: 'Instagram', url: '#' },
                { icon: '💼', label: 'LinkedIn', url: '#' },
                { icon: '📺', label: 'YouTube', url: '#' }
              ].map((social, index) => (
                <button 
                  key={index}
                  onClick={() => window.open(social.url, '_blank')}
                  className="text-2xl hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-700"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <div className="text-gray-300">
            <p className="mb-2">
              © 2024 {settings.siteName}. Все права защищены.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="hover:text-white transition-colors duration-300">
                Условия использования
              </a>
              <a href="/support" className="hover:text-white transition-colors duration-300">
                Поддержка
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 