import React, { useState } from 'react';
import { Play, Download, Heart, Star, Share, Settings } from 'lucide-react';
import { Card, Button } from '../atoms';
import { cn } from '../../../lib';

export const ButtonShowcase: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button variant="primary" disabled>Primary Disabled</Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">
              <Play className="w-4 h-4 mr-2" />
              Play Video
            </Button>
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={liked ? "danger" : "ghost"}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("w-4 h-4 mr-2", liked && "fill-current")} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            
            <Button 
              variant={starred ? "primary" : "ghost"}
              onClick={() => setStarred(!starred)}
            >
              <Star className={cn("w-4 h-4 mr-2", starred && "fill-current")} />
              {starred ? 'Starred' : 'Star'}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};