import React from 'react';
import CuratorSidebar from './CuratorSidebar';

interface CuratorLayoutProps {
  children: React.ReactNode;
}

const CuratorLayout: React.FC<CuratorLayoutProps> = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <CuratorSidebar />
      <main style={{
        flex: 1,
        marginLeft: '250px',
        padding: '20px',
        overflowY: 'auto'
      }}>
        {children}
      </main>
    </div>
  );
};

export default CuratorLayout; 