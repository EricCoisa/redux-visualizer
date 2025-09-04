import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
}

const initialState: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      return state.filter(u => u.id !== action.payload);
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
