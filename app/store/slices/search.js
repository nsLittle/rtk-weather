import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city, thunkAPI) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1a8c344b0aaddd77f2a53a70916ddc5b&units=imperial`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    weatherData: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectWeatherData = (state) => state.weather.weatherData;
export const selectWeatherLoading = (state) => state.weather.loading;
export const selectWeatherError = (state) => state.weather.error;

export default weatherSlice.reducer;