import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlayerAuthState, Player, PlayerLoginCredentials } from './types';
import { sleep } from '../../lib';

interface PlayerAuthContextType extends PlayerAuthState {
  login: (credentials: PlayerLoginCredentials) => Promise<void>;
  logout: () => void;
}

const PlayerAuthContext = createContext<PlayerAuthContextType | undefined>(undefined);

export const PlayerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerAuthState>({
    player: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const stored = localStorage.getItem('player');
    if (stored) {
      try {
        const player = JSON.parse(stored);
        setState({ player, isLoading: false, isAuthenticated: true });
      } catch {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: PlayerLoginCredentials): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));
    await sleep(1000);
    
    // Check default credentials
    if (credentials.username !== 'player' || credentials.password !== '12345678') {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }
    
    const player: Player = {
      id: '1',
      username: credentials.username,
      email: `${credentials.username}@game.com`,
      level: 42,
      experience: 15750,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=face`
    };
    
    localStorage.setItem('player', JSON.stringify(player));
    setState({ player, isLoading: false, isAuthenticated: true });
  };

  const logout = (): void => {
    localStorage.removeItem('player');
    setState({ player: null, isLoading: false, isAuthenticated: false });
  };

  return (
    <PlayerAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </PlayerAuthContext.Provider>
  );
};

export const usePlayerAuth = (): PlayerAuthContextType => {
  const context = useContext(PlayerAuthContext);
  if (!context) {
    throw new Error('usePlayerAuth must be used within PlayerAuthProvider');
  }
  return context;
};