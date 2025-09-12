'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Settings, 
  Calendar, 
  MessageSquare,
  Trophy,
  Save,
  Camera,
  Edit
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';

export default function ProfilePage() {
  const { language } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Guest',
    email: '',
    city: '',
    bio: '',
  });

  const userStats = {
    joinDate: new Date(2024, 0, 15),
    totalQuestions: 47,
    responsesReceived: 156,
    communityPoints: 1250,
    currentLevel: language === 'ru' ? 'Новичок' : 'Beginner',
  };

  const achievements = [
    {
      id: '1',
      title: language === 'ru' ? 'Первый вопрос' : 'First Question',
      description: language === 'ru' ? 'Задали первый вопрос ИИ' : 'Asked your first AI question',
      date: new Date(2024, 0, 15),
      icon: '🎯',
    },
    {
      id: '2',
      title: language === 'ru' ? 'Активный пользователь' : 'Active User',
      description: language === 'ru' ? '7 дней подряд используете платформу' : '7 consecutive days using the platform',
      date: new Date(2024, 0, 22),
      icon: '🔥',
    },
    {
      id: '3',
      title: language === 'ru' ? 'Исследователь DAO' : 'DAO Explorer',
      description: language === 'ru' ? 'Изучили раздел DAO' : 'Explored the DAO section',
      date: new Date(2024, 0, 28),
      icon: '🏛️',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'question',
      content: language === 'ru' ? 'Как работает консенсус в блокчейне?' : 'How does blockchain consensus work?',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'achievement',
      content: language === 'ru' ? 'Получено достижение "Активный пользователь"' : 'Earned "Active User" achievement',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'question',
      content: language === 'ru' ? 'Что такое токеномика?' : 'What is tokenomics?',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ];

  const handleSave = () => {
    // Mock save - in real app, this would save to backend
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatRelativeTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return rtf.format(-minutes, 'minute');
    } else if (hours < 24) {
      return rtf.format(-hours, 'hour');
    } else {
      const days = Math.floor(hours / 24);
      return rtf.format(-days, 'day');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent">
            {language === 'ru' ? 'Мой профиль' : 'My Profile'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'ru' 
              ? 'Управляйте своим аккаунтом и отслеживайте прогресс'
              : 'Manage your account and track your progress'
            }
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {language === 'ru' ? 'Профиль' : 'Profile'}
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {language === 'ru' ? 'Активность' : 'Activity'}
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              {language === 'ru' ? 'Достижения' : 'Achievements'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      {language === 'ru' ? 'Информация профиля' : 'Profile Information'}
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? (language === 'ru' ? 'Отмена' : 'Cancel') : (language === 'ru' ? 'Редактировать' : 'Edit')}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="" alt="User avatar" />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl">
                            {profileData.name.substring(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{profileData.name}</h3>
                        <Badge variant="secondary">{userStats.currentLevel}</Badge>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === 'ru' ? 'Имя' : 'Name'}
                        </Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          placeholder={language === 'ru' ? 'Введите email' : 'Enter email'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          {language === 'ru' ? 'Город' : 'City'}
                        </Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                          disabled={!isEditing}
                          placeholder={language === 'ru' ? 'Введите город' : 'Enter city'}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          {language === 'ru' ? 'Отмена' : 'Cancel'}
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          {language === 'ru' ? 'Сохранить' : 'Save'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'ru' ? 'Статистика' : 'Statistics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {language === 'ru' ? 'Дата регистрации:' : 'Member since:'}
                      </span>
                      <span className="font-medium">{formatDate(userStats.joinDate)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {language === 'ru' ? 'Вопросов задано:' : 'Questions asked:'}
                      </span>
                      <span className="font-medium">{userStats.totalQuestions}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {language === 'ru' ? 'Ответов получено:' : 'Responses received:'}
                      </span>
                      <span className="font-medium">{userStats.responsesReceived}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {language === 'ru' ? 'Баллы сообщества:' : 'Community points:'}
                      </span>
                      <span className="font-medium">{userStats.communityPoints.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {language === 'ru' ? 'Недавняя активность' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="mt-1">
                        {activity.type === 'question' ? (
                          <MessageSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatRelativeTime(activity.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  {language === 'ru' ? 'Мои достижения' : 'My Achievements'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(achievement.date)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}