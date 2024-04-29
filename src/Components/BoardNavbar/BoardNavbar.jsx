import React, { useEffect, useState } from "react";
import { ArrowClockwise, HouseFill } from "react-bootstrap-icons";
import { Outlet, useNavigate } from "react-router-dom";
import "./BoardNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { clearOnlineState } from "../../store/slice/onlinestate";
import { clear } from "../../store/slice/gamestate";
import { changedefault } from "../../store/slice/name";
import YesNoPopUpWindow from "../PopUpWindow/YesNoPopUpWInodw";
import socket, {
  exitGame,
  restartGame,
  restartGameConfirmation,
} from "../../socket/socket";
import { setErrorMsg, setSucessMsg } from "../../store/slice/messages";

export default function BoardNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOnline = useSelector((state) => state.onlinestate.isOnline);
  const roomid = useSelector((state) => state.onlinestate.roomid);
  const myMarker = useSelector((state) => state.onlinestate.myMarker);
  const player1 = useSelector((state) => state.name.player1);
  const player2 = useSelector((state) => state.name.player2);
  const [isOnClickHome, setOnClickHome] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [str, setString] = useState("");
  const [isPending, setPending] = useState(false);
  const [isYouClicked, setWhoClicked] = useState(false);
  const falseFunction = () => {
    setPopUp(false);
    if (isOnline && !isYouClicked) {
      restartGameConfirmation(roomid, false);
    }
  };

  const handleOnClickHome = async () => {
    setString("Go Home?");
    setOnClickHome(true);
    setPopUp(true);
  };

  const handleOnClickRestart = async () => {
    setString("Restart Game?");
    setOnClickHome(false);
    setPopUp(true);
  };

  const handleTrueOnHome = () => {
    if (isOnline) {
      exitGame(roomid);
    }
    dispatch(clearOnlineState());
    dispatch(clear());
    dispatch(changedefault());
    navigate("/");
    setPopUp(false);
  };

  const handleTrueOnRestart = async () => {
    if (isOnline && isYouClicked) {
      dispatch(
        setSucessMsg(
          `Wait! for ${myMarker === "X" ? player2 : player1} confirmation`
        )
      );
      setPending(true);
      restartGame(roomid);
    }
    if (isOnline && !isYouClicked) {
      restartGameConfirmation(roomid, true);
    }
    if (!isOnline || !isYouClicked) {
      dispatch(clear());
    }
    setPopUp(false);
  };

  useEffect(() => {
    socket.on("game:restartgame", async () => {
      handleOnClickRestart();
    });
    socket.on("game:restartconfirmation", (ans) => {
      if (ans) {
        dispatch(
          setSucessMsg(
            `${
              myMarker === "X" ? player2 : player1
            } also wants to restart the game`
          )
        );
        dispatch(clear());
      } else {
        dispatch(
          setErrorMsg(
            `${
              myMarker === "X" ? player2 : player1
            } doesn't wants to restart the game`
          )
        );
      }
      setPending(false);
    });
    return () => {
      socket.off("game:restartgame");
      socket.off("game:restartconfirmation");
    }; // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="boardnavbar">
        <HouseFill className="btn btn-home" onClick={handleOnClickHome} />
        <ArrowClockwise
          className="btn btn-restart"
          onClick={() => {
            setWhoClicked(true);
            handleOnClickRestart();
          }}
        />
      </div>
      {popup && (
        <div className="background boardnavbarpopup">
          <YesNoPopUpWindow
            str={str}
            trueFunction={
              isOnClickHome ? handleTrueOnHome : handleTrueOnRestart
            }
            falseFunction={falseFunction}
          ></YesNoPopUpWindow>
        </div>
      )}
      <Outlet></Outlet>
      {isPending && (
        <div className="background boardnavbarpopup waiting">
          Wait for {myMarker === "X" ? player2 : player1} Respond
        </div>
      )}
    </>
  );
}
