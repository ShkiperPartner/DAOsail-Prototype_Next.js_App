'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
  responsesLeft: number;
  isAuthenticated: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  decrementResponses: () => void;
  resetResponses: () => void;
  setAuthenticated: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [responsesLeft, setResponsesLeft] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      if (savedResponses) {
        setResponsesLeft(parseInt(savedResponses, 10));
      }
    }
  }, []);

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

  const resetResponses = () => {
    setResponsesLeft(3);
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      resetResponses();
    }
  };

  return (
    <AppContext.Provider value={{
      theme,
      language,
      responsesLeft,
      isAuthenticated,
      toggleTheme,
      toggleLanguage,
      decrementResponses,
      resetResponses,
      setAuthenticated,
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