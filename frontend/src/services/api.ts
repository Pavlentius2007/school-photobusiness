import axios, { AxiosInstance } from 'axios';

// Типы для API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Базовые типы
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'student' | 'curator' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  courseMaterialsAccess?: {
    course1: boolean;
    course2: boolean;
    course3: boolean;
  };
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  status: 'draft' | 'published' | 'archived';
  price: number;
  instructor_id: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  course_id: number;
  order_index: number;
  lessons?: Lesson[];
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  video_url?: string;
  file_url?: string;
  module_id: number;
  lesson_type: 'video' | 'text' | 'file' | 'test';
  order_index: number;
  duration_minutes: number;
  is_completed?: boolean;
  is_started?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: number;
  title: string;
  description: string;
  lesson_id: number;
  time_limit_minutes?: number;
  passing_score: number;
  max_score: number;
  status: 'draft' | 'published' | 'archived';
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'open' | 'single_choice' | 'multiple_choice';
  test_id: number;
  points: number;
  order_index: number;
  required: boolean;
  options?: string[];
  created_at: string;
  updated_at: string;
}

export interface Answer {
  id: number;
  text: string;
  question_id: number;
  is_correct: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface TestAttempt {
  id: number;
  test_id: number;
  user_id: number;
  started_at: string;
  completed_at?: string;
  score?: number;
  is_passed?: boolean;
  answers: TestAttemptAnswer[];
  created_at: string;
  updated_at: string;
}

export interface TestAttemptAnswer {
  id: number;
  attempt_id: number;
  question_id: number;
  answer_text?: string;
  selected_answers?: number[];
  is_correct?: boolean;
  points_earned?: number;
  created_at: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  lesson_id: number;
  max_score: number;
  due_date?: string;
  status: 'draft' | 'published' | 'archived';
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface AssignmentSubmission {
  id: number;
  assignment_id: number;
  user_id: number;
  content: string;
  attached_files?: string[];
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
  submitted_at: string;
  graded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseProgress {
  id: number;
  course_id: number;
  user_id: number;
  progress_percentage: number;
  completed_lessons: number;
  total_lessons: number;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: number;
  lesson_id: number;
  user_id: number;
  is_completed: boolean;
  time_spent_minutes: number;
  last_position: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  from_user_id: number;
  from_user_name: string;
  subject: string;
  content: string;
  course_id?: number;
  course_title?: string;
  message_type: 'feedback' | 'system' | 'instructor' | 'reminder' | 'certificate' | 'materials';
  priority: 'low' | 'normal' | 'high';
  is_read: boolean;
  created_at: string;
}

export interface Certificate {
  id: number;
  course_id: number;
  course_title: string;
  instructor_name: string;
  issued_date: string;
  score: number;
  max_score: number;
  certificate_number: string;
  status: 'issued' | 'in_progress' | 'not_started';
  download_url?: string;
}

// Конфигурация API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Интерцептор для добавления токена авторизации
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Интерцептор для обработки ошибок
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Токен истек, перенаправляем на логин
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== КУРСЫ ====================

  async getCourses(params?: { skip?: number; limit?: number }): Promise<Course[]> {
    const response = await this.api.get('/courses/', { params });
    return response.data;
  }

  async getFeaturedCourses(params?: { skip?: number; limit?: number }): Promise<Course[]> {
    const response = await this.api.get('/courses/featured', { params });
    return response.data;
  }

  async searchCourses(query: string, params?: { skip?: number; limit?: number }): Promise<Course[]> {
    const response = await this.api.get('/courses/search', { 
      params: { q: query, ...params } 
    });
    return response.data;
  }

  async getCourse(courseId: number): Promise<Course> {
    const response = await this.api.get(`/courses/${courseId}`);
    return response.data;
  }

  async getMyCourses(params?: { skip?: number; limit?: number }): Promise<Course[]> {
    const response = await this.api.get('/courses/my/', { params });
    return response.data;
  }

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const response = await this.api.post('/courses/', courseData);
    return response.data;
  }

  async updateCourse(courseId: number, courseData: Partial<Course>): Promise<Course> {
    const response = await this.api.put(`/courses/${courseId}`, courseData);
    return response.data;
  }

  async deleteCourse(courseId: number): Promise<void> {
    await this.api.delete(`/courses/${courseId}`);
  }

  // ==================== МОДУЛИ ====================

  async getCourseModules(courseId: number, params?: { skip?: number; limit?: number }): Promise<Module[]> {
    const response = await this.api.get(`/courses/${courseId}/modules`, { params });
    return response.data;
  }

  async getModule(moduleId: number): Promise<Module> {
    const response = await this.api.get(`/courses/modules/${moduleId}`);
    return response.data;
  }

  async createModule(courseId: number, moduleData: Partial<Module>): Promise<Module> {
    const response = await this.api.post(`/courses/${courseId}/modules`, moduleData);
    return response.data;
  }

  async updateModule(moduleId: number, moduleData: Partial<Module>): Promise<Module> {
    const response = await this.api.put(`/courses/modules/${moduleId}`, moduleData);
    return response.data;
  }

  async deleteModule(moduleId: number): Promise<void> {
    await this.api.delete(`/courses/modules/${moduleId}`);
  }

  // ==================== УРОКИ ====================

  async getModuleLessons(moduleId: number, params?: { skip?: number; limit?: number }): Promise<Lesson[]> {
    const response = await this.api.get(`/courses/modules/${moduleId}/lessons`, { params });
    return response.data;
  }

  async getLesson(lessonId: number): Promise<Lesson> {
    const response = await this.api.get(`/courses/lessons/${lessonId}`);
    return response.data;
  }

  async createLesson(moduleId: number, lessonData: Partial<Lesson>): Promise<Lesson> {
    const response = await this.api.post(`/courses/modules/${moduleId}/lessons`, lessonData);
    return response.data;
  }

  async updateLesson(lessonId: number, lessonData: Partial<Lesson>): Promise<Lesson> {
    const response = await this.api.put(`/courses/lessons/${lessonId}`, lessonData);
    return response.data;
  }

  async deleteLesson(lessonId: number): Promise<void> {
    await this.api.delete(`/courses/lessons/${lessonId}`);
  }

  async completeLesson(lessonId: number): Promise<{ message: string }> {
    const response = await this.api.post(`/courses/lessons/${lessonId}/complete`);
    return response.data;
  }

  // ==================== ТЕСТЫ ====================

  async getLessonTests(lessonId: number, params?: { skip?: number; limit?: number }): Promise<Test[]> {
    const response = await this.api.get(`/tests/lesson/${lessonId}`, { params });
    return response.data;
  }

  async getTest(testId: number): Promise<Test> {
    const response = await this.api.get(`/tests/${testId}`);
    return response.data;
  }

  async createTest(testData: Partial<Test>): Promise<Test> {
    const response = await this.api.post('/tests/', testData);
    return response.data;
  }

  async updateTest(testId: number, testData: Partial<Test>): Promise<Test> {
    const response = await this.api.put(`/tests/${testId}`, testData);
    return response.data;
  }

  async deleteTest(testId: number): Promise<void> {
    await this.api.delete(`/tests/${testId}`);
  }

  async getTestQuestions(testId: number, params?: { skip?: number; limit?: number }): Promise<Question[]> {
    const response = await this.api.get(`/tests/${testId}/questions`, { params });
    return response.data;
  }

  async createQuestion(testId: number, questionData: Partial<Question>): Promise<Question> {
    const response = await this.api.post(`/tests/${testId}/questions`, questionData);
    return response.data;
  }

  async updateQuestion(questionId: number, questionData: Partial<Question>): Promise<Question> {
    const response = await this.api.put(`/tests/questions/${questionId}`, questionData);
    return response.data;
  }

  async deleteQuestion(questionId: number): Promise<void> {
    await this.api.delete(`/tests/questions/${questionId}`);
  }

  async getQuestionAnswers(questionId: number, params?: { skip?: number; limit?: number }): Promise<Answer[]> {
    const response = await this.api.get(`/tests/questions/${questionId}/answers`, { params });
    return response.data;
  }

  async createAnswer(questionId: number, answerData: Partial<Answer>): Promise<Answer> {
    const response = await this.api.post(`/tests/questions/${questionId}/answers`, answerData);
    return response.data;
  }

  async updateAnswer(answerId: number, answerData: Partial<Answer>): Promise<Answer> {
    const response = await this.api.put(`/tests/answers/${answerId}`, answerData);
    return response.data;
  }

  async deleteAnswer(answerId: number): Promise<void> {
    await this.api.delete(`/tests/answers/${answerId}`);
  }

  // ==================== ПОПЫТКИ ТЕСТОВ ====================

  async startTestAttempt(testId: number): Promise<TestAttempt> {
    const response = await this.api.post(`/tests/${testId}/start`);
    return response.data;
  }

  async completeTestAttempt(attemptId: number, score: number, isPassed: boolean): Promise<TestAttempt> {
    const response = await this.api.put(`/tests/attempts/${attemptId}/complete`, {
      score,
      is_passed: isPassed
    });
    return response.data;
  }

  async getMyTestAttempts(params?: { skip?: number; limit?: number }): Promise<TestAttempt[]> {
    const response = await this.api.get('/tests/attempts/my', { params });
    return response.data;
  }

  async getTestAttempt(attemptId: number): Promise<TestAttempt> {
    const response = await this.api.get(`/tests/attempts/${attemptId}`);
    return response.data;
  }

  // ==================== ЗАДАНИЯ ====================

  async getLessonAssignments(lessonId: number, params?: { skip?: number; limit?: number }): Promise<Assignment[]> {
    const response = await this.api.get(`/assignments/lesson/${lessonId}`, { params });
    return response.data;
  }

  async getAssignment(assignmentId: number): Promise<Assignment> {
    const response = await this.api.get(`/assignments/${assignmentId}`);
    return response.data;
  }

  async createAssignment(assignmentData: Partial<Assignment>): Promise<Assignment> {
    const response = await this.api.post('/assignments/', assignmentData);
    return response.data;
  }

  async updateAssignment(assignmentId: number, assignmentData: Partial<Assignment>): Promise<Assignment> {
    const response = await this.api.put(`/assignments/${assignmentId}`, assignmentData);
    return response.data;
  }

  async deleteAssignment(assignmentId: number): Promise<void> {
    await this.api.delete(`/assignments/${assignmentId}`);
  }

  // ==================== ОТПРАВКИ ЗАДАНИЙ ====================

  async submitAssignment(assignmentId: number, submissionData: Partial<AssignmentSubmission>): Promise<AssignmentSubmission> {
    const response = await this.api.post(`/assignments/${assignmentId}/submit`, submissionData);
    return response.data;
  }

  async getMySubmissions(params?: { skip?: number; limit?: number }): Promise<AssignmentSubmission[]> {
    const response = await this.api.get('/assignments/submissions/my', { params });
    return response.data;
  }

  async getSubmission(submissionId: number): Promise<AssignmentSubmission> {
    const response = await this.api.get(`/assignments/submissions/${submissionId}`);
    return response.data;
  }

  async updateSubmission(submissionId: number, submissionData: Partial<AssignmentSubmission>): Promise<AssignmentSubmission> {
    const response = await this.api.put(`/assignments/submissions/${submissionId}`, submissionData);
    return response.data;
  }

  async gradeSubmission(submissionId: number, score: number, feedback: string): Promise<AssignmentSubmission> {
    const response = await this.api.put(`/assignments/submissions/${submissionId}/grade`, {
      score,
      feedback
    });
    return response.data;
  }

  // ==================== ПРОГРЕСС ====================

  async getCourseProgress(courseId: number): Promise<CourseProgress> {
    const response = await this.api.get(`/progress/courses/${courseId}`);
    return response.data;
  }

  async getLessonProgress(lessonId: number): Promise<LessonProgress> {
    const response = await this.api.get(`/progress/lessons/${lessonId}`);
    return response.data;
  }

  async updateLessonProgress(lessonId: number, progressData: Partial<LessonProgress>): Promise<LessonProgress> {
    const response = await this.api.put(`/progress/lessons/${lessonId}`, progressData);
    return response.data;
  }

  // ==================== АВТОРИЗАЦИЯ ====================

  async login(email: string, password: string): Promise<{ access_token: string; user: User }> {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData: { email: string; password: string; full_name: string }): Promise<{ access_token: string; user: User }> {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
    localStorage.removeItem('access_token');
  }

  // ==================== УТИЛИТЫ ====================

  setAuthToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    localStorage.removeItem('access_token');
    delete this.api.defaults.headers.common['Authorization'];
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

// Создаем единственный экземпляр API сервиса
const apiService = new ApiService();

export default apiService; 