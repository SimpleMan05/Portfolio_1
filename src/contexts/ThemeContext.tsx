import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'professional' | 'creative' | null;
  isDark: boolean;
  setTheme: (theme: 'professional' | 'creative') => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'professional' | 'creative' | null>(null);
  const [isDark, setIsDark] = useState(false);

  const handleSetTheme = (newTheme: 'professional' | 'creative') => {
    setTheme(newTheme);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme: handleSetTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};