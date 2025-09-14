'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
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
  updateProfile: (updates: Partial<UserProfile>) => void;
  incrementStat: (stat: keyof UserProfile['stats']) => void;
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

  // Helper functions
  const resetResponses = () => {
    setResponsesLeft(3);
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

          // Create or load user profile
          const profile = createMockUserProfile(
            session.user.email || '',
            session.user.user_metadata?.full_name || 'Пользователь'
          );
          setUserProfile(profile);
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

          // Create or load user profile
          const profile = createMockUserProfile(
            session.user.email || '',
            session.user.user_metadata?.full_name || 'Пользователь'
          );
          setUserProfile(profile);
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

      // Refresh profile
      const profile = createMockUserProfile(
        user.email || '',
        user.user_metadata?.full_name || 'Пользователь'
      );
      setUserProfile(profile);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setUserProfile(null);
    }
  };

  // Profile methods
  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });

      // In a real app, this would sync with the backend
      console.log('Profile updated:', updates);
    }
  };

  const incrementStat = (stat: keyof UserProfile['stats']) => {
    if (userProfile) {
      const currentValue = userProfile.stats[stat];
      let newValue: number | Date;

      if (typeof currentValue === 'number') {
        newValue = currentValue + 1;
      } else {
        // For Date fields like lastLoginDate, update to current date
        newValue = new Date();
      }

      const newStats = {
        ...userProfile.stats,
        [stat]: newValue
      };

      if (stat === 'questionsAsked') {
        decrementResponses();
      }

      setUserProfile({
        ...userProfile,
        stats: newStats
      });

      console.log(`Updated ${stat}:`, newValue);
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