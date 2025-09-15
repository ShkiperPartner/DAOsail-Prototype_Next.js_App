'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { profileService } from '@/lib/supabase/profile-service';
import { achievementService } from '@/lib/services/achievement-service';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/types/profile';
import { createMockUserProfile } from '@/data/mock-profile';

interface AppContextType {
  // Theme & Language
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
  responsesLeft: number;

  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Profile
  userProfile: UserProfile | null;

  // Theme & Language methods
  toggleTheme: () => void;
  toggleLanguage: () => void;
  decrementResponses: () => void;
  resetResponses: () => void;

  // Authentication methods
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;

  // Profile methods
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  incrementStat: (stat: keyof UserProfile['stats']) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string | null>;
  loadProfile: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme & Language state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [responsesLeft, setResponsesLeft] = useState(3);

  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Helper functions
  const resetResponses = () => {
    setResponsesLeft(3);
  };

  // Load profile from Supabase
  const loadProfile = useCallback(async () => {
    if (!user) return;

    setProfileLoading(true);
    try {
      const fullProfile = await profileService.getFullProfile(user.id);

      if (fullProfile) {
        const appProfile = profileService.transformToAppProfile(fullProfile);
        // Update email from auth user
        appProfile.email = user.email || '';
        setUserProfile(appProfile);
      } else {
        // If no profile exists, create initial profile records
        await createInitialProfile(user);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback to mock profile
      const profile = createMockUserProfile(
        user.email || '',
        user.user_metadata?.full_name || 'Пользователь'
      );
      setUserProfile(profile);
    } finally {
      setProfileLoading(false);
    }
  }, [user]);

  // Create initial profile records for new user
  const createInitialProfile = async (authUser: User) => {
    // This would be implemented to create initial records in Supabase
    // For now, use mock profile
    const profile = createMockUserProfile(
      authUser.email || '',
      authUser.user_metadata?.full_name || 'Пользователь'
    );
    setUserProfile(profile);
  };

  // Initialize auth state and listen to auth changes
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
        } else if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          resetResponses(); // Reset responses for authenticated users
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);

        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          resetResponses();
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setUserProfile(null);
        }

        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load profile when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfile();
    }
  }, [isAuthenticated, user, loadProfile]);

  // Setup real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const unsubscribe = profileService.subscribeToProfile(user.id, (fullProfile) => {
      if (fullProfile) {
        const appProfile = profileService.transformToAppProfile(fullProfile);
        appProfile.email = user.email || '';
        setUserProfile(appProfile);

        // Check for new achievements and show notifications
        if (userProfile && appProfile.achievements.length > userProfile.achievements.length) {
          const newAchievements = appProfile.achievements.slice(0, appProfile.achievements.length - userProfile.achievements.length);
          newAchievements.forEach(achievement => {
            console.log('🏆 New achievement unlocked:', achievement.title);
            // Here you could show a toast notification
          });
        }
      }
    });

    return unsubscribe;
  }, [user, userProfile]);

  // Load saved preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const savedLanguage = localStorage.getItem('language') as 'en' | 'ru' | null;
      const savedResponses = localStorage.getItem('responsesLeft');

      if (savedTheme) {
        setTheme(savedTheme);
      }
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
      if (savedResponses && !isAuthenticated) {
        // Only use saved responses if user is not authenticated
        setResponsesLeft(parseInt(savedResponses, 10));
      }
    }
  }, [isAuthenticated]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Save responses left
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('responsesLeft', responsesLeft.toString());
    }
  }, [responsesLeft]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  const decrementResponses = () => {
    setResponsesLeft(prev => Math.max(0, prev - 1));
  };

  // Authentication methods
  const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }

    // State will be updated automatically by the auth state listener
  };

  const refreshUser = async () => {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Refresh user error:', error);
      throw error;
    }

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setUserProfile(null);
    }
  };

  // Profile methods
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;

    try {
      // Update in Supabase
      const profileUpdates: any = {};
      if (updates.fullName) profileUpdates.full_name = updates.fullName;
      if (updates.nickname) profileUpdates.nickname = updates.nickname;
      if (updates.city) profileUpdates.city = updates.city;
      if (updates.bio) profileUpdates.bio = updates.bio;

      if (Object.keys(profileUpdates).length > 0) {
        const success = await profileService.updateProfile(user.id, profileUpdates);
        if (!success) {
          console.error('Failed to update profile in Supabase');
          return;
        }
      }

      // Update local state
      setUserProfile({ ...userProfile, ...updates });
      console.log('Profile updated:', updates);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const incrementStat = async (stat: keyof UserProfile['stats']) => {
    if (!user || !userProfile) return;

    try {
      // Map frontend stat names to backend column names
      const statMapping: Record<keyof UserProfile['stats'], string> = {
        questionsAsked: 'questions_asked',
        lessonsCompleted: 'lessons_completed',
        articlesRead: 'articles_read',
        communityMessages: 'community_messages',
        lastLoginDate: 'last_login_date',
        totalLogins: 'total_logins'
      };

      const backendStatName = statMapping[stat];
      if (!backendStatName) return;

      // For date fields, use different logic
      if (stat === 'lastLoginDate') {
        const success = await profileService.updateStats(user.id, {
          [backendStatName]: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        if (!success) return;

        setUserProfile({
          ...userProfile,
          stats: {
            ...userProfile.stats,
            lastLoginDate: new Date()
          }
        });
      } else {
        // For numeric fields, increment
        const success = await profileService.incrementStat(user.id, backendStatName);
        if (!success) return;

        const currentValue = userProfile.stats[stat] as number;
        const newValue = currentValue + 1;

        const updatedProfile = {
          ...userProfile,
          stats: {
            ...userProfile.stats,
            [stat]: newValue
          }
        };

        setUserProfile(updatedProfile);

        if (stat === 'questionsAsked') {
          decrementResponses();
        }

        // Check for new achievements after stat update
        try {
          await achievementService.checkAndAddAchievements(user.id, updatedProfile);
        } catch (error) {
          console.error('Error checking achievements:', error);
        }

        // Check for role promotion
        try {
          const newRole = await profileService.checkAndPromoteRole(user.id);
          if (newRole && newRole !== updatedProfile.role) {
            console.log(`🎖️ Role promoted to: ${newRole}`);

            // Update local profile with new role
            setUserProfile(prev => prev ? { ...prev, role: newRole } : null);

            // Add role promotion achievement
            await achievementService.checkAndAddAchievements(user.id, { ...updatedProfile, role: newRole });
          }
        } catch (error) {
          console.error('Error checking role promotion:', error);
        }
      }

      console.log(`Updated ${stat}`);
    } catch (error) {
      console.error('Error incrementing stat:', error);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const avatarUrl = await profileService.uploadAvatar(user.id, file);
      if (avatarUrl && userProfile) {
        setUserProfile({
          ...userProfile,
          avatarUrl
        });
      }
      return avatarUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  };

  return (
    <AppContext.Provider value={{
      // Theme & Language
      theme,
      language,
      responsesLeft,

      // Authentication
      user,
      isAuthenticated,
      isLoading,

      // Profile
      userProfile,

      // Theme & Language methods
      toggleTheme,
      toggleLanguage,
      decrementResponses,
      resetResponses,

      // Authentication methods
      signOut,
      refreshUser,

      // Profile methods
      updateProfile,
      incrementStat,
      uploadAvatar,
      loadProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}