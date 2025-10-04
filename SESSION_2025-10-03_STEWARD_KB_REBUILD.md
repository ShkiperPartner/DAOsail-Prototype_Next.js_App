# Сессия 2025-10-03: Steward Knowledge Base Rebuild

**Статус:** ⏸️ В ожидании информации от пользователя
**Версия:** v0.8.3 (continued)
**Цель:** Настроить RAG для Steward ассистента с ответами строго по базе знаний

---

## 📊 Текущая ситуация

### Что работает:
- ✅ chunks таблица: 303 записи
- ✅ match_chunks_docs() RPC функция существует
- ✅ API endpoint /api/chat с RAG интеграцией

### Что НЕ работает:
- ❌ RAG поиск возвращает 0 результатов (similarity threshold 0.7)
- ❌ Steward отвечает общими знаниями, игнорируя контекст
- ❓ Embeddings: неизвестно их состояние (есть ли, актуальны ли)

---

## 🎯 Принятые решения

### 1. Доступ Steward к знаниям (ОГРАНИЧЕННЫЙ):
```
✓ docs/charter/philosophy.md    - Философия проекта
✓ docs/charter/roles.md         - Роли и права
✓ docs/charter/economics.md     - Экономическая модель

✗ docs/ai_agents/*               - Промпты (закрыты)
✗ docs/spec/*                    - Техдокументация (закрыта)
```

### 2. Роли доступа (фаза 1):
```javascript
'guest'     → ['guest']                           // Неавторизованный
'public'    → ['guest', 'public']                 // Интересующийся
'passenger' → ['guest', 'public', 'passenger']    // Зарегистрированный

// Позже: sailor, captain, partner
```

### 3. Pipeline базы знаний:
```
GitHub repo docs/
    ↓
rebuild-steward-knowledge.mjs
    ↓
chunks table (с embeddings)
    ↓
match_chunks_docs()
    ↓
Steward ответы
```

---

## 📋 План действий

### Этап 1: Получить исходники (⏸️ ОЖИДАНИЕ)
**Нужно от пользователя:**
- [ ] URL GitHub репо с `docs/` директорией
- [ ] ИЛИ путь к локальным файлам
- [ ] ИЛИ создать тестовые документы локально

**Опции:**
- A) Клонировать репо и обработать
- B) Создать локальные docs/ и синхронизировать позже
- C) Получить файлы вручную от пользователя

### Этап 2: Создать скрипт загрузки
**Файл:** `scripts/rebuild-steward-knowledge.mjs`

**Функционал:**
```javascript
1. Очистить старые chunks для Steward (source='docs', path like 'docs/charter/%')
2. Для каждого файла:
   - Парсить frontmatter (metadata)
   - Чанковать (600 tokens, overlap 100)
   - Генерировать embedding (OpenAI ada-002)
   - Upsert в chunks с:
     * source: 'docs'
     * path: относительный путь
     * content: текст чанка
     * embedding: vector(1536)
     * accessible_roles: ['guest', 'public', 'passenger']
     * metadata: {chunk: idx, total: count, ...}
3. Валидация: проверить embeddings созданы
4. Тест: запустить RAG поиск
```

### Этап 3: Улучшить промпт Steward
**Файл:** `app/api/chat/route.ts`

**Изменения:**
```typescript
// Добавить строгий промпт:
const stewardPrompt = `Ты - Шкипер-Администратор DAOsail.

🎯 ДОСТУП: только публичная информация (философия, роли, экономика)
📋 ПРАВИЛО: отвечай ТОЛЬКО по контексту, не выдумывай
🎨 СТИЛЬ: тёплый, гостеприимный, профессиональный

Контекст: ${context}`;

// Добавить маппинг ролей:
function mapUserRoleToKnowledgeRoles(userRole) {
  const roleMap = {
    'guest': ['guest'],
    'public': ['guest', 'public'],
    'passenger': ['guest', 'public', 'passenger']
  };
  return roleMap[userRole.toLowerCase()] || ['guest'];
}
```

### Этап 4: Тестирование
```
1. ✅ RAG поиск возвращает результаты (similarity > 0.7)
2. ✅ Steward отвечает по контексту
3. ✅ Steward корректно отказывает при отсутствии информации
4. ✅ Citations отображаются в UI
5. ✅ Role-based фильтрация работает
```

---

## 🔧 Технические детали

### Структура chunks таблицы:
```sql
chunks {
  id: bigserial PRIMARY KEY,
  source: text,                -- 'docs'
  path: text,                  -- 'docs/charter/philosophy.md'
  content: text,               -- текст чанка
  embedding: vector(1536),     -- OpenAI embedding
  accessible_roles: text[],    -- ['guest', 'public', 'passenger']
  tags: text[],                -- тематические теги
  metadata: jsonb              -- {chunk: 1, total: 5, ...}
}
```

### match_chunks_docs() RPC:
```sql
match_chunks_docs(
  query_embedding vector(1536),
  match_count int DEFAULT 5,
  roles text[] DEFAULT ARRAY['public'],
  min_similarity float DEFAULT 0.7
) RETURNS TABLE (...)
```

### Тестовые вопросы для валидации:
```javascript
[
  'Что такое DAOsail?',
  'Какая философия проекта?',
  'Какие роли существуют в DAOsail?',
  'Как работает экономическая модель?',
  'Расскажи о техническом стеке' // Должен отказать
]
```

---

## 📁 Созданные файлы в этой сессии

### Диагностические скрипты:
- ✅ `scripts/check-knowledge-base.mjs` - проверка chunks таблицы
- ✅ `scripts/test-steward-rag.mjs` - тестирование RAG поиска
- ✅ `scripts/check-embeddings.mjs` - проверка наличия embeddings (не запущен)

### Документация:
- ✅ `CLAUDE.md` - обновлен (v0.8.3 continued, 2025-10-03)
- ✅ `SESSION_2025-10-03_STEWARD_KB_REBUILD.md` - этот файл

---

## 🚀 Как продолжить

**Когда вернусь, нужно сообщить:**

1. **URL GitHub репо** с docs/ директорией
   ИЛИ
2. **Путь к локальным файлам** docs/
   ИЛИ
3. **Создать тестовые docs/** локально и показать структуру

**Затем:**
- Создам `rebuild-steward-knowledge.mjs`
- Загружу БЗ с embeddings
- Протестирую RAG
- Улучшу промпт Steward
- Проверю в UI

---

## 📝 Важные ссылки

- **PROJECT_ARCHITECTURE.md** - основная архитектура
- **CLAUDE.md** - рабочие инструкции (обновлен сегодня)
- **DATABASE_CHANGELOG.md** - история изменений БД
- **chunks таблица** - Supabase Dashboard
- **Supabase project:** rmlgsnlgwmstajwdhygg

---

## ✅ РЕАЛИЗАЦИЯ ЗАВЕРШЕНА (2025-10-04)

### Финальные результаты:

**1. Инфраструктура:**
- ✅ Клонирован https://github.com/ShkiperPartner/daosail-kb.git
- ✅ Создан `scripts/rebuild-steward-knowledge.mjs`
- ✅ 14 документов обработано
- ✅ 17 chunks с embeddings загружено в БД

**2. База знаний Steward:**
```
Публичные источники:
├── charter/ (4 файла) - философия, миссия, роли, README
├── faq/ (7 файлов) - general, club, membership, yachting, dao, ai, README
├── yachting/ (2 файла) - README, training
└── decentralization/ (1 файл) - dao

Роли доступа: guest, public, passenger
Хранение: chunks таблица (source='steward-kb')
```

**3. Тестирование RAG поиска:**
```
✅ "Что такое DAOsail?" → 90.7% similarity (faq/club.md)
✅ "Какая философия проекта?" → 80.3% similarity (charter/philosophy.md)
✅ "Какие роли существуют?" → 88.9% similarity (faq/membership.md)
✅ "Как работает экономика?" → 78.2% similarity (faq/membership.md)
```

**4. UI Тестирование:**
```
✅ Steward отвечает на основе базы знаний
✅ Citations отображаются корректно
⚠️ Ответы поверхностные (чанки маленькие 1-2 на документ)
⚠️ Низкая специфика DAOsail ("клуб двух реальностей" теряется)
```

### Выявленные ограничения качества:

**Проблема: Маленькие чанки**
- Большинство документов → 1 chunk (600 tokens)
- Теряется контекст проекта
- Ответы общие, как про обычный яхт-клуб

**Решение для следующей итерации:**
- Увеличить chunk size до 1200 tokens
- Semantic chunking по смысловым блокам
- Добавить ключевые концепции в metadata
- Сохранять заголовки в чанках

### Обновленная документация:

- ✅ PROJECT_ARCHITECTURE.md → Phase 8.3 завершена, версия 0.8.3
- ✅ CLAUDE.md → добавлена секция v0.8.3 с паттернами
- ✅ README.md → обновлена версия и changelog
- ✅ SESSION файл → финальные результаты

### Созданные артефакты:

**Скрипты:**
- `scripts/rebuild-steward-knowledge.mjs` - универсальная загрузка БЗ
- `scripts/test-steward-rag.mjs` - тестирование RAG поиска
- `scripts/check-knowledge-base.mjs` - диагностика chunks

**База знаний:**
- `daosail-kb/` - клон репозитория с документами (29 .md файлов)
- 17 chunks в таблице chunks с embeddings (ada-002)

---

**Статус:** ✅ ЗАВЕРШЕНО
**Версия:** v0.8.3
**Дата завершения:** 2025-10-04
**Следующий шаг:** Оптимизация качества KB (chunking strategy, metadata enrichment)
