import { User, Course, Assignment, Test, Message, Certificate } from './api';

// Интерфейс для зачислений студентов на курсы
interface CourseEnrollment {
  id: number;
  student_id: number;
  course_id: number;
  enrolled_at: string;
  status: 'active' | 'completed' | 'dropped';
  progress_percentage: number;
  last_accessed: string;
}

// Тестовые данные
const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@sianoro.ru',
    full_name: 'Администратор Системы',
    role: 'admin',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'anna@sianoro.ru',
    full_name: 'Анна Петрова',
    role: 'curator',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    email: 'maria@sianoro.ru',
    full_name: 'Мария Сидорова',
    role: 'curator',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    email: 'elena@sianoro.ru',
    full_name: 'Елена Козлова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    email: 'dmitry@sianoro.ru',
    full_name: 'Дмитрий Волков',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    email: 'olga@sianoro.ru',
    full_name: 'Ольга Морозова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    email: 'sergey@sianoro.ru',
    full_name: 'Сергей Новиков',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    email: 'natalia@sianoro.ru',
    full_name: 'Наталья Соколова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 9,
    email: 'alexey@sianoro.ru',
    full_name: 'Алексей Смирнов',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 10,
    email: 'tatyana@sianoro.ru',
    full_name: 'Татьяна Иванова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 11,
    email: 'andrey@sianoro.ru',
    full_name: 'Андрей Петров',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 12,
    email: 'marina@sianoro.ru',
    full_name: 'Марина Сидорова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 13,
    email: 'vladimir@sianoro.ru',
    full_name: 'Владимир Козлов',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 14,
    email: 'irina@sianoro.ru',
    full_name: 'Ирина Волкова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 15,
    email: 'mikhail@sianoro.ru',
    full_name: 'Михаил Новиков',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 16,
    email: 'anna_student@sianoro.ru',
    full_name: 'Анна Соколова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 17,
    email: 'dmitry_student@sianoro.ru',
    full_name: 'Дмитрий Смирнов',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 18,
    email: 'elena_student@sianoro.ru',
    full_name: 'Елена Иванова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 19,
    email: 'sergey_student@sianoro.ru',
    full_name: 'Сергей Петров',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 20,
    email: 'olga_student@sianoro.ru',
    full_name: 'Ольга Сидорова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 21,
    email: 'alexey_student@sianoro.ru',
    full_name: 'Алексей Козлов',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 22,
    email: 'tatyana_student@sianoro.ru',
    full_name: 'Татьяна Волкова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 23,
    email: 'andrey_student@sianoro.ru',
    full_name: 'Андрей Новиков',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 24,
    email: 'marina_student@sianoro.ru',
    full_name: 'Марина Соколова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 25,
    email: 'vladimir_student@sianoro.ru',
    full_name: 'Владимир Смирнов',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 26,
    email: 'irina_student@sianoro.ru',
    full_name: 'Ирина Иванова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 27,
    email: 'mikhail_student@sianoro.ru',
    full_name: 'Михаил Петров',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 28,
    email: 'natalia_student@sianoro.ru',
    full_name: 'Наталья Сидорова',
    role: 'student',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

// Данные о зачислениях студентов на курсы
const mockEnrollments: CourseEnrollment[] = [
  // Курс 1: Особенности фотографии в школах/садах (25 студентов из 50)
  { id: 1, student_id: 4, course_id: 1, enrolled_at: '2024-01-15T00:00:00Z', status: 'active', progress_percentage: 75, last_accessed: '2024-01-20T10:30:00Z' },
  { id: 2, student_id: 5, course_id: 1, enrolled_at: '2024-01-16T00:00:00Z', status: 'active', progress_percentage: 60, last_accessed: '2024-01-19T14:20:00Z' },
  { id: 3, student_id: 6, course_id: 1, enrolled_at: '2024-01-17T00:00:00Z', status: 'active', progress_percentage: 45, last_accessed: '2024-01-18T09:15:00Z' },
  { id: 4, student_id: 7, course_id: 1, enrolled_at: '2024-01-18T00:00:00Z', status: 'active', progress_percentage: 30, last_accessed: '2024-01-19T16:45:00Z' },
  { id: 5, student_id: 8, course_id: 1, enrolled_at: '2024-01-19T00:00:00Z', status: 'active', progress_percentage: 15, last_accessed: '2024-01-20T11:30:00Z' },
  { id: 6, student_id: 9, course_id: 1, enrolled_at: '2024-01-20T00:00:00Z', status: 'active', progress_percentage: 85, last_accessed: '2024-01-20T12:15:00Z' },
  { id: 7, student_id: 10, course_id: 1, enrolled_at: '2024-01-21T00:00:00Z', status: 'active', progress_percentage: 70, last_accessed: '2024-01-20T13:45:00Z' },
  { id: 8, student_id: 11, course_id: 1, enrolled_at: '2024-01-22T00:00:00Z', status: 'active', progress_percentage: 55, last_accessed: '2024-01-20T14:20:00Z' },
  { id: 9, student_id: 12, course_id: 1, enrolled_at: '2024-01-23T00:00:00Z', status: 'active', progress_percentage: 40, last_accessed: '2024-01-20T15:10:00Z' },
  { id: 10, student_id: 13, course_id: 1, enrolled_at: '2024-01-24T00:00:00Z', status: 'active', progress_percentage: 25, last_accessed: '2024-01-20T16:30:00Z' },
  { id: 11, student_id: 14, course_id: 1, enrolled_at: '2024-01-25T00:00:00Z', status: 'active', progress_percentage: 90, last_accessed: '2024-01-20T17:15:00Z' },
  { id: 12, student_id: 15, course_id: 1, enrolled_at: '2024-01-26T00:00:00Z', status: 'active', progress_percentage: 65, last_accessed: '2024-01-20T18:45:00Z' },
  { id: 13, student_id: 16, course_id: 1, enrolled_at: '2024-01-27T00:00:00Z', status: 'active', progress_percentage: 50, last_accessed: '2024-01-20T19:20:00Z' },
  { id: 14, student_id: 17, course_id: 1, enrolled_at: '2024-01-28T00:00:00Z', status: 'active', progress_percentage: 35, last_accessed: '2024-01-20T20:10:00Z' },
  { id: 15, student_id: 18, course_id: 1, enrolled_at: '2024-01-29T00:00:00Z', status: 'active', progress_percentage: 20, last_accessed: '2024-01-20T21:30:00Z' },
  { id: 16, student_id: 19, course_id: 1, enrolled_at: '2024-01-30T00:00:00Z', status: 'active', progress_percentage: 80, last_accessed: '2024-01-20T22:15:00Z' },
  { id: 17, student_id: 20, course_id: 1, enrolled_at: '2024-02-01T00:00:00Z', status: 'active', progress_percentage: 45, last_accessed: '2024-01-20T23:45:00Z' },
  { id: 18, student_id: 21, course_id: 1, enrolled_at: '2024-02-02T00:00:00Z', status: 'active', progress_percentage: 30, last_accessed: '2024-01-21T09:20:00Z' },
  { id: 19, student_id: 22, course_id: 1, enrolled_at: '2024-02-03T00:00:00Z', status: 'active', progress_percentage: 60, last_accessed: '2024-01-21T10:10:00Z' },
  { id: 20, student_id: 23, course_id: 1, enrolled_at: '2024-02-04T00:00:00Z', status: 'active', progress_percentage: 75, last_accessed: '2024-01-21T11:30:00Z' },
  { id: 21, student_id: 24, course_id: 1, enrolled_at: '2024-02-05T00:00:00Z', status: 'active', progress_percentage: 40, last_accessed: '2024-01-21T12:15:00Z' },
  { id: 22, student_id: 25, course_id: 1, enrolled_at: '2024-02-06T00:00:00Z', status: 'active', progress_percentage: 55, last_accessed: '2024-01-21T13:45:00Z' },
  { id: 23, student_id: 26, course_id: 1, enrolled_at: '2024-02-07T00:00:00Z', status: 'active', progress_percentage: 70, last_accessed: '2024-01-21T14:20:00Z' },
  { id: 24, student_id: 27, course_id: 1, enrolled_at: '2024-02-08T00:00:00Z', status: 'active', progress_percentage: 25, last_accessed: '2024-01-21T15:10:00Z' },
  { id: 25, student_id: 28, course_id: 1, enrolled_at: '2024-02-09T00:00:00Z', status: 'active', progress_percentage: 85, last_accessed: '2024-01-21T16:30:00Z' },
  
  // Курс 2: Дизайн и создание макетов (18 студентов из 30)
  { id: 26, student_id: 4, course_id: 2, enrolled_at: '2024-01-10T00:00:00Z', status: 'active', progress_percentage: 80, last_accessed: '2024-01-20T13:20:00Z' },
  { id: 27, student_id: 5, course_id: 2, enrolled_at: '2024-01-11T00:00:00Z', status: 'active', progress_percentage: 65, last_accessed: '2024-01-19T15:10:00Z' },
  { id: 28, student_id: 6, course_id: 2, enrolled_at: '2024-01-12T00:00:00Z', status: 'active', progress_percentage: 50, last_accessed: '2024-01-18T12:30:00Z' },
  { id: 29, student_id: 7, course_id: 2, enrolled_at: '2024-01-13T00:00:00Z', status: 'active', progress_percentage: 35, last_accessed: '2024-01-19T17:20:00Z' },
  { id: 30, student_id: 8, course_id: 2, enrolled_at: '2024-01-14T00:00:00Z', status: 'active', progress_percentage: 20, last_accessed: '2024-01-20T08:45:00Z' },
  { id: 31, student_id: 9, course_id: 2, enrolled_at: '2024-01-15T00:00:00Z', status: 'active', progress_percentage: 90, last_accessed: '2024-01-20T14:15:00Z' },
  { id: 32, student_id: 10, course_id: 2, enrolled_at: '2024-01-16T00:00:00Z', status: 'active', progress_percentage: 75, last_accessed: '2024-01-20T15:45:00Z' },
  { id: 33, student_id: 11, course_id: 2, enrolled_at: '2024-01-17T00:00:00Z', status: 'active', progress_percentage: 60, last_accessed: '2024-01-20T16:20:00Z' },
  { id: 34, student_id: 12, course_id: 2, enrolled_at: '2024-01-18T00:00:00Z', status: 'active', progress_percentage: 45, last_accessed: '2024-01-20T17:10:00Z' },
  { id: 35, student_id: 13, course_id: 2, enrolled_at: '2024-01-19T00:00:00Z', status: 'active', progress_percentage: 30, last_accessed: '2024-01-20T18:30:00Z' },
  { id: 36, student_id: 14, course_id: 2, enrolled_at: '2024-01-20T00:00:00Z', status: 'active', progress_percentage: 85, last_accessed: '2024-01-20T19:15:00Z' },
  { id: 37, student_id: 15, course_id: 2, enrolled_at: '2024-01-21T00:00:00Z', status: 'active', progress_percentage: 70, last_accessed: '2024-01-20T20:45:00Z' },
  { id: 38, student_id: 16, course_id: 2, enrolled_at: '2024-01-22T00:00:00Z', status: 'active', progress_percentage: 55, last_accessed: '2024-01-20T21:20:00Z' },
  { id: 39, student_id: 17, course_id: 2, enrolled_at: '2024-01-23T00:00:00Z', status: 'active', progress_percentage: 40, last_accessed: '2024-01-20T22:10:00Z' },
  { id: 40, student_id: 18, course_id: 2, enrolled_at: '2024-01-24T00:00:00Z', status: 'active', progress_percentage: 25, last_accessed: '2024-01-20T23:30:00Z' },
  { id: 41, student_id: 19, course_id: 2, enrolled_at: '2024-01-25T00:00:00Z', status: 'active', progress_percentage: 80, last_accessed: '2024-01-21T00:15:00Z' },
  { id: 42, student_id: 20, course_id: 2, enrolled_at: '2024-01-26T00:00:00Z', status: 'active', progress_percentage: 65, last_accessed: '2024-01-21T01:45:00Z' },
  { id: 43, student_id: 21, course_id: 2, enrolled_at: '2024-01-27T00:00:00Z', status: 'active', progress_percentage: 50, last_accessed: '2024-01-21T02:20:00Z' },
  
  // Курс 3: Администрирование, ценообразование + инструменты управления (12 студентов из 20)
  { id: 44, student_id: 4, course_id: 3, enrolled_at: '2024-01-05T00:00:00Z', status: 'active', progress_percentage: 90, last_accessed: '2024-01-20T16:30:00Z' },
  { id: 45, student_id: 5, course_id: 3, enrolled_at: '2024-01-06T00:00:00Z', status: 'active', progress_percentage: 70, last_accessed: '2024-01-19T18:15:00Z' },
  { id: 46, student_id: 6, course_id: 3, enrolled_at: '2024-01-07T00:00:00Z', status: 'active', progress_percentage: 55, last_accessed: '2024-01-18T14:40:00Z' },
  { id: 47, student_id: 7, course_id: 3, enrolled_at: '2024-01-08T00:00:00Z', status: 'active', progress_percentage: 40, last_accessed: '2024-01-19T19:30:00Z' },
  { id: 48, student_id: 8, course_id: 3, enrolled_at: '2024-01-09T00:00:00Z', status: 'active', progress_percentage: 25, last_accessed: '2024-01-20T10:15:00Z' },
  { id: 49, student_id: 9, course_id: 3, enrolled_at: '2024-01-10T00:00:00Z', status: 'active', progress_percentage: 85, last_accessed: '2024-01-20T11:30:00Z' },
  { id: 50, student_id: 10, course_id: 3, enrolled_at: '2024-01-11T00:00:00Z', status: 'active', progress_percentage: 75, last_accessed: '2024-01-20T12:45:00Z' },
  { id: 51, student_id: 11, course_id: 3, enrolled_at: '2024-01-12T00:00:00Z', status: 'active', progress_percentage: 60, last_accessed: '2024-01-20T13:20:00Z' },
  { id: 52, student_id: 12, course_id: 3, enrolled_at: '2024-01-13T00:00:00Z', status: 'active', progress_percentage: 45, last_accessed: '2024-01-20T14:10:00Z' },
  { id: 53, student_id: 13, course_id: 3, enrolled_at: '2024-01-14T00:00:00Z', status: 'active', progress_percentage: 30, last_accessed: '2024-01-20T15:30:00Z' },
  { id: 54, student_id: 14, course_id: 3, enrolled_at: '2024-01-15T00:00:00Z', status: 'active', progress_percentage: 80, last_accessed: '2024-01-20T16:15:00Z' },
  { id: 55, student_id: 15, course_id: 3, enrolled_at: '2024-01-16T00:00:00Z', status: 'active', progress_percentage: 65, last_accessed: '2024-01-20T17:45:00Z' }
];

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Особенности фотографии в школах/садах',
    slug: 'school-photography',
    description: 'Полный курс по школьной фотографии с практическими навыками работы с детьми',
    short_description: 'Научитесь работать с детьми в школах и садах',
    instructor_id: 2,
    price: 19900,
    status: 'published',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Дизайн и создание макетов',
    slug: 'design-layouts',
    description: 'Профессиональный курс по работе с Photoshop и созданию макетов',
    short_description: 'Создавайте профессиональные макеты',
    instructor_id: 2,
    price: 49900,
    status: 'published',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    title: 'Администрирование, ценообразование + инструменты управления',
    slug: 'business-administration',
    description: 'Полный курс по управлению фотобизнесом с инструментами администрирования',
    short_description: 'Управляйте своим фотобизнесом эффективно',
    instructor_id: 2,
    price: 98000,
    status: 'published',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

class MockApiClient {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Методы аутентификации
  async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string; user: User }> {
    await this.delay();
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // Простая проверка пароля для тестовых аккаунтов
    const expectedPassword = email.split('@')[0] + '123';
    if (password !== expectedPassword) {
      throw new Error('Неверный пароль');
    }

    return {
      access_token: 'mock_access_token_' + user.id,
      refresh_token: 'mock_refresh_token_' + user.id,
      user
    };
  }

  async register(userData: { email: string; password: string; full_name: string; role: string }): Promise<{ access_token: string; refresh_token: string; user: User }> {
    await this.delay();
    
    const newUser: User = {
      id: mockUsers.length + 1,
      email: userData.email,
      full_name: userData.full_name,
      role: userData.role as 'admin' | 'curator' | 'student',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockUsers.push(newUser);

    return {
      access_token: 'mock_access_token_' + newUser.id,
      refresh_token: 'mock_refresh_token_' + newUser.id,
      user: newUser
    };
  }

  async refreshToken(): Promise<{ access_token: string; refresh_token: string }> {
    await this.delay();
    return {
      access_token: 'mock_new_access_token',
      refresh_token: 'mock_new_refresh_token'
    };
  }

  async logout(): Promise<void> {
    await this.delay();
  }

  async getCurrentUser(): Promise<User> {
    await this.delay();
    
    // Получаем токен из localStorage
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Токен не найден');
    }

    // Извлекаем ID пользователя из токена
    const userId = parseInt(token.split('_').pop() || '1');
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return user;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.delay();
  }

  async requestPasswordReset(email: string): Promise<void> {
    await this.delay();
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await this.delay();
  }

  async verifyEmail(token: string): Promise<void> {
    await this.delay();
  }

  async resendVerificationEmail(): Promise<void> {
    await this.delay();
  }

  // Методы для курсов
  async getCourses(): Promise<{ items: Course[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    
    // Добавляем информацию о количестве студентов для каждого курса
    const coursesWithStudentCount = mockCourses.map(course => {
      const enrolledStudents = mockEnrollments.filter(enrollment => 
        enrollment.course_id === course.id && enrollment.status === 'active'
      ).length;
      
      return {
        ...course,
        enrolled_students: enrolledStudents
      };
    });
    
    return {
      items: coursesWithStudentCount,
      total: coursesWithStudentCount.length,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async getCourse(id: number): Promise<Course> {
    await this.delay();
    const course = mockCourses.find(c => c.id === id);
    if (!course) {
      throw new Error('Курс не найден');
    }
    return course;
  }

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    await this.delay();
    const newCourse: Course = {
      id: mockCourses.length + 1,
      title: courseData.title || '',
      slug: courseData.slug || 'new-course',
      description: courseData.description || '',
      short_description: courseData.short_description || '',
      instructor_id: courseData.instructor_id || 2,
      price: courseData.price || 0,
      status: courseData.status || 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockCourses.push(newCourse);
    return newCourse;
  }

  async updateCourse(id: number, courseData: Partial<Course>): Promise<Course> {
    await this.delay();
    const courseIndex = mockCourses.findIndex(c => c.id === id);
    if (courseIndex === -1) {
      throw new Error('Курс не найден');
    }
    
    mockCourses[courseIndex] = { ...mockCourses[courseIndex], ...courseData, updated_at: new Date().toISOString() };
    return mockCourses[courseIndex];
  }

  async deleteCourse(id: number): Promise<void> {
    await this.delay();
    const courseIndex = mockCourses.findIndex(c => c.id === id);
    if (courseIndex === -1) {
      throw new Error('Курс не найден');
    }
    mockCourses.splice(courseIndex, 1);
  }

  // Методы для пользователей (админ)
  async getUsers(): Promise<{ items: User[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    return {
      items: mockUsers,
      total: mockUsers.length,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async getUser(id: number): Promise<User> {
    await this.delay();
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    await this.delay();
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Пользователь не найден');
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData, updated_at: new Date().toISOString() };
    return mockUsers[userIndex];
  }

  async deleteUser(id: number): Promise<void> {
    await this.delay();
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('Пользователь не найден');
    }
    mockUsers.splice(userIndex, 1);
  }

  // Методы для заданий
  async getAssignments(): Promise<{ items: Assignment[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    return {
      items: [],
      total: 0,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async getAssignment(id: number): Promise<Assignment> {
    await this.delay();
    throw new Error('Задание не найдено');
  }

  async createAssignment(assignmentData: Partial<Assignment>): Promise<Assignment> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  async updateAssignment(id: number, assignmentData: Partial<Assignment>): Promise<Assignment> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  async submitAssignment(id: number, submission: { content: string; files?: File[] }): Promise<Assignment> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  async gradeAssignment(id: number, grade: { score: number; feedback: string }): Promise<Assignment> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  // Методы для тестов
  async getTests(): Promise<{ items: Test[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    return {
      items: [],
      total: 0,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async getTest(id: number): Promise<Test> {
    await this.delay();
    throw new Error('Тест не найден');
  }

  async startTest(id: number): Promise<{ test_id: number; questions: any[]; time_limit: number }> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  async submitTest(id: number, answers: { question_id: number; answer: string | string[] }[]): Promise<{ score: number; passed: boolean; certificate?: boolean }> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  // Методы для сообщений
  async getMessages(): Promise<{ items: Message[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    return {
      items: [],
      total: 0,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async getMessage(id: number): Promise<Message> {
    await this.delay();
    throw new Error('Сообщение не найдено');
  }

  async sendMessage(messageData: { to_user_id: number; subject: string; content: string; course_id?: number; message_type?: string; priority?: string }): Promise<Message> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  async markMessageAsRead(id: number): Promise<void> {
    await this.delay();
  }

  async deleteMessage(id: number): Promise<void> {
    await this.delay();
  }

  // Методы для сертификатов
  async getCertificates(): Promise<{ items: Certificate[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    return {
      items: [],
      total: 0,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async getCertificate(id: number): Promise<Certificate> {
    await this.delay();
    throw new Error('Сертификат не найден');
  }

  async downloadCertificate(id: number): Promise<Blob> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  // Методы для статистики
  async getDashboardStats(): Promise<{
    total_courses: number;
    total_students: number;
    total_revenue: number;
    active_assignments: number;
    recent_activity: any[];
  }> {
    await this.delay();
    
    // Реальные расчеты на основе данных
    const totalCourses = mockCourses.length;
    const totalStudents = mockUsers.filter(u => u.role === 'student').length;
    
    // Расчет выручки из платежей (если есть)
    const totalRevenue = this.calculateTotalRevenue();
    
    return {
      total_courses: totalCourses,
      total_students: totalStudents,
      total_revenue: totalRevenue,
      active_assignments: 5, // Будет рассчитываться из заданий
      recent_activity: this.getRecentActivity()
    };
  }

  // Метод для расчета общей выручки
  private calculateTotalRevenue(): number {
    // Здесь можно добавить реальные платежи
    const mockPayments = [
      { amount: 15000, status: 'completed' },
      { amount: 25000, status: 'completed' },
      { amount: 30000, status: 'pending' },
      { amount: 20000, status: 'completed' }
    ];
    
    return mockPayments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  // Метод для получения последней активности
  private getRecentActivity(): any[] {
    return [
      {
        id: 1,
        type: 'course_enrollment',
        user_name: 'Иван Петров',
        course_title: 'Фотография для начинающих',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        type: 'assignment_submitted',
        user_name: 'Анна Сидорова',
        course_title: 'Портретная съемка',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  }

  async getCuratorStats(): Promise<{
    my_courses: number;
    my_students: number;
    pending_assignments: number;
    recent_activity: any[];
  }> {
    await this.delay();
    
    // Реальные расчеты для куратора
    const curatorId = 2; // ID куратора
    const myCourses = mockCourses.filter(course => course.instructor_id === curatorId).length;
    const myStudents = this.calculateCuratorStudents(curatorId);
    const pendingAssignments = this.calculatePendingAssignments(curatorId);
    
    return {
      my_courses: myCourses,
      my_students: myStudents,
      pending_assignments: pendingAssignments,
      recent_activity: this.getCuratorActivity(curatorId)
    };
  }

  // Метод для расчета студентов куратора
  private calculateCuratorStudents(curatorId: number): number {
    const curatorCourses = mockCourses.filter(course => course.instructor_id === curatorId);
    const courseIds = curatorCourses.map(course => course.id);
    
    // Подсчитываем уникальных студентов, зачисленных на курсы куратора
    const uniqueStudents = new Set();
    mockEnrollments.forEach(enrollment => {
      if (courseIds.includes(enrollment.course_id)) {
        uniqueStudents.add(enrollment.student_id);
      }
    });
    
    return uniqueStudents.size;
  }

  // Метод для расчета ожидающих заданий
  private calculatePendingAssignments(curatorId: number): number {
    // Имитируем данные о заданиях
    const mockAssignments = [
      { id: 1, course_id: 1, status: 'pending', instructor_id: 2 },
      { id: 2, course_id: 1, status: 'submitted', instructor_id: 2 },
      { id: 3, course_id: 2, status: 'pending', instructor_id: 2 }
    ];
    
    return mockAssignments.filter(assignment => 
      assignment.instructor_id === curatorId && 
      assignment.status === 'pending'
    ).length;
  }

  // Метод для получения активности куратора
  private getCuratorActivity(curatorId: number): any[] {
    const curatorCourses = mockCourses.filter(course => course.instructor_id === curatorId);
    const courseIds = curatorCourses.map(course => course.id);
    
    // Получаем последние зачисления на курсы куратора
    const recentEnrollments = mockEnrollments
      .filter(enrollment => courseIds.includes(enrollment.course_id))
      .sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime())
      .slice(0, 5);
    
    return recentEnrollments.map(enrollment => {
      const student = mockUsers.find(u => u.id === enrollment.student_id);
      const course = mockCourses.find(c => c.id === enrollment.course_id);
      
      return {
        id: enrollment.id,
        type: 'course_enrollment',
        user_name: student?.full_name || 'Неизвестный студент',
        course_title: course?.title || 'Неизвестный курс',
        timestamp: enrollment.enrolled_at,
        progress: enrollment.progress_percentage
      };
    });
  }

  async getStudentStats(): Promise<{
    enrolled_courses: number;
    completed_courses: number;
    certificates_earned: number;
    average_score: number;
    recent_activity: any[];
  }> {
    await this.delay();
    
    // Реальные расчеты для студента
    const studentId = 3; // ID студента
    const enrolledCourses = this.calculateEnrolledCourses(studentId);
    const completedCourses = this.calculateCompletedCourses(studentId);
    const certificatesEarned = this.calculateCertificates(studentId);
    const averageScore = this.calculateAverageScore(studentId);
    
    return {
      enrolled_courses: enrolledCourses,
      completed_courses: completedCourses,
      certificates_earned: certificatesEarned,
      average_score: averageScore,
      recent_activity: this.getStudentActivity(studentId)
    };
  }

  // Метод для расчета записанных курсов
  private calculateEnrolledCourses(studentId: number): number {
    return mockEnrollments.filter(enrollment => 
      enrollment.student_id === studentId && 
      enrollment.status === 'active'
    ).length;
  }

  // Метод для расчета завершенных курсов
  private calculateCompletedCourses(studentId: number): number {
    const mockCompletions = [
      { student_id: 3, course_id: 1, status: 'completed' },
      { student_id: 4, course_id: 1, status: 'completed' }
    ];
    
    return mockCompletions.filter(completion => 
      completion.student_id === studentId && 
      completion.status === 'completed'
    ).length;
  }

  // Метод для расчета сертификатов
  private calculateCertificates(studentId: number): number {
    const mockCertificates = [
      { student_id: 3, course_id: 1, earned: true },
      { student_id: 4, course_id: 1, earned: true }
    ];
    
    return mockCertificates.filter(cert => 
      cert.student_id === studentId && 
      cert.earned
    ).length;
  }

  // Метод для расчета средней оценки
  private calculateAverageScore(studentId: number): number {
    const mockScores = [
      { student_id: 3, course_id: 1, score: 85 },
      { student_id: 3, course_id: 2, score: 92 },
      { student_id: 4, course_id: 1, score: 78 }
    ];
    
    const studentScores = mockScores.filter(score => score.student_id === studentId);
    
    if (studentScores.length === 0) return 0;
    
    const totalScore = studentScores.reduce((sum, score) => sum + score.score, 0);
    return Math.round(totalScore / studentScores.length);
  }

  // Метод для получения активности студента
  private getStudentActivity(studentId: number): any[] {
    return [
      {
        id: 1,
        type: 'assignment_submitted',
        course_title: 'Фотография для начинающих',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        type: 'test_completed',
        course_title: 'Портретная съемка',
        score: 92,
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ];
  }

  // Методы для платежей
  async getPayments(): Promise<{
    items: any[];
    total: number;
    page: number;
    size: number;
    pages: number;
  }> {
    await this.delay();
    
    const mockPayments = [
      {
        id: 'PAY-001',
        user_name: 'Иван Петров',
        user_email: 'ivan.petrov@example.com',
        course_title: 'Фотография для начинающих',
        amount: 15000,
        status: 'completed',
        payment_method: 'ЮKassa',
        created_at: '2024-01-15T10:30:00Z',
        completed_at: '2024-01-15T10:32:00Z',
        receipt_url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO8DQoxIDAgb2JqDQo8PA0KL1R5cGUgL0NhdGFsb2cNCi9QYWdlcyAyIDAgUg0KPj4NCmVuZG9iag0KMiAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDENCi9LaWRzIFsgMyAwIFIgXQ0KPj4NCmVuZG9iag0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDIgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDQgMCBSDQo+Pg0KPj4NCi9Db250ZW50cyA1IDAgUg0KL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQ0KPj4NCmVuZG9iag0KNCAwIG9iag0KPDwNCi9UeXBlIC9Gb250DQovU3VidHlwZSAvVHlwZTENCi9CYXNlRm9udCAvSGVsdmV0aWNhDQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZw0KPj4NCmVuZG9iag0KNSAwIG9iag0KPDwNCi9MZW5ndGggNDQNCj4+DQpzdHJlYW0NCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8gV29ybGQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoNCnhyZWYNCjAgNg0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDAxIDAwMDAwIG4NCjAwMDAwMDAwNzAgMDAwMDAgbg0KMDAwMDAwMDEyMyAwMDAwMCBuDQowMDAwMDAwMzAxIDAwMDAwIG4NCjAwMDAwMDAzODAgMDAwMDAgbg0KdHJhaWxlcg0KPDwNCi9TaXplIDYNCi9Sb290IDEgMCBSDQo+Pg0Kc3RhcnR4cmVmDQo0OTINCn0='
      },
      {
        id: 'PAY-002',
        user_name: 'Анна Сидорова',
        user_email: 'anna.sidorova@example.com',
        course_title: 'Портретная съемка',
        amount: 25000,
        status: 'pending',
        payment_method: 'Сбербанк',
        created_at: '2024-01-16T14:20:00Z'
      },
      {
        id: 'PAY-003',
        user_name: 'Михаил Козлов',
        user_email: 'mikhail.kozlov@example.com',
        course_title: 'Студийная съемка',
        amount: 30000,
        status: 'failed',
        payment_method: 'Тинькофф',
        created_at: '2024-01-17T09:15:00Z'
      },
      {
        id: 'PAY-004',
        user_name: 'Елена Волкова',
        user_email: 'elena.volkova@example.com',
        course_title: 'Фотография для начинающих',
        amount: 15000,
        status: 'refunded',
        payment_method: 'ЮKassa',
        created_at: '2024-01-18T16:45:00Z',
        completed_at: '2024-01-18T16:47:00Z',
        receipt_url: 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO8DQoxIDAgb2JqDQo8PA0KL1R5cGUgL0NhdGFsb2cNCi9QYWdlcyAyIDAgUg0KPj4NCmVuZG9iag0KMiAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDENCi9LaWRzIFsgMyAwIFIgXQ0KPj4NCmVuZG9iag0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDIgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDQgMCBSDQo+Pg0KPj4NCi9Db250ZW50cyA1IDAgUg0KL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQ0KPj4NCmVuZG9iag0KNCAwIG9iag0KPDwNCi9UeXBlIC9Gb250DQovU3VidHlwZSAvVHlwZTENCi9CYXNlRm9udCAvSGVsdmV0aWNhDQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZw0KPj4NCmVuZG9iag0KNSAwIG9iag0KPDwNCi9MZW5ndGggNDQNCj4+DQpzdHJlYW0NCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8gV29ybGQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoNCnhyZWYNCjAgNg0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDAxIDAwMDAwIG4NCjAwMDAwMDAwNzAgMDAwMDAgbg0KMDAwMDAwMDEyMyAwMDAwMCBuDQowMDAwMDAwMzAxIDAwMDAwIG4NCjAwMDAwMDAzODAgMDAwMDAgbg0KdHJhaWxlcg0KPDwNCi9TaXplIDYNCi9Sb290IDEgMCBSDQo+Pg0Kc3RhcnR4cmVmDQo0OTINCn0='
      }
    ];
    
    return {
      items: mockPayments,
      total: mockPayments.length,
      page: 1,
      size: 10,
      pages: 1
    };
  }

  async createPayment(courseId: number, paymentMethod: string): Promise<{
    payment_id: string;
    payment_url: string;
    amount: number;
  }> {
    await this.delay();
    
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Курс не найден');
    }
    
    const paymentId = `PAY-${Date.now()}`;
    
    return {
      payment_id: paymentId,
      payment_url: `https://payment.example.com/${paymentId}`,
      amount: course.price
    };
  }

  async getPaymentStatus(paymentId: string): Promise<{
    status: 'pending' | 'completed' | 'failed';
    amount: number;
    course_id: number;
  }> {
    await this.delay();
    throw new Error('Метод не реализован');
  }

  async getPaymentHistory(): Promise<{ items: any[]; total: number; page: number; size: number; pages: number }> {
    await this.delay();
    return {
      items: [],
      total: 0,
      page: 1,
      size: 10,
      pages: 1
    };
  }
}

export const mockApiClient = new MockApiClient(); 