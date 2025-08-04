import React from 'react';
import StudentSidebar from './StudentSidebar';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <StudentSidebar />
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

export default StudentLayout; 