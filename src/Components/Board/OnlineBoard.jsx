import React, { useEffect, useState } from "react";
import Board from "./Board";
import "./Board.css";
import { useDispatch, useSelector } from "react-redux";
import socket, { updateGameState } from "../../socket/socket";
import { changeGameState, decrementCounter } from "../../store/slice/gamestate";
import { setStartGame } from "../../store/slice/onlinestate";
import { setErrorMsg } from "../../store/slice/messages";
import { Navigate } from "react-router-dom";
import { setNamePlayer1 } from "../../store/slice/name";
import Winline from "./Winline";
import PopUpSection from "./PopUpSection";
import YesNoPopUpWindow from "../PopUpWindow/YesNoPopUpWInodw";

export default function OnlineBoard() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.gameState.counter);
  const myMarker = useSelector((state) => state.onlinestate.myMarker);
  const gamestate = useSelector((state) => state.gameState.gamestate);
  const isGameStarted = useSelector((state) => state.onlinestate.isGameStarted);
  const roomid = useSelector((state) => state.onlinestate.roomid);
  const player1 = useSelector((state) => state.name.player1);
  const player2 = useSelector((state) => state.name.player2);
  const [answer, setAnswer] = useState(null);
  const [restartpopup, setRestartPopUp] = useState(false);
  const onClickUpdateData = (index) => {
    updateData(index);
    updateGameState(roomid, index);
  };
  const updateData = (index) => {
    if (gamestate[index] !== "X" && gamestate[index] !== "O") {
      const newArray = [...gamestate];
      newArray[index] = counter % 2 === 0 ? "X" : "O";
      dispatch(changeGameState(newArray));
      dispatch(decrementCounter());
      console.log("New Game State : ", newArray);
      console.log("Counter : ", counter);
    } else {
      console.warn("The place is occupied");
    }
  };
  const waitForAns = () => {
    return new Promise((resolve, reject) => {
      const checkAns = setInterval(() => {
        if (answer !== null) {
          clearInterval(checkAns);
          resolve(answer);
        }
      }, 1000); // check every second
    });
  };
  useEffect(() => {
    socket.on("game:start", (player1name) => {
      dispatch(setNamePlayer1(player1name));
      dispatch(setStartGame(true));
    });
    socket.on("game:changestate", (index) => {
      updateData(index);
    });
    socket.on("game:restartgame", async (ans) => {
      setRestartPopUp(true);
      ans(await waitForAns());
      setRestartPopUp(false);
      setAnswer(null);
    });
    return () => {
      socket.off("game:changestate");
      socket.off("game:startgame");
    };
    // eslint-disable-next-line
  }, [counter, gamestate]); // Added dependencies
  if (myMarker === "") {
    return <Navigate to="/" />; // Changed to return Navigate component
  }
  if (!isGameStarted) {
    return <div>wait for host to start the game</div>;
  }
  const notYourTurn = () => {
    dispatch(setErrorMsg("It's Not Your Turn"));
  };
  return (
    <>
      <div className="board">
        {myMarker === "X" ? (
          <Board
            updateData={counter % 2 === 0 ? onClickUpdateData : notYourTurn}
          />
        ) : (
          <Board
            updateData={counter % 2 === 1 ? onClickUpdateData : notYourTurn}
          />
        )}
        <Winline />
      </div>
      <div className="names">
        <h1>X for {player1}</h1>
        <h1>O for {player2}</h1>
      </div>
      <PopUpSection />
      {restartpopup && (
        <YesNoPopUpWindow str="Do You Really Want to Restart"></YesNoPopUpWindow>
      )}
    </>
  );
}
