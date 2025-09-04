import { createSlice } from '@reduxjs/toolkit';

const initialState: number = 42;

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (state, action: { payload: number }) => action.payload,
    incrementScore: (state) => state + 1,
    decrementScore: (state) => state - 1,
  },
});

export const { setScore, incrementScore, decrementScore } = scoreSlice.actions;
export default scoreSlice.reducer;
