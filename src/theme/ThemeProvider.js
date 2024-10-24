import React, {createContext, useContext} from 'react';
import {useSelector} from 'react-redux';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const {mode} = useSelector(state => state.theme);

  const theme = {
    background: mode === 'light' ? '#f5f5f5' : '#1E3E62',
    text: mode === 'light' ? '#333' : '#f5f5f5',
    button: mode === 'light' ? '#007bff' : '#ff5722',
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
