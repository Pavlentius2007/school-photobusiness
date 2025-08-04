import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ErrorProvider } from './contexts/ErrorContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PaymentPage from './pages/PaymentPage';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import CoursesManagementPage from './pages/admin/CoursesManagementPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import PaymentsPage from './pages/admin/PaymentsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import ErrorLogsPage from './pages/admin/ErrorLogsPage';
import CourseContentManagementPage from './pages/admin/CourseContentManagementPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CuratorLayout from './components/CuratorLayout';
import CuratorDashboardPage from './pages/curator/DashboardPage';
import CuratorCoursesManagementPage from './pages/curator/CoursesManagementPage';
import CuratorStudentsManagementPage from './pages/curator/StudentsManagementPage';
import CuratorAssignmentsManagementPage from './pages/curator/AssignmentsManagementPage';
import StudentLayout from './components/StudentLayout';
import StudentDashboardPage from './pages/student/DashboardPage';
import StudentCoursesPage from './pages/student/CoursesPage';
import StudentCatalogPage from './pages/student/CatalogPage';
import StudentAssignmentsPage from './pages/student/AssignmentsPage';
import StudentTestsPage from './pages/student/TestsPage';
import StudentMessagesPage from './pages/student/MessagesPage';
import StudentCertificatesPage from './pages/student/CertificatesPage';
import LessonViewer from './pages/LessonViewer';
import CourseViewPage from './pages/student/CourseViewPage';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ErrorProvider>
          <Router>
            <div style={{ 
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
              lineHeight: 1.6,
              color: '#1a1a1a',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Header />
              <ErrorNotification />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Публичные маршруты */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/course/:courseId" element={<CourseDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  
                  <Route path="/about" element={
                    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>О нас</h1>
                      <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
                        Страница "О нас" находится в разработке...
                      </p>
                    </div>
                  } />
                  <Route path="/payment" element={<PaymentPage />} />
                  
                  {/* Защищенные маршруты - Админ-панель */}
                  <Route path="/admin" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <DashboardPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/courses" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <CoursesManagementPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <UsersManagementPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/payments" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <PaymentsPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/analytics" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <AnalyticsPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/settings" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <SettingsPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/errors" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <ErrorLogsPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/course-content" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <CourseContentManagementPage />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
              
                  {/* Защищенные маршруты - Панель куратора */}
                  <Route path="/curator" element={
                    <ProtectedRoute requiredRole="curator">
                      <CuratorLayout>
                        <CuratorDashboardPage />
                      </CuratorLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/curator/courses" element={
                    <ProtectedRoute requiredRole="curator">
                      <CuratorLayout>
                        <CuratorCoursesManagementPage />
                      </CuratorLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/curator/students" element={
                    <ProtectedRoute requiredRole="curator">
                      <CuratorLayout>
                        <CuratorStudentsManagementPage />
                      </CuratorLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/curator/assignments" element={
                    <ProtectedRoute requiredRole="curator">
                      <CuratorLayout>
                        <CuratorAssignmentsManagementPage />
                      </CuratorLayout>
                    </ProtectedRoute>
                  } />
              
                  {/* Защищенные маршруты - Панель студента */}
                  <Route path="/student" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentDashboardPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/student/courses" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentCoursesPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/student/catalog" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentCatalogPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  {/* Маршрут для просмотра курса студентом */}
                  <Route path="/student/course/:courseId" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <CourseViewPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/student/assignments" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentAssignmentsPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/student/tests" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentTestsPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/student/messages" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentMessagesPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/student/certificates" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <StudentCertificatesPage />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />
                  {/* Новый маршрут для просмотра уроков */}
                  <Route path="/student/course/:courseId/lesson/:lessonId" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentLayout>
                        <LessonViewer />
                      </StudentLayout>
                    </ProtectedRoute>
                  } />

                             {/* Защищенные маршруты - Профиль пользователя */}
               <Route path="/profile" element={
                 <ProtectedRoute>
                   <ProfilePage />
                 </ProtectedRoute>
               } />

               {/* Универсальный маршрут для аутентифицированных пользователей */}
               <Route path="/dashboard" element={
                 <ProtectedRoute>
                   <Navigate to="/" replace />
                 </ProtectedRoute>
               } />

              {/* Обработка 404 */}
              <Route path="*" element={
                <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>404</h1>
                  <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
                    Страница не найдена
                  </p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </ErrorProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
