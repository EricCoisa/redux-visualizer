import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './store/counterSlice';
import usersReducer from './store/usersSlice';
import citiesReducer from './store/citiesSlice';
import settingsReducer from './store/settingsSlice';
import scoreReducer from './store/scoreSlice';
import { setEntireState } from './store/setEntireState';
import testNestedReducer from './store/testNestedSlice';

const rootReducer = (state: any, action: any) => {
  if (setEntireState.match(action)) {
    return action.payload;
  }
  return {
    counter: counterReducer(state?.counter, action),
    users: usersReducer(state?.users, action),
    cities: citiesReducer(state?.cities, action),
    settings: settingsReducer(state?.settings, action),
    score: scoreReducer(state?.score, action),
    testNested: testNestedReducer(state?.testNested, action),
  };
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
