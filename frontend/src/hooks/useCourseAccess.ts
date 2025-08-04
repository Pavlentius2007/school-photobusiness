import { useAuth } from '../contexts/AuthContext';

export const useCourseAccess = () => {
  const { user } = useAuth();

  const hasAccessToCourseMaterials = (courseId: number): boolean => {
    if (!user) return false;
    
    // Администраторы и кураторы имеют доступ ко всем материалам
    if (user.role === 'admin' || user.role === 'curator') {
      return true;
    }

    // Для студентов проверяем доступ к конкретному курсу
    if (user.role === 'student') {
      const courseKey = `course${courseId}` as 'course1' | 'course2' | 'course3';
      return user.courseMaterialsAccess?.[courseKey] || false;
    }

    return false;
  };

  const getAccessibleCourses = (): number[] => {
    if (!user) return [];
    
    if (user.role === 'admin' || user.role === 'curator') {
      return [1, 2, 3]; // Все курсы
    }

    if (user.role === 'student') {
      const accessibleCourses: number[] = [];
      if (user.courseMaterialsAccess?.course1) accessibleCourses.push(1);
      if (user.courseMaterialsAccess?.course2) accessibleCourses.push(2);
      if (user.courseMaterialsAccess?.course3) accessibleCourses.push(3);
      return accessibleCourses;
    }

    return [];
  };

  return {
    hasAccessToCourseMaterials,
    getAccessibleCourses,
    user
  };
}; 