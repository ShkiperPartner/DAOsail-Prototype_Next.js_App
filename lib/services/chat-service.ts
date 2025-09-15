import { createClient } from '@/lib/supabase/client';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  assistantType?: 'navigator' | 'skipper';
  model?: string;
}

export interface ChatResponse {
  message: ChatMessage;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  assistantType: 'navigator' | 'skipper';
  created_at: string;
  updated_at: string;
}

export class ChatService {
  private supabase = createClient();

  // Отправка сообщения к ИИ
  async sendMessage(
    messages: ChatMessage[],
    assistantType: 'navigator' | 'skipper' = 'navigator'
  ): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          assistantType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('ChatService.sendMessage error:', error);
      throw error;
    }
  }

  // Создание новой сессии чата
  async createChatSession(
    title: string,
    assistantType: 'navigator' | 'skipper' = 'navigator'
  ): Promise<string> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const sessionId = crypto.randomUUID();

      // Пока создаем локально, позже сохраним в Supabase
      const session: ChatSession = {
        id: sessionId,
        title,
        messages: [],
        assistantType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // TODO: Сохранить в Supabase

      return sessionId;

    } catch (error) {
      console.error('ChatService.createChatSession error:', error);
      throw error;
    }
  }

  // Получение истории чатов пользователя
  async getChatSessions(): Promise<ChatSession[]> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return [];

      // TODO: Загрузить из Supabase
      // Пока возвращаем пустой массив

      return [];

    } catch (error) {
      console.error('ChatService.getChatSessions error:', error);
      return [];
    }
  }

  // Получение конкретной сессии чата
  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return null;

      // TODO: Загрузить из Supabase

      return null;

    } catch (error) {
      console.error('ChatService.getChatSession error:', error);
      return null;
    }
  }

  // Сохранение сообщений в сессию
  async saveMessagesToSession(sessionId: string, messages: ChatMessage[]): Promise<void> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // TODO: Сохранить в Supabase

    } catch (error) {
      console.error('ChatService.saveMessagesToSession error:', error);
      throw error;
    }
  }

  // Обновление заголовка чата на основе первого сообщения
  generateChatTitle(firstUserMessage: string, language: 'ru' | 'en' = 'ru'): string {
    // Обрезаем длинные сообщения
    const maxLength = 50;
    let title = firstUserMessage.trim();

    if (title.length > maxLength) {
      title = title.substring(0, maxLength) + '...';
    }

    // Удаляем лишние символы
    title = title.replace(/[^\w\s\u0400-\u04FF.-]/g, '');

    // Если заголовок пустой, даем дефолтный
    if (!title) {
      title = language === 'ru' ? 'Новый чат' : 'New Chat';
    }

    return title;
  }

  // Валидация сообщения
  validateMessage(message: string): { isValid: boolean; error?: string } {
    if (!message || typeof message !== 'string') {
      return { isValid: false, error: 'Message is required' };
    }

    if (message.trim().length === 0) {
      return { isValid: false, error: 'Message cannot be empty' };
    }

    if (message.length > 4000) {
      return { isValid: false, error: 'Message is too long (max 4000 characters)' };
    }

    return { isValid: true };
  }

  // Получение подсказок для быстрых вопросов
  getQuickQuestions(
    assistantType: 'navigator' | 'skipper',
    language: 'ru' | 'en' = 'ru'
  ): string[] {
    const questions = {
      navigator: {
        ru: [
          'Что такое парусный спорт?',
          'Как выбрать первую яхту?',
          'Основы морской навигации',
          'Как читать погодные карты?',
          'Планирование маршрута похода'
        ],
        en: [
          'What is sailing?',
          'How to choose your first yacht?',
          'Marine navigation basics',
          'How to read weather charts?',
          'Planning a sailing route'
        ]
      },
      skipper: {
        ru: [
          'Безопасность на воде',
          'Управление экипажем',
          'Процедуры экстренных ситуаций',
          'Швартовка и постановка на якорь',
          'Тактика регат'
        ],
        en: [
          'Water safety',
          'Crew management',
          'Emergency procedures',
          'Docking and anchoring',
          'Racing tactics'
        ]
      }
    };

    return questions[assistantType][language] || questions.navigator.ru;
  }
}

// Экспортируем синглтон
export const chatService = new ChatService();