import { createSlice } from "@reduxjs/toolkit";

const onlineStateSlice = createSlice({
  name: "onlinestate",
  initialState: {
    isOnline: false,
    isGameStarted: false,
    roomid: "Connecting...",
    myMarker: "",
  },
  reducers: {
    setOnline: (state, action) => {
      state.isOnline = action.payload;
    },
    setRoomID: (state, action) => {
      state.roomid = action.payload;
    },
    setStartGame: (state, action) => {
      state.isGameStarted = action.payload;
    },
    setMarker: (state, action) => {
      state.myMarker = action.payload;
    },
    clearOnlineState: (state) => {
      state.roomid = "Connecting...";
      state.isGameStarted = false;
      state.myMarker = "";
      state.counter = 8;
      state.isOnline = false;
    },
  },
});

export const {
  setOnline,
  setRoomID,
  setStartGame,
  setMarker,
  clearOnlineState,
} = onlineStateSlice.actions;
export default onlineStateSlice.reducer;
