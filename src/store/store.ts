import {configureStore} from '@reduxjs/toolkit';
import weatherReducer from '../slices/weatherSlice';
import themeReducer from '../slices/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    weather: weatherReducer,
  },
});
