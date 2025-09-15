// Типы для Supabase интеграции
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          nickname: string | null;
          avatar_url: string | null;
          city: string | null;
          bio: string | null;
          role: 'Интересующийся' | 'Пассажир' | 'Матрос';
          join_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          nickname?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          bio?: string | null;
          role?: 'Интересующийся' | 'Пассажир' | 'Матрос';
          join_date?: string;
        };
        Update: {
          full_name?: string;
          nickname?: string | null;
          avatar_url?: string | null;
          city?: string | null;
          bio?: string | null;
          role?: 'Интересующийся' | 'Пассажир' | 'Матрос';
        };
      };
      user_stats: {
        Row: {
          id: string;
          questions_asked: number;
          lessons_completed: number;
          articles_read: number;
          community_messages: number;
          last_login_date: string;
          total_logins: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          questions_asked?: number;
          lessons_completed?: number;
          articles_read?: number;
          community_messages?: number;
          last_login_date?: string;
          total_logins?: number;
        };
        Update: {
          questions_asked?: number;
          lessons_completed?: number;
          articles_read?: number;
          community_messages?: number;
          last_login_date?: string;
          total_logins?: number;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          title: string;
          title_ru: string;
          description: string;
          description_ru: string;
          icon_name: string;
          category: 'learning' | 'community' | 'progress' | 'special';
          unlocked_at: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
          title: string;
          title_ru: string;
          description: string;
          description_ru: string;
          icon_name: string;
          category: 'learning' | 'community' | 'progress' | 'special';
          unlocked_at?: string;
        };
        Update: {
          title?: string;
          title_ru?: string;
          description?: string;
          description_ru?: string;
          icon_name?: string;
          category?: 'learning' | 'community' | 'progress' | 'special';
        };
      };
      user_chats: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          assistant_type: string;
          main_topic: string | null;
          messages_count: number;
          last_activity: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          assistant_type: string;
          main_topic?: string | null;
          messages_count?: number;
          last_activity?: string;
        };
        Update: {
          title?: string;
          assistant_type?: string;
          main_topic?: string | null;
          messages_count?: number;
          last_activity?: string;
        };
      };
    };
  };
}

// Типы для работы с профилем
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type UserStatsRow = Database['public']['Tables']['user_stats']['Row'];
export type UserStatsInsert = Database['public']['Tables']['user_stats']['Insert'];
export type UserStatsUpdate = Database['public']['Tables']['user_stats']['Update'];

export type UserAchievementRow = Database['public']['Tables']['user_achievements']['Row'];
export type UserAchievementInsert = Database['public']['Tables']['user_achievements']['Insert'];

export type UserChatRow = Database['public']['Tables']['user_chats']['Row'];
export type UserChatInsert = Database['public']['Tables']['user_chats']['Insert'];
export type UserChatUpdate = Database['public']['Tables']['user_chats']['Update'];

// Полный профиль пользователя с данными из разных таблиц
export interface FullUserProfile {
  profile: ProfileRow;
  stats: UserStatsRow;
  achievements: UserAchievementRow[];
  recentChats: UserChatRow[];
}