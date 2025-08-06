import React from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Боковая панель */}
      <AdminSidebar />
      
      {/* Основной контент */}
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 