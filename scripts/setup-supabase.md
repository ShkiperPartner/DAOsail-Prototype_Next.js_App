# Настройка Supabase CLI и применение миграций

## 📋 Пошаговая инструкция

### 1. Установка Supabase CLI

```bash
# Установка через npm (глобально)
npm install -g supabase

# Или через yarns
yarn global add supabase

# Или через scoop (Windows)
scoop install supabase

# Проверка установки
supabase --version
```

### 2. Получение данных проекта

1. Заходите в [supabase.com](https://supabase.com/dashboard)
2. Выберите ваш проект
3. Идите в **Settings** → **General**
4. Скопируйте:
   - **Reference ID** (например: `abcdefghijklmnop`)
   - **Project URL** (например: `https://abcdefghijklmnop.supabase.co`)

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env.local` и заполните:

```bash
cp .env.example .env.local
```

Заполните файл `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ваш-проект.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_anon_ключ
SUPABASE_PROJECT_ID=ваш_project_id
```

### 4. Инициализация и связывание проекта

```bash
# Инициализация Supabase в проекте
supabase init

# Связывание с удаленным проектом
supabase link --project-ref ВАШ_PROJECT_ID

# Введите пароль от базы данных когда будет запрос
```

### 5. Применение миграций

```bash
# Проверка статуса миграций
supabase db diff

# Применение всех миграций к удаленной БД
supabase db push

# Применение seed данных (тестовые данные)
supabase db reset --db-url ВАШ_DATABASE_URL
```

### 6. Проверка результата

1. Заходите в **Supabase Dashboard** → **Table Editor**
2. Должны появиться таблицы:
   - `profiles`
   - `user_stats`
   - `user_achievements`
   - `user_chats`

3. Проверьте **Storage** → должен появиться bucket `avatars`

## 🔧 Полезные команды

```bash
# Проверить статус подключения
supabase status

# Посмотреть схему БД
supabase db dump --schema-only

# Создать новую миграцию
supabase db diff -f название_миграции

# Откат миграции (осторожно!)
supabase db reset

# Запуск локального Supabase для разработки
supabase start
```

## 🚨 Возможные проблемы

### Ошибка аутентификации
```bash
supabase login
# Введите ваш токен доступа
```

### Ошибка подключения к проекту
- Проверьте правильность PROJECT_ID
- Убедитесь что у вас есть права на проект
- Проверьте интернет соединение

### Ошибка применения миграций
- Убедитесь что нет конфликтующих изменений
- Проверьте синтаксис SQL в миграционных файлах
- Посмотрите логи: `supabase db push --debug`

## 🎯 После успешного применения

1. ✅ Таблицы созданы
2. ✅ RLS политики активированы
3. ✅ Storage bucket для аватаров настроен
4. ✅ Триггеры для автоматического создания профилей работают

Можно переходить к интеграции с приложением!