# Project Architecture Overview

**Проект:** DAOsail Prototype - Next.js App
**Версия:** 0.8.1
**Дата обновления:** 2025-09-26
**Статус:** Активная разработка - Phase 8.1 FAQ Agent MVP реализован

---

## 📊 Technology Stack

### Frontend
- **Framework:** Next.js 13.5.1 + React 18 + TypeScript
- **State Management:** React Context API (AppContext)
- **UI/CSS:** Tailwind CSS + Radix UI + Lucide React icons
- **Routing:** Next.js App Router (app/ directory)
- **Themes:** next-themes для dark/light mode

### Backend & Infrastructure
- **Database:** Supabase (PostgreSQL + Real-time + Storage)
- **Authentication:** Supabase Auth с Email/Password
- **API:** Supabase REST API + TypeScript SDK
- **Storage:** Supabase Storage для аватаров пользователей
- **Static Data:** Mock данные + реальные данные профилей
- **Persistence:** Supabase + localStorage для кэширования
- **Real-time:** Supabase Realtime для live обновлений
- **Future:** Интеграция с DAO платформами

### Key Dependencies
```json
{
  "next": "15.5.3",
  "react": "18.2.0",
  "typescript": "5.2.2",
  "@radix-ui/*": "различные версии UI primitives",
  "lucide-react": "^0.446.0",
  "tailwindcss": "3.3.3",
  "next-themes": "^0.3.0",
  "@supabase/supabase-js": "^2.x.x",
  "@supabase/ssr": "^0.x.x",
  "openai": "^4.x.x"
}
```

### AI & ML Stack
- **LLM Model:** OpenAI GPT-4o-mini для экономичных, но качественных ответов
- **Embeddings:** OpenAI text-embedding-ada-002 для vector поиска
- **Vector Database:** Supabase pgvector extension
- **RAG System:** Retrieval-Augmented Generation с базой знаний
- **Knowledge Base:** Структурированная база данных с парусной тематикой

---

## 🗂️ Project Structure

```
app/
├── (auth)/               # Auth layout group
│   ├── layout.tsx        # Layout для авторизации
│   ├── login/            # Страница входа
│   └── signup/           # Страница регистрации
├── (main)/               # Main layout group
│   ├── layout.tsx        # Основной layout с навигацией
│   ├── page.tsx          # Главная страница
│   ├── about/            # Страницы о клубе
│   │   ├── page.tsx      # Общая страница "О клубе"
│   │   └── concepts/     # Презентации и концепции
│   ├── chat/             # Страница чата с ИИ
│   ├── communities/      # Страница внешних сообществ
│   ├── community/        # Страница внутреннего сообщества
│   ├── dao/              # Страница DAO функций
│   ├── library/          # Страница библиотеки
│   ├── profile/          # Страница профиля с табами
│   └── tutorial/         # Страница обучения
├── api/                  # API Routes
│   ├── chat/             # OpenAI чат интеграция
│   ├── faq/              # FAQ агент с RAG поиском (NEW!)
│   └── search-knowledge/ # Поиск в базе знаний
├── layout.tsx            # Root layout
└── globals.css           # Глобальные стили

components/
├── layout/               # Layout компоненты
│   ├── left-sidebar.tsx  # Левая боковая панель
│   ├── right-sidebar.tsx # Динамический правый сайдбар (гость/пользователь)
│   ├── top-bar.tsx       # Верхняя панель с авторизацией
│   ├── footer.tsx        # Подвал
│   └── mobile-drawer.tsx # Мобильное меню
├── profile/              # Компоненты профиля
│   ├── profile-sidebar.tsx    # Персональный сайдбар
│   ├── profile-info-tab.tsx   # Вкладка информации профиля + аватары
│   ├── my-path-tab.tsx        # Вкладка прогресса пользователя
│   └── achievements-tab.tsx   # Вкладка достижений
└── ui/                   # Переиспользуемые UI компоненты
    ├── hero-card.tsx     # Главная карточка
    ├── chat-box.tsx      # Интерфейс чата (обновлен для FAQ)
    ├── citations-display.tsx # Показ источников FAQ (NEW!)
    ├── quick-questions.tsx # Быстрые вопросы
    ├── avatar-upload.tsx # Компонент загрузки аватаров
    ├── community-card.tsx # Карточки внешних сообществ
    ├── concept-card.tsx  # Карточки презентаций и концепций
    └── ...               # Другие UI компоненты

lib/
├── contexts/
│   └── app-context.tsx   # Глобальный контекст + интеграция с Supabase
├── supabase/             # Supabase интеграция
│   ├── client.ts         # Supabase client
│   ├── server.ts         # Server-side client
│   ├── types.ts          # TypeScript типы для БД
│   └── profile-service.ts # Сервис для работы с профилями + real-time
├── services/             # Бизнес-логика сервисы
│   ├── achievement-service.ts # Система автоматических достижений
│   ├── chat-service.ts   # Сервис для работы с OpenAI API
│   └── embedding-service.ts # Работа с vector embeddings
├── types/
│   ├── profile.ts        # Типы для профилей пользователей
│   └── assistants.ts     # Типы ассистентов + FAQ messages (NEW!)
├── config/
│   └── roles.ts          # Конфигурация ролей и прогресса
└── utils.ts              # Общие утилиты

data/
├── chat-messages.ts      # Mock данные для чата
└── mock-profile.ts       # Mock данные профилей для разработки

supabase/                 # Supabase CLI конфигурация
├── migrations/           # Миграции базы данных
│   ├── 001_create_profiles_schema.sql
│   ├── 002_setup_vector_embeddings.sql
│   └── 20250926000001_create_faq_tables.sql (NEW!)
├── functions/            # Edge Functions
│   └── handle-faq/       # FAQ агент с RAG (NEW!)
├── config.toml          # Конфигурация Supabase CLI
└── seed.sql             # Начальные данные + база знаний

scripts/                  # Утилиты и скрипты
├── embeddings/           # Работа с векторной БД (NEW!)
│   ├── upload-faq.ts     # Загрузка FAQ документов
│   └── package.json      # Зависимости для embeddings
├── test-faq.js          # Тестирование FAQ агента (NEW!)
└── simple-faq-data.md   # Тестовые данные FAQ (NEW!)
```

---

## 🏗️ Core Architecture Decisions

### 1. UI Architecture: Radix UI + Tailwind CSS

**Решение:** Radix UI primitives + Tailwind CSS для стилизации  
**Обоснование:**
- ✅ Высокая доступность (accessibility) из коробки
- ✅ Гибкая кастомизация через Tailwind
- ✅ Составные компоненты (composable components)
- ✅ TypeScript поддержка

**Альтернативы рассмотрены:**
- ❌ Material UI - слишком опинионированный дизайн
- ❌ Chakra UI - меньше контроля над стилизацией

**Структура компонентов:**
```typescript
// Пример Radix UI компонента
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <Card className="p-4">
      <CardContent>
        <Button variant="outline">Action</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. State Management: React Context API

**Решение:** React Context API вместо сторонних библиотек  
**Обоснование:**
- ✅ Встроено в React, нет дополнительных зависимостей
- ✅ Простота для небольших/средних приложений
- ✅ TypeScript поддержка из коробки
- ✅ Легкое тестирование

### 3. Routing: Next.js App Router

**Решение:** App Router (app/) вместо Pages Router  
**Обоснование:**
- ✅ Современный подход Next.js 13+
- ✅ Встроенные layouts и nested routing
- ✅ Лучшая производительность
- ✅ Server Components поддержка

---

## 🔧 Key Services & Components

### App Context (lib/contexts/app-context.tsx)
**Назначение:** Глобальное состояние приложения  
**Ключевые возможности:**
```typescript
interface AppContextType {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
  responsesLeft: number;
  isAuthenticated: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  decrementResponses: () => void;
  resetResponses: () => void;
  setAuthenticated: (value: boolean) => void;
}
```

**Архитектурные особенности:**
- Персистентность настроек в localStorage
- Автоматическое применение темы к document
- Многоязычность ru/en
- Управление лимитами для незарегистрированных пользователей

### UI Components (components/ui/)
**Назначение:** Переиспользуемые UI компоненты на базе Radix UI  
**Ключевые компоненты:**
- `HeroCard` → главная карточка с градиентами и анимациями
- `ChatBox` → полнофункциональный чат с OpenAI API + поиск + кнопка "Назад"
- `QuickQuestions` → быстрые вопросы для начала диалога
- `SoftGateBanner` → баннер с ограничениями для гостей
- `EmailCapture` → форма сбора email для гостевого режима
- `AssistantDock` → плавающая панель быстрого доступа к ассистентам

**Паттерны:**
```typescript
// Пример компонента с локализацией
export function MyComponent() {
  const { language } = useAppContext();
  
  return (
    <div>
      {language === 'ru' ? 'Текст' : 'Text'}
    </div>
  );
}
```

### Layout System (components/layout/)
**Назначение:** Структурные компоненты приложения  
**Компоненты:**
- `LeftSidebar` → навигация по разделам
- `RightSidebar` → дополнительная информация
- `TopBar` → переключатели темы/языка
- `Footer` → подвал сайта
- `MobileDrawer` → мобильная навигация

### ProfileService (lib/supabase/profile-service.ts)
**Назначение:** Полный сервис для работы с профилями пользователей
**Ключевые возможности:**
```typescript
- getFullProfile(userId) → загрузка полного профиля
- transformToAppProfile() → преобразование из Supabase в формат приложения
- updateProfile() / updateStats() → обновление данных
- incrementStat() → инкремент статистики с автоматической проверкой достижений
- uploadAvatar() → загрузка аватаров в Supabase Storage
- checkAndPromoteRole() → автоматическое повышение ролей
- subscribeToProfile() → real-time подписка на изменения профиля
```

### AchievementService (lib/services/achievement-service.ts)
**Назначение:** Автоматическая система достижений
**Ключевые возможности:**
```typescript
- checkAndAddAchievements() → проверка и добавление новых достижений
- getAllTemplates() → получение всех шаблонов достижений
- getProgressForAchievement() → расчет прогресса для достижения
- 12 предустановленных достижений в категориях:
  * engagement (вопросы, активность)
  * learning (уроки, статьи)
  * social (сообщество)
  * progression (повышение ролей)
  * special (особые достижения)
```

### AvatarUpload Component (components/ui/avatar-upload.tsx)
**Назначение:** Интерактивный компонент загрузки аватаров
**Ключевые возможности:**
- Drag & Drop интерфейс с предпросмотром
- Валидация файлов (тип, размер до 5MB)
- Интеграция с Supabase Storage
- Responsive дизайн для разных размеров
- Состояния загрузки с индикаторами

### ChatService (lib/services/chat-service.ts)
**Назначение:** Полная интеграция с OpenAI API и управление чатами
**Ключевые возможности:**
```typescript
- sendMessage() → отправка к GPT-4o-mini с контекстом
- createChatSession() → создание новых сессий чата
- getChatSessions() → история чатов пользователя
- validateMessage() → валидация пользовательского ввода
- generateChatTitle() → автогенерация заголовков чата
- getQuickQuestions() → контекстные быстрые вопросы для ассистентов
```

### EmbeddingService (lib/services/embedding-service.ts)
**Назначение:** RAG система для работы с базой знаний
**Ключевые возможности:**
```typescript
- searchKnowledgeBase() → семантический поиск по базе знаний
- addKnowledgeDocument() → добавление новых документов
- getDocumentsByCategory() → фильтрация по категориям
- getContextForAI() → формирование контекста для ИИ
- Vector embeddings через OpenAI text-embedding-ada-002
- Интеграция с Supabase pgvector для быстрого поиска
```

### OpenAI API Integration
**API Routes:**
- `/api/chat` → основной чат с GPT-4o-mini + RAG
- `/api/search-knowledge` → поиск в базе знаний

**Специализированные ассистенты (NEW v0.6.1):**
- **ЦПК (Navigator)** → основы парусного спорта, навигация, погода, оборудование
- **Шкипер Инструктор (Sailing Coach)** → техника парусного спорта и обучение
- **Шкипер ДАО (DAO Advisor)** → управление DAO и голосование
- **Шкипер Партнер (AI Guide)** → ИИ технологии и автоматизация [PREMIUM]
- **Шкипер Компаньон (Personal)** → личная помощь и организация [AUTH REQUIRED]
- **Стюард (Steward)** → административная поддержка и услуги

### Mock Data (data/)
**Назначение:** Fallback данные (больше не используются в чате)
**Структура:**
- `mock-profile.ts` → fallback профили для разработки

---

## 📡 Data Flow & Integration Patterns

### 1. Theme Switching Flow
```
User Click → toggleTheme() in AppContext →
├── Update theme state ('light' | 'dark')
├── Apply to document.documentElement.classList
├── Save to localStorage
└── Re-render with new theme
```

### 2. Language Switching Flow
```
User Click → toggleLanguage() in AppContext →
├── Update language state ('en' | 'ru')
├── Save to localStorage
├── Re-render all components with new language
└── Update all UI text accordingly
```

### 3. Chat Message Flow (Mock)
```
User Input → ChatBox.handleSend() →
├── Check responsesLeft limit
├── Add user message to local state
├── Show typing indicator
├── Simulate AI response (setTimeout)
├── Add AI response to messages
├── decrementResponses() in context
└── Update UI state
```

### 4. Navigation Flow
```
User Click → Next.js Link →
├── App Router handles routing
├── Load appropriate page.tsx
├── Maintain layout from layout.tsx
└── Update URL and browser history
```

---

## 🎯 Development Standards

### Code Organization
- **1 компонент = 1 файл**
- **Сервисы в lib/** для переиспользования
- **TypeScript строгий** - no any (кроме исключений)
- **Именование:** camelCase для переменных, PascalCase для компонентов

### Database Patterns  
- **UUID** для всех Primary Keys
- **JSONB** для сложных структур данных
- **RLS** для безопасности на уровне строк
- **Миграции** через scripts с логированием

### Error Handling
- **Try/catch** в async функциях
- **User-friendly** сообщения об ошибках
- **Консольное логирование** для отладки
- **Fallback состояния** в UI

### Performance Optimizations  
- **Оптимизированный polling** OpenAI API
- **Zustand selective subscriptions**
- **GIN индексы** для JSONB queries
- **Минимальные re-renders** в React

---

## 📋 Current Implementation Status

### ✅ Готово (v0.6.1 - Assistant System Redesign Complete)
**Phase 1: Basic Prototype**
- [x] Next.js 15 App Router структура
- [x] Radix UI + Tailwind CSS дизайн-система
- [x] Многоязычность (ru/en) через AppContext
- [x] Темизация (light/dark) с next-themes
- [x] Responsive дизайн для mobile/desktop
- [x] Mock чат с ИИ (имитация диалога)
- [x] Навигация по основным разделам
- [x] Soft gate для незарегистрированных пользователей

**Phase 2: Authentication & Profiles**
- [x] Supabase интеграция и настройка
- [x] Система аутентификации (Email/Password)
- [x] Страницы регистрации и входа
- [x] Система профилей с ролями (Интересующийся → Пассажир → Матрос)
- [x] Достижения пользователей с категориями
- [x] Статистика активности и прогресс
- [x] Персональный сайдбар с динамическим переключением
- [x] Табовый интерфейс профиля (Профиль / Мой Путь / Достижения)

**Phase 3: Database & Services (Завершена)**
- [x] Supabase CLI настройка и миграции
- [x] Схема базы данных (profiles, user_stats, user_achievements, user_chats)
- [x] RLS политики безопасности
- [x] ProfileService для работы с данными
- [x] TypeScript типы для Supabase интеграции
- [x] Supabase Storage настройка для аватаров
- [x] Интеграция ProfileService с AppContext
- [x] Компонент загрузки и управления аватарами (AvatarUpload)
- [x] Real-time система достижений с автоматическим назначением
- [x] Автоматическое повышение ролей на основе статистики
- [x] AchievementService с 12 предустановленными достижениями
- [x] Seed данные и тестовые профили для разработки

**Phase 4: AI Integration & Advanced Features (Завершена)**
- [x] **OpenAI API интеграция** - GPT-4o-mini с полной поддержкой чата
- [x] **RAG система** - Vector embeddings с Supabase pgvector
- [x] **База знаний** - Структурированные данные по парусному спорту
- [x] **Специализированные ассистенты** - Навигатор и Шкипер с разными ролями
- [x] **Реальный чат** - Замена mock данных на OpenAI API
- [x] **Контекстные ответы** - ИИ использует базу знаний для точных ответов
- [x] **Автоматическая статистика** - Интеграция с системой достижений

**Phase 5: Guest Flow & Lead Generation (Завершена)**
- [x] **Двухэтапный гостевой флоу** - 3 вопроса → email → 3 вопроса → регистрация
- [x] **Email Capture компонент** - Красивая форма для сбора контактов
- [x] **Умные лимиты** - Soft limit (3 вопроса) и hard limit (6 вопросов)
- [x] **AppContext расширен** - Новые состояния для гостевого режима (guestStage, emailCaptured, totalQuestionsAsked)

**Phase 6: Navigation Context & Chat Search (Завершена v0.6.0)**
- [x] **SQL миграции** - Таблицы navigation_history, chat_sessions, chat_search_index
- [x] **Navigation History** - Отслеживание переходов пользователя для умной кнопки "Назад"
- [x] **Full-text Search** - Поиск по содержимому чатов с PostgreSQL FTS (русский + английский)
- [x] **AssistantDock** - Адаптивная плавающая панель с доступом к ассистентам
- [x] **Smart Back Button** - Точный возврат на исходную страницу из чата
- [x] **Mobile UX** - Dock скрывается при скролле, экспандится по тапу
- [x] **Supabase Functions** - search_user_chats(), get_user_navigation_context()
- [x] **AppContext Navigation** - Методы сохранения и восстановления контекста навигации
- [x] **ChatBox интеграция** - Автоматический показ форм в нужный момент
- [x] **Обновленные промпты** - Ограничение эмоджи до 1 на ответ
- [x] **Lead generation готовность** - Структура для сохранения email в Supabase
- [ ] **Таблица email_leads** - Создание в Supabase для сохранения лидов
- [ ] **Регистрационная форма** - Интеграция существующей формы для этапа 2

**Phase 6.1: Assistant System Redesign (Завершена v0.6.1)**
- [x] **Новая типизация ассистентов** - 6 специализированных типов с русскими/английскими названиями
- [x] **AssistantSelector компонент** - Красивые карточки с градиентами и иконками
- [x] **Роль-базированный доступ** - Премиум и авторизированные ассистенты
- [x] **Интеграция с чатом** - Обновленные бейджи/аватары ассистентов в ChatBox
- [x] **URL параметры** - Поддержка прямых ссылок на ассистентов (/chat?assistant=sailing_coach)
- [x] **Визуальные индикаторы** - Locked/unlocked состояния с корректными сообщениями

**Phase 7.0: Content Pages & Community Links (Завершена v0.7.0)**
- [x] **React hooks исправление** - Устранена ошибка порядка хуков в LeftSidebar
- [x] **Страница "Наши сообщества"** - /communities с карточками внешних ресурсов
- [x] **CommunityCard компонент** - Универсальные карточки с tooltip и external links
- [x] **Раздел "О клубе"** - Новая навигационная группа между Chat и Yachting
- [x] **Страница концепций** - /about/concepts с 7 карточками ключевых документов
- [x] **ConceptCard компонент** - Тематические карточки с цветовой дифференциацией
- [x] **Tooltip интеграция** - Полные описания при наведении курсора
- [x] **Accessibility улучшения** - Keyboard navigation и screen reader support

**Phase 7.1: File Upload System (Завершена)**
- [x] **File upload infrastructure** - Базовая система загрузки файлов
- [x] **Supabase Storage integration** - Подключение к хранилищу файлов
- [x] **Chat file attachments** - Возможность прикреплять файлы к сообщениям
- [x] **Error handling** - Graceful fallback при недоступности storage

**Phase 7.2: Architecture Analysis & Code Quality (Завершена)**
- [x] **Architectural review** - Глубокий анализ структуры проекта с recommendations
- [x] **Security improvements** - ENV validation, secure CORS headers, .env.example
- [x] **Code quality tools** - TypeScript ES2015, npm scripts (typecheck, audit, analyze)
- [x] **Migration consolidation** - Unified supabase/migrations/ structure
- [x] **Type system cleanup** - AssistantType enum standardization
- [x] **Documentation upgrade** - Professional README.md, REVIEW.md production checklist
- [x] **Dependency updates** - Security audit (0 vulnerabilities), caniuse-lite update
- [x] **Development infrastructure** - Analysis tools (depcheck, ts-prune)

**Phase 8.0: Database Fixes & Email Integration (Завершена)**
- [x] **Email leads table** - Создана таблица для сохранения email гостей (migration 008)
- [x] **Profile email integration** - Email теперь сохраняется и отображается в профилях (migration 009)
- [x] **Profile editing fix** - Исправлено редактирование никнейма, города, описания
- [x] **TypeScript types update** - Обновлены типы для поддержки email в profiles
- [ ] **Email leads API** - REST endpoint для сохранения email из формы email-capture
- [ ] **Guest chat tracking** - Связывание гостевых чатов с email лидами

**Phase 8.1: FAQ Agent MVP (Завершена v0.8.1) 🎉**
- [x] **FAQ Agent Architecture** - Полноценный RAG-агент с векторным поиском
- [x] **Database Schema** - Таблицы chat_messages, knowledge_chunks + match_docs RPC function
- [x] **Edge Function** - handle-faq с OpenAI API интеграцией и поиском по БЗ
- [x] **API Integration** - /api/faq route для фронтенд интеграции
- [x] **Chat UI Updates** - Поддержка FAQ режима в ChatBox с citations display
- [x] **Citations Component** - Красивый показ источников с релевантностью
- [x] **Embeddings Pipeline** - Скрипты загрузки документов в векторную БД
- [x] **Testing Infrastructure** - Локальное тестирование агента с моковыми данными
- [x] **Prompt Engineering** - Строгий промпт без галлюцинаций, только по базе знаний
- [x] **TypeScript Integration** - Расширенные типы для FAQ messages с citations

### 📋 Планируется (Phase 9: Advanced RAG Features)
- [ ] **Multi-agent Orchestration** - Мета-агент с под-агентами (Тренер, DAO, FAQ)
- [ ] **Knowledge Base Expansion** - Загрузка полной базы знаний DAOsail
- [ ] **Advanced Search** - Семантический поиск с фильтрами по ролям и категориям
- [ ] **Context Optimization** - Умное управление контекстом для ответов ИИ
- [ ] **Performance Optimization** - Sub-second response times для поиска

### 📋 Планируется (Phase 8: Social & Advanced Features)
- [ ] Система лидербордов и рейтингов
- [ ] Социальные функции (друзья, группы)
- [ ] DAO функциональность и интеграция с блокчейном
- [ ] Система токенов и вознаграждений
- [ ] Интеграция с парусными данными и картами
- [ ] API для сторонних разработчиков
- [ ] PWA функциональность
- [ ] Аналитика и метрики использования

---

## 🔄 Evolution & Migration Strategy

### Подход к изменениям
1. **Документировать решение** в этом файле
2. **Database changes** → DATABASE_CHANGELOG.md
3. **Backward compatibility** когда возможно
4. **Feature flags** для экспериментальной функциональности

### Migration Pattern
```
Planning → Implementation → Testing → Documentation → Deployment
    ↓           ↓              ↓           ↓            ↓
  This file  Code+Tests    Manual QA   Update docs   Git push
```

---

## 🗄️ Database Schema Overview

### Supabase Tables Structure
```sql
-- Профили пользователей
profiles (id, full_name, nickname, avatar_url, city, bio, role, join_date, timestamps)

-- Статистика активности
user_stats (id, questions_asked, lessons_completed, articles_read, community_messages, last_login_date, total_logins, timestamps)

-- Достижения пользователей
user_achievements (id, user_id, achievement_id, title, title_ru, description, description_ru, icon_name, category, unlocked_at, timestamps)

-- История чатов
user_chats (id, user_id, title, assistant_type, main_topic, messages_count, last_activity, timestamps)

-- Навигационный контекст (NEW v0.6.0!)
navigation_history (
  id, user_id, previous_url, previous_title, current_url,
  section, content_type, content_id, scroll_position,
  viewport_width, viewport_height, user_agent, session_id, timestamps
)

-- Сессии чатов (NEW v0.6.0!)
chat_sessions (
  id, user_id, title, assistant_type, timestamps
)

-- Поисковый индекс чатов (NEW v0.6.0!)
chat_search_index (
  id, user_id, chat_session_id, message_id, message_content,
  message_role, assistant_type, chat_title,
  search_vector tsvector, timestamps
)

-- База знаний с vector embeddings (NEW v0.8.1!)
knowledge_chunks (
  id, doc_id, chunk_idx, text, embedding vector(1536),
  accessible_roles text[], tags text[], url, updated_at
)

-- Сообщения FAQ агента (NEW v0.8.1!)
chat_messages (
  id, session_id, role, content, agent, created_at, meta jsonb
)
```

### Vector Search & RAG System
- **pgvector extension** включен для семантического поиска
- **Embeddings model** OpenAI text-embedding-ada-002 (1536 dimensions)
- **Search function** match_docs(query_embedding, match_count, roles[], min_similarity) с role-based доступом
- **FAQ Agent** - Полноценный RAG-агент с citations и строгими guardrails против галлюцинаций
- **Categories** sailing_basics, navigation, safety, weather, equipment, racing, etc.
- **Languages** поддержка ru/en контента

### Navigation & Chat Search Functions (NEW v0.6.0)
- **search_user_chats()** полнотекстовый поиск по чатам с ранжированием
- **get_user_navigation_context()** получение последнего контекста навигации
- **Full-text search** PostgreSQL FTS с поддержкой русского и английского
- **Автоматическая индексация** сообщений чата в search_vector
- **RLS policies** строгая безопасность на уровне строк

### Storage Buckets
- **avatars** - Аватары пользователей с RLS политиками

### Real-time Features
- Live обновления профилей пользователей
- Автоматическое получение достижений
- Синхронизация статистики активности

---

---

## 🎉 Phase 4.1 Completion Summary

**Фаза 4.1: AI Integration** успешно завершена (2025-09-15)

### ✅ Основные достижения:
1. **🤖 OpenAI API интеграция** - GPT-4o-mini работает с полной поддержкой чата
2. **🧠 RAG система** - Vector embeddings + Supabase pgvector для контекстных ответов
3. **📚 База знаний** - Структурированная информация по парусному спорту
4. **⚓ Специализированные ассистенты** - Навигатор и Шкипер с разной экспертизой
5. **💬 Реальный чат** - Полная замена mock данных на OpenAI API
6. **📊 Smart статистика** - Автоматическое обновление достижений при использовании чата

### 🔧 Технические улучшения:
- **ChatService** - Полный сервис для работы с OpenAI API
- **EmbeddingService** - RAG система с семантическим поиском
- **API Routes** - `/api/chat` и `/api/search-knowledge` для backend логики
- **Vector Database** - pgvector extension с optimized поиском
- **Контекстные промпты** - ИИ использует релевантные данные из базы знаний
- **Валидация сообщений** - Проверка длины и корректности ввода
- **Обновленный UI** - Персонализированные аватары ассистентов

### 🚀 Готово к использованию:
- **Настоящие ответы** от GPT-4o-mini на вопросы по парусному спорту
- **Контекстная осведомленность** - ИИ знает специфику парусного спорта из базы знаний
- **Два типа экспертов** - Навигатор для новичков, Шкипер для продвинутых
- **Система лимитов** - Гости получают ограниченное количество ответов
- **Автоматические достижения** - Пользователи получают достижения за активность в чате

### 📊 Следующие шаги Phase 4.2:
- Streaming responses для лучшего UX
- Персистентное хранение чатов в Supabase
- File upload система
- Toast уведомления для достижений

---

## 🔧 Phase 4.1.1 Bug Fix Summary (2025-09-16)

**Критический баг с регистрацией пользователей исправлен:**

### 🐛 Проблема:
- Регистрация новых пользователей не работала (ошибка "Database error saving new user")
- 500 ошибка от Supabase auth/signup endpoint
- Конфликт между автоматической функцией БД и нашей логикой создания профилей

### ✅ Решение:
1. **Удалена проблемная функция** `create_profile_for_user` из БД
2. **Реализована правильная функция** `createInitialProfile` в app-context.tsx
3. **Исправлен импорт** TrendingUp иконки в achievements-tab.tsx
4. **Улучшено логирование** ошибок для диагностики

### 🔧 Технические изменения:
- **lib/contexts/app-context.tsx**: полная реализация createInitialProfile с созданием записей в Supabase
- **components/profile/achievements-tab.tsx**: добавлен импорт TrendingUp
- **Database**: удалена конфликтующая функция create_profile_for_user
- **lib/supabase/profile-service.ts**: улучшено логирование ошибок

### 🎯 Результат:
- ✅ Регистрация работает через /signup страницу
- ✅ Создание пользователей через Supabase Dashboard работает
- ✅ Автоматическое создание профиля и статистики при регистрации
- ✅ Вкладка достижений работает без ошибок
- ✅ Система готова к Phase 4.2 развитию

## 🎯 Phase 5.0 Guest Flow Implementation Summary (2025-01-17)

**Двухэтапный гостевой режим с email capture реализован:**

### 🚀 Новая функциональность:
- **Умный лимит вопросов**: 3 вопроса → email → 3 вопроса → регистрация
- **Email Capture форма**: Красивый компонент для сбора контактов на этапе 1
- **Registration Prompt**: Мотивирующее сообщение на этапе 2
- **UX оптимизация**: Мягкий переход между этапами без резких блокировок

### 🔧 Технические изменения:

#### **lib/contexts/app-context.tsx**:
- Добавлены новые состояния: `guestStage`, `emailCaptured`, `totalQuestionsAsked`
- Реализована функция `captureEmail()` для сохранения лидов
- Обновлена логика `decrementResponses()` для двухэтапного флоу
- Добавлена поддержка сохранения в таблицу `email_leads`

#### **components/ui/email-capture.tsx** (новый файл):
- Responsive форма с валидацией email
- Поддержка многоязычности (ru/en)
- Состояния loading и success
- Кнопка "Позже" для пропуска этапа
- Красивый дизайн с градиентами и иконками

#### **components/ui/chat-box.tsx**:
- Интеграция EmailCapture после 3-го вопроса
- Форма регистрации после 6-го вопроса
- Условный рендеринг на основе `guestStage`
- Обновленные импорты и контекст

#### **next.config.js**:
- Убран `output: 'export'` для совместимости с API routes
- Исправлена ошибка с серверными функциями

### 📊 UX Flow:
1. **Этап 1** (вопросы 1-3): Свободное общение с ИИ
2. **Email Capture**: "Вижу, вас заинтересовал наш клуб! Оставьте email..."
3. **Этап 2** (вопросы 4-6): Еще 3 вопроса после email / кнопки "Позже"
4. **Registration**: "Зарегистрируйтесь для избежания спама..."

### 🎯 Результат:
- ✅ Гостевой флоу работает без блокировок
- ✅ Email capture готов к сохранению в Supabase
- ✅ Мягкая мотивация к регистрации
- ✅ Сохранение UX качества на всех этапах
- 🔄 Готово к интеграции с Supabase email_leads таблицей

### 📋 Осталось доработать:
- [ ] Создать таблицу `email_leads` в Supabase
- [ ] Интегрировать существующую форму регистрации
- [ ] Обновить промпты ИИ (лимит 1 эмоджи)
- [ ] Улучшить CSS для длинных сообщений

---

## 🚀 Claude 4.5 Architecture Recommendations

### 1. Next.js App Router Optimization

**Текущая оценка:**
- ✅ Хорошо: App Router структура с route groups
- ✅ Хорошо: Server/Client Components разделение
- ⚠️ Улучшить: Некоторые компоненты могут быть Server Components
- ⚠️ Улучшить: Code splitting для route groups

**Рекомендации:**
```typescript
// Анализ текущих компонентов:

// ✅ Правильно Client Components:
// - components/ui/chat-box.tsx (useState, useEffect)
// - components/ui/email-capture.tsx (forms, state)
// - components/layout/mobile-drawer.tsx (interactions)

// ⚠️ Могут быть Server Components:
// - components/ui/hero-card.tsx (статичный контент)
// - components/ui/community-card.tsx (если нет onClick)
// - components/profile/achievements-tab.tsx (если данные из props)

// 🎯 Code Splitting Pattern:
// app/(main)/chat/page.tsx
export default async function ChatPage() {
  // Server Component для начальной загрузки
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatBoxClient /> {/* Dynamic import */}
    </Suspense>
  );
}
```

### 2. React Context Performance

**Текущая проблема:**
- AppContext содержит все состояния (theme, language, auth, guest flow)
- Любое изменение вызывает re-render всех подписчиков

**Рекомендации:**
```typescript
// Разделить на специализированные контексты:

// 1. ThemeContext (редкие изменения)
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. LocaleContext (редкие изменения)
interface LocaleContextType {
  language: 'en' | 'ru';
  toggleLanguage: () => void;
}

// 3. AuthContext (средние изменения)
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials) => Promise<void>;
  logout: () => Promise<void>;
}

// 4. GuestFlowContext (частые изменения)
interface GuestFlowContextType {
  responsesLeft: number;
  guestStage: number;
  emailCaptured: string | null;
  totalQuestionsAsked: number;
  decrementResponses: () => void;
  captureEmail: (email: string) => Promise<void>;
}

// Преимущества:
// - Компоненты подписываются только на нужные данные
// - Меньше re-renders
// - Лучшая производительность
```

### 3. Component Memoization Strategy

**Анализ компонентов:**
```typescript
// 🎯 Высокий приоритет для memo:

// ChatBox - много state, частые updates
export const ChatBox = React.memo(({
  assistantType,
  onBack
}: ChatBoxProps) => {
  // Использовать useCallback для функций
  const handleSend = useCallback((message: string) => {
    // logic
  }, [assistantType]);

  // Использовать useMemo для вычислений
  const filteredMessages = useMemo(
    () => messages.filter(m => m.agent === assistantType),
    [messages, assistantType]
  );

  return <div>...</div>;
});

// AssistantDock - scroll events
export const AssistantDock = React.memo(() => {
  const handleScroll = useMemo(
    () => debounce(() => {
      // scroll logic
    }, 100),
    []
  );

  return <div>...</div>;
});

// ProfileInfoTab - real-time updates
export const ProfileInfoTab = React.memo(({ profile }: Props) => {
  // Selective context subscription
  const updateProfile = useAppContext(ctx => ctx.updateProfile);

  return <div>...</div>;
});
```

### 4. Database Query Optimization

**Текущие запросы:**
```typescript
// ⚠️ Можно оптимизировать:
const { data } = await supabase
  .from('profiles')
  .select('*'); // выбираем всё

// ✅ Лучше (только нужные поля):
const { data } = await supabase
  .from('profiles')
  .select(`
    id,
    full_name,
    nickname,
    avatar_url,
    role,
    user_stats(questions_asked, lessons_completed)
  `)
  .eq('id', userId)
  .single();
```

**Рекомендации для FAQ Agent:**
```typescript
// Оптимизация match_docs:
create or replace function match_docs(
  query_embedding vector(1536),
  match_count int default 5,
  user_roles text[] default array['гость']::text[],
  min_similarity float default 0.7 -- добавить threshold
) returns table (
  id uuid,
  text text,
  similarity float,
  url text
)
language sql stable
as $$
  select
    id,
    text,
    1 - (embedding <=> query_embedding) as similarity,
    url
  from knowledge_chunks
  where
    accessible_roles && user_roles
    and 1 - (embedding <=> query_embedding) > min_similarity -- фильтр до sort
  order by embedding <=> query_embedding
  limit match_count;
$$;

// Добавить индекс для ролей:
create index if not exists idx_knowledge_chunks_roles
on knowledge_chunks using gin(accessible_roles);
```

### 5. RAG System Enhancements

**Текущая реализация (v0.8.1):**
- ✅ Vector search работает
- ✅ Citations отображаются
- ⚠️ Нет кэширования embeddings
- ⚠️ Нет reranking результатов

**Рекомендации:**
```typescript
// 1. Кэширование embeddings для часто задаваемых вопросов:
interface EmbeddingsCache {
  [questionHash: string]: {
    embedding: number[];
    timestamp: number;
    hits: number;
  };
}

// 2. Reranking для улучшения релевантности:
async function rerankResults(
  results: SearchResult[],
  userQuery: string
): Promise<SearchResult[]> {
  // Использовать cross-encoder модель для reranking
  // Или простой BM25 scoring по ключевым словам
  return results.sort((a, b) => {
    const scoreA = calculateRelevance(a.text, userQuery);
    const scoreB = calculateRelevance(b.text, userQuery);
    return scoreB - scoreA;
  });
}

// 3. Adaptive threshold по ролям:
const similarityThresholds = {
  'гость': 0.75,      // строже для гостей
  'пассажир': 0.70,   // средне
  'матрос': 0.65,     // более свободно
};
```

### 6. OpenAI API Optimizations

**Текущая реализация:**
- ✅ Хорошо: GPT-4o-mini для экономии
- ⚠️ Улучшить: нет streaming
- ⚠️ Улучшить: нет error retry logic

**Рекомендации:**
```typescript
// 1. Streaming для лучшего UX:
export async function streamChatResponse(
  messages: ChatMessage[],
  onChunk: (text: string) => void
) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      onChunk(content);
    }
  }
}

// 2. Exponential backoff retry:
async function callOpenAIWithRetry(
  fn: () => Promise<any>,
  maxRetries = 3
): Promise<any> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) throw error;

      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 3. Prompt caching (новая фича OpenAI):
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: systemPrompt,
      // Пометить для кэширования:
      cache_control: { type: 'ephemeral' }
    },
    ...userMessages
  ],
});
```

### 7. Type Safety Improvements

**Текущая оценка:**
- ✅ Хорошо: AssistantType enum
- ✅ Хорошо: Supabase types в lib/supabase/types.ts
- ⚠️ Улучшить: Type guards для runtime проверок
- ⚠️ Улучшить: Discriminated unions для messages

**Рекомендации:**
```typescript
// 1. Type guards для FAQ messages:
interface BaseChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FAQMessage extends BaseChatMessage {
  agent: 'faq';
  citations: Citation[];
  trace?: {
    context_chunks: number;
    similarity_avg: number;
  };
}

interface RegularMessage extends BaseChatMessage {
  agent: Exclude<AssistantType, 'faq'>;
  citations?: never;
}

type ChatMessage = FAQMessage | RegularMessage;

// Type guard:
function isFAQMessage(msg: ChatMessage): msg is FAQMessage {
  return msg.agent === 'faq' && 'citations' in msg;
}

// 2. Строгие типы для Supabase:
type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// 3. Zod validation для API:
import { z } from 'zod';

const FAQRequestSchema = z.object({
  session_id: z.string().uuid(),
  user_message: z.string().min(1).max(500),
  user_role: z.enum(['гость', 'пассажир', 'матрос']),
  prefs: z.object({
    lang: z.enum(['ru', 'en']),
  }),
});

export type FAQRequest = z.infer<typeof FAQRequestSchema>;
```

### 8. Security & RLS Enhancements

**Проверить:**
- RLS политики для всех таблиц
- API key безопасность в Edge Functions
- Input validation для user messages
- Rate limiting для guest users

**Рекомендации:**
```sql
-- Проверить RLS для новых таблиц:

-- knowledge_chunks (public read, admin write)
create policy "Public can read knowledge chunks"
on knowledge_chunks for select
using (true);

create policy "Only admins can modify knowledge chunks"
on knowledge_chunks for all
using (auth.jwt() ->> 'role' = 'admin');

-- chat_messages (users own messages)
create policy "Users can access own chat messages"
on chat_messages for all
using (
  session_id in (
    select id from chat_sessions
    where user_id = auth.uid()
  )
);

-- Rate limiting для email_leads:
create or replace function check_email_rate_limit(
  email text
) returns boolean
language plpgsql security definer
as $$
declare
  recent_count int;
begin
  select count(*) into recent_count
  from email_leads
  where email = check_email_rate_limit.email
    and created_at > now() - interval '1 hour';

  return recent_count < 3; -- max 3 submissions per hour
end;
$$;
```

### 9. Performance Monitoring

**Добавить метрики:**
```typescript
// 1. Supabase query timing:
const startTime = Date.now();
const { data, error } = await supabase
  .from('profiles')
  .select('*');
const queryTime = Date.now() - startTime;

if (queryTime > 1000) {
  console.warn(`Slow query: profiles SELECT took ${queryTime}ms`);
}

// 2. OpenAI API latency:
const metrics = {
  embedding_time: 0,
  search_time: 0,
  llm_time: 0,
  total_time: 0,
};

// 3. Component render tracking:
if (process.env.NODE_ENV === 'development') {
  const renderStart = performance.now();
  // component render
  const renderTime = performance.now() - renderStart;
  if (renderTime > 16) { // > 1 frame
    console.warn(`Slow render: ${componentName} took ${renderTime}ms`);
  }
}
```

---

## 🎯 Priority Roadmap with Claude 4.5

### Quick Wins (можно сделать за 1-2 дня):
1. ✅ **React.memo для ChatBox** - уменьшить re-renders
2. ✅ **Type guards для FAQ** - безопасность citations
3. ✅ **Supabase query optimization** - select только нужные поля
4. ✅ **Min similarity threshold** - для match_docs функции

### Medium Priority (следующие 1-2 спринта):
1. 🎯 **Context splitting** - разделить AppContext на 4 контекста
2. 🎯 **Streaming responses** - реализовать для chat API
3. 🎯 **Embeddings cache** - кэш для частых вопросов
4. 🎯 **Error retry logic** - exponential backoff для OpenAI
5. 🎯 **RLS audit** - проверить все политики безопасности

### Long Term (планирование Phase 9+):
1. 📋 **Multi-agent orchestration** - мета-агент с под-агентами
2. 📋 **Advanced RAG** - reranking и hybrid search
3. 📋 **Performance monitoring** - dashboard с метриками
4. 📋 **Code splitting** - lazy loading для route groups
5. 📋 **Redis cache** - для production deployment

---

*Документ поддерживается в актуальном состоянии для эффективной разработки*
*Последнее обновление: 2025-01-31 (добавлены Claude 4.5 рекомендации)*