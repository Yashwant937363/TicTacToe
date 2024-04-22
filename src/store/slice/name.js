import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player1: "Player 1",
  player2: "Computer",
};

export const changeName = createSlice({
  name: "name",
  initialState,
  reducers: {
    change: (state, action) => {
      if (action.payload.name1 !== "") state.player1 = action.payload.name1;
      else state.player1 = "Player 1";
      if (action.payload.name2 !== "") state.player2 = action.payload.name2;
      else state.player2 = "Player 2";
    },
    changedefault: (state) => {
      state.player1 = "Player1";
      state.player2 = "Computer";
    },
    setNamePlayer1: (state, action) => {
      state.player1 = action.payload;
    },
    setNamePlayer2: (state, action) => {
      state.player2 = action.payload;
    },
  },
});

export const { change, changedefault, setNamePlayer1, setNamePlayer2 } =
  changeName.actions;

export default changeName.reducer;
