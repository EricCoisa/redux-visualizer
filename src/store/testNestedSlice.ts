import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NestedTest {
  x: number[];
  y: {
    a: string;
    b: number;
    c: { d: boolean };
    flag: boolean;
  };
  z: Array<{ foo: string; bar: number[] }>;
}

const initialState: NestedTest[] = [
  {
    x: [1, 2, 3],
    y: {
      a: 'hello',
      b: 42,
      c: { d: true },
      flag: true,
    },
    z: [
      { foo: 'bar', bar: [7, 8] },
      { foo: 'baz', bar: [9] },
    ],
  },
  {
    x: [],
    y: { a: '', b: 0, c: { d: false }, flag: false },
    z: [],
  },
];

const testNestedSlice = createSlice({
  name: 'testNested',
  initialState,
  reducers: {
    setTestNested: (state, action: PayloadAction<NestedTest[]>) => action.payload,
    updateFirstY: (state, action: PayloadAction<Partial<NestedTest['y']>>) => {
      if (state[0]) {
        state[0].y = { ...state[0].y, ...action.payload };
      }
    },
  },
});

export const { setTestNested, updateFirstY } = testNestedSlice.actions;
export default testNestedSlice.reducer;
