import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './store/counterSlice';
import usersReducer from './store/usersSlice';
import citiesReducer from './store/citiesSlice';
import settingsReducer from './store/settingsSlice';
import scoreReducer from './store/scoreSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    cities: citiesReducer,
    settings: settingsReducer,
    score: scoreReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
