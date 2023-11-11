import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  togglecnp: false,
  isChangeName :false
};

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.togglecnp = !state.togglecnp;
    },
    changeScreen: (state) => {
      state.isChangeName = !state.isChangeName;
    },
  },
});

export const { toggle , changeScreen } = toggleSlice.actions;
export default toggleSlice.reducer;
