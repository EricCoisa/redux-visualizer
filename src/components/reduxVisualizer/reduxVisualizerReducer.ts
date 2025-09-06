import { createAction } from '@reduxjs/toolkit';

export const setEntireState = createAction<any>('SET_ENTIRE_STATE');

function VisualizerReducer(appReducer: (state: any, action: any) => any) {
  return function(state: any, action: any) {
    if (setEntireState.match(action)) {
      return action.payload;
    }
    return appReducer(state, action);
  };
}

export { VisualizerReducer };
export default VisualizerReducer;