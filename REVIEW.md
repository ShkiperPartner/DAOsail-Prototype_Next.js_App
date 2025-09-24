# REVIEW.md — Проверка Next.js + Supabase RAG + Роли/Гейтинг

## 0) Контекст (must-read)

Сверить с текущей архитектурой проекта (страницы, ассистенты, RAG, гостевой флоу, роли, БД, миграции).

**→ PROJECT_ARCHITECTURE.md**

## 1) Definition of Done

- `next build` проходит без ошибок/критичных варнингов.
- Линт/типчек/тесты — зелёные.
- Supabase: миграции применяются, RLS включён, нет доступов через anon key к чужим строкам.
- RAG: pgvector включён, поиск даёт релевант контекст (<1s p95).
- Гейтинг/роли: гостевой лимит работает (3→email→3→регистрация), приватные ассистенты недоступны гостю.
- Документация: README (запуск), ARCHITECTURE.md (1 стр), DB_CHANGELOG.md (миграции).

## 2) Репозиторий и структура

**Проверки таблиц:** `profiles`, `user_stats`, `user_achievements`, `user_chats`, `chat_sessions`, `navigation_history`, `chat_search_index`, `knowledge_documents`, (в планах: `email_leads`).

**Политики RLS:** у всех таблиц с пользовательскими данными есть `enable row level security`; + корректные policy (`user_id = auth.uid()`).

**Миграции чисто применяются:** `supabase db reset` локально или на стейджинге.

**Индексы:** GIN для FTS/JSONB, векторный индекс для `knowledge_documents.embedding`.

**Структура:**
```
app/ (App Router), (auth)/{login,signup}, (main)/{page,chat,profile,...}, api/{chat,search-knowledge}.
lib/contexts/app-context.tsx (тема/язык/лимиты/гость), lib/supabase/{client,server,types,profile-service.ts}, lib/services/{chat-service,embedding-service,achievement-service}.ts.
supabase/{migrations,config.toml,seed.sql}.
components/ui/* (ChatBox, EmailCapture, AssistantDock, SoftGateBanner).
config/roles.ts (карта ролей и доступов).
```

## 3) ENV и секреты

**Обязательные переменные** перечислены в `.env.example`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

(Нет «жёстко вшитых» ключей в коде/истории гита.)

- Серверные ключи не попадают в клиентский бандл.
- Валидация env (zod) при старте API-роутов.

## 4) Supabase: схема, миграции, RLS

**Проверки:**
- Таблицы созданы корректно
- RLS включён для всех пользовательских таблиц
- Политики проверяют `auth.uid() = user_id`
- Миграции применяются без ошибок

## 5) RAG-контур

- `pgvector` включён; размерность эмбеддингов соответствует модели.
- `embedding-service`: батч-добавление документов; поиск по косинусной близости; срез контекста (лимит токенов).
- `/api/search-knowledge`: пороги similarity и фильтры (язык, категория).
- `/api/chat`: пайплайн RAG (query → retrieve → compose prompt → LLM). Логи метрик: latency retrieve/LLM, hits@k.
- **Безопасность промпта:** защита от промпт-инъекций (инструкции ассистента фиксированы, user input не даёт расширить доступ).

## 6) Роли и гейтинг

- Роли из `config/roles.ts` (напр., Guest → Passenger → Crew → Premium/Coach/DAO).
- **Гостевой флоу:** после 3 ответов — EmailCapture; после 6 — блок до регистрации. Состояния `guestStage/emailCaptured/totalQuestionsAsked` в AppContext.
- **Доступ ассистентов:** карточки с lock-state; приватные ассистенты действительно недоступны без роли.
- **Автоповышение ролей/ачивки** триггерятся корректно (profile-service + achievement-service).

## 7) Код и архитектура

- Компоненты «тупые», бизнес-логика — в сервисах; API доступ — один слой (supabase/openai адаптеры).
- Минимизировать `use client` в app/; серверные компоненты по умолчанию.
- Импорты через алиасы (без `../../` лесенок).
- **Обработка ошибок:** централизованная, дружелюбные сообщения, без утечек стека пользователю.
- **i18n:** ключевые строки изолированы; переключатель языка влияет на UI/чат подсказки.

## 8) Безопасность

- **Проверка:** нет прямых вызовов Supabase с сервис-ключом из клиента.
- Политики RLS покрывают все чувствительные таблицы (CRUD).
- Санитизация вводов в API-роутах, лимиты размеров (сообщений/файлов).
- CORS/headers для API; запрет небезопасных методов.
- **Скан:** `npm audit --production --audit-level=high`, `git-secrets --scan`.

## 9) Производительность и UX

- Динамические импорты тяжёлых UI и иконок.
- План на streaming responses в чате; пока — spinners/typing indicator.
- Lighthouse ≥ 90 по Perf/Best-Practices/SEO, axe-аудит без критики.
- **Чат:** сохранение контекста навигации, «умная» кнопка Назад.

## 10) Тесты и наблюдаемость

- Unit на сервисы (chat/embedding/profile/achievement).
- Smoke рендеринг ключевых страниц (app routes).
- **Логи latency:** retrieve, LLM, total; алерты p95>2s.
- Фича-флаги для экспериментальных возможностей.

## 11) CI (GitHub Actions — пример)

```yaml
name: ci
on:
  pull_request:
    branches: [ main ]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --ci
      - run: npm run build
      - run: npm audit --production --audit-level=high
```

**Рекоммендации к CI (по возможности):**
- Джоб «db-validate»: поднять ephemeral Postgres + pgvector, прогнать миграции `supabase db push`.
- Джоб «rag-smoke»: прогнать 1–2 интеграционных сценария `/api/search-knowledge` (mock OPENAI_API_KEY).

## 12) Скрипты (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "analyze:deps": "depcheck",
    "analyze:unused": "ts-prune"
  }
}
```

## 13) Шаблон отчёта по ревью (в PR)

```markdown
# Review Report (Next.js + Supabase RAG + Roles)

## Summary
Итог, ключевые риски, приоритетные фиксы.

## Architecture
+ Сильные стороны:
- Риски/долги:
> Рекомендации (1–3 п.):

## Security & Data
- Политики RLS/доступы:
- Секреты/ENV:
- Действия:

## RAG
- relevancy@k / latency:
- Порог similarity / max tokens:
- Действия:

## Roles/Gating
- Флоу гостя:
- Доступ ассистентов:
- Действия:

## UX/Perf/a11y
- Lighthouse/axe:
- Узкие места:
- Действия:

## Tests/CI
- Покрытие:
- Пробелы:
- Действия:

## Blocking issues
- [ ] …
```

## 14) Релиз-чеклист (стейдж → прод)

- [ ] Применены миграции; RLS включён.
- [ ] Заполнены `knowledge_documents` (эмбеддинги построены).
- [ ] Проверен гостевой лимит и доступ ассистентов по ролям.
- [ ] ENV на проде валиден; ключи не утекли в клиент.
- [ ] Мониторинг latency RAG/LLM включён.

---

## 📊 ПРИМЕНИМОСТЬ К DAOSAIL ПРОЕКТУ

### ✅ **ТЕКУЩИЕ СОВПАДЕНИЯ (95% match):**
- Next.js 13+ App Router ✓
- Supabase + PostgreSQL ✓
- TypeScript ✓
- Структура app/, lib/, components/ ✓
- Миграции в supabase/migrations/ ✓

### 🔄 **СЛЕДУЮЩИЕ ЭТАПЫ:**
1. **Phase 8.0:** RAG контур + pgvector
2. **Phase 8.1:** Роли и гейтинг
3. **Phase 8.2:** Production security
4. **Phase 8.3:** CI/CD + тестирование

### ⚠️ **ПРИОРИТЕТНЫЕ ЗАДАЧИ:**
- Проверить RLS политики (секция 4)
- Добавить .env.example (секция 3)
- Настроить типчек/линт скрипты (секция 12)
- Подготовить RAG архитектуру (секция 5)

**Документ служит roadmap для достижения production-ready состояния проекта.**