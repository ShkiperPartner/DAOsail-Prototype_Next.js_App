'use client';

import React from 'react';
import { useAppContext } from '@/lib/contexts/app-context';
import { CommunityCard } from '@/components/ui/community-card';
import {
  Send,
  MessageCircle,
  Users,
  Play,
  Globe
} from 'lucide-react';

export default function CommunitiesPage() {
  const { language } = useAppContext();

  const communities = [
    {
      id: 'telegram',
      icon: Send,
      title: language === 'ru' ? 'Чат в Telegram' : 'Telegram Chat',
      description: language === 'ru'
        ? 'Основной канал для оперативных новостей, анонсов регат и быстрого общения с другими участниками клуба.'
        : 'Main channel for breaking news, regatta announcements and quick communication with other club members.',
      link: 'https://t.me/daosailnews',
      color: 'telegram'
    },
    {
      id: 'discord',
      icon: MessageCircle,
      title: language === 'ru' ? 'Сервер в Discord' : 'Discord Server',
      description: language === 'ru'
        ? 'Здесь проходят тематические обсуждения, голосования DAO и работают голосовые каналы для команд.'
        : 'Where thematic discussions, DAO voting, and voice channels for teams take place.',
      link: 'https://discord.gg/qqMMQ7AUTg',
      color: 'discord'
    },
    {
      id: 'facebook',
      icon: Users,
      title: language === 'ru' ? 'Группа в Facebook' : 'Facebook Group',
      description: language === 'ru'
        ? 'Наше публичное сообщество, где мы делимся фотоотчетами, историями из походов и общаемся с широкой аудиторией.'
        : 'Our public community where we share photo reports, sailing stories and communicate with a wider audience.',
      link: 'https://www.facebook.com/profile.php?id=61578175047326',
      color: 'facebook'
    },
    {
      id: 'youtube',
      icon: Play,
      title: language === 'ru' ? 'Канал на YouTube' : 'YouTube Channel',
      description: language === 'ru'
        ? 'Видеоотчеты с наших походов, обучающие материалы, интервью с капитанами и обзоры яхт.'
        : 'Video reports from our voyages, educational materials, captain interviews and yacht reviews.',
      link: 'https://youtube.com/channel/UCYCGHyHN1k5uulBoljjqP3A?feature=shared',
      color: 'youtube'
    },
    {
      id: 'website',
      icon: Globe,
      title: language === 'ru' ? 'Официальный сайт' : 'Official Website',
      description: language === 'ru'
        ? 'Главный информационный ресурс о клубе, нашей миссии, дорожной карте и условиях участия.'
        : 'Main information resource about the club, our mission, roadmap and participation terms.',
      link: 'https://www.daosail.com',
      color: 'website'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
            {language === 'ru' ? 'Наши сообщества' : 'Our Communities'}
          </h1>
          <h2 className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ru'
              ? 'Выберите платформу, которая вам удобна, чтобы всегда оставаться на связи.'
              : 'Choose the platform that suits you to always stay connected.'
            }
          </h2>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              icon={community.icon}
              title={community.title}
              description={community.description}
              link={community.link}
              color={community.color as any}
            />
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-muted-foreground mb-4">
            {language === 'ru' ? 'Скоро появятся новые платформы' : 'More platforms coming soon'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Placeholder cards for future communities */}
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
              <div className="text-muted-foreground/40 text-sm">
                {language === 'ru' ? 'Сообщество #6' : 'Community #6'}
              </div>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
              <div className="text-muted-foreground/40 text-sm">
                {language === 'ru' ? 'Сообщество #7' : 'Community #7'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}