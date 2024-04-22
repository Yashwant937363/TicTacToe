import { useEffect, useState } from "react";
import "./Board.css";
import "./winner.css";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateWinner,
  changeGameState,
  clear,
  decrementCounter,
} from "../../store/slice/gamestate";
import Board from "./Board";
import PopUpSection from "./PopUpSection";
import Winline from "./Winline";

export default function OfflineBoard() {
  const counter = useSelector((state) => state.gameState.counter);
  const [computer, setComputer] = useState(false);
  const dispatch = useDispatch();
  const gamestate = useSelector((state) => state.gameState.gamestate);
  const isWin = useSelector((state) => state.gameState.isWin);
  const player1 = useSelector((state) => state.name.player1);
  const player2 = useSelector((state) => state.name.player2);
  const cnp = useSelector((state) => state.toggle.togglecnp);
  const updateData = async (index) => {
    if (gamestate[index] !== "X" && gamestate[index] !== "O") {
      const newArray = [...gamestate];
      newArray[index] = counter % 2 === 0 ? "X" : "O";

      dispatch(changeGameState(newArray));
      dispatch(decrementCounter());
    } else {
      console.warn("The place is occupied");
    }
  };

  useEffect(() => {
    if (!cnp && !isWin && counter > 0 && counter % 2 === 1) {
      setComputer(true);
      setTimeout(() => {
        playComputer();
      }, 1000);
    }
    //eslint-disable-next-line
  }, [counter]);

  const playComputer = () => {
    const scores = {
      X: -1,
      O: 1,
      D: 0,
    };

    const minmax = (gameState, depth, isMaximizing) => {
      let winner = calculateWinner(gameState).winner;
      if (winner) {
        return scores[winner];
      }

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < gameState.length; i++) {
          if (gameState[i] === "") {
            gameState[i] = "O";
            let score = minmax(gameState, depth + 1, false);
            gameState[i] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < gameState.length; i++) {
          if (gameState[i] === "") {
            gameState[i] = "X";
            let score = minmax(gameState, depth + 1, true);
            gameState[i] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    };
    let gameState = new Array(...gamestate);
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === "") {
        gameState[i] = "O";
        let score = minmax(gameState, 0, false);
        gameState[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    gameState[move] = "O";
    dispatch(changeGameState(gameState));
    dispatch(decrementCounter());
    setComputer(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="board">
        <Board updateData={updateData}></Board>
        <Winline />
      </div>
      <div className="names">
        <h1>X for {player1}</h1>
        <h1>O for {player2}</h1>
      </div>
      <PopUpSection computer={computer} />
      {computer && !isWin && !(counter < 0) && (
        <div className="background">
          <div className="complay">
            <i className="bi bi-robot"></i> Wait i am Playing
          </div>
        </div>
      )}
    </>
  );
}
