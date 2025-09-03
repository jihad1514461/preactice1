import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../lib';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className
}) => {
  return (
    <label className={cn(
      'flex items-center gap-3 cursor-pointer',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    )}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={cn(
          'w-5 h-5 border-2 rounded flex items-center justify-center transition-colors',
          checked 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
        )}>
          {checked && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};