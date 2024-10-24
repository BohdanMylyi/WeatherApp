import React, {createContext, useContext, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

interface Theme {
  mode: string;
  background: string;
  text: string;
  button: string;
  logo: string;
  backgroundColor: string;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const {mode} = useSelector((state: RootState) => state.theme);

  const theme: Theme = {
    background: mode === 'light' ? '#dfd3c3' : '#27296d',
    text: mode === 'light' ? '#333' : '#f5f5f5',
    button: mode === 'light' ? '#007bff' : '#ff5722',
    logo:
      mode === 'light'
        ? 'https://img.icons8.com/ios-filled/50/light-rain--v1.png'
        : 'https://img.icons8.com/color/48/light-rain--v1.png',
    mode: '',
    backgroundColor: mode === 'light' ? '#f0ece2' : '#5e63b6',
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
  return context;
};
