import React from 'react';
import { Card, Button } from '../../components/ui/atoms';
import { ThemeToggle } from './../../components/ui/molecules/ThemeToggle';
import { LandingCardConfig } from './landingConfig';

interface LandingRendererProps {
  cards: LandingCardConfig[];
  onCardClick: (path: string) => void;
}

export const LandingRenderer: React.FC<LandingRendererProps> = ({
  cards,
  onCardClick,
}) => {
  return (
      <div className="max-w-6xl w-full z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            Welcome to GameHub
            <ThemeToggle />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose your access level to continue
          </p>
        </div>

        {/* Grid container */}
        <div className="flex flex-wrap justify-center gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className="flex-shrink-0 w-64 text-center p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group opacity-80"
              >
                <div className="mb-6">
                  <div
                    className={`w-20 h-20 ${card.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-10 h-10 ${card.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {card.description}
                  </p>
                </div>
                <Button
                  onClick={() => onCardClick(card.path)}
                  variant={card.buttonVariant}
                  size="lg"
                  className="w-full opacity-100"
                >
                  {card.buttonText}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
  );
};
