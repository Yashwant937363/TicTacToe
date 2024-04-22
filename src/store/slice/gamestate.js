import { createSlice } from "@reduxjs/toolkit";

export const calculateWinner = (symbols) => {
  symbols = new Array(...symbols);
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  const winClass = [
    "row-1",
    "row-2",
    "row-3",
    "column-1",
    "column-2",
    "column-3",
    "diagonal-1",
    "diagonal-2",
  ];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = winCombos[i];
    if (symbols[a] && symbols[a] === symbols[b] && symbols[a] === symbols[c]) {
      return { winner: symbols[a], lineClass: winClass[i] };
    }
  }
  if (!symbols.includes("")) {
    return { winner: "D", lineClass: "draw" };
  }
  return { winner: null, lineClass: "none" };
};

export const changeGame = createSlice({
  name: "game",
  initialState: {
    gamestate: ["", "", "", "", "", "", "", "", ""],
    isWin: false,
    isSaved: false,
    lineClass: "",
    winner: "",
    counter: 8,
  },
  reducers: {
    changeGameState: (state, action) => {
      state.gamestate = action.payload; // Use action.payload to update the gamestate
      const { winner, lineClass } = calculateWinner(action.payload);
      state.isWin = winner !== null && winner !== "D";
      state.winner = winner;
      state.lineClass = lineClass;
    },
    decrementCounter: (state) => {
      state.counter -= 1;
    },
    clear: (state) => {
      state.gamestate = ["", "", "", "", "", "", "", "", ""];
      state.isWin = false;
      state.lineClass = "";
      state.winner = "";
      state.counter = 8;
    },
  },
});

export const { changeGameState, clear, decrementCounter } = changeGame.actions;
export default changeGame.reducer;
