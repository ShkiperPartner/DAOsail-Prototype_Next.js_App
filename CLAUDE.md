# Claude Code Working Instructions

**Проект:** DAOsail Prototype - Next.js App  
**Цель:** Мета-инструкции для эффективной работы с DAOsail проектом  
**Дата создания:** 2025-01-14

---

## 🎯 Первые шаги при работе с проектом

### Обязательно прочитать перед любыми изменениями:
1. **PROJECT_ARCHITECTURE.md** - 🎯 ЕДИНЫЙ БЭКЛОГ, полная архитектура проекта
2. **package.json** - зависимости и скрипты
3. **README.md** - основная информация о проекте (если существует)

### ⚠️ ЕДИНЫЙ ИСТОЧНИК ИСТИНЫ ДЛЯ БЭКЛОГА:
**ТОЛЬКО PROJECT_ARCHITECTURE.md раздел "Current Implementation Status"**
- Все файлы должны соответствовать архитектуре в PROJECT_ARCHITECTURE.md
- При конфликтах - PROJECT_ARCHITECTURE.md имеет приоритет

### Быстрая ориентация:
```bash
# Структура ключевых файлов
PROJECT_ARCHITECTURE.md       # 🎯 ЕДИНЫЙ БЭКЛОГ И ПЛАН ПРОЕКТА
app/                          # Next.js App Router структура
components/                   # React компоненты
├── layout/                   # Layout компоненты
├── ui/                       # Переиспользуемые UI компоненты
│   ├── chat-box.tsx          # Основной чат с ИИ ассистентами
│   ├── email-capture.tsx     # Форма захвата email для гостей (NEW v0.5.0)
│   └── ...                   # Другие UI компоненты
lib/                          # Утилиты и контексты
├── contexts/app-context.tsx  # Глобальное состояние приложения
├── utils.ts                  # Общие утилиты
data/                         # Моки и статические данные
package.json                  # Зависимости проекта
tailwind.config.ts            # Конфигурация Tailwind CSS
```

---

## ⚠️ Критические правила работы

### 🚫 НИКОГДА НЕ ДЕЛАТЬ:
- **Нарушать App Router структуру** Next.js 13+
- **Игнорировать TypeScript типы** - строгая типизация обязательна
- **Создавать компоненты без клиентской директивы** ('use client') там, где нужно
- **Забывать про доступность** (accessibility) в UI компонентах
- **Игнорировать многоязычность** (ru/en) в интерфейсе

### ✅ ВСЕГДА ДЕЛАТЬ:
- **Читать PROJECT_ARCHITECTURE.md** перед архитектурными изменениями
- **Следовать конвенциям проекта** (Radix UI, Tailwind CSS, TypeScript)
- **Использовать существующие паттерны** (App Context, UI компоненты из shadcn/ui)
- **Поддерживать многоязычность** в новых компонентах
- **Тестировать responsive дизайн** на разных устройствах

---

## 🔧 Рабочие процедуры

### Разработка новых компонентов:
```
1. Анализ → изучаем существующие паттерны в components/ui/
2. Создание → следуем структуре shadcn/ui компонентов
3. Типизация → строгие TypeScript интерфейсы
4. Интернационализация → поддержка ru/en через useAppContext
5. Тестирование → проверяем в разных размерах экрана
```

### Работа с состоянием:
```
1. Используй AppContext для глобального состояния
2. Локальное состояние через useState в компонентах
3. Сохранение в localStorage для персистентности
4. Типизация через TypeScript интерфейсы
```

### Архитектурные решения:
```
1. Роутинг → Next.js App Router (app/ директория)
2. Состояние → React Context API (AppContext)
3. UI компоненты → Radix UI + Tailwind CSS
4. Иконки → Lucide React
5. Типизация → строгий TypeScript
```

---

## 🏗️ Архитектурные принципы

### Next.js App Router:
- **File-based routing:** app/ директория для роутинга
- **Layout система:** layout.tsx файлы для общих элементов
- **Server/Client Components:** четкое разделение 'use client' директивами
- **Metadata API:** генерация SEO метаданных

### Component Design:
- **Radix UI primitives:** основа для доступных UI компонентов
- **Tailwind CSS:** utility-first подход к стилизации
- **Composition pattern:** переиспользование через slots и props
- **TypeScript interfaces:** строгая типизация props

### State Management:
- **Context API:** глобальное состояние через AppContext
- **Local state:** useState для компонентов
- **Persistence:** localStorage для сохранения настроек
- **Error boundaries:** graceful обработка ошибок

---

## 🐛 Частые проблемы и решения

### Hydration ошибки:
**Проблема:** Mismatch между server и client rendering  
**Решение:** Используй 'use client' для компонентов с состоянием  
**Файл:** компоненты в `components/ui/`

### Локализация не работает:
**Проблема:** Тексты не переключаются между ru/en  
**Решение:** Проверь использование useAppContext.language  
**Паттерн:** `{language === 'ru' ? 'Текст' : 'Text'}`

### Стили не применяются:
**Проблема:** Tailwind классы не работают  
**Решение:** Проверь tailwind.config.ts и content paths  
**Особенность:** Убедись что файлы включены в content array

### TypeScript ошибки:
**Проблема:** Type mismatches в компонентах  
**Решение:** Используй строгие интерфейсы для props  
**Особенность:** Радix UI компоненты требуют правильные типы

---

## 📋 Чеклисты для типовых задач

### Создание нового UI компонента:
- [ ] Создать в components/ui/ с TypeScript интерфейсами
- [ ] Добавить 'use client' если нужно состояние
- [ ] Использовать Radix UI primitives как основу
- [ ] Добавить поддержку многоязычности (ru/en)
- [ ] Протестировать responsive дизайн
- [ ] Добавить accessibility атрибуты
- [ ] Документировать props в интерфейсе

### Добавление новой страницы:
- [ ] Создать page.tsx в соответствующей app/ директории
- [ ] Добавить layout.tsx если нужен специальный layout
- [ ] Настроить метаданные через generateMetadata
- [ ] Добавить навигацию в соответствующие компоненты
- [ ] Протестировать роутинг и переходы

### Работа с контекстом:
- [ ] Обновить AppContextType интерфейс
- [ ] Добавить новое состояние в AppProvider
- [ ] Добавить методы обновления состояния
- [ ] Сохранять в localStorage если нужно
- [ ] Использовать в компонентах через useAppContext

---

## 🔍 Быстрая диагностика

### При проблемах с рендерингом:
```javascript
// Проверить hydration в консоли браузера
// Ошибки вида "Text content did not match"

// Проверить 'use client' директивы
// Компоненты с состоянием должны быть клиентскими
```

### При проблемах с локализацией:
```javascript
// Проверить состояние языка
const { language } = useAppContext();
console.log('Current language:', language);

// Проверить localStorage
localStorage.getItem('language')
```

### При проблемах со стилями:
```bash
# Проверить Tailwind компиляцию
npm run dev

# Проверить content в tailwind.config.ts
# Убедиться что все файлы включены
```

---

## 📊 Важные метрики производительности

### Next.js:
- **Bundle size:** мониторить через webpack-analyzer
- **Core Web Vitals:** LCP, FID, CLS оптимизация
- **Image optimization:** использовать next/image

### React:
- **Re-renders:** минимальные благодаря правильному Context
- **Component splitting:** логическое разделение UI/Layout
- **Memory leaks:** правильная очистка useEffect

### Frontend:
- **Responsive design:** mobile-first подход
- **Accessibility:** WCAG compliance
- **TypeScript:** strict режим, полная типизация

---

## 🚀 Шаблоны кода

### Новый UI компонент:
```typescript
'use client';

import React from 'react';
import { useAppContext } from '@/lib/contexts/app-context';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const { language } = useAppContext();
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">
        {language === 'ru' ? 'Заголовок' : 'Title'}: {title}
      </h3>
      {onAction && (
        <button onClick={onAction} className="mt-2 px-4 py-2 bg-primary text-white rounded">
          {language === 'ru' ? 'Действие' : 'Action'}
        </button>
      )}
    </div>
  );
}
```

### Новый контекст метод:
```typescript
const updateSettings = (newSettings: Partial<Settings>) => {
  setSettings(prev => ({ ...prev, ...newSettings }));
  
  // Сохранить в localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('settings', JSON.stringify({ ...settings, ...newSettings }));
  }
};
```

---

## 📝 Заметки по развитию

### Следующие фичи (из PROJECT_ARCHITECTURE.md):
- File upload к ассистентам
- Function calling для ассистентов  
- Export/import чатов
- Аналитика использования

### Технический долг:
- Оптимизация bundle size
- Code splitting для больших компонентов
- Улучшение error boundaries

---

## 🔄 Спринтовая работа и циклы разработки

### Структура спринта:
```
🎯 НАЧАЛО СПРИНТА
├── "Давай добавим/изменим X"
├── Планирование (TodoWrite)
├── Реализация с экспериментами
├── Тестирование
├── Возможные откаты
└── Финальная реализация

📋 ЗАВЕРШЕНИЕ СПРИНТА (ОБЯЗАТЕЛЬНО!)
├── Обновить PROJECT_ARCHITECTURE.md
├── Обновить DATABASE_CHANGELOG.md (если были изменения БД)
├── Обновить CLAUDE.md (новые правила/ошибки)
├── Обновить README.md (версия + основные изменения)
├── Коммит с описанием изменений
└── 🎉 Минорный релиз готов
```

### 🚨 КРИТИЧНО: Завершающие действия спринта

**НИКОГДА не заканчивай спринт без обновления документации!**

#### Чеклист завершения спринта:
- [ ] **PROJECT_ARCHITECTURE.md** - обновить статус реализации, добавить новые компоненты
- [ ] **DATABASE_CHANGELOG.md** - задокументировать все изменения БД
- [ ] **CLAUDE.md** - добавить новые правила/ошибки из спринта  
- [ ] **README.md** - обновить версию и краткое описание изменений
- [ ] **Git commit** - с осмысленным сообщением о завершении спринта
- [ ] Убедиться что все TodoWrite задачи помечены как completed

#### Шаблон коммита завершения спринта:
```bash
git add .
git commit -m "Sprint: [Краткое описание фичи]

- Implemented: [основная функциональность]  
- Updated: PROJECT_ARCHITECTURE.md, DATABASE_CHANGELOG.md
- Fixed: [если были исправления]
- Docs: обновлена документация проекта

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Паттерны работы со спринтами:

#### Спринт с изменениями БД:
```
1. План миграции
2. Тест в dev  
3. Обновление типов TypeScript
4. Реализация в коде
5. ОБЯЗАТЕЛЬНО: DATABASE_CHANGELOG.md
6. ОБЯЗАТЕЛЬНО: PROJECT_ARCHITECTURE.md
```

#### Спринт с новой фичей:
```
1. Анализ архитектуры (читаем документы)
2. Планирование
3. Реализация  
4. Тестирование
5. ОБЯЗАТЕЛЬНО: PROJECT_ARCHITECTURE.md (новые компоненты)
6. ОБЯЗАТЕЛЬНО: CLAUDE.md (новые правила)
```

#### Спринт с багфиксом:
```
1. Диагностика
2. Исправление
3. Тестирование  
4. ОБЯЗАТЕЛЬНО: CLAUDE.md (добавить в "Частые проблемы")
5. ОБЯЗАТЕЛЬНО: README.md (обновить версию)
```

### 🎯 Цели циклической работы:
- **Документация всегда актуальна** 
- **Каждый спринт = минорное улучшение**
- **Накопление знаний** в CLAUDE.md
- **Git история** отражает логические завершения
- **Возможность отката** к любому завершенному спринту

---

## 🎯 Стиль сотрудничества и алгоритм работы

**Формула:** задача → анализ → решение → проверка результата → следующий шаг

### 1) Задача
- Формулируем единичную цель (минимальной ширины)
- Фиксируем входы: что уже есть, где хранится, какие ограничения

### 2) Анализ  
- Коротко: варианты, риски, зависимости, инструменты
- Проверяем связь с приоритетом PROJECT_ARCHITECTURE.md

### 3) Решение
- Пошаговая инструкция для новичка (максимум простоты)
- Готовые артефакты: текст, код, файлы, команды, чек-лист

### 4) Проверка результата
- Что считать успехом? (конкретные признаки/скрин/лог)
- Если ошибка — краткая диагностика и фикс

### 5) Следующий шаг
- Одна новая задача, вытекающая из результата
- Никаких «параллельных веток», пока не зафиксирован прогресс

**Принципы:**
- Минимальная ширина каждой задачи
- Один следующий шаг без параллельных веток
- Конкретные критерии успеха для каждого этапа

---

## 🆕 Обновления версии 0.7.0 (2025-01-22)

### Новая функциональность:
- **Исправлена ошибка React hooks** в LeftSidebar - useEffect вынесен на верхний уровень
- **Страница "Наши сообщества"** (`/communities`) с внешними ресурсами проекта
- **CommunityCard компонент** (`components/ui/community-card.tsx`) с tooltip и external links
- **Раздел "О клубе"** в навигации между Chat и Yachting с подразделами
- **Страница концепций** (`/about/concepts`) с 7 ключевыми документами проекта
- **ConceptCard компонент** (`components/ui/concept-card.tsx`) с цветовой дифференциацией

### Важные изменения:
- **data/menu.ts**: добавлен раздел "About Club" с дочерним элементом "Concepts & Presentations"
- **Tooltip integration**: полные описания карточек при наведении курсора
- **Accessibility улучшения**: keyboard navigation и screen reader support
- **Цветовая система**: уникальные цвета для каждого типа контента (7 вариантов)

### Новые паттерны:
```typescript
// Карточка с tooltip и external link
<CommunityCard
  icon={Send}
  title="Telegram Chat"
  description="Main channel for breaking news..."
  link="https://t.me/daosailnews"
  color="telegram"
/>

// Карточка концепции с цветовой дифференциацией
<ConceptCard
  icon={Lightbulb}
  title="Project Concept"
  description="Interactive presentation..."
  link="https://concept.daosail.com/"
  color="concept"
/>

// Tooltip для полного описания
<Tooltip>
  <TooltipTrigger asChild>
    <p className="line-clamp-3 cursor-help">{description}</p>
  </TooltipTrigger>
  <TooltipContent className="max-w-sm p-3">
    <p>{description}</p>
  </TooltipContent>
</Tooltip>
```

### Архитектурные улучшения:
- **React hooks правила**: исправлена ошибка порядка хуков в рендер-функциях
- **External links безопасность**: использование `noopener,noreferrer` для всех внешних ссылок
- **Keyboard accessibility**: поддержка Enter/Space для карточек-кнопок

---

*Этот файл должен обновляться при каждом завершении спринта*
*Цель: циклическая разработка с обязательным обновлением документации*
*Последнее обновление: 2025-01-22 (v0.7.0 Content Pages & Community Links)*