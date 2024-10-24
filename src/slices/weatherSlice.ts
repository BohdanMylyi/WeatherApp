import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

interface Location {
  lat: number;
  lon: number;
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location: Location) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`,
    );
    return await response.json();
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {today: [], weekly: [], status: 'idle'},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.today = action.payload.daily.temperature_2m_min;
      state.weekly = action.payload.daily.temperature_2m_max;
      state.status = 'succeeded';
    });
  },
});

export default weatherSlice.reducer;
