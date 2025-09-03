// authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, LoginCredentials } from '../../../features/index';
import { sleep } from '../../../lib';
import axios from 'axios';
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setState({ user, isLoading: false, isAuthenticated: true });
      } catch {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      // 1. Check backend health
      await axios.get(`${apiUrl}/health`);

      // 2. Backend is alive → real login
      const response = await axios.post(`${apiUrl}/adminlogin`, credentials);

      const user: User = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      setState({ user, isLoading: false, isAuthenticated: true });
    } catch (err) {
      console.warn("Backend not responding, falling back to demo login...");

      // Fallback demo login
      await sleep(300); // mimic API delay
      if (credentials.email !== "admin@a.com" || credentials.password !== "12345678") {
        setState(prev => ({ ...prev, isLoading: false }));
        throw new Error("Invalid credentials (demo mode)");
      }

      const user: User = {
        id: "1",
        email: credentials.email,
        name: "Demo Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      };

      localStorage.setItem("user", JSON.stringify(user));
      setState({ user, isLoading: false, isAuthenticated: true });
    }
  };

  const logout = (): void => {
    localStorage.removeItem("user");
    setState({ user: null, isLoading: false, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
