import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingRenderer ,landingCards} from './index';

export const LandingController: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return <LandingRenderer cards={landingCards} onCardClick={handleCardClick} />;
};
