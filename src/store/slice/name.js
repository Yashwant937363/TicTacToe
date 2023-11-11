import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  player1: "Player 1",
  player2: "Computer",
}

export const changeName = createSlice({
  name: 'name',
  initialState,
  reducers: {
    change: (state, action) => {
      if (action.payload.name1 !== "")
        state.player1 = action.payload.name1;
      else
        state.player1 = 'Player 1';
      if (action.payload.name2 !== "")
        state.player2 = action.payload.name2;
      else
        state.player2 = 'Player 2';
    },
    changedefault: (state) => {
      state.player1 = "Player1"
      state.player2 = "Player2"
    },
  },
})

export const { change, changedefault } = changeName.actions

export default changeName.reducer
