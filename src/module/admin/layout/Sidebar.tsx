import React from 'react';
import { Home, Palette, Settings, BarChart3, Menu, X, Search, Package } from 'lucide-react';
import { NavigationItem } from './types';
import { cn } from '../../../lib/index';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems: NavigationItem[] = [
  { id: '1', label: 'Dashboard', icon: Home, href: 'dashboard' },
  { id: '2', label: 'Typeahead', icon: Search, href: 'typeahead'},
  { id: '3', label: 'UI Showcase', icon: Palette, href: 'ui-showcase' },
  { id: '4', label: 'Inventory', icon: Package, href: 'inventory'},
  { id: '5', label: 'Analytics', icon: BarChart3, href: 'analytics' },
  { id: '6', label: 'Settings', icon: Settings, href: 'settings' },
  { id: '7', label: 'Ability', icon: Settings, href: 'ability-management' }
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, currentPage, onPageChange }) => {

  return (
    <div className={cn(
      'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        )}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.href)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'text-gray-700 dark:text-gray-300',
              currentPage === item.href && 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};