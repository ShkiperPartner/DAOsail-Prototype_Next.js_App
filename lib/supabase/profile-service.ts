import { createClient } from './client';
import type {
  Database,
  ProfileUpdate,
  UserStatsUpdate,
  FullUserProfile,
  UserAchievementInsert,
  UserChatInsert
} from './types';
import type { UserProfile } from '../types/profile';

export class ProfileService {
  private supabase = createClient();

  // Получение полного профиля пользователя
  async getFullProfile(userId: string): Promise<FullUserProfile | null> {
    try {
      // Параллельно загружаем все данные профиля
      const [profileResult, statsResult, achievementsResult, chatsResult] = await Promise.all([
        this.supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),

        this.supabase
          .from('user_stats')
          .select('*')
          .eq('id', userId)
          .single(),

        this.supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', userId)
          .order('unlocked_at', { ascending: false }),

        this.supabase
          .from('user_chats')
          .select('*')
          .eq('user_id', userId)
          .order('last_activity', { ascending: false })
          .limit(10)
      ]);

      if (profileResult.error || statsResult.error) {
        console.error('Profile service error:', profileResult.error || statsResult.error);
        return null;
      }

      return {
        profile: profileResult.data,
        stats: statsResult.data,
        achievements: achievementsResult.data || [],
        recentChats: chatsResult.data || []
      };

    } catch (error) {
      console.error('Error fetching full profile:', error);
      return null;
    }
  }

  // Преобразование из Supabase формата в формат приложения
  transformToAppProfile(fullProfile: FullUserProfile): UserProfile {
    const { profile, stats, achievements, recentChats } = fullProfile;

    return {
      id: profile.id,
      email: '', // Email берется из auth.users, здесь не храним
      fullName: profile.full_name,
      nickname: profile.nickname || undefined,
      avatarUrl: profile.avatar_url || undefined,
      city: profile.city || undefined,
      bio: profile.bio || undefined,
      role: profile.role,
      joinDate: new Date(profile.join_date),
      roleProgress: {
        currentRole: profile.role,
        nextRole: this.getNextRole(profile.role),
        progressPercentage: this.calculateRoleProgress(profile.role, stats),
        requirementsForNext: this.getRequirementsForNextRole(profile.role)
      },
      stats: {
        questionsAsked: stats.questions_asked,
        lessonsCompleted: stats.lessons_completed,
        articlesRead: stats.articles_read,
        communityMessages: stats.community_messages,
        lastLoginDate: new Date(stats.last_login_date),
        totalLogins: stats.total_logins
      },
      achievements: achievements.map(achievement => ({
        id: achievement.achievement_id,
        title: achievement.title,
        titleRu: achievement.title_ru,
        description: achievement.description,
        descriptionRu: achievement.description_ru,
        iconName: achievement.icon_name,
        unlockedAt: new Date(achievement.unlocked_at),
        category: achievement.category
      })),
      recentChats: recentChats.map(chat => ({
        id: chat.id,
        title: chat.title,
        date: new Date(chat.last_activity),
        assistantType: chat.assistant_type,
        messagesCount: chat.messages_count,
        mainTopic: chat.main_topic || 'general'
      }))
    };
  }

  // Обновление профиля
  async updateProfile(userId: string, updates: ProfileUpdate): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }

  // Обновление статистики
  async updateStats(userId: string, updates: UserStatsUpdate): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('user_stats')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating stats:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating stats:', error);
      return false;
    }
  }

  // Инкремент статистики
  async incrementStat(userId: string, statName: keyof UserStatsUpdate): Promise<boolean> {
    try {
      // Получаем текущие значения
      const { data: currentStats, error: fetchError } = await this.supabase
        .from('user_stats')
        .select(statName)
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching current stats:', fetchError);
        return false;
      }

      // Увеличиваем значение на 1
      const currentValue = (currentStats as any)[statName] || 0;
      const updates = {
        [statName]: currentValue + 1,
        updated_at: new Date().toISOString()
      } as UserStatsUpdate;

      return await this.updateStats(userId, updates);

    } catch (error) {
      console.error('Error incrementing stat:', error);
      return false;
    }
  }

  // Добавление достижения
  async addAchievement(userId: string, achievement: Omit<UserAchievementInsert, 'user_id'>): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('user_achievements')
        .insert({
          ...achievement,
          user_id: userId
        });

      if (error) {
        console.error('Error adding achievement:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error adding achievement:', error);
      return false;
    }
  }

  // Добавление чата в историю
  async addChatToHistory(userId: string, chat: Omit<UserChatInsert, 'user_id'>): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('user_chats')
        .insert({
          ...chat,
          user_id: userId
        });

      if (error) {
        console.error('Error adding chat to history:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error adding chat to history:', error);
      return false;
    }
  }

  // Загрузка аватара
  async uploadAvatar(userId: string, file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await this.supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        return null;
      }

      // Получаем публичный URL
      const { data: { publicUrl } } = this.supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Обновляем профиль с новым URL аватара
      await this.updateProfile(userId, { avatar_url: publicUrl });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  }

  // Подписка на изменения профиля
  subscribeToProfile(userId: string, callback: (profile: FullUserProfile | null) => void) {
    const channel = this.supabase
      .channel('profile-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      }, () => {
        this.getFullProfile(userId).then(callback);
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_stats',
        filter: `id=eq.${userId}`
      }, () => {
        this.getFullProfile(userId).then(callback);
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_achievements',
        filter: `user_id=eq.${userId}`
      }, () => {
        this.getFullProfile(userId).then(callback);
      })
      .subscribe();

    return () => {
      this.supabase.removeChannel(channel);
    };
  }

  // Вспомогательные методы
  private getNextRole(currentRole: string): string | null {
    const roleProgression = {
      'Интересующийся': 'Пассажир',
      'Пассажир': 'Матрос',
      'Матрос': null
    };
    return roleProgression[currentRole as keyof typeof roleProgression] || null;
  }

  private calculateRoleProgress(role: string, stats: any): number {
    // Логика расчета прогресса на основе статистики
    const requirements = this.getRequirementsForNextRole(role);
    if (!requirements) return 100;

    let totalProgress = 0;
    let criteriaCount = 0;

    if (requirements.questionsRequired) {
      totalProgress += Math.min(100, (stats.questions_asked / requirements.questionsRequired) * 100);
      criteriaCount++;
    }
    if (requirements.lessonsRequired) {
      totalProgress += Math.min(100, (stats.lessons_completed / requirements.lessonsRequired) * 100);
      criteriaCount++;
    }
    if (requirements.articlesRequired) {
      totalProgress += Math.min(100, (stats.articles_read / requirements.articlesRequired) * 100);
      criteriaCount++;
    }

    return criteriaCount > 0 ? Math.round(totalProgress / criteriaCount) : 0;
  }

  private getRequirementsForNextRole(role: string) {
    const requirements = {
      'Интересующийся': { questionsRequired: 10, lessonsRequired: 2, articlesRequired: 5 },
      'Пассажир': { questionsRequired: 25, lessonsRequired: 5, articlesRequired: 10, communityRequired: 10 },
      'Матрос': null
    };
    return requirements[role as keyof typeof requirements] || null;
  }
}

// Экспортируем синглтон
export const profileService = new ProfileService();