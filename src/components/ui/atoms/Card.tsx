import React from 'react';
import { cn } from '../../../lib';

interface CardProps {
  variant?: 'default' | 'metric' | 'feature';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className,
  children,
  onClick
}) => {
  const variants = {
    default: 'p-6',
    metric: 'p-4 text-center',
    feature: 'p-6 hover:shadow-lg transition-shadow cursor-pointer'
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
        variants[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};