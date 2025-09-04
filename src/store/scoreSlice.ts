import { createSlice } from '@reduxjs/toolkit';

export type ScoreState = number;
const initialState: ScoreState = 42;

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (_state, action: { payload: number }) => action.payload,
    incrementScore: (state) => state + 1,
    decrementScore: (state) => state - 1,
  },
});

export const { setScore, incrementScore, decrementScore } = scoreSlice.actions;
export default scoreSlice.reducer;
