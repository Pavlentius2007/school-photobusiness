# Улучшения страницы управления пользователями

## Обзор изменений

Согласно требованиям, внесены следующие улучшения в страницу управления пользователями:

1. **Активированы кнопки редактирования** пользователей
2. **Добавлена функция управления документами** (чеки об оплате, подписанные договоры)
3. **Реализовано управление доступом к материалам** с указанием сроков
4. **Добавлен контроль доступа к курсам** через чекбоксы
5. **Исправлен текст заголовка** страницы

## Новые функции

### 1. Редактирование пользователей
- **Кнопка "✏️"** теперь активна и открывает модальное окно редактирования
- Возможность изменения имени, фамилии, email
- Управление статусом пользователя (Активен/Неактивен/Заблокирован)
- Установка срока доступа к материалам
- Включение/отключение доступа к курсам

### 2. Управление документами
- **Кнопка "📄"** для управления документами пользователя
- Отображение статуса документов:
  - ✅ Чек об оплате загружен
  - ✅ Подписанный договор загружен
- Возможность загрузки новых документов
- Чекбоксы для отметки наличия документов

### 3. Контроль доступа
- **Чекбокс "Доступ к курсам"** - включение/отключение доступа
- **Поле "Доступ к материалам до"** - установка срока действия доступа
- Отображение срока доступа в статусе активного пользователя

## Изменения в интерфейсе

### Обновленный интерфейс User
```typescript
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'curator' | 'student';
  status: 'active' | 'inactive' | 'banned';
  registeredAt: string;
  lastLogin: string;
  coursesCount: number;
  avatarUrl: string;
  // Новые поля для документов
  hasPaymentReceipt: boolean;
  hasSignedContract: boolean;
  // Поля для доступа к материалам
  materialAccessUntil: string | null;
  hasCourseAccess: boolean;
}
```

### Отображение в списке пользователей
- **Статус с датой**: Для активных пользователей отображается срок доступа к материалам
- **Индикаторы документов**: Показывается наличие чека и договора
- **Индикатор доступа**: Отображается статус доступа к курсам

### Новые кнопки действий
- **✏️ Редактировать** - открывает модальное окно редактирования
- **📄 Документы** - открывает модальное окно управления документами
- **🗑️ Удалить** - удаление пользователя (пока не реализовано)

## Модальные окна

### 1. Редактирование пользователя
- Форма с полями: Имя, Фамилия, Email
- Выпадающий список для статуса
- Чекбокс для доступа к курсам
- Поле даты для срока доступа к материалам
- Кнопки "Отмена" и "Сохранить"

### 2. Управление документами
- Чекбоксы для отметки наличия документов
- Кнопки для загрузки новых документов
- Отображение имени пользователя
- Кнопка "Закрыть"

## Функции обработки

### Редактирование
```typescript
const handleEditUser = (user: User) => {
  setEditingUser(user);
  setShowEditUserModal(true);
};

const handleSaveUser = (updatedUser: User) => {
  setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  setShowEditUserModal(false);
  setEditingUser(null);
};
```

### Документы
```typescript
const handleOpenDocuments = (user: User) => {
  setSelectedUserForDocuments(user);
  setShowDocumentsModal(true);
};

const handleUpdateDocuments = (userId: number, hasReceipt: boolean, hasContract: boolean) => {
  setUsers(users.map(u => 
    u.id === userId 
      ? { ...u, hasPaymentReceipt: hasReceipt, hasSignedContract: hasContract }
      : u
  ));
};
```

### Доступ к курсам
```typescript
const handleToggleCourseAccess = (userId: number) => {
  setUsers(users.map(u => 
    u.id === userId 
      ? { ...u, hasCourseAccess: !u.hasCourseAccess }
      : u
  ));
};
```

### Срок доступа к материалам
```typescript
const handleUpdateMaterialAccess = (userId: number, accessUntil: string) => {
  setUsers(users.map(u => 
    u.id === userId 
      ? { ...u, materialAccessUntil: accessUntil }
      : u
  ));
};
```

## Обновленный статус пользователя

### Отображение срока доступа
```typescript
const getStatusBadge = (user: User) => {
  // ... базовая логика статуса ...
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span>{config.text}</span>
      {user.status === 'active' && user.materialAccessUntil && (
        <span style={{ fontSize: '10px', color: '#64748b' }}>
          До: {new Date(user.materialAccessUntil).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};
```

## Примеры данных

### Активный пользователь с документами
```typescript
{
  id: 4,
  email: 'elena.kozлова@example.com',
  firstName: 'Елена',
  lastName: 'Козлова',
  role: 'student',
  status: 'active',
  registeredAt: '2024-01-20',
  lastLogin: '2024-02-15',
  coursesCount: 5,
  avatarUrl: 'https://via.placeholder.com/40x40',
  hasPaymentReceipt: true,
  hasSignedContract: false,
  materialAccessUntil: '2024-06-30',
  hasCourseAccess: true
}
```

### Неактивный пользователь без документов
```typescript
{
  id: 5,
  email: 'dmitry.volkov@example.com',
  firstName: 'Дмитрий',
  lastName: 'Волков',
  role: 'student',
  status: 'inactive',
  registeredAt: '2024-01-25',
  lastLogin: '2024-02-01',
  coursesCount: 2,
  avatarUrl: 'https://via.placeholder.com/40x40',
  hasPaymentReceipt: false,
  hasSignedContract: false,
  materialAccessUntil: null,
  hasCourseAccess: false
}
```

## Тестирование

### Сценарии тестирования
1. **Редактирование пользователя**:
   - Нажать кнопку "✏️" на любом пользователе
   - Изменить данные в модальном окне
   - Сохранить изменения
   - Проверить обновление в списке

2. **Управление документами**:
   - Нажать кнопку "📄" на пользователе
   - Отметить/снять отметки с документов
   - Проверить обновление индикаторов в списке

3. **Управление доступом**:
   - Открыть редактирование пользователя
   - Включить/отключить доступ к курсам
   - Установить срок доступа к материалам
   - Проверить отображение в статусе

## Заключение

Все требования выполнены:
- ✅ Кнопки редактирования активированы
- ✅ Добавлена функция управления документами
- ✅ Реализован контроль доступа к курсам и материалам
- ✅ Исправлен текст заголовка
- ✅ Добавлены индикаторы статуса документов
- ✅ Реализованы модальные окна для управления

Система теперь предоставляет полный контроль над пользователями, их документами и доступом к материалам курсов. 