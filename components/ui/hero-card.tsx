'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';
import Link from 'next/link';

export function HeroCard() {
  const { language } = useAppContext();

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-brand/5 to-accent/5 border-2 border-primary/20">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold">
                {language === 'ru' ? 'ИИ-Проводник' : 'AI Guide'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent leading-tight">
              {language === 'ru' 
                ? 'Шкипер-Партнёр' 
                : 'Skipper-Partner'
              }
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'ru'
                ? 'Ваш персональный проводник по миру Парусов, DAO и искусственного интеллекта. Получите экспертные знания и практические советы.'
                : 'Your personal guide through the world of Sails, DAO and artificial intelligence. Get expert knowledge and practical advice.'
              }
            </p>
          </div>
          
          <Link href="/chat">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              {language === 'ru' ? 'Начать диалог' : 'Start Dialog'}
            </Button>
          </Link>
        </div>
      </CardContent>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-brand/20 rounded-full blur-xl" />
    </Card>
  );
}