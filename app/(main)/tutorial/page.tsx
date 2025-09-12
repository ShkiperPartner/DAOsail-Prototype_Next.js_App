'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  CheckCircle, 
  Circle, 
  Clock,
  Play,
  Users,
  Trophy
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';

export default function TutorialPage() {
  const { language } = useAppContext();

  const modules = [
    {
      id: '1',
      title: language === 'ru' ? 'Введение в DAO' : 'Introduction to DAO',
      description: language === 'ru' 
        ? 'Основы децентрализованных организаций'
        : 'Fundamentals of decentralized organizations',
      lessons: 5,
      duration: '30 мин',
      completed: true,
      difficulty: language === 'ru' ? 'Начальный' : 'Beginner',
    },
    {
      id: '2',
      title: language === 'ru' ? 'Блокчейн технологии' : 'Blockchain Technologies',
      description: language === 'ru'
        ? 'Понимание базовых принципов блокчейна'
        : 'Understanding basic blockchain principles',
      lessons: 8,
      duration: '45 мин',
      completed: true,
      difficulty: language === 'ru' ? 'Начальный' : 'Beginner',
    },
    {
      id: '3',
      title: language === 'ru' ? 'Токеномика' : 'Tokenomics',
      description: language === 'ru'
        ? 'Экономика токенов и системы стимулирования'
        : 'Token economics and incentive systems',
      lessons: 6,
      duration: '40 мин',
      completed: false,
      currentLesson: 3,
      difficulty: language === 'ru' ? 'Средний' : 'Intermediate',
    },
    {
      id: '4',
      title: language === 'ru' ? 'Управление и голосование' : 'Governance and Voting',
      description: language === 'ru'
        ? 'Системы принятия решений в DAO'
        : 'Decision-making systems in DAOs',
      lessons: 7,
      duration: '35 мин',
      completed: false,
      difficulty: language === 'ru' ? 'Средний' : 'Intermediate',
    },
    {
      id: '5',
      title: language === 'ru' ? 'ИИ в DAO' : 'AI in DAO',
      description: language === 'ru'
        ? 'Применение искусственного интеллекта'
        : 'Artificial intelligence applications',
      lessons: 9,
      duration: '60 мин',
      completed: false,
      difficulty: language === 'ru' ? 'Продвинутый' : 'Advanced',
    },
    {
      id: '6',
      title: language === 'ru' ? 'Практические кейсы' : 'Practical Cases',
      description: language === 'ru'
        ? 'Реальные примеры успешных DAO'
        : 'Real examples of successful DAOs',
      lessons: 4,
      duration: '50 мин',
      completed: false,
      difficulty: language === 'ru' ? 'Продвинутый' : 'Advanced',
    },
  ];

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons, 0);
  const completedLessons = modules
    .filter(m => m.completed)
    .reduce((acc, module) => acc + module.lessons, 0) + 
    (modules.find(m => m.currentLesson)?.currentLesson || 0);

  const progressPercentage = (completedLessons / totalLessons) * 100;

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('Начальный') || difficulty.includes('Beginner')) return 'bg-green-500';
    if (difficulty.includes('Средний') || difficulty.includes('Intermediate')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent">
            {language === 'ru' ? 'Учебник DAO' : 'DAO Tutorial'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ru'
              ? 'Изучите децентрализованные организации от основ до продвинутых концепций'
              : 'Learn decentralized organizations from basics to advanced concepts'
            }
          </p>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Прогресс' : 'Progress'}
                </div>
                <Progress value={progressPercentage} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {completedLessons}/{totalLessons}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Уроков завершено' : 'Lessons completed'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Сертификат' : 'Certificate'}
                </div>
                <Badge variant="outline" className="mt-1">
                  {progressPercentage >= 80 
                    ? (language === 'ru' ? 'Доступен' : 'Available')
                    : (language === 'ru' ? 'Заблокирован' : 'Locked')
                  }
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            {language === 'ru' ? 'Путь обучения' : 'Learning Path'}
          </h2>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <Card key={module.id} className={`transition-all duration-200 ${
                module.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                module.currentLesson ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                'hover:shadow-md'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        {module.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : module.currentLesson ? (
                          <div className="h-6 w-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          </div>
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{module.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              <div className={`w-2 h-2 rounded-full ${getDifficultyColor(module.difficulty)} mr-1`} />
                              {module.difficulty}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{module.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {module.lessons} {language === 'ru' ? 'уроков' : 'lessons'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {module.duration}
                          </div>
                          {module.currentLesson && (
                            <div className="flex items-center gap-1">
                              <Play className="h-4 w-4" />
                              {language === 'ru' ? `Урок ${module.currentLesson}` : `Lesson ${module.currentLesson}`}
                            </div>
                          )}
                        </div>
                        
                        {module.currentLesson && (
                          <div className="space-y-2">
                            <Progress 
                              value={(module.currentLesson / module.lessons) * 100} 
                              className="h-2" 
                            />
                            <div className="text-xs text-muted-foreground">
                              {module.currentLesson} из {module.lessons} уроков завершено
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button 
                        variant={module.completed ? "outline" : "default"}
                        size="sm"
                        disabled={index > 0 && !modules[index - 1].completed && !modules[index - 1].currentLesson}
                      >
                        {module.completed ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {language === 'ru' ? 'Повторить' : 'Review'}
                          </>
                        ) : module.currentLesson ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {language === 'ru' ? 'Продолжить' : 'Continue'}
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {language === 'ru' ? 'Начать' : 'Start'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {language === 'ru' ? 'Статистика сообщества' : 'Community Stats'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">1,234</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Активных студентов' : 'Active students'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">89%</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Завершили курс' : 'Completed course'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">567</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Сертификатов выдано' : 'Certificates issued'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}