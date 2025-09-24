'use client';

import React from 'react';
import { useAppContext } from '@/lib/contexts/app-context';
import { ConceptCard } from '@/components/ui/concept-card';
import {
  Lightbulb,
  Presentation,
  PenTool,
  Network,
  Compass,
  Scroll,
  Users
} from 'lucide-react';

export default function ConceptsPage() {
  const { language } = useAppContext();

  const concepts = [
    {
      id: 'concept',
      icon: Lightbulb,
      title: language === 'ru' ? 'Концепт проекта' : 'Project Concept',
      description: language === 'ru'
        ? 'Интерактивное представление концепции клуба. Визуальное и текстовое погружение в нашу идеологию и планы.'
        : 'Interactive presentation of the club concept. Visual and textual immersion into our ideology and plans.',
      link: 'https://concept.daosail.com/',
      color: 'concept'
    },
    {
      id: 'presentation',
      icon: Presentation,
      title: language === 'ru' ? 'Презентация для партнеров' : 'Partner Presentation',
      description: language === 'ru'
        ? 'Подробная презентация, раскрывающая бизнес-модель, стратегию развития и инвестиционную привлекательность проекта DAOSail.'
        : 'Detailed presentation revealing business model, development strategy and investment attractiveness of DAOSail project.',
      link: 'https://docs.google.com/presentation/d/1FMxKOMhTR_bobQMIC6u683Nki9HwedIgXovVju5mFvk/edit?usp=sharing',
      color: 'presentation'
    },
    {
      id: 'blog',
      icon: PenTool,
      title: language === 'ru' ? 'Наш Блог' : 'Our Blog',
      description: language === 'ru'
        ? 'Статьи, новости и размышления о жизни клуба, яхтинге, технологиях и децентрализации.'
        : 'Articles, news and reflections on club life, yachting, technology and decentralization.',
      link: 'https://www.daosail.com/блог/',
      color: 'blog'
    },
    {
      id: 'philosophy',
      icon: Compass,
      title: language === 'ru' ? 'Философия и Миссия DAOsail' : 'Philosophy and Mission DAOsail',
      description: language === 'ru'
        ? 'Узнайте о фундаментальных принципах и долгосрочных целях, которые вдохновляют развитие нашего клуба.'
        : 'Learn about the fundamental principles and long-term goals that inspire the development of our club.',
      link: 'https://www.daosail.com/416-2/',
      color: 'philosophy'
    },
    {
      id: 'manifesto',
      icon: Scroll,
      title: language === 'ru' ? 'Манифест DAOsail' : 'DAOsail Manifesto',
      description: language === 'ru'
        ? 'Основополагающий документ, который определяет ценности и правила взаимодействия внутри нашего сообщества.'
        : 'Foundational document that defines values and rules of interaction within our community.',
      link: 'https://www.daosail.com/наша-миссия/',
      color: 'manifesto'
    },
    {
      id: 'dao-heart',
      icon: Network,
      title: language === 'ru' ? 'DAO — сердце клуба' : 'DAO — Heart of the Club',
      description: language === 'ru'
        ? 'Подробное объяснение того, как принципы DAO лежат в основе управления нашим клубом.'
        : 'Detailed explanation of how DAO principles form the foundation of our club management.',
      link: 'https://www.daosail.com/dao/',
      color: 'dao'
    },
    {
      id: 'roles',
      icon: Users,
      title: language === 'ru' ? 'Роли в клубе' : 'Club Roles',
      description: language === 'ru'
        ? 'Описание пути участника от "Интересующегося" до "Капитана", их права, обязанности и возможности.'
        : 'Description of the participant\'s path from "Interested" to "Captain", their rights, duties and opportunities.',
      link: 'https://www.daosail.com/роли-в-клубе/',
      color: 'roles'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-slate-600 bg-clip-text text-transparent">
            {language === 'ru' ? 'Презентации и концепции' : 'Concepts & Presentations'}
          </h1>
          <h2 className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ru'
              ? 'Ключевые идеи и документы, которые формируют основу нашего сообщества.'
              : 'Key ideas and documents that form the foundation of our community.'
            }
          </h2>
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              icon={concept.icon}
              title={concept.title}
              description={concept.description}
              link={concept.link}
              color={concept.color as any}
            />
          ))}
        </div>

      </div>
    </div>
  );
}