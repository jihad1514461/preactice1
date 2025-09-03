import { Shield, User } from 'lucide-react';

export interface LandingCardConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
  path: string;
}

export const landingCards: LandingCardConfig[] = [
  {
    id: 'admin',
    title: 'Admin Access',
    description: 'Manage the platform, view analytics, and configure settings',
    icon: Shield,
    iconBg: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    buttonText: 'Admin Login',
    buttonVariant: 'primary',
    path: '/admin/login'
  },
  {
    id: 'player',
    title: 'Player Access',
    description: 'Access your profile, achievements, and game statistics',
    icon: User,
    iconBg: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
    buttonText: 'Player Login',
    buttonVariant: 'primary',
    path: '/player/login'
  },
  {
    id: 'players',
    title: 'Player Accesses',
    description: 'Access your profile, achievements, and game statistics',
    icon: User,
    iconBg: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
    buttonText: 'Player Login',
    buttonVariant: 'primary',
    path: '/player/login'
  }
];
