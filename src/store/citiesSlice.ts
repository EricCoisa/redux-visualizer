import { createSlice } from '@reduxjs/toolkit';

export type CitiesState = string[];
const initialState: CitiesState = ['São Paulo', 'Rio de Janeiro', 'Curitiba'];

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: { payload: string }) => {
      state.push(action.payload);
    },
    removeCity: (state, action: { payload: string }) => {
      return state.filter(city => city !== action.payload);
    },
  },
});

export const { addCity, removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;
