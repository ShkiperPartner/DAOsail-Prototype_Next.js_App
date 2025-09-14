# Project Architecture Overview

**Проект:** DAOsail Prototype - Next.js App  
**Версия:** 0.1.0  
**Дата обновления:** 2025-01-14  
**Статус:** Активная разработка

---

## 📊 Technology Stack

### Frontend
- **Framework:** Next.js 13.5.1 + React 18 + TypeScript
- **State Management:** React Context API (AppContext)
- **UI/CSS:** Tailwind CSS + Radix UI + Lucide React icons
- **Routing:** Next.js App Router (app/ directory)
- **Themes:** next-themes для dark/light mode

### Backend & Infrastructure  
- **Framework:** Next.js API Routes (не используется в текущей версии)
- **Static Data:** Mock данные в data/ директории
- **Persistence:** localStorage для настроек пользователя
- **Future:** Планируется интеграция с DAO платформами

### Key Dependencies
```json
{
  "next": "13.5.1",
  "react": "18.2.0",
  "typescript": "5.2.2",
  "@radix-ui/*": "различные версии UI primitives",
  "lucide-react": "^0.446.0",
  "tailwindcss": "3.3.3",
  "next-themes": "^0.3.0"
}
```

---

## 🗂️ Project Structure

```
app/
├── (main)/               # Main layout group
│   ├── layout.tsx        # Основной layout с навигацией
│   ├── page.tsx          # Главная страница
│   ├── chat/             # Страница чата с ИИ
│   ├── community/        # Страница сообщества
│   ├── dao/              # Страница DAO функций
│   ├── library/          # Страница библиотеки
│   ├── profile/          # Страница профиля
│   └── tutorial/         # Страница обучения
├── layout.tsx            # Root layout
└── globals.css           # Глобальные стили

components/
├── layout/               # Layout компоненты
│   ├── left-sidebar.tsx  # Левая боковая панель
│   ├── right-sidebar.tsx # Правая боковая панель
│   ├── top-bar.tsx       # Верхняя панель
│   ├── footer.tsx        # Подвал
│   └── mobile-drawer.tsx # Мобильное меню
└── ui/                   # Переиспользуемые UI компоненты
    ├── hero-card.tsx     # Главная карточка
    ├── chat-box.tsx      # Интерфейс чата
    ├── quick-questions.tsx # Быстрые вопросы
    └── ...               # Другие UI компоненты

lib/
├── contexts/
│   └── app-context.tsx   # Глобальный контекст приложения
└── utils.ts              # Общие утилиты

data/
└── chat-messages.ts      # Mock данные для чата
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

### Mock Data (data/)
**Назначение:** Статические данные для прототипа  
**Структура:**
- `chat-messages.ts` → примеры сообщений чата с локализацией

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

### ✅ Готово (v0.1.0 - Initial Prototype)
- [x] Next.js 13 App Router структура
- [x] Radix UI + Tailwind CSS дизайн-система
- [x] Многоязычность (ru/en) через AppContext
- [x] Темизация (light/dark) с next-themes
- [x] Responsive дизайн для mobile/desktop
- [x] Mock чат с ИИ (имитация диалога)
- [x] Навигация по основным разделам
- [x] Soft gate для незарегистрированных пользователей

### 🚧 В разработке
- [ ] Настоящая интеграция с ИИ (OpenAI/Claude)
- [ ] Система аутентификации пользователей
- [ ] Персистентное хранение чатов

### 📋 Планируется (Phase 2)  
- [ ] DAO функциональность и интеграция с блокчейном
- [ ] Система токенов и вознаграждений
- [ ] Продвинутые функции чата (файлы, код)
- [ ] Интеграция с парусными данными и картами
- [ ] Система обучения и туториалов
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

*Документ поддерживается в актуальном состоянии для эффективной разработки*  
*Последнее обновление: 2025-01-14*