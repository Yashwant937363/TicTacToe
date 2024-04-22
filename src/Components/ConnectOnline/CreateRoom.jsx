import React, { useEffect, useState } from "react";
import { getConnection } from "../../socket/socket";
import socket from "../../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { setNamePlayer2 } from "../../store/slice/name";
import StartSection from "./StartSection";
import { setRoomID } from "../../store/slice/onlinestate";

export default function CreateRoom(props) {
  const dispatch = useDispatch();
  const { setWindow } = props;
  const roomid = useSelector((state) => state.onlinestate.roomid);
  const [pending, setPending] = useState(false);
  const [isOpponentJoined, setOpponentJoin] = useState(false);
  const getRoomID = async () => {
    setPending(true);
    try {
      const id = await getConnection();
      dispatch(setRoomID(id));
    } catch (error) {
      console.log(error);
      dispatch(setRoomID("Error Occur"));
    }
    setPending(false);
  };
  useEffect(() => {
    getRoomID();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket.on("connect:opponentjoined", ({ playername }) => {
      dispatch(setNamePlayer2(playername));
      setOpponentJoin(true);
    });

    return () => {
      socket.off("connect:opponentjoined");
    }; // eslint-disable-next-line
  }, []);
  return !isOpponentJoined ? (
    <div className="createroom">
      <div>Room ID</div>
      <div>{pending ? "Connecting" : roomid}</div>
      <button
        className="btn btn-back"
        onClick={() => setWindow("connectonline")}
      >
        Back
      </button>
    </div>
  ) : (
    // <div>Start section</div>
    <StartSection />
  );
}
