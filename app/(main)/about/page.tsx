'use client';

import React from 'react';
import { useAppContext } from '@/lib/contexts/app-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Presentation } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { language } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
            {language === 'ru' ? 'О клубе' : 'About Club'}
          </h1>
          <h2 className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ru'
              ? 'Ключевые идеи и документы, которые формируют основу нашего сообщества.'
              : 'Key ideas and documents that form the foundation of our community.'
            }
          </h2>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Presentation className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">
                    {language === 'ru' ? 'Презентации и концепции' : 'Concepts & Presentations'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ru'
                      ? 'Интерактивные презентации и ключевые документы проекта'
                      : 'Interactive presentations and key project documents'
                    }
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/about/concepts">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center">
          <p className="text-muted-foreground">
            {language === 'ru'
              ? 'Дополнительные разделы будут добавлены в будущем'
              : 'Additional sections will be added in the future'
            }
          </p>
        </div>
      </div>
    </div>
  );
}