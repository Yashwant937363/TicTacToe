import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gamestate: ['', '', '', '', '', '', '', '', ''],
  isWin: false,
  isSaved: false,
  lineClass: 'class',
  winner : 'Game Draw',
};

const calculateWinner = (symbols) => {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  const winClass = ['row-1', 'row-2', 'row-3', 'column-1', 'column-2', 'column-3', 'diagonal-1', 'diagonal-2'];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = winCombos[i];
    if (symbols[a] && symbols[a] === symbols[b] && symbols[a] === symbols[c]) {
      return { winner: symbols[a], lineClass: winClass[i] };
    }
  }
  return { winner: null, lineClass: 'none' };
};

export const changeGame = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameState: (state, action) => {
      state.gamestate = action.payload; // Use action.payload to update the gamestate
      const { winner, lineClass } = calculateWinner(action.payload);
      state.isWin = winner !== null;
      state.winner = winner;
      state.lineClass = lineClass;
    },
    clear: (state) => {
      state.gamestate = ['', '', '', '', '', '', '', '', ''];
      state.isWin = false;
      state.lineClass = 'class';
      state.winner = 'Game Draw';
    },
  },
});

export const { changeGameState, clear } = changeGame.actions;

export default changeGame.reducer;
