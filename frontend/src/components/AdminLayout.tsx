import React from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Боковая панель */}
      <AdminSidebar />
      
      {/* Основной контент */}
      <div style={{
        flex: 1,
        marginLeft: '280px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 