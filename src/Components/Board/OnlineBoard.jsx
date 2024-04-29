import React, { useEffect } from "react";
import Board from "./Board";
import "./Board.css";
import { useDispatch, useSelector } from "react-redux";
import socket, { updateGameState } from "../../socket/socket";
import {
  changeGameState,
  clear,
  decrementCounter,
} from "../../store/slice/gamestate";
import { clearOnlineState, setStartGame } from "../../store/slice/onlinestate";
import { setErrorMsg } from "../../store/slice/messages";
import { Navigate, useNavigate } from "react-router-dom";
import { changedefault, setNamePlayer1 } from "../../store/slice/name";
import Winline from "./Winline";
import PopUpSection from "./PopUpSection";

export default function OnlineBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const counter = useSelector((state) => state.gameState.counter);
  const myMarker = useSelector((state) => state.onlinestate.myMarker);
  const gamestate = useSelector((state) => state.gameState.gamestate);
  const isGameStarted = useSelector((state) => state.onlinestate.isGameStarted);
  const roomid = useSelector((state) => state.onlinestate.roomid);
  const player1 = useSelector((state) => state.name.player1);
  const player2 = useSelector((state) => state.name.player2);
  const onClickUpdateData = (index) => {
    updateData(index);
  };
  const updateData = async (index) => {
    if (gamestate[index] !== "X" && gamestate[index] !== "O") {
      let newArray = [...gamestate];
      newArray[index] = counter % 2 === 0 ? "X" : "O";

      updateGameState(roomid, newArray);
      dispatch(changeGameState(newArray));
      dispatch(decrementCounter());
    } else {
      console.warn("The place is occupied");
    }
  };

  useEffect(() => {
    socket.on("game:start", (player1name) => {
      dispatch(setNamePlayer1(player1name));
      dispatch(setStartGame(true));
    });
    socket.on("game:changestate", (gamestate) => {
      dispatch(changeGameState(gamestate));
      dispatch(decrementCounter());
    });
    socket.on("game:exited", () => {
      dispatch(
        setErrorMsg(`${myMarker === "O" ? player1 : player2} left the Game`)
      );
      dispatch(clearOnlineState());
      dispatch(clear());
      dispatch(changedefault());
      navigate("/");
    });
    socket.on("connect:disconnected", () => {
      dispatch(setErrorMsg("Opponent Disconnected"));
      dispatch(clearOnlineState());
      dispatch(clear());
      dispatch(changedefault());
      navigate("/");
    });
    return () => {
      socket.off("game:changestate");
      socket.off("game:startgame");
      socket.off("game:exited");
      socket.off("connect:disconnected");
    };
    // eslint-disable-next-line
  }, []);
  if (myMarker === "") {
    return <Navigate to="/" />; // Changed to return Navigate component
  }
  if (!isGameStarted) {
    return (
      <div className="background boardnavbarpopup waiting">
        wait for host to start the game
      </div>
    );
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
    </>
  );
}
