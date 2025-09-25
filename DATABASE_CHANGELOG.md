# Database Changes Log

**Проект:** DAOsail Prototype - Next.js App
**Цель:** Отслеживание изменений в базе данных Supabase

---

## 📊 Migration History

### **Migration 008** - Email Leads System (2025-01-25)
**Файл:** `supabase/migrations/008_create_email_leads_table.sql`

**Добавлено:**
- ✅ **Таблица `email_leads`** - сохранение email адресов гостевых пользователей
- ✅ **RLS политики** - безопасный доступ только для админов и создание лидов
- ✅ **Функции управления** - `update_email_lead_stats()`, `convert_lead_to_user()`
- ✅ **Индексы** - оптимизация поиска по email, source, дате создания

**Структура таблицы:**
```sql
CREATE TABLE email_leads (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'guest_chat',
  conversation_topic TEXT,
  messages_count INTEGER DEFAULT 0,
  first_interaction TIMESTAMPTZ DEFAULT NOW(),
  last_interaction TIMESTAMPTZ DEFAULT NOW(),
  converted_to_user BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Migration 009** - Profiles Email Integration (2025-01-25)
**Файл:** `supabase/migrations/009_fix_profiles_email_integration.sql`

**Добавлено:**
- ✅ **Колонка `email`** в таблицу `profiles`
- ✅ **Обновление функции** `create_profile_for_user()` - теперь сохраняет email при регистрации
- ✅ **Синхронизация email** - триггер для обновления email в профиле при изменении в auth.users
- ✅ **Заполнение данных** - обновление существующих профилей email'ами из auth.users

**Исправленные проблемы:**
1. **Email не сохранялся** при регистрации пользователя
2. **Email не отображался** в профиле пользователя
3. **Невозможно было редактировать** профиль через интерфейс

---

## 🔧 Code Changes

### **TypeScript Types** - `lib/supabase/types.ts`
**Обновлено:**
- ✅ **Interface Database.profiles** - добавлено поле `email: string | null`
- ✅ **ProfileRow, ProfileInsert, ProfileUpdate** - поддержка email во всех операциях

### **Profile Service** - `lib/supabase/profile-service.ts`
**Исправлено:**
- ✅ **transformToAppProfile()** - теперь загружает email из базы данных
- ✅ Убран хардкод `email: ''` - теперь `email: profile.email || ''`

---

## 📋 Планируемые изменения

### **Phase 8.1: Email Leads Integration**
- [ ] API endpoint для сохранения email гостей из формы `email-capture`
- [ ] Интеграция с существующим `chat-box` для трекинга гостевых сессий
- [ ] Dashboard для просмотра лидов (админ панель)

### **Phase 8.2: RAG System Database**
- [ ] pgvector extension activation
- [ ] Embeddings storage для knowledge base
- [ ] Vector search functions

---

*Последнее обновление: 2025-01-25*
*Версия проекта: 0.8.0 (Database Fixes & Email Integration)*