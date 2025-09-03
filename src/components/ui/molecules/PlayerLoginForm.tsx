import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../atoms';
import { usePlayerAuth } from '../../../features';

export const PlayerLoginForm: React.FC = () => {
  const [username, setUsername] = useState('player');
  const [password, setPassword] = useState('12345678');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { login, isLoading } = usePlayerAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: typeof errors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login({ username, password });
      navigate('/player/profile');
    } catch (error) {
      setErrors({ username: (error as Error).message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        placeholder="Enter your username"
        disabled={isLoading}
      />
      
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Enter your password"
        disabled={isLoading}
      />
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};