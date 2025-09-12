'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  ExternalLink,
  Github,
  Twitter,
  Send,
  TrendingUp
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';

export default function CommunityPage() {
  const { language } = useAppContext();

  const communityStats = {
    totalMembers: 12450,
    activeToday: 2847,
    totalPosts: 34567,
    onlineNow: 1234,
  };

  const channels = [
    {
      id: 'general',
      name: language === 'ru' ? '🌍 Общий' : '🌍 General',
      description: language === 'ru' ? 'Основное обсуждение проекта' : 'Main project discussion',
      members: 8945,
      lastMessage: language === 'ru' ? '2 минуты назад' : '2 minutes ago',
      active: true,
    },
    {
      id: 'developers',
      name: language === 'ru' ? '⚡ Разработчики' : '⚡ Developers',
      description: language === 'ru' ? 'Техническое обсуждение' : 'Technical discussions',
      members: 1234,
      lastMessage: language === 'ru' ? '15 минут назад' : '15 minutes ago',
      active: true,
    },
    {
      id: 'governance',
      name: language === 'ru' ? '🗳️ Управление' : '🗳️ Governance',
      description: language === 'ru' ? 'Обсуждение предложений DAO' : 'DAO proposals discussion',
      members: 3456,
      lastMessage: language === 'ru' ? '1 час назад' : '1 hour ago',
      active: false,
    },
    {
      id: 'trading',
      name: language === 'ru' ? '📈 Трейдинг' : '📈 Trading',
      description: language === 'ru' ? 'Обсуждение торговли и аналитики' : 'Trading and analytics discussion',
      members: 5678,
      lastMessage: language === 'ru' ? '30 минут назад' : '30 minutes ago',
      active: true,
    },
    {
      id: 'announcements',
      name: language === 'ru' ? '📢 Объявления' : '📢 Announcements',
      description: language === 'ru' ? 'Официальные новости' : 'Official news',
      members: 9876,
      lastMessage: language === 'ru' ? '3 часа назад' : '3 hours ago',
      active: false,
    },
  ];

  const events = [
    {
      id: '1',
      title: language === 'ru' ? 'AMA с командой разработчиков' : 'AMA with dev team',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      participants: 234,
      type: 'live',
    },
    {
      id: '2',
      title: language === 'ru' ? 'Воркшоп по DAO управлению' : 'DAO governance workshop',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      participants: 156,
      type: 'workshop',
    },
    {
      id: '3',
      title: language === 'ru' ? 'Хакатон: ИИ + Блокчейн' : 'Hackathon: AI + Blockchain',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      participants: 89,
      type: 'hackathon',
    },
  ];

  const topContributors = [
    {
      id: '1',
      name: 'Alex_DAO',
      avatar: '',
      points: 12450,
      badge: language === 'ru' ? 'Модератор' : 'Moderator',
      contributions: 234,
    },
    {
      id: '2',
      name: 'CryptoSarah',
      avatar: '',
      points: 9876,
      badge: language === 'ru' ? 'Ментор' : 'Mentor',
      contributions: 189,
    },
    {
      id: '3',
      name: 'DevMaster',
      avatar: '',
      points: 8765,
      badge: language === 'ru' ? 'Разработчик' : 'Developer',
      contributions: 156,
    },
    {
      id: '4',
      name: 'BlockchainBob',
      avatar: '',
      points: 7654,
      badge: language === 'ru' ? 'Эксперт' : 'Expert',
      contributions: 145,
    },
  ];

  const socialLinks = [
    {
      name: 'Discord',
      icon: MessageCircle,
      members: '12.4K',
      href: '#',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      members: '45.2K',
      href: '#',
    },
    {
      name: 'Telegram',
      icon: Send,
      members: '8.9K',
      href: '#',
    },
    {
      name: 'GitHub',
      icon: Github,
      members: '2.1K',
      href: '#',
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent">
            {language === 'ru' ? 'Сообщество DAOsail' : 'DAOsail Community'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ru'
              ? 'Присоединяйтесь к нашему активному сообществу энтузиастов DAO и ИИ'
              : 'Join our active community of DAO and AI enthusiasts'
            }
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {language === 'ru' ? 'Участников' : 'Members'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold">{communityStats.activeToday.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {language === 'ru' ? 'Активных сегодня' : 'Active today'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-xl font-bold">{communityStats.totalPosts.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {language === 'ru' ? 'Сообщений' : 'Posts'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-6 w-6 bg-green-500 rounded-full mx-auto mb-2 animate-pulse" />
              <div className="text-xl font-bold">{communityStats.onlineNow.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {language === 'ru' ? 'Онлайн сейчас' : 'Online now'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Channels */}
          <div className="lg:col-span-2 space-y-6">
            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  {language === 'ru' ? 'Присоединяйтесь к нам' : 'Join us on'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={social.name}
                        variant="outline"
                        className="h-auto p-4 flex flex-col gap-2"
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-6 w-6" />
                          <div className="text-center">
                            <div className="font-semibold">{social.name}</div>
                            <div className="text-xs text-muted-foreground">{social.members}</div>
                          </div>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {language === 'ru' ? 'Каналы Discord' : 'Discord Channels'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{channel.name}</span>
                        {channel.active && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{channel.members.toLocaleString()} {language === 'ru' ? 'участников' : 'members'}</span>
                        <span>{channel.lastMessage}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Events and Contributors */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {language === 'ru' ? 'Предстоящие события' : 'Upcoming Events'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm line-clamp-2">{event.title}</h4>
                      <Badge variant="outline" className="text-xs ml-2 shrink-0">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.participants} {language === 'ru' ? 'участников' : 'participants'}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {language === 'ru' ? 'Участвовать' : 'Join'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {language === 'ru' ? 'Топ участники' : 'Top Contributors'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.id} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar} alt={contributor.name} />
                      <AvatarFallback>
                        {contributor.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {contributor.contributions} {language === 'ru' ? 'вкладов' : 'contributions'}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        {contributor.badge}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {contributor.points.toLocaleString()} pts
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}