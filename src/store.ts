import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './store/counterSlice';
import usersReducer from './store/usersSlice';
import citiesReducer from './store/citiesSlice';
import settingsReducer from './store/settingsSlice';
import scoreReducer from './store/scoreSlice';

import testNestedReducer from './store/testNestedSlice';
import { VisualizerReducer } from './components/reduxVisualizer';

const rootReducer = (state: any, action: any) => {
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
  reducer: VisualizerReducer(rootReducer),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
