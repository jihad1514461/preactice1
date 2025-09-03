import React, { useState } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { Card, Button } from '../atoms';
import { cn } from '../../../lib';

interface DragItem {
  id: string;
  content: string;
  color: string;
}

export const DragDropDemo: React.FC = () => {
  const [items, setItems] = useState<DragItem[]>([
    { id: '1', content: 'First Item', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: '2', content: 'Second Item', color: 'bg-green-100 dark:bg-green-900' },
    { id: '3', content: 'Third Item', color: 'bg-purple-100 dark:bg-purple-900' },
    { id: '4', content: 'Fourth Item', color: 'bg-orange-100 dark:bg-orange-900' }
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);
    
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    setItems(newItems);
    setDraggedItem(null);
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Drag & Drop List</h3>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => setItems([
            { id: '1', content: 'First Item', color: 'bg-blue-100 dark:bg-blue-900' },
            { id: '2', content: 'Second Item', color: 'bg-green-100 dark:bg-green-900' },
            { id: '3', content: 'Third Item', color: 'bg-purple-100 dark:bg-purple-900' },
            { id: '4', content: 'Fourth Item', color: 'bg-orange-100 dark:bg-orange-900' }
          ])}
        >
          Reset
        </Button>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-transparent',
              'hover:border-gray-300 dark:hover:border-gray-600 cursor-move transition-all',
              item.color,
              draggedItem === item.id && 'opacity-50 scale-95'
            )}
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
            <span className="flex-1 text-sm font-medium">{item.content}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};