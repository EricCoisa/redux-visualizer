import { createAction } from '@reduxjs/toolkit';

// Action para sobrescrever todo o estado do Redux
export const setEntireState = createAction<any>('SET_ENTIRE_STATE');
