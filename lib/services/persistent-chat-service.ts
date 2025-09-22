import { createClient } from '@/lib/supabase/client';
import { ChatMessage } from '@/lib/services/chat-service';

export interface ChatSession {
  sessionId: string;
  title: string;
  assistantType: string;
  messagesCount: number;
  lastActivity: string;
  createdAt: string;
}

export interface PersistentChatMessage extends ChatMessage {
  id?: string;
  tokenCount?: number;
  metadata?: Record<string, any>;
}

export class PersistentChatService {
  private supabase = createClient();

  /**
   * Создает новую сессию чата
   */
  async createChatSession(
    title: string,
    assistantType: string,
    userId?: string
  ): Promise<string> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { data, error } = await this.supabase.rpc('create_chat_session', {
      p_user_id: userId,
      p_title: title,
      p_assistant_type: assistantType
    });

    if (error) {
      console.error('Error creating chat session:', error);
      throw new Error(`Failed to create chat session: ${error.message}`);
    }

    return data;
  }

  /**
   * Сохраняет сообщение в чат
   */
  async saveMessage(
    sessionId: string,
    message: PersistentChatMessage,
    userId?: string
  ): Promise<string> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { data, error } = await this.supabase.rpc('save_chat_message', {
      p_session_id: sessionId,
      p_user_id: userId,
      p_role: message.role,
      p_content: message.content,
      p_assistant_type: message.assistantType || null,
      p_model: message.model || null,
      p_token_count: message.tokenCount || 0,
      p_metadata: message.metadata || {}
    });

    if (error) {
      console.error('Error saving message:', error);
      throw new Error(`Failed to save message: ${error.message}`);
    }

    return data;
  }

  /**
   * Загружает историю чата
   */
  async getChatHistory(
    sessionId: string,
    userId?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<PersistentChatMessage[]> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { data, error } = await this.supabase.rpc('get_chat_history', {
      p_session_id: sessionId,
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset
    });

    if (error) {
      console.error('Error loading chat history:', error);
      throw new Error(`Failed to load chat history: ${error.message}`);
    }

    return data.map((msg: any) => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      timestamp: msg.created_at,
      assistantType: msg.assistant_type,
      model: msg.model,
      metadata: msg.metadata
    }));
  }

  /**
   * Получает список всех чатов пользователя
   */
  async getUserChatSessions(
    userId?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<ChatSession[]> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { data, error } = await this.supabase.rpc('get_user_chat_sessions', {
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset
    });

    if (error) {
      console.error('Error loading chat sessions:', error);
      throw new Error(`Failed to load chat sessions: ${error.message}`);
    }

    return data.map((session: any) => ({
      sessionId: session.session_id,
      title: session.title,
      assistantType: session.assistant_type,
      messagesCount: session.messages_count,
      lastActivity: session.last_activity,
      createdAt: session.created_at
    }));
  }

  /**
   * Обновляет заголовок чата
   */
  async updateChatTitle(
    sessionId: string,
    newTitle: string,
    userId?: string
  ): Promise<void> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { error } = await this.supabase
      .from('user_chats')
      .update({ title: newTitle })
      .eq('session_id', sessionId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating chat title:', error);
      throw new Error(`Failed to update chat title: ${error.message}`);
    }
  }

  /**
   * Архивирует чат
   */
  async archiveChatSession(
    sessionId: string,
    userId?: string
  ): Promise<void> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { error } = await this.supabase
      .from('user_chats')
      .update({ status: 'archived' })
      .eq('session_id', sessionId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error archiving chat session:', error);
      throw new Error(`Failed to archive chat session: ${error.message}`);
    }
  }

  /**
   * Удаляет чат
   */
  async deleteChatSession(
    sessionId: string,
    userId?: string
  ): Promise<void> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { error } = await this.supabase
      .from('user_chats')
      .update({ status: 'deleted' })
      .eq('session_id', sessionId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting chat session:', error);
      throw new Error(`Failed to delete chat session: ${error.message}`);
    }
  }

  /**
   * Подсчитывает общее количество сообщений пользователя
   */
  async getTotalUserMessages(userId?: string): Promise<number> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    const { count, error } = await this.supabase
      .from('chat_messages')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('role', 'user');

    if (error) {
      console.error('Error counting user messages:', error);
      return 0;
    }

    return count || 0;
  }

  /**
   * Экспортирует чат в JSON формат
   */
  async exportChatSession(
    sessionId: string,
    userId?: string
  ): Promise<{
    session: ChatSession;
    messages: PersistentChatMessage[];
  }> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    // Получаем информацию о сессии
    const sessions = await this.getUserChatSessions(userId);
    const session = sessions.find(s => s.sessionId === sessionId);

    if (!session) {
      throw new Error('Chat session not found');
    }

    // Получаем все сообщения чата
    const messages = await this.getChatHistory(sessionId, userId, 1000);

    return { session, messages };
  }

  /**
   * Импортирует чат из JSON формата
   */
  async importChatSession(
    chatData: {
      session: Omit<ChatSession, 'sessionId' | 'createdAt' | 'lastActivity'>;
      messages: Omit<PersistentChatMessage, 'id' | 'timestamp'>[];
    },
    userId?: string
  ): Promise<string> {
    if (!userId) {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      userId = user.id;
    }

    // Создаем новую сессию
    const sessionId = await this.createChatSession(
      `${chatData.session.title} (Imported)`,
      chatData.session.assistantType,
      userId
    );

    // Импортируем сообщения
    for (const message of chatData.messages) {
      await this.saveMessage(sessionId, {
        ...message,
        timestamp: new Date().toISOString()
      }, userId);
    }

    return sessionId;
  }
}

// Экспортируем singleton instance
export const persistentChatService = new PersistentChatService();