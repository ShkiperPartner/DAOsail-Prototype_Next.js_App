import {
  Home,
  MessageSquare,
  Anchor,
  Ship,
  Users,
  User,
  Coins,
  Bot,
  BookOpen,
  Gamepad2,
  Database,
  Home as CabinIcon,
  UserCheck,
  Vote,
  HelpCircle,
  Brain,
  Handshake,
  UserCog
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  labelRu: string;
  href: string;
  icon: any;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    labelRu: 'Главная',
    href: '/',
    icon: Home,
  },
  {
    id: 'chat',
    label: 'Chat',
    labelRu: 'Чат',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    id: 'sailing',
    label: 'Yachting',
    labelRu: 'Яхтинг',
    href: '/sailing',
    icon: Anchor,
    children: [
      {
        id: 'sailing-learning',
        label: 'Learning (Course)',
        labelRu: 'Обучение (курс)',
        href: '/sailing/learning',
        icon: BookOpen,
      },
      {
        id: 'sailing-simulators',
        label: 'Simulators',
        labelRu: 'Симуляторы',
        href: '/sailing/simulators',
        icon: Ship,
      },
      {
        id: 'sailing-games',
        label: 'Games',
        labelRu: 'Игры',
        href: '/sailing/games',
        icon: Gamepad2,
      },
      {
        id: 'sailing-data',
        label: 'Useful Data',
        labelRu: 'Полезные данные',
        href: '/sailing/data',
        icon: Database,
      },
      {
        id: 'sailing-cabin',
        label: 'Cabin',
        labelRu: 'Кают-компания',
        href: '/sailing/cabin',
        icon: CabinIcon,
      },
    ],
  },
  {
    id: 'dao',
    label: 'DAO',
    labelRu: 'DAO',
    href: '/dao',
    icon: Coins,
    children: [
      {
        id: 'dao-roles',
        label: 'Roles',
        labelRu: 'Роли',
        href: '/dao/roles',
        icon: UserCheck,
      },
      {
        id: 'dao-governance',
        label: 'Voting/Governance',
        labelRu: 'Голосования/управление',
        href: '/dao/governance',
        icon: Vote,
      },
      {
        id: 'dao-questions',
        label: 'DAO Questions',
        labelRu: 'Вопросы по DAO',
        href: '/dao/questions',
        icon: HelpCircle,
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    labelRu: 'ИИ',
    href: '/ai',
    icon: Bot,
    children: [
      {
        id: 'ai-skippers',
        label: 'Digital Skippers',
        labelRu: 'Цифровые Шкиперы',
        href: '/ai/skippers',
        icon: Brain,
      },
      {
        id: 'ai-interaction',
        label: 'How to Interact',
        labelRu: 'Как с ними взаимодействовать',
        href: '/ai/interaction',
        icon: Handshake,
      },
      {
        id: 'ai-personal',
        label: 'Your Personal Skipper',
        labelRu: 'Ваш личный Шкипер',
        href: '/ai/personal',
        icon: UserCog,
      },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    labelRu: 'Сообщество',
    href: '/community',
    icon: Users,
  },
  {
    id: 'profile',
    label: 'Profile',
    labelRu: 'Профиль',
    href: '/profile',
    icon: User,
  },
];