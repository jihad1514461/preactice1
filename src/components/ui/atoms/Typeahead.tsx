import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { cn } from '../../../lib';

export interface TypeaheadOption {
  id: string;
  label: string;
  value: string;
}

interface TypeaheadProps {
  options: TypeaheadOption[];
  value?: TypeaheadOption | TypeaheadOption[];
  onChange: (value: TypeaheadOption | TypeaheadOption[] | null) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Typeahead: React.FC<TypeaheadProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  multiple = false,
  disabled = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedValues = multiple 
    ? (value as TypeaheadOption[] || [])
    : (value ? [value as TypeaheadOption] : []);

  const handleSelect = (option: TypeaheadOption) => {
    if (multiple) {
      const current = value as TypeaheadOption[] || [];
      const exists = current.find(item => item.id === option.id);
      
      if (exists) {
        onChange(current.filter(item => item.id !== option.id));
      } else {
        onChange([...current, option]);
      }
    } else {
      onChange(option);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleRemove = (optionId: string) => {
    if (multiple) {
      const current = value as TypeaheadOption[] || [];
      onChange(current.filter(item => item.id !== optionId));
    } else {
      onChange(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        className={cn(
          'min-h-[42px] w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg',
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer',
          'focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selectedValues.length > 0 ? (
            selectedValues.map(item => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
              >
                {item.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          )}
          <ChevronDown className={cn(
            'w-4 h-4 ml-auto transition-transform',
            isOpen && 'rotate-180'
          )} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          <div className="p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-transparent text-sm"
              autoFocus
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => {
                const isSelected = selectedValues.some(item => item.id === option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                      isSelected && 'bg-blue-50 dark:bg-blue-900'
                    )}
                  >
                    {multiple && (
                      <div className={cn(
                        'w-4 h-4 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center',
                        isSelected && 'bg-blue-500 border-blue-500'
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    )}
                    <span className="text-sm">{option.label}</span>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};