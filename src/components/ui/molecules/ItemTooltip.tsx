import React from 'react';
import { InventoryItem } from '../../../features/inventory/types';
import { cn } from '../../../lib';

interface ItemTooltipProps {
  item: InventoryItem;
  position: { x: number; y: number };
  visible: boolean;
}

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'text-gray-600',
    uncommon: 'text-green-600',
    rare: 'text-blue-600',
    epic: 'text-purple-600',
    legendary: 'text-orange-600'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

export const ItemTooltip: React.FC<ItemTooltipProps> = ({
  item,
  position,
  visible
}) => {
  if (!visible) return null;

  return (
    <div
      className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 max-w-xs pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{item.icon}</span>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
          <p className={cn('text-sm font-medium capitalize', getRarityColor(item.rarity))}>
            {item.rarity}
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {item.description}
      </p>
      
      {item.stats && (
        <div className="space-y-1">
          {item.stats.attack && (
            <div className="text-xs text-red-600 dark:text-red-400">
              ⚔️ Attack: +{item.stats.attack}
            </div>
          )}
          {item.stats.defense && (
            <div className="text-xs text-blue-600 dark:text-blue-400">
              🛡️ Defense: +{item.stats.defense}
            </div>
          )}
          {item.stats.health && (
            <div className="text-xs text-green-600 dark:text-green-400">
              ❤️ Health: +{item.stats.health}
            </div>
          )}
          {item.stats.mana && (
            <div className="text-xs text-purple-600 dark:text-purple-400">
              🔮 Mana: +{item.stats.mana}
            </div>
          )}
        </div>
      )}
    </div>
  );
};