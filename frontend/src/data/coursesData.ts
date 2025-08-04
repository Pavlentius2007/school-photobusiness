// Централизованное хранилище данных о курсах

export interface CourseMaterial {
  id: number;
  name: string;
  type: 'video' | 'pdf' | 'image' | 'document' | 'presentation';
  url: string;
  size?: string;
  uploadedAt: string;
}

// Интерфейсы для интерактивных элементов
export interface LessonQuestion {
  id: number;
  text: string;
  type: 'open' | 'single_choice' | 'multiple_choice';
  options?: string[];
  required: boolean;
  order_index: number;
  points: number;
}

export interface LessonAssignment {
  id: number;
  title: string;
  description: string;
  max_score: number;
  due_date?: string;
  attached_files?: string[];
  created_at: string;
}

export interface LessonTest {
  id: number;
  title: string;
  description: string;
  time_limit_minutes?: number;
  passing_score: number;
  max_score: number;
  questions: LessonQuestion[];
}

export interface CourseLesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'practice' | 'theory' | 'test';
  content?: string;
  video_url?: string;
  file_url?: string;
  materials?: CourseMaterial[];
  questions?: LessonQuestion[];
  assignment?: LessonAssignment;
  test?: LessonTest;
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface CourseGalleryImage {
  id: number;
  url: string;
  title: string;
  description?: string;
}

export interface CourseInstructor {
  name: string;
  bio: string;
  experience: string;
}

// Базовая информация о курсе
export interface BaseCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  badge?: string;
  gradient: string;
}

// Полная информация о курсе
export interface FullCourse extends BaseCourse {
  shortDescription: string;
  fullDescription: string;
  whatYouWillLearn: string[];
  forWhom: string[];
  requirements: string[];
  modules: CourseModule[];
  gallery: CourseGalleryImage[];
  instructor: CourseInstructor;
  certificate: boolean;
  support: string;
  tags: string[];
  level: string;
  category: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  maxStudents: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

// Основные курсы
export const baseCourses: BaseCourse[] = [
  {
    id: 1,
    title: 'Особенности фотографии в школах/садах',
    description: 'Полный курс по школьной фотографии с практическими навыками работы с детьми. Освойте выбор техники, настройки камеры, работу с освещением и создание портретов и коллажей.',
    price: 19900,
    duration: '6 недель',
    image: '📚',
    badge: 'Старт потока - весна 2025',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    title: 'Дизайн и создание макетов',
    description: 'Профессиональный курс по работе с Photoshop и созданию макетов. Научитесь создавать портреты, коллажи, виньетки и профессиональные макеты для печати.',
    price: 49900,
    duration: '8 недель',
    image: '🎨',
    badge: 'Старт потока - весна 2025',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    title: 'Администрирование, ценообразование + инструменты управления',
    description: 'Полный курс по управлению фотобизнесом с инструментами администрирования. Изучите ценообразование, работу с администрацией, партнерства и финансовый контроль.',
    price: 98000,
    duration: '10 недель',
    image: '💼',
    badge: 'Старт потока - весна 2025',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }
];

// Полная информация о курсах
export const fullCourses: FullCourse[] = [
  {
    ...baseCourses[0],
    shortDescription: "Полный курс по школьной фотографии с практическими навыками работы с детьми",
    fullDescription: "Изучите все аспекты фотосъемки в школах и детских садах. От выбора техники до работы с детьми, создания портретов и групповых фото. Освойте профессиональные навыки работы на локации, с освещением и в стрессовых ситуациях.",
    whatYouWillLearn: [
      "Выбирать оптимальную технику для школьной съемки",
      "Настраивать камеру для различных условий съемки",
      "Работать с дополнительными источниками света",
      "Эффективно работать с детьми и создавать качественные портреты",
      "Создавать стилизованные коллажи и групповые фото",
      "Работать с хромакеем и фонами для портретов",
      "Управлять временем съемки и планировать рабочий процесс",
      "Справляться с непредвиденными ситуациями"
    ],
    forWhom: [
      "Начинающие фотографы",
      "Фотографы, работающие с детьми",
      "Специалисты детских учреждений",
      "Предприниматели в сфере детской фотографии"
    ],
    requirements: [
      "Базовые знания фотографии",
      "Зеркальный или беззеркальный фотоаппарат",
      "Желание работать с детьми"
    ],
    modules: [
      {
        id: 1,
        title: "Техническая подготовка",
        description: "Выбор техники и настройка оборудования",
        duration: "1 неделя",
        lessons: [
          { id: 1, title: "Выбор техники. Обязательный набор на съемку", duration: "45 мин", type: "theory" },
          { id: 2, title: "Настройки камеры", duration: "60 мин", type: "theory" },
          { id: 3, title: "Схема установки и работы с дополнительными источниками света", duration: "90 мин", type: "practice" }
        ]
      },
      {
        id: 2,
        title: "Работа на локации",
        description: "Особенности съемки в школах и детских садах",
        duration: "2 недели",
        lessons: [
          { id: 4, title: "Особенности работы на локации", duration: "60 мин", type: "theory" },
          { id: 5, title: "Работа с хромакеем и фонами для портрета", duration: "90 мин", type: "practice" }
        ]
      },
      {
        id: 3,
        title: "Работа с детьми",
        description: "Психология и техники работы с детьми",
        duration: "2 недели",
        lessons: [
          { id: 6, title: "Особенности работы с портретом", duration: "75 мин", type: "theory" },
          { id: 7, title: "Особенности и стилизация работы с коллажами", duration: "90 мин", type: "practice" },
          { id: 8, title: "Правила построения группового фото", duration: "60 мин", type: "theory" }
        ]
      },
      {
        id: 4,
        title: "Профессиональные навыки",
        description: "Управление процессом и решение проблем",
        duration: "1 неделя",
        lessons: [
          { id: 9, title: "Работа с учителями в процессе съемки, фото учителя", duration: "45 мин", type: "theory" },
          { id: 10, title: "Непредвиденные стрессовые ситуации и как из них выходить", duration: "60 мин", type: "theory" },
          { id: 11, title: "Тайм-менеджмент. Время съемки, план график работы", duration: "45 мин", type: "theory" },
          { id: 12, title: "Чек-лист по четвертям и видам услуг и продукции по сезонам", duration: "30 мин", type: "theory" }
        ]
      }
    ],
    gallery: [
      { id: 1, url: "/images/school1.jpg", title: "Школьная съемка", description: "Пример работы в школе" },
      { id: 2, url: "/images/school2.jpg", title: "Детский портрет", description: "Индивидуальная съемка" }
    ],
    instructor: {
      name: "Леготина Алена",
      bio: "Профессиональный фотограф с многолетним опытом работы с детьми и образовательными учреждениями",
      experience: "8 лет в школьной фотографии"
    },
    certificate: true,
    support: "Поддержка куратора в течение всего курса",
    tags: ["школа", "дети", "фотография", "начинающий"],
    level: "Базовый",
    category: "Детская фотография",
    lessonsCount: 12,
    studentsCount: 45,
    rating: 4.8,
    maxStudents: 50,
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    ...baseCourses[1],
    shortDescription: "Профессиональный курс по работе с Photoshop и созданию макетов",
    fullDescription: "Освойте полный цикл создания дизайна в Photoshop: от обработки портретов до создания сложных макетов для печати. Изучите профессиональные техники обтравки, сборки коллажей и подготовки макетов для типографии.",
    whatYouWillLearn: [
      "Эффективно работать в программе Photoshop",
      "Создавать качественные портреты с профессиональной обработкой",
      "Выполнять обтравку одного человека и группы людей",
      "Собирать общие фотографии и групповые коллажи",
      "Создавать виньетки и художественные композиции",
      "Разрабатывать макеты с нуля",
      "Работать с типографиями и подготавливать файлы к печати",
      "Создавать мокапы для презентации работ",
      "Работать с выпускными альбомами и их разметкой"
    ],
    forWhom: [
      "Фотографы, желающие освоить дизайн",
      "Дизайнеры, работающие с фотографией",
      "Специалисты по созданию фотопродукции",
      "Владельцы фотостудий"
    ],
    requirements: [
      "Базовые навыки работы с компьютером",
      "Установленный Adobe Photoshop",
      "Опыт фотосъемки (желательно)"
    ],
    modules: [
      {
        id: 1,
        title: "Основы Photoshop",
        description: "Изучение интерфейса и основных инструментов",
        duration: "1 неделя",
        lessons: [
          { id: 1, title: "Ознакомление с программой Photoshop / полезные кнопки", duration: "90 мин", type: "theory" },
          { id: 2, title: "Как собрать портрет", duration: "120 мин", type: "practice" }
        ]
      },
      {
        id: 2,
        title: "Техники обтравки",
        description: "Профессиональная обтравка объектов",
        duration: "2 недели",
        lessons: [
          { id: 3, title: "Как сделать обтравку 1 человека", duration: "90 мин", type: "practice" },
          { id: 4, title: "Как сделать обтравку группы людей", duration: "120 мин", type: "practice" }
        ]
      },
      {
        id: 3,
        title: "Создание композиций",
        description: "Сборка фотографий и коллажей",
        duration: "2 недели",
        lessons: [
          { id: 5, title: "Сборка общего фото", duration: "90 мин", type: "practice" },
          { id: 6, title: "Сборка виньетки", duration: "75 мин", type: "practice" },
          { id: 7, title: "Сборка группового коллажа", duration: "120 мин", type: "practice" }
        ]
      },
      {
        id: 4,
        title: "Профессиональный дизайн",
        description: "Создание макетов и работа с типографией",
        duration: "2 недели",
        lessons: [
          { id: 8, title: "Создание макета с нуля", duration: "150 мин", type: "practice" },
          { id: 9, title: "Технические особенности пост-вывода и взаимодействия с типографиями", duration: "60 мин", type: "theory" },
          { id: 10, title: "Как собрать мокап на сайт", duration: "90 мин", type: "practice" }
        ]
      },
      {
        id: 5,
        title: "Специализированные проекты",
        description: "Выпускные альбомы и подарочные материалы",
        duration: "1 неделя",
        lessons: [
          { id: 11, title: "Разметка и особенности работы с выпускными альбомами", duration: "120 мин", type: "practice" },
          { id: 12, title: "10 макетов в подарок - обзор и использование", duration: "60 мин", type: "theory" }
        ]
      }
    ],
    gallery: [
      { id: 1, url: "/images/design1.jpg", title: "Макет альбома", description: "Пример выпускного альбома" },
      { id: 2, url: "/images/design2.jpg", title: "Групповой коллаж", description: "Профессиональная обработка" }
    ],
    instructor: {
      name: "Леготина Алена",
      bio: "Профессиональный дизайнер и фотограф с экспертизой в создании печатной продукции",
      experience: "10 лет в дизайне и фотографии"
    },
    certificate: true,
    support: "Поддержка куратора в течение всего курса + 10 готовых макетов",
    tags: ["photoshop", "дизайн", "макеты", "продвинутый"],
    level: "Продвинутый",
    category: "Дизайн",
    lessonsCount: 12,
    studentsCount: 32,
    rating: 4.9,
    maxStudents: 40,
    status: "active",
    createdAt: "2024-01-20"
  },
  {
    ...baseCourses[2],
    shortDescription: "Полный курс по управлению фотобизнесом с инструментами администрирования",
    fullDescription: "Комплексный курс для масштабирования фотобизнеса. Включает все предыдущие блоки плюс углубленное изучение ценообразования, работы с администрацией, партнерских отношений, легализации бизнеса и финансового контроля.",
    whatYouWillLearn: [
      "Все навыки из курсов 1 и 2 (фотография + дизайн)",
      "Профессиональное ценообразование фотоуслуг",
      "Эффективную работу с администрацией учебных заведений",
      "Построение партнерских отношений и сети контактов",
      "Легализацию деятельности и оформление договоров",
      "Мотивацию себя и контрагентов",
      "Найм и управление персоналом",
      "Планирование развития и делегирование",
      "Создание рекламных материалов",
      "Контроль финансов и ведение учета",
      "Работу с сувенирной продукцией",
      "Использование инструментов контроля и учета"
    ],
    forWhom: [
      "Действующие фотографы, желающие масштабировать бизнес",
      "Предприниматели в сфере образовательных услуг",
      "Владельцы фотостудий",
      "Специалисты, планирующие создать фотобизнес"
    ],
    requirements: [
      "Опыт фотосъемки (желательно коммерческий)",
      "Базовые знания Photoshop или готовность изучить",
      "Нацеленность на развитие бизнеса"
    ],
    modules: [
      {
        id: 1,
        title: "Блок 1 + 2: Фотография и Дизайн",
        description: "Полный объем из первых двух курсов",
        duration: "6 недель",
        lessons: [
          { id: 1, title: "Полная программа курса 'Особенности фотографии в школах/садах'", duration: "12 уроков", type: "theory" },
          { id: 2, title: "Полная программа курса 'Дизайн и создание макетов'", duration: "12 уроков", type: "practice" }
        ]
      },
      {
        id: 2,
        title: "Ценообразование и администрирование",
        description: "Основы коммерческой деятельности",
        duration: "2 недели",
        lessons: [
          { id: 3, title: "Ценообразование фотоуслуг с последующей печатью", duration: "90 мин", type: "theory" },
          { id: 4, title: "Работа с администрацией", duration: "75 мин", type: "theory" },
          { id: 5, title: "Чек-лист первого диалога с директором / проход через охрану", duration: "60 мин", type: "practice" }
        ]
      },
      {
        id: 3,
        title: "Партнерства и легализация",
        description: "Построение бизнес-отношений",
        duration: "1 неделя",
        lessons: [
          { id: 6, title: "Работа с партнёрами: как выстроить? Личные рекомендации", duration: "90 мин", type: "theory" },
          { id: 7, title: "Легализация / договора", duration: "75 мин", type: "theory" }
        ]
      },
      {
        id: 4,
        title: "Управление и мотивация",
        description: "Развитие команды и личной эффективности",
        duration: "1 неделя",
        lessons: [
          { id: 8, title: "Мотивация личная/контрагентов", duration: "60 мин", type: "theory" },
          { id: 9, title: "Найм контрагентов", duration: "75 мин", type: "theory" },
          { id: 10, title: "Рекомендации по дальнейшему развитию/делегированию/плану дохода/объема работы", duration: "90 мин", type: "theory" }
        ]
      },
      {
        id: 5,
        title: "Маркетинг и продажи",
        description: "Продвижение и работа с клиентами",
        duration: "1 неделя",
        lessons: [
          { id: 11, title: "Что и когда предлагать", duration: "60 мин", type: "theory" },
          { id: 12, title: "Макеты рекламы / особенности работы с рекламными материалами", duration: "90 мин", type: "practice" }
        ]
      },
      {
        id: 6,
        title: "Финансовый контроль",
        description: "Учет, контроль и планирование финансов",
        duration: "1 неделя",
        lessons: [
          { id: 13, title: "Сбор денег и контроль финансов", duration: "75 мин", type: "theory" },
          { id: 14, title: "Особенности работы с сувенирной продукцией", duration: "60 мин", type: "theory" },
          { id: 15, title: "Инструменты контроля, учёта, зарплатные листы", duration: "90 мин", type: "practice" }
        ]
      }
    ],
    gallery: [
      { id: 1, url: "/images/business1.jpg", title: "Бизнес-процессы", description: "Организация рабочего процесса" },
      { id: 2, url: "/images/business2.jpg", title: "Команда", description: "Работа с персоналом" }
    ],
    instructor: {
      name: "Леготина Алена",
      bio: "Успешный предприниматель в сфере фотографии с опытом построения и масштабирования бизнеса",
      experience: "12 лет в фотобизнесе, включая управление командой и развитие партнерской сети"
    },
    certificate: true,
    support: "Персональная поддержка и консультации по развитию бизнеса в течение 6 месяцев",
    tags: ["бизнес", "администрирование", "ценообразование", "эксперт"],
    level: "Эксперт",
    category: "Бизнес",
    lessonsCount: 15,
    studentsCount: 18,
    rating: 4.9,
    maxStudents: 25,
    status: "active",
    createdAt: "2024-02-01"
  }
];

// Функции для получения данных
export const getBaseCourses = (): BaseCourse[] => baseCourses;

export const getFullCourses = (): FullCourse[] => fullCourses;

export const getCourseById = (id: number): FullCourse | undefined => {
  return fullCourses.find(course => course.id === id);
};

export const getBaseCourseById = (id: number): BaseCourse | undefined => {
  return baseCourses.find(course => course.id === id);
};