# Project Architecture Overview

**Проект:** DAOsail Prototype - Next.js App
**Версия:** 0.4.0
**Дата обновления:** 2025-09-15
**Статус:** Активная разработка - Phase 4.1 завершена (AI Integration)

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
│   ├── chat/             # Страница чата с ИИ
│   ├── community/        # Страница сообщества
│   ├── dao/              # Страница DAO функций
│   ├── library/          # Страница библиотеки
│   ├── profile/          # Страница профиля с табами
│   └── tutorial/         # Страница обучения
├── api/                  # API Routes
│   ├── chat/             # OpenAI чат интеграция
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
    ├── chat-box.tsx      # Интерфейс чата
    ├── quick-questions.tsx # Быстрые вопросы
    ├── avatar-upload.tsx # Компонент загрузки аватаров
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
│   └── profile.ts        # Типы для профилей пользователей
├── config/
│   └── roles.ts          # Конфигурация ролей и прогресса
└── utils.ts              # Общие утилиты

data/
├── chat-messages.ts      # Mock данные для чата
└── mock-profile.ts       # Mock данные профилей для разработки

supabase/                 # Supabase CLI конфигурация
├── migrations/           # Миграции базы данных
│   ├── 001_create_profiles_schema.sql
│   └── 002_setup_vector_embeddings.sql
├── config.toml          # Конфигурация Supabase CLI
└── seed.sql             # Начальные данные + база знаний
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
- `ChatBox` → интерфейс чата с mock AI responses
- `QuickQuestions` → быстрые вопросы для начала диалога
- `SoftGateBanner` → баннер с ограничениями для гостей

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

**Специализированные ассистенты:**
- **Навигатор** → основы парусного спорта, навигация, погода, оборудование
- **Шкипер** → безопасность, управление экипажем, аварийные ситуации, регаты

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

### ✅ Готово (v0.4.0 - AI Integration Complete)
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

**Phase 4: AI Integration & Advanced Features (В процессе)**
- [x] **OpenAI API интеграция** - GPT-4o-mini с полной поддержкой чата
- [x] **RAG система** - Vector embeddings с Supabase pgvector
- [x] **База знаний** - Структурированные данные по парусному спорту
- [x] **Специализированные ассистенты** - Навигатор и Шкипер с разными ролями
- [x] **Реальный чат** - Замена mock данных на OpenAI API
- [x] **Контекстные ответы** - ИИ использует базу знаний для точных ответов
- [x] **Автоматическая статистика** - Интеграция с системой достижений
- [ ] **Streaming responses** - Потоковые ответы для лучшего UX
- [ ] **Персистентное хранение чатов** в Supabase
- [ ] File upload к ассистентам (документы, изображения)
- [ ] Function calling для ассистентов
- [ ] Export/import чатов
- [ ] Уведомления о новых достижениях (toast notifications)
- [ ] Система лидербордов и рейтингов
- [ ] Социальные функции (друзья, группы)

### 📋 Планируется (Phase 5: DAO & Advanced Features)
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

-- База знаний с vector embeddings (NEW!)
knowledge_documents (
  id, title, content, source_type, source_url, file_path,
  language, category, embedding vector(1536), timestamps
)
```

### Vector Search & RAG System
- **pgvector extension** включен для семантического поиска
- **Embeddings model** OpenAI text-embedding-ada-002 (1536 dimensions)
- **Search function** search_knowledge_documents() с настраиваемым порогом similarity
- **Categories** sailing_basics, navigation, safety, weather, equipment, racing, etc.
- **Languages** поддержка ru/en контента

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

*Документ поддерживается в актуальном состоянии для эффективной разработки*
*Последнее обновление: 2025-09-15 (Phase 4.1 Complete - AI Integration)*