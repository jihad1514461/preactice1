import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Theme {
  mode: 'light' | 'dark';
}

export const defaultTheme: Theme = { mode: 'light' };

export const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem('theme');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultTheme;
    }
  }
  return defaultTheme;
};

export const storeTheme = (theme: Theme): void => {
  localStorage.setItem('theme', JSON.stringify(theme));
};

export const applyThemeToDocument = (theme: Theme): void => {
  const root = document.documentElement;
  if (theme.mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const useThemeController = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme.mode);

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored.mode);
    applyThemeToDocument(stored);
  }, []);

  const toggleTheme = useCallback(() => {
    const newMode = theme === 'light' ? 'dark' : 'light';
    const newTheme: Theme = { mode: newMode };
    setTheme(newMode);
    storeTheme(newTheme);
    applyThemeToDocument(newTheme);
  }, [theme]);

  return { theme, toggleTheme };
};

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, toggleTheme } = useThemeController();

  useEffect(() => {
    let container = document.getElementById('dark-particles');
    let animationFrame: number;
    const particles: Particle[] = [];

    if (theme === 'dark') {
      if (!container) {
        container = document.createElement('div');
        container.id = 'dark-particles';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '0';
        document.body.appendChild(container);
      }

      const particleCount = 50;
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < particleCount; i++) {
        const el = document.createElement('div');
        const size = Math.random() * 9 + 2; // 1-10px
        const x = Math.random() * width;
        const y = Math.random() * height;
        const vx = (Math.random() - 0.5) * 0.5; // horizontal speed
        const vy = (Math.random() - 0.5) * 0.5; // vertical speed
        const opacity = Math.random() * 0.7 + 0.3;

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.background = 'white';
        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.opacity = `${opacity}`
        

        container.appendChild(el);
        particles.push({ el, x, y, vx, vy });
      }

      const animate = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen edges
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          p.el.style.left = `${p.x}px`;
          p.el.style.top = `${p.y}px`;
        }

        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      container?.remove();
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
