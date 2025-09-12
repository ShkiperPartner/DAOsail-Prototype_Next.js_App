'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Moon, 
  LogIn, 
  UserPlus, 
  Globe,
  Wifi
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';

export function TopBar() {
  const { theme, language, toggleTheme, toggleLanguage, setAuthenticated } = useAppContext();

  const handleLogin = () => {
    // Mock login - in real app, this would open a login modal
    setAuthenticated(true);
  };

  const handleRegister = () => {
    // Mock register - in real app, this would open a registration modal
    setAuthenticated(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand to-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">DS</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent">
            DAOsail
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {/* Online indicator */}
          <Badge variant="outline" className="hidden sm:flex items-center gap-1">
            <Wifi className="h-3 w-3 text-green-500" />
            <span className="text-xs">
              {language === 'ru' ? 'Онлайн • модель' : 'Online • model'}
            </span>
          </Badge>

          {/* Language toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="font-mono"
            aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
          >
            <Globe className="h-4 w-4 mr-1" />
            {language.toUpperCase()}
          </Button>

          {/* Theme toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Auth buttons */}
          <div className="flex items-center space-x-2 ml-2 pl-2 border-l">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogin}
              className="hidden sm:flex items-center gap-1"
            >
              <LogIn className="h-4 w-4" />
              {language === 'ru' ? 'Войти' : 'Login'}
            </Button>
            <Button 
              size="sm"
              onClick={handleRegister}
              className="items-center gap-1"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'ru' ? 'Регистрация' : 'Register'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}