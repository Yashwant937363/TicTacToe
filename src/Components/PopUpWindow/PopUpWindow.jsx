import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../store/slice/gamestate";
import { NavLink, useNavigate } from "react-router-dom";
import "./PopUpWindow.css";
import { clearOnlineState } from "../../store/slice/onlinestate";
import { setErrorMsg, setSucessMsg } from "../../store/slice/messages";
import socket, {
  resultRestartGame,
  resultRestartGameConfirmation,
} from "../../socket/socket";

export default function PopUpWindow(props) {
  const { str, setShowPopUp } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOnline = useSelector((state) => state.onlinestate.isOnline);
  const myMarker = useSelector((state) => state.onlinestate.myMarker);
  const roomid = useSelector((state) => state.onlinestate.roomid);
  const player1 = useSelector((state) => state.name.player1);
  const player2 = useSelector((state) => state.name.player2);
  const [isOpponentWaiting, setOpponentWaiting] = useState(false);
  const [pending, setPending] = useState(false);
  const handleRestart = () => {
    if (isOnline) {
      if (isOpponentWaiting) {
        resultRestartGameConfirmation(roomid, true);
        setPending(false);
        setShowPopUp(false);
        dispatch(clear());
      } else {
        resultRestartGame(roomid);
        setPending(true);
      }
    }
    if (!isOnline) {
      dispatch(clear());
      setShowPopUp(false);
    }
  };
  const handleClear = () => {
    dispatch(clear());
    dispatch(clearOnlineState());
  };
  useEffect(() => {
    socket.on("game:resultrestartgame", async () => {
      setOpponentWaiting(true);
    });
    socket.on("game:resultrestartconfirmation", (ans) => {
      if (ans) {
        dispatch(
          setSucessMsg(
            `${myMarker === "X" ? player2 : player1} also wants to rematch`
          )
        );
        setShowPopUp(false);
        dispatch(clear());
      } else {
        dispatch(
          setErrorMsg(
            `${myMarker === "X" ? player2 : player1} doesn't wants to rematch`
          )
        );
        navigate("/");
      }
      setPending(false);
    });
    return () => {
      socket.off("game:resultrestartgame");
      socket.off("game:resultrestartconfirmation");
    }; // eslint-disable-next-line
  }, []);
  return (
    <>
      {!pending ? (
        <div className="askyesno popup">
          <span>{str}</span>
          <button className="button" onClick={handleRestart}>
            Restart
          </button>
          <NavLink className="button" onClick={handleClear} to="/">
            Close
          </NavLink>
        </div>
      ) : (
        <div className="">{`Wait! for ${
          myMarker === "X" ? player2 : player1
        } confirmation`}</div>
      )}
    </>
  );
}
