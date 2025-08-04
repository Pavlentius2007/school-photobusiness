import { useState, useCallback } from 'react';
import apiService, { 
  Course, 
  Module, 
  Lesson, 
  Test, 
  Question, 
  Assignment, 
  AssignmentSubmission,
  TestAttempt,
  CourseProgress,
  LessonProgress,
  User
} from '../services/api';

// Типы для состояний API
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// Хук для работы с API
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  initialData: T | null = null
): ApiResponse<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
      } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.message || 'Произошла ошибка';
        setState({ data: null, loading: false, error: errorMessage });
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null });
  }, [initialData]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
}

// Специализированные хуки для разных типов данных

// Курсы
export function useCourses() {
  return useApi(apiService.getCourses.bind(apiService));
}

export function useFeaturedCourses() {
  return useApi(apiService.getFeaturedCourses.bind(apiService));
}

export function useCourse(courseId: number) {
  return useApi(apiService.getCourse.bind(apiService, courseId));
}

export function useMyCourses() {
  return useApi(apiService.getMyCourses.bind(apiService));
}

export function useSearchCourses() {
  return useApi(apiService.searchCourses.bind(apiService));
}

// Модули
export function useCourseModules(courseId: number) {
  return useApi(apiService.getCourseModules.bind(apiService, courseId));
}

export function useModule(moduleId: number) {
  return useApi(apiService.getModule.bind(apiService, moduleId));
}

// Уроки
export function useModuleLessons(moduleId: number) {
  return useApi(apiService.getModuleLessons.bind(apiService, moduleId));
}

export function useLesson(lessonId: number) {
  return useApi(apiService.getLesson.bind(apiService, lessonId));
}

// Тесты
export function useLessonTests(lessonId: number) {
  return useApi(apiService.getLessonTests.bind(apiService, lessonId));
}

export function useTest(testId: number) {
  return useApi(apiService.getTest.bind(apiService, testId));
}

export function useTestQuestions(testId: number) {
  return useApi(apiService.getTestQuestions.bind(apiService, testId));
}

// Задания
export function useLessonAssignments(lessonId: number) {
  return useApi(apiService.getLessonAssignments.bind(apiService, lessonId));
}

export function useAssignment(assignmentId: number) {
  return useApi(apiService.getAssignment.bind(apiService, assignmentId));
}

export function useMySubmissions() {
  return useApi(apiService.getMySubmissions.bind(apiService));
}

export function useSubmission(submissionId: number) {
  return useApi(apiService.getSubmission.bind(apiService, submissionId));
}

// Попытки тестов
export function useMyTestAttempts() {
  return useApi(apiService.getMyTestAttempts.bind(apiService));
}

export function useTestAttempt(attemptId: number) {
  return useApi(apiService.getTestAttempt.bind(apiService, attemptId));
}

// Прогресс
export function useCourseProgress(courseId: number) {
  return useApi(apiService.getCourseProgress.bind(apiService, courseId));
}

export function useLessonProgress(lessonId: number) {
  return useApi(apiService.getLessonProgress.bind(apiService, lessonId));
}

// Авторизация
export function useCurrentUser() {
  return useApi(apiService.getCurrentUser.bind(apiService));
}

// Хуки для мутаций (создание, обновление, удаление)

export function useCreateCourse() {
  return useApi(apiService.createCourse.bind(apiService));
}

export function useUpdateCourse() {
  return useApi(apiService.updateCourse.bind(apiService));
}

export function useDeleteCourse() {
  return useApi(apiService.deleteCourse.bind(apiService));
}

export function useCreateModule() {
  return useApi(apiService.createModule.bind(apiService));
}

export function useUpdateModule() {
  return useApi(apiService.updateModule.bind(apiService));
}

export function useDeleteModule() {
  return useApi(apiService.deleteModule.bind(apiService));
}

export function useCreateLesson() {
  return useApi(apiService.createLesson.bind(apiService));
}

export function useUpdateLesson() {
  return useApi(apiService.updateLesson.bind(apiService));
}

export function useDeleteLesson() {
  return useApi(apiService.deleteLesson.bind(apiService));
}

export function useCompleteLesson() {
  return useApi(apiService.completeLesson.bind(apiService));
}

export function useCreateTest() {
  return useApi(apiService.createTest.bind(apiService));
}

export function useUpdateTest() {
  return useApi(apiService.updateTest.bind(apiService));
}

export function useDeleteTest() {
  return useApi(apiService.deleteTest.bind(apiService));
}

export function useCreateQuestion() {
  return useApi(apiService.createQuestion.bind(apiService));
}

export function useUpdateQuestion() {
  return useApi(apiService.updateQuestion.bind(apiService));
}

export function useDeleteQuestion() {
  return useApi(apiService.deleteQuestion.bind(apiService));
}

export function useCreateAnswer() {
  return useApi(apiService.createAnswer.bind(apiService));
}

export function useUpdateAnswer() {
  return useApi(apiService.updateAnswer.bind(apiService));
}

export function useDeleteAnswer() {
  return useApi(apiService.deleteAnswer.bind(apiService));
}

export function useStartTestAttempt() {
  return useApi(apiService.startTestAttempt.bind(apiService));
}

export function useCompleteTestAttempt() {
  return useApi(apiService.completeTestAttempt.bind(apiService));
}

export function useCreateAssignment() {
  return useApi(apiService.createAssignment.bind(apiService));
}

export function useUpdateAssignment() {
  return useApi(apiService.updateAssignment.bind(apiService));
}

export function useDeleteAssignment() {
  return useApi(apiService.deleteAssignment.bind(apiService));
}

export function useSubmitAssignment() {
  return useApi(apiService.submitAssignment.bind(apiService));
}

export function useUpdateSubmission() {
  return useApi(apiService.updateSubmission.bind(apiService));
}

export function useGradeSubmission() {
  return useApi(apiService.gradeSubmission.bind(apiService));
}

export function useUpdateLessonProgress() {
  return useApi(apiService.updateLessonProgress.bind(apiService));
}

// Хуки для авторизации
export function useLogin() {
  return useApi(apiService.login.bind(apiService));
}

export function useRegister() {
  return useApi(apiService.register.bind(apiService));
}

export function useLogout() {
  return useApi(apiService.logout.bind(apiService));
}

// Утилитарные функции
export const apiUtils = {
  // Проверка авторизации
  isAuthenticated: () => apiService.isAuthenticated(),
  
  // Установка токена
  setAuthToken: (token: string) => apiService.setAuthToken(token),
  
  // Удаление токена
  removeAuthToken: () => apiService.removeAuthToken(),
  
  // Обработка ошибок API
  handleApiError: (error: any): string => {
    if (error.response?.data?.detail) {
      return error.response.data.detail;
    }
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'Произошла неизвестная ошибка';
  },
  
  // Форматирование даты
  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  
  // Форматирование времени
  formatTime: (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },
  
  // Форматирование длительности
  formatDuration: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}ч ${mins}мин`;
    }
    return `${mins}мин`;
  },
  
  // Форматирование размера файла
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Б';
    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // Валидация email
  validateEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // Валидация пароля
  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Пароль должен содержать минимум 8 символов');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну заглавную букву');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну строчную букву');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну цифру');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },
}; 