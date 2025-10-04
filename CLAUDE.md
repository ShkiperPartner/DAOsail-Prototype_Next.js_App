# Claude Code Working Instructions

**Проект:** DAOsail Prototype - Next.js App  
**Цель:** Мета-инструкции для эффективной работы с DAOsail проектом  
**Дата создания:** 2025-01-14
**Последнее обновление:** 2025-10-02 (v0.8.3 - Steward RAG Integration в процессе)

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
│   ├── citations-display.tsx # Показ источников FAQ (NEW v0.8.1)
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

## 🆕 Обновления версии 0.7.2 (2025-01-24)

### Паттерны архитектурного анализа:
- **REVIEW.md driven development** - использование production checklist для планирования
- **Безопасное рефакторинг** - изменения только без нарушения существующей структуры
- **ENV validation patterns** - централизованная проверка переменных окружения

### Новая архитектурная утилиты:

```typescript
// lib/utils/env-validation.ts - Валидация окружения
export function validateOpenAI(): string {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.startsWith('sk-')) {
    throw new Error('Invalid OPENAI_API_KEY format');
  }
  return apiKey;
}

// lib/utils/cors.ts - Безопасные CORS headers
export function getCorsHeaders(origin?: string | null): Record<string, string> {
  const allowedOrigins = ['http://localhost:3000', process.env.NEXT_PUBLIC_APP_URL];
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'http://localhost:3000'
  };
}
```

### Важные исправления:
- **TypeScript target**: ES5 → ES2015 для поддержки современных конструкций
- **AssistantType standardization**: единообразные enum вместо строк
- **Migration consolidation**: все миграции в `supabase/migrations/`
- **.env.example security**: удаление реальных ключей из примера

### npm scripts patterns:
```json
{
  "typecheck": "tsc --noEmit",           // Проверка типов без компиляции
  "audit": "npm audit --production --audit-level=high",  // Аудит безопасности
  "analyze:deps": "depcheck",            // Поиск неиспользуемых зависимостей
  "analyze:unused": "ts-prune"           // Поиск мертвого кода
}
```

### Спринт архитектурного анализа:
```
🔍 АНАЛИЗ ПРОЕКТА
├── Глубокое изучение структуры (Task agent)
├── Выявление проблем и улучшений
├── Приоритизация по критичности
└── Безопасная реализация изменений

📋 ДОКУМЕНТИРОВАНИЕ
├── Обновление PROJECT_ARCHITECTURE.md
├── Дополнение CLAUDE.md новыми паттернами
├── Создание production checklist (REVIEW.md)
└── Professional README.md

🔧 ИНФРАСТРУКТУРА
├── ENV validation utilities
├── CORS security improvements
├── Development tools installation
└── TypeScript configuration optimization
```

### Частые проблемы и решения v0.7.2:

**TypeScript target mismatch:**
**Проблема:** `Type 'Set<string>' can only be iterated through when using the '--downlevelIteration' flag`
**Решение:** Обновить `tsconfig.json` target с `"es5"` на `"es2015"`

**ENV variables leakage:**
**Проблема:** Реальные ключи в `.env.example`
**Решение:** Заменить на placeholder значения с префиксом `your_`

**CORS security risk:**
**Проблема:** `Access-Control-Allow-Origin: '*'` открывает доступ всем доменам
**Решение:** Создать whitelist разрешенных origins в `lib/utils/cors.ts`

**AssistantType inconsistency:**
**Проблема:** Смешение старых строковых литералов и новых enum
**Решение:** Стандартизировать на `AssistantType` enum во всех файлах

---

## 🆕 Обновления версии 0.8.1 (2025-09-26)

### FAQ Agent MVP - Паттерны реализации:

#### **RAG Architecture Pattern:**
```typescript
// Структура FAQ агента с векторным поиском
1. User Query → Embedding (OpenAI)
2. Vector Search → match_docs(embedding, roles[], similarity)
3. Context Formation → релевантные чанки + источники
4. LLM Generation → строгий промпт без галлюцинаций
5. Response + Citations → показ источников пользователю
```

#### **Database Schema Pattern:**
```sql
-- Векторная база знаний
knowledge_chunks: {
  id, doc_id, chunk_idx, text,
  embedding vector(1536),
  accessible_roles text[], -- role-based доступ
  tags text[], url
}

-- Чат логи с метаданными
chat_messages: {
  id, session_id, role, content, agent,
  meta jsonb -- citations, trace info
}
```

#### **Edge Function Pattern:**
```typescript
// Supabase Edge Function для FAQ
supabase/functions/handle-faq/index.ts
├── Environment validation
├── Embedding generation (OpenAI)
├── Vector search (match_docs RPC)
├── Context preparation
├── LLM response (strict prompt)
└── Response with citations
```

#### **Frontend Integration Pattern:**
```typescript
// ChatBox с поддержкой FAQ режима
if (assistantType === 'faq') {
  const response = await fetch('/api/faq', {
    body: JSON.stringify({
      session_id, user_message,
      user_role, prefs: { lang }
    })
  });
  // Получаем ответ с citations
  const { final_text, citations, trace } = await response.json();
}

// CitationsDisplay компонент
<CitationsDisplay
  citations={message.citations}
  traceInfo={message.trace}
/>
```

#### **Prompt Engineering Pattern:**
```typescript
const systemPrompt = `Ты FAQ ассистент DAOsail — строгий и точный помощник.

🎯 ГЛАВНОЕ ПРАВИЛО: Отвечаешь ТОЛЬКО по контексту. Никаких выдумок!

📋 ИНСТРУКЦИИ:
• Если есть информация → отвечай четко и кратко
• Если информации НЕТ → "В базе знаний нет информации"
• Ссылайся на источники [1], [2]
• Тон: деловой, дружелюбный
• Длина: максимум 150 слов`;
```

### Частые проблемы и решения v0.8.1:

**Vector extension missing:**
**Проблема:** `function public.match_docs() does not exist`
**Решение:** Применить `FIX_MIGRATION.sql` в Supabase SQL Editor с `create extension if not exists vector;`

**Policy syntax error:**
**Проблема:** `create policy if not exists` не поддерживается в PostgreSQL
**Решение:** Использовать `drop policy if exists` + `create policy`

**Empty array type error:**
**Проблема:** `cannot determine type of empty array`
**Решение:** Явно указать тип: `array[]::text[]` вместо `array[]`

**Citations не отображаются:**
**Проблема:** Citations компонент не показывает источники
**Решение:** Проверить `message.citations` в ChatMessage interface и импорт CitationsDisplay

### Embeddings Pipeline Pattern:
```typescript
// scripts/embeddings/upload-faq.ts
1. Читаем .md файлы
2. Чанкуем текст (600 tokens, overlap 100)
3. Получаем embeddings (OpenAI ada-002)
4. Upsert в knowledge_chunks с ролями доступа
5. Batch операции для производительности
```

### Testing Pattern:
```javascript
// scripts/test-faq.js - автономное тестирование
1. Mock контекст из базы знаний
2. Тестовые вопросы (в теме + вне темы)
3. Проверка: галлюцинации vs корректные отказы
4. Валидация использования источников [1], [2]
```

---

## 🚀 Claude 4.5 Capabilities & Next.js Optimizations

**Версия модели:** claude-sonnet-4-5-20250929
**Дата обновления возможностей:** 2025-01-31

### 🎯 Новые возможности для DAOsail проекта

#### 1. Next.js App Router Expertise
**Что изменилось:**
- Более точное понимание Server/Client Components boundaries
- Лучший анализ зависимостей между route groups и layouts
- Меньше ошибок с hydration и 'use client' директивами

**Применение к проекту:**
```typescript
// Теперь лучше понимаю такие паттерны:
app/(auth)/layout.tsx → Server Component
  ├── app/(auth)/login/page.tsx → Server Component
  └── components/ui/email-capture.tsx → 'use client' (есть useState)

// Правильная оптимизация:
// ❌ Избегать
const ClientComponent = () => {
  const { theme, language, user } = useAppContext(); // re-render при ЛЮБОМ изменении
}

// ✅ Оптимально
const ClientComponent = () => {
  const theme = useAppContext(ctx => ctx.theme); // selective subscription
  const language = useAppContext(ctx => ctx.language);
}
```

#### 2. React Context Optimization
**Улучшения:**
- Точнее определяю места для context splitting
- Лучше работаю с Context + localStorage patterns
- Меньше промахов с re-render optimization

**Рекомендации для AppContext:**
```typescript
// Можно разделить AppContext на меньшие контексты:
// 1. ThemeContext (theme, toggleTheme)
// 2. AuthContext (user, isAuthenticated, login, logout)
// 3. GuestContext (responsesLeft, guestStage, captureEmail)
// 4. LocaleContext (language, toggleLanguage)

// Это уменьшит re-renders когда меняется только один аспект
```

#### 3. Database & Supabase Patterns
**Что улучшилось:**
- Точнее работаю с RLS policies и PostgreSQL functions
- Лучше понимаю pgvector и RAG architecture
- Меньше ошибок с Supabase TypeScript types

**Паттерн для DAOsail:**
```typescript
// Type-safe Supabase queries:
const { data: profiles } = await supabase
  .from('profiles')
  .select('id, full_name, nickname, role, avatar_url')
  .eq('role', 'матрос')
  .order('join_date', { ascending: false });

// RLS проверка безопасности:
// CREATE POLICY "Users can only update own profile"
// ON profiles FOR UPDATE
// USING (auth.uid() = id);
```

#### 4. OpenAI API & RAG Best Practices
**Улучшения:**
- Лучше понимаю RAG pipeline optimization
- Точнее работаю с embeddings и vector search
- Правильнее обрабатываю streaming responses

**Рекомендации для FAQ Agent:**
```typescript
// Оптимизация vector search:
// 1. Cache embeddings для часто задаваемых вопросов
// 2. Batch операции для множественных queries
// 3. Adjustable similarity threshold по ролям

// Streaming optimization:
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...],
  stream: true, // ← добавить для лучшего UX
});
```

#### 5. TypeScript Type Safety
**Что улучшилось:**
- Точнее генерирую типы из Supabase schema
- Лучше работаю с discriminated unions (AssistantType)
- Меньше промахов с JSONB типизацией

**Пример для DAOsail:**
```typescript
// Строгая типизация для chat messages:
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent?: AssistantType;
  citations?: Citation[]; // для FAQ агента
  meta?: {
    trace_id?: string;
    context_used?: boolean;
  };
};

// Type guard для безопасности:
function isFAQMessage(msg: ChatMessage): msg is ChatMessage & { citations: Citation[] } {
  return 'citations' in msg && Array.isArray(msg.citations);
}
```

#### 6. Component Performance Patterns
**Новые рекомендации:**
- Лучше применяю React.memo для дорогих компонентов
- Точнее определяю места для useMemo/useCallback
- Меньше лишних re-renders в сложных UI

**Анализ для DAOsail:**
```typescript
// Оптимизировать компоненты:
// 1. ChatBox → много state, нужен memo
// 2. AssistantDock → scroll events, нужна debounce
// 3. ProfileInfoTab → real-time updates, selective subscriptions

// Пример оптимизации:
const ChatBox = React.memo(({ assistantType, onBack }) => {
  const sendMessage = useCallback((msg: string) => {
    // ... logic
  }, [assistantType]); // зависимости только нужные

  const messages = useMemo(
    () => filterMessagesByAssistant(allMessages, assistantType),
    [allMessages, assistantType]
  );

  return <div>...</div>;
});
```

### 📊 Рекомендации по применению к DAOsail

#### Для текущих задач:
- ✅ **Context splitting** - разделить AppContext на тематические контексты
- ✅ **Component memoization** - добавить React.memo к ChatBox, AssistantSelector
- ✅ **Type guards** - добавить для FAQMessage, ProfileData
- ✅ **Streaming responses** - реализовать для лучшего UX

#### Для новых фичей (Phase 9+):
- 🎯 **Multi-agent orchestration** - правильная архитектура с type safety
- 🎯 **Advanced caching** - Redis для embeddings и frequent queries
- 🎯 **Real-time optimizations** - Supabase subscriptions с debounce
- 🎯 **Bundle splitting** - Code splitting для Route Groups

### 🔍 Диагностические возможности для DAOsail

**Что теперь могу делать лучше:**
- Анализировать Supabase query performance
- Находить проблемы с RLS policies до runtime
- Предлагать оптимизации RAG pipeline
- Обнаруживать потенциальные hydration errors

### 💡 Workflow улучшения для спринтов

**Новый подход к разработке DAOsail:**
```
1. Анализ архитектуры (точнее понимаю Next.js patterns)
2. Планирование с учетом типов (меньше Supabase ошибок)
3. Реализация с оптимизацией (Context splitting, memo)
4. Ревью безопасности (RLS, type guards)
5. Документирование (структурированно в CLAUDE.md + PROJECT_ARCHITECTURE.md)
```

### 🎯 Priority Optimizations для DAOsail

#### Quick Wins (1-2 дня):
1. **React.memo для ChatBox** - уменьшить re-renders
2. **Type guards для FAQ** - безопасность citations
3. **Streaming responses** - улучшить UX чата

#### Medium Priority (следующие спринты):
1. **Context splitting** - разделить AppContext
2. **Vector search cache** - Redis для embeddings
3. **Component lazy loading** - Code splitting

#### Long Term (планирование):
1. **Multi-agent orchestration**
2. **Advanced RAG with reranking**
3. **Performance monitoring dashboard**

---

## 🆕 Обновления версии 0.8.2 (2025-10-01)

### FAQ Agent Unification - Паттерны:

#### **Unified Chunks Table Pattern:**
```typescript
// Одна таблица для всех embeddings вместо дублирования
chunks: {
  id bigserial,
  source text,          // 'docs', 'manual', etc.
  path text,            // 'docs/spec/architecture.md'
  content text,         // текст чанка
  embedding vector(1536),
  metadata jsonb,       // дополнительная информация
  accessible_roles text[] DEFAULT ['public'],  // role-based access
  tags text[] DEFAULT []                       // тематические теги
}

// Вместо отдельной таблицы knowledge_chunks
// Избегаем дублирования данных и embeddings
```

#### **Role-Based Vector Search Pattern:**
```sql
-- RPC функция с role filtering
CREATE FUNCTION match_chunks_docs(
  query_embedding VECTOR(1536),
  match_count INT DEFAULT 8,
  roles TEXT[] DEFAULT ARRAY['public'],
  min_similarity FLOAT DEFAULT 0.75
) RETURNS TABLE (...) AS $$
  SELECT ...
  FROM chunks
  WHERE chunks.accessible_roles && roles  -- PostgreSQL array overlap operator
    AND (1 - (chunks.embedding <=> query_embedding)) >= min_similarity
  ...
$$;
```

#### **Edge Function Migration Pattern:**
```typescript
// Было (knowledge_chunks):
const { data: matches } = await supabase.rpc('match_docs', {
  query_embedding,
  match_count: 5,
  roles,
  min_similarity: 0.7
});

// Стало (chunks):
const { data: matches } = await supabase.rpc('match_chunks_docs', {
  query_embedding,
  match_count: 5,
  roles: userRoles,
  min_similarity: 0.7
});

// Mapping результатов:
// match.text → match.content
// match.doc_id → match.path
// match.chunk_idx → match.metadata?.chunk || 0
```

### Частые проблемы и решения v0.8.2:

**Port mismatch в .env:**
**Проблема:** NEXT_PUBLIC_APP_URL=http://localhost:3002 но dev сервер на :3000
**Решение:** Синхронизировать порты - либо обновить .env.local, либо запустить `npm run dev -- -p 3002`
**Файл:** `.env.local` line 13

**API Error 500 в /api/faq:**
**Проблема:** POST /api/faq возвращает Internal Server Error
**Возможные причины:**
1. Edge Function не задеплоен после изменений
2. Несоответствие схемы ответа match_chunks_docs
3. CORS проблемы из-за port mismatch
**Решение:** Deploy Edge Function: `supabase functions deploy handle-faq --project-ref <project-id>`

**Migration уже применена но не видна в коде:**
**Проблема:** Индексы idx_chunks_accessible_roles существуют, но миграция не в migrations/
**Решение:** Миграции были применены вручную в Supabase SQL Editor. Для истории создать migration файл задним числом
**Файл:** `supabase/migrations/20250928000001_add_role_tags_to_chunks.sql` (уже есть в untracked)

### Database Verification Patterns:

```sql
-- Проверка структуры таблицы
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'chunks'
ORDER BY ordinal_position;

-- Проверка индексов
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'chunks';

-- Проверка RPC функций
SELECT proname, pg_get_function_arguments(oid)
FROM pg_proc
WHERE proname LIKE 'match_%';

-- Статистика по ролям
SELECT accessible_roles, tags, COUNT(*)
FROM chunks
GROUP BY accessible_roles, tags
LIMIT 10;
```

### Deployment Checklist для FAQ Agent:

- [ ] Обновить Edge Function локально
- [ ] Проверить ENV переменные (OPENAI_API_KEY, SUPABASE_SERVICE_ROLE_KEY)
- [ ] Задеплоить Edge Function: `supabase functions deploy handle-faq`
- [ ] Проверить логи Edge Function: `supabase functions logs handle-faq`
- [ ] Тестировать API endpoint: POST /api/faq с тестовым вопросом
- [ ] Проверить citations в UI
- [ ] Убедиться что role-based filtering работает

---

## 🆕 Обновления версии 0.8.3 (2025-10-02)

### Steward RAG Integration - Паттерны:

#### **RAG Integration in Streaming API:**
```typescript
// Паттерн: Добавление RAG поиска в существующий /api/chat
async function getRelevantContext(
  userMessage: string,
  assistantType: 'navigator' | 'skipper' | 'steward',
  userRole: string,
  language: 'ru' | 'en'
): Promise<{ context: string; chunksUsed: number; citations: any[] }> {

  // Для steward используем RAG поиск
  if (assistantType === 'steward') {
    const { data: matches } = await supabase.rpc('match_chunks_docs', {
      query_embedding: await getEmbedding(userMessage),
      match_count: 5,
      roles: [userRole.toLowerCase(), 'public'],
      min_similarity: 0.7
    });

    // Формируем контекст и citations
    const context = matches.map((m, idx) =>
      `[${idx + 1}] ${m.content}\n(Источник: ${m.path}, релевантность: ${Math.round(m.similarity * 100)}%)`
    ).join('\n\n');

    const citations = matches.map(m => ({
      doc_id: m.path,
      url: null,
      chunk_idx: m.metadata?.chunk || 0,
      similarity: m.similarity
    }));

    return { context, chunksUsed: matches.length, citations };
  }
}
```

#### **Prompt Engineering for Knowledge-Based Assistant:**
```typescript
const stewardPrompt = {
  ru: `Ты - Стюард DAOsail, дружелюбный и гостеприимный помощник.

  🎯 ГЛАВНОЕ ПРАВИЛО: Отвечай ТОЛЬКО на основе предоставленного контекста из базы знаний.

  📋 ИНСТРУКЦИИ ПО СТИЛЮ:
  • Тон: тёплый, гостеприимный, профессиональный
  • Стиль: можешь формулировать своими словами, добавлять приветствия
  • Структура: делай ответы понятными (списки, абзацы)
  • Ссылки: можешь упоминать источники [1], [2]

  ⚠️ ОГРАНИЧЕНИЯ:
  • Если информации НЕТ → "К сожалению, у меня нет информации"
  • НИКОГДА не выдумывай факты, даты, цифры
  • НЕ добавляй информацию из общих знаний

  Предоставленный контекст:
  ${contextResult.context || 'Контекст не найден'}`,
};
```

#### **Citations in Streaming Mode:**
```typescript
// Паттерн: Возврат citations в finish event
if (chunk.choices[0]?.finish_reason) {
  const finishData = {
    type: 'finish',
    message: {
      role: 'assistant',
      content: fullContent,
      citations: contextResult.citations || [],  // Добавляем citations
      metadata: {
        knowledgeChunksUsed: contextResult.chunksUsed
      }
    }
  };
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(finishData)}\n\n`));
}
```

#### **Logging Pattern for RAG Debugging:**
```typescript
// Паттерн: Подробное логирование для диагностики
if (assistantType === 'steward') {
  console.log('🔍 [STEWARD RAG] Starting search...');
  console.log('🔍 [STEWARD RAG] User message:', userMessage.substring(0, 100));
  console.log('🔍 [STEWARD RAG] User role:', userRole);
  console.log('🔍 [STEWARD RAG] Search roles:', userRoles);

  const { data: matches, error } = await supabase.rpc('match_chunks_docs', {...});

  if (error) {
    console.error('❌ [STEWARD RAG] Knowledge search error:', error);
  }

  console.log('🔍 [STEWARD RAG] Matches found:', matches?.length || 0);
  console.log('✅ [STEWARD RAG] Top match similarity:', matches[0]?.similarity);
}
```

### Частые проблемы и решения v0.8.3:

**Ассистент отвечает не по базе знаний:**
**Проблема:** Steward отвечает общими знаниями, игнорируя контекст
**Возможные причины:**
1. Таблица `chunks` пустая - нет данных для RAG
2. Функция `match_chunks_docs()` не существует
3. RAG поиск падает с ошибкой, возвращается пустой контекст
4. OpenAI embeddings не генерируются

**Диагностика:**
```typescript
// Проверить наличие данных
const { data: chunks, count } = await supabase
  .from('chunks')
  .select('*', { count: 'exact', head: true });
console.log('Total chunks:', count);

// Проверить RPC функцию
const { data, error } = await supabase.rpc('match_chunks_docs', {
  query_embedding: testEmbedding,
  match_count: 3,
  roles: ['public'],
  min_similarity: 0.1
});
console.log('RPC test:', error ? error : `Found ${data?.length} results`);
```

**Migration user_chats.session_id not applied:**
**Проблема:** `column user_chats.session_id does not exist`
**Решение:** Применить SQL в Supabase Dashboard:
```sql
ALTER TABLE user_chats ADD COLUMN IF NOT EXISTS session_id UUID DEFAULT gen_random_uuid();
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_chats_session_id ON user_chats(session_id);
```
**Файл:** `FIX_USER_CHATS_SESSION_ID.sql`

**RAG search returns empty results:**
**Проблема:** match_chunks_docs() возвращает 0 результатов
**Возможные причины:**
1. min_similarity слишком высокий (0.7)
2. accessible_roles не содержит 'public'
3. Embeddings не синхронизированы

**Решение:** Понизить min_similarity до 0.3 для диагностики:
```typescript
const { data: matches } = await supabase.rpc('match_chunks_docs', {
  query_embedding: queryEmbedding,
  match_count: 5,
  roles: ['public'],  // Всегда включать 'public'
  min_similarity: 0.3  // Временно снизить
});
```

---

## 🚧 Обновления версии 0.8.3 (continued) - 2025-10-03

### Knowledge Base Rebuild - Текущее состояние:

#### **Диагностика выявила проблему:**
```
✅ chunks таблица содержит 303 записи
✅ match_chunks_docs() функция существует
❌ RAG поиск возвращает 0 результатов (similarity threshold 0.7)
❓ Состояние embeddings неизвестно (требуется проверка)
```

#### **Принятые архитектурные решения:**

**1. Steward доступ к знаниям:**
```
ТОЛЬКО публичная информация:
✓ docs/charter/philosophy.md
✓ docs/charter/roles.md
✓ docs/charter/economics.md

ИСКЛЮЧЕНО:
✗ docs/ai_agents/* (промпты ассистентов)
✗ docs/spec/* (техническая документация)
```

**2. Роли доступа (поэтапное внедрение):**
```javascript
// Фаза 1 (сейчас):
'guest'      // Неавторизованный пользователь
'public'     // Интересующийся (базовая регистрация)
'passenger'  // Первый уровень, зарегистрированные участники

// Фаза 2 (позже):
'sailor'     // Технические знания
'captain'    // Продвинутый уровень
'partner'    // Административный доступ (вся БЗ)
```

**3. Маппинг ролей на доступ:**
```typescript
function mapUserRoleToKnowledgeRoles(userRole: string): string[] {
  const roleMap = {
    'guest': ['guest'],
    'public': ['guest', 'public'],
    'passenger': ['guest', 'public', 'passenger'],
    // Позже: sailor, captain, partner
  };
  return roleMap[userRole.toLowerCase()] || ['guest'];
}
```

#### **Запланированные изменения:**

**Единый pipeline базы знаний:**
```
1. Исходники (GitHub repo docs/)
   ↓
2. Скрипт обработки (scripts/rebuild-steward-knowledge.mjs)
   - Чанкование (600 tokens, overlap 100)
   - Embedding generation (OpenAI ada-002)
   - Метаданные (source, path, roles, tags)
   ↓
3. chunks таблица с embeddings
   ↓
4. RAG поиск (match_chunks_docs)
   ↓
5. Steward ответы по контексту
```

**Структура скрипта загрузки:**
```javascript
// scripts/rebuild-steward-knowledge.mjs

const STEWARD_SOURCES = [
  'docs/charter/philosophy.md',
  'docs/charter/roles.md',
  'docs/charter/economics.md'
];

const STEWARD_ROLES = ['guest', 'public', 'passenger'];

// Процесс:
1. Очистить существующие chunks для Steward
2. Для каждого файла из STEWARD_SOURCES:
   - Парсить frontmatter
   - Чанковать текст
   - Генерировать embeddings
   - Upsert в chunks с accessible_roles = STEWARD_ROLES
3. Валидация: проверить что embeddings созданы
4. Тест RAG поиска
```

**Улучшенный промпт Steward:**
```typescript
const stewardPrompt = `Ты - Шкипер-Администратор DAOsail, гостеприимный помощник для новичков.

🎯 ДОСТУП К ЗНАНИЯМ:
У тебя есть доступ только к базовой публичной информации:
• Философия и миссия проекта
• Роли и права участников
• Основы экономической модели

📋 ПРАВИЛА ОТВЕТОВ:
• Отвечай ТОЛЬКО на основе предоставленного контекста
• Если информации НЕТ → "К сожалению, у меня нет доступа к этой информации"
• НЕ выдумывай факты, даты, технические детали
• Можешь формулировать своими словами, но строго по контексту
• Упоминай источники [1], [2] когда уместно

🎨 СТИЛЬ:
• Тон: теплый, гостеприимный, профессиональный
• Ты приветствуешь новичков в DAOsail как хороший администратор
• Помогаешь сориентироваться в базовых концепциях проекта

Контекст из базы знаний:
${context}`;
```

#### **Следующие шаги (ОЖИДАНИЕ):**
```
⏸️ Получить URL GitHub репо с docs/ (или источник документов)
⏸️ Решить: клонировать репо или создать локально
⏸️ Создать скрипт rebuild-steward-knowledge.mjs
⏸️ Загрузить БЗ с embeddings
⏸️ Протестировать RAG поиск
⏸️ Финальное тестирование через UI
```

---

## ✅ Обновления версии 0.8.3 (ЗАВЕРШЕНО) - 2025-10-04

### Knowledge Base Rebuild - Результаты реализации:

#### **Что сделано:**

**1. Инфраструктура базы знаний:**
```bash
# Клонирован KB репозиторий
git clone https://github.com/ShkiperPartner/daosail-kb.git

# Создан универсальный скрипт загрузки
scripts/rebuild-steward-knowledge.mjs

# Структура KB (29 markdown файлов):
daosail-kb/docs/
├── charter/        # Устав, философия, роли
├── faq/            # Часто задаваемые вопросы
├── yachting/       # Информация о яхтинге
├── decentralization/ # DAO структура
├── gov/            # Управление
├── ops/            # Операции
├── playbook/       # Руководства
├── spec/           # Технические спецификации
└── ai_agents/      # Промпты ассистентов
```

**2. Выбор источников для Steward (публичная БЗ):**
```javascript
const STEWARD_SOURCES = [
  // Устав и философия
  'charter/philosophy.md',
  'charter/mission.md',
  'charter/roles.md',
  'charter/README.md',

  // FAQ для новичков
  'faq/general.md',
  'faq/club.md',
  'faq/membership.md',
  'faq/yachting.md',
  'faq/dao.md',
  'faq/ai.md',
  'faq/README.md',

  // Яхтинг
  'yachting/README.md',
  'yachting/training.md',

  // Децентрализация
  'decentralization/dao.md'
];

const STEWARD_ROLES = ['guest', 'public', 'passenger'];
```

**3. Результаты загрузки:**
```
✅ 14 документов обработано
✅ 17 chunks с embeddings загружено
✅ Роли доступа: guest, public, passenger
✅ Таблица: chunks (source='steward-kb')
✅ RPC функция: match_chunks_docs() работает
```

**4. Тестирование RAG поиска:**
```
Вопрос: "Что такое DAOsail?"
→ Similarity: 90.7% (faq/club.md)
→ Similarity: 89.9% (faq/general.md)
→ Similarity: 88.6% (faq/README.md)

Вопрос: "Какая философия проекта?"
→ Similarity: 80.3% (charter/philosophy.md)
→ Similarity: 80.3% (charter/README.md)

Вопрос: "Какие роли существуют?"
→ Similarity: 88.9% (faq/membership.md)
→ Similarity: 88.0% (charter/roles.md)
```

**5. UI Тестирование:**
```
✅ Steward отвечает на основе БЗ
✅ Citations отображаются корректно
⚠️ Ответы поверхностные (чанки маленькие)
⚠️ Низкая специфика DAOsail как "клуба двух реальностей"
```

#### **Выявленные проблемы качества:**

**Проблема: Слишком маленькие чанки**
```
Причина: Большинство документов → 1 chunk
Последствие: Теряется контекст и глубина
Пример: "Что такое DAOsail?" → общий ответ про яхт-клуб
         вместо уникальной концепции "клуба двух реальностей"
```

**Решение (для следующей итерации):**
```javascript
// Увеличить chunk size
chunkSize: 600 → 1200 tokens

// Добавить semantic chunking
- Разделение по смысловым блокам
- Сохранение заголовков в чанках
- Overlap с ключевыми концепциями

// Обогащение метаданных
metadata: {
  section: 'Philosophy',
  concepts: ['DAO', 'двойная реальность', 'Web3'],
  importance: 'high'
}
```

### Паттерны и лучшие практики v0.8.3:

#### **Knowledge Base Loading Pattern:**
```javascript
// scripts/rebuild-steward-knowledge.mjs

1. Определить источники (STEWARD_SOURCES)
2. Очистить старые chunks (source='steward-kb')
3. Для каждого файла:
   - Читать markdown
   - Очистить форматирование
   - Чанковать текст (600 tokens, overlap 100)
   - Генерировать embeddings (OpenAI ada-002)
   - Добавить метаданные (roles, tags, path)
4. Batch upload в chunks таблицу
5. Валидация через RPC test
```

#### **Role-Based Knowledge Access:**
```typescript
// Маппинг пользовательских ролей на доступ к БЗ
const getAccessibleRoles = (userRole: string): string[] => {
  const roleHierarchy: Record<string, string[]> = {
    'Интересующийся': ['public'],
    'Пассажир': ['public', 'passenger'],
    'Матрос': ['public', 'passenger', 'sailor'],
    'Партнер': ['public', 'passenger', 'sailor', 'partner'],
    'admin': ['public', 'passenger', 'sailor', 'partner', 'admin']
  };
  return roleHierarchy[role] || ['public'];
};
```

#### **Chunking Strategy:**
```javascript
function chunkText(text, chunkSize, overlap) {
  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }
  }

  return chunks;
}
```

### Частые проблемы и решения v0.8.3:

**Embeddings не генерируются:**
**Проблема:** OpenAI API ключ не загружен
**Решение:**
```bash
OPENAI_API_KEY=sk-... node scripts/rebuild-steward-knowledge.mjs
```

**RAG поиск возвращает пустые результаты:**
**Проблема:** similarity threshold слишком высокий
**Решение:** Понизить min_similarity с 0.7 до 0.3 для диагностики
```typescript
const { data: matches } = await supabase.rpc('match_chunks_docs', {
  query_embedding,
  match_count: 5,
  roles: ['public'],
  min_similarity: 0.3  // Вместо 0.7
});
```

**Ответы Steward не специфичны для DAOsail:**
**Проблема:** Чанки слишком маленькие, теряется уникальный контекст
**Решение (TODO):**
- Увеличить chunk size до 1200 tokens
- Semantic chunking по смысловым блокам
- Добавить ключевые концепции в metadata

---

*Этот файл должен обновляется при каждом завершении спринта*
*Цель: циклическая разработка с обязательным обновлением документации*
*Последнее обновление: 2025-10-04 (v0.8.3 Steward KB + Claude 4.5 capabilities от 2025-01-31)*
