import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePlayerAuth } from './PlayerAuthContext';

interface PlayerAuthGuardProps {
  children: React.ReactNode;
}

export const PlayerAuthGuard: React.FC<PlayerAuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = usePlayerAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/player/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};