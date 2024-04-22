import { configureStore } from "@reduxjs/toolkit";
import changeName from "./slice/name";
import ToggleCNP from "./slice/togglecnp";
import changeGame from "./slice/gamestate";
import messageSlice from "./slice/messages";
import onlinestateSlice from "./slice/onlinestate";

export const store = configureStore({
  reducer: {
    name: changeName,
    toggle: ToggleCNP,
    gameState: changeGame,
    message: messageSlice,
    onlinestate: onlinestateSlice,
  },
  devTools: true, // Corrected placement
});
