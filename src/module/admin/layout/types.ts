import { DivideIcon as LucideIcons } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcons;
  href: string;
  badge?: string;
  isActive?: boolean;
}

export interface SidebarState {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}