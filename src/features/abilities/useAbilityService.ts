import { useState, useEffect } from 'react';
import { Ability } from './types';
import { initialAbilities } from '../../data/abilities';
import { generateId } from '../../lib';
import axios from 'axios';

export const useAbilityService = () => {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    loadAbilities();
  }, []);

  const checkBackendHealth = async (): Promise<boolean> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) return false;
      
      await axios.get(`${apiUrl}/health`, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  };

  const loadAbilities = async () => {
    setIsLoading(true);
    const backendConnected = await checkBackendHealth();
    setIsBackendConnected(backendConnected);

    if (backendConnected) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/abilities`);
        setAbilities(response.data);
      } catch {
        loadFromLocalStorage();
      }
    } else {
      loadFromLocalStorage();
    }
    setIsLoading(false);
  };

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('abilities');
    if (stored) {
      try {
        setAbilities(JSON.parse(stored));
      } catch {
        setAbilities(initialAbilities);
        localStorage.setItem('abilities', JSON.stringify(initialAbilities));
      }
    } else {
      setAbilities(initialAbilities);
      localStorage.setItem('abilities', JSON.stringify(initialAbilities));
    }
  };

  const saveToLocalStorage = (newAbilities: Ability[]) => {
    localStorage.setItem('abilities', JSON.stringify(newAbilities));
  };

  const createAbility = async (abilityData: Omit<Ability, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ability> => {
    const newAbility: Ability = {
      ...abilityData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isBackendConnected) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${apiUrl}/abilities`, newAbility);
        const createdAbility = response.data;
        setAbilities(prev => [...prev, createdAbility]);
        return createdAbility;
      } catch {
        // Fallback to localStorage
      }
    }

    const newAbilities = [...abilities, newAbility];
    setAbilities(newAbilities);
    saveToLocalStorage(newAbilities);
    return newAbility;
  };

  const updateAbility = async (id: string, abilityData: Partial<Ability>): Promise<Ability> => {
    const updatedAbility = {
      ...abilities.find(a => a.id === id)!,
      ...abilityData,
      updatedAt: new Date()
    };

    if (isBackendConnected) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.put(`${apiUrl}/abilities/${id}`, updatedAbility);
        const updated = response.data;
        setAbilities(prev => prev.map(a => a.id === id ? updated : a));
        return updated;
      } catch {
        // Fallback to localStorage
      }
    }

    const newAbilities = abilities.map(a => a.id === id ? updatedAbility : a);
    setAbilities(newAbilities);
    saveToLocalStorage(newAbilities);
    return updatedAbility;
  };

  const deleteAbility = async (id: string): Promise<void> => {
    if (isBackendConnected) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        await axios.delete(`${apiUrl}/abilities/${id}`);
        setAbilities(prev => prev.filter(a => a.id !== id));
        return;
      } catch {
        // Fallback to localStorage
      }
    }

    const newAbilities = abilities.filter(a => a.id !== id);
    setAbilities(newAbilities);
    saveToLocalStorage(newAbilities);
  };

  return {
    abilities,
    isLoading,
    isBackendConnected,
    createAbility,
    updateAbility,
    deleteAbility,
    refreshAbilities: loadAbilities
  };
};