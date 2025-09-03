import React  from 'react';
import { Card,ComponentShowcase } from '../../../components/index';
import { Palette, Eye, Settings } from 'lucide-react';


export const UIShowcasePage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            UI Showcase
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore all available UI components and their variants
          </p>
        </div>

        <ComponentShowcase />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="metric">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Metric Card</span>
              <Palette className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">42</div>
            <div className="text-sm text-green-600">+12% increase</div>
          </Card>

          <Card variant="feature">
            <Eye className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Card Variants</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Three different card styles
            </p>
          </Card>

          <Card>
            <Settings className="w-8 h-8 text-gray-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Default Card</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Standard card variant
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};