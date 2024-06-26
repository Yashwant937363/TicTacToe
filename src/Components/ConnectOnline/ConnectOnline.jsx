import React, { useEffect, useState } from "react";
import "./ConnectOnline.css";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import socket, { startConnection } from "../../socket/socket";
import { useDispatch } from "react-redux";
import { change } from "../../store/slice/name";
import { setMarker } from "../../store/slice/onlinestate";
import { useNavigate } from "react-router-dom";
import { setErrorMsg } from "../../store/slice/messages";
export default function ConnectOnline() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [window, setWindow] = useState("connectonline");
  const createRoom = () => {
    setWindow("createroom");
    dispatch(setMarker("X"));
  };
  const joinRoom = () => {
    setWindow("joinroom");
    dispatch(setMarker("O"));
  };
  useEffect(() => {
    startConnection();
    dispatch(change({ name1: "", name2: "" }));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket.on("connect:disconnected", () => {
      dispatch(setErrorMsg("Opponent Disconnected"));
      navigate("/");
    });
    return () => socket.off("connect:disconnected");
    // eslint-disable-next-line
  }, []);
  return (
    <div className="connectonline">
      {window === "connectonline" && (
        <div className="connection">
          <button className="btn" onClick={createRoom}>
            Create Room
          </button>
          <button className="btn" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      )}
      {window === "createroom" && (
        <CreateRoom setWindow={setWindow}></CreateRoom>
      )}
      {window === "joinroom" && <JoinRoom setWindow={setWindow}></JoinRoom>}
    </div>
  );
}
