import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  Library, 
  Users, 
  User,
  Coins
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  labelRu: string;
  href: string;
  icon: any;
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
    id: 'tutorial',
    label: 'Tutorial',
    labelRu: 'Учебник',
    href: '/tutorial',
    icon: BookOpen,
  },
  {
    id: 'library',
    label: 'Library/FAQ',
    labelRu: 'Библиотека/FAQ',
    href: '/library',
    icon: Library,
  },
  {
    id: 'dao',
    label: 'DAO',
    labelRu: 'DAO',
    href: '/dao',
    icon: Coins,
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