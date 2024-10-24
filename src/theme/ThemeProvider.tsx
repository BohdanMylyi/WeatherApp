import React, {createContext, useContext, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

interface Theme {
  background: string;
  text: string;
  button: string;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const {mode} = useSelector((state: RootState) => state.theme);

  const theme: Theme = {
    background: mode === 'light' ? '#f5f5f5' : '#1E3E62',
    text: mode === 'light' ? '#333' : '#f5f5f5',
    button: mode === 'light' ? '#007bff' : '#ff5722',
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context; // Return context directly
};
