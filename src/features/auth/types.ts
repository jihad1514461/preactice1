export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Player {
  id: string;
  username: string;
  email: string;
  level: number;
  experience: number;
  avatar?: string;
}

export interface PlayerAuthState {
  player: Player | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface PlayerLoginCredentials {
  username: string;
  password: string;
}