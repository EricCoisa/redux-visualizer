import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
}

const initialState: SettingsState = {
  darkMode: true,
  notifications: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
  },
});

export const { toggleDarkMode, toggleNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
