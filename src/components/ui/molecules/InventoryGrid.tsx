import React from 'react';
import { Package } from 'lucide-react';
import { InventoryItem } from '../../../features/inventory/types';
import { useDragAndDrop } from '../../../features/inventory/hooks';
import { cn } from '../../../lib';

interface InventoryGridProps {
  items: InventoryItem[];
  maxSlots: number;
  onDragStart: (itemId: string) => void;
  onDragEnd: () => void;
  isDragging: (itemId: string) => boolean;
}

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
    uncommon: 'border-green-400 bg-green-50 dark:border-green-500 dark:bg-green-900/20',
    rare: 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20',
    epic: 'border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-900/20',
    legendary: 'border-orange-400 bg-orange-50 dark:border-orange-500 dark:bg-orange-900/20'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

export const InventoryGrid: React.FC<InventoryGridProps> = ({
  items,
  maxSlots,
  onDragStart,
  onDragEnd,
  isDragging
}) => {
  const emptySlots = Array.from({ length: maxSlots - items.length }, (_, i) => i);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Inventory ({items.length}/{maxSlots})
        </h3>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => onDragStart(item.id)}
            onDragEnd={onDragEnd}
            className={cn(
              'aspect-square border-2 rounded-lg p-2 cursor-move transition-all',
              'hover:shadow-md hover:scale-105',
              getRarityColor(item.rarity),
              isDragging(item.id) && 'opacity-50 scale-95'
            )}
            title={`${item.name} - ${item.description}`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs text-center font-medium truncate w-full">
                {item.name}
              </span>
            </div>
          </div>
        ))}
        
        {emptySlots.map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          />
        ))}
      </div>
    </div>
  );
};