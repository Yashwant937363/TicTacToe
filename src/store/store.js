import { configureStore } from '@reduxjs/toolkit';
import changeName from './slice/name';
import ToggleCNP from './slice/togglecnp'
import changeGame from './slice/gamestate';

export const store = configureStore({
  reducer: {
    name: changeName,
    toggle: ToggleCNP,
    gameState: changeGame
  },
  devTools: true // Corrected placement
});
