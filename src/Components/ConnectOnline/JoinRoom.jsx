import React, { useEffect, useRef, useState } from "react";
import "./ConnectOnline.css";
import { joinRoom } from "../../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMsg, setSucessMsg } from "../../store/slice/messages";
import { setNamePlayer2 } from "../../store/slice/name";
import { useNavigate } from "react-router-dom";
import { setRoomID } from "../../store/slice/onlinestate";

export default function JoinRoom(props) {
  const { setWindow } = props;
  const dispatch = useDispatch();
  const [roomid, setRoomid] = useState("");
  const [focused, setFocus] = useState(true);
  const player2 = useSelector((state) => state.name.player2);
  const labelcontent = "------";
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (player2.trim().length <= 0) {
      dispatch(setNamePlayer2("Player 2"));
    }
    if (roomid.length < 6) {
      dispatch(setErrorMsg("Please Enter Complete Room ID"));
      return;
    }
    const sucess = await joinRoom(roomid, player2, dispatch);
    if (sucess === 2) {
      dispatch(setErrorMsg("Room is Full"));
    } else if (sucess) {
      dispatch(setSucessMsg("Room Joined"));
      dispatch(setRoomID(String(roomid)));
      navigate("/board/onlineboard");
    } else {
      dispatch(setErrorMsg("Something went wrong or Room Not Found"));
    }
  };
  const focusInput = (e) => {
    inputRef.current.focus();
    setFocus(true);
  };
  useEffect(() => {
    inputRef.current.focus();
    dispatch(setNamePlayer2(""));
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);
  return (
    <div className="joinroom">
      <style>
        {`
        .connectonline{
          padding:90px
        }
      `}
      </style>
      <div className="inputsection">
        <label>Name</label>
        <input
          type="text"
          value={player2}
          placeholder="Defalut: Player2"
          className="input namefield"
          onChange={(e) => dispatch(setNamePlayer2(e.target.value))}
        />
        <label htmlFor="roomid">Room ID</label>
        <label
          htmlFor="roomid"
          className="input"
          ref={inputRef}
          onClick={focusInput}
        >
          {roomid}
          {roomid.length < 6 && focused && (
            <span className="cursorblink">|</span>
          )}
          {labelcontent.slice(focused ? roomid.length + 1 : roomid.length)}
        </label>
        <input
          type="text"
          maxLength={6}
          value={roomid}
          onChange={(e) => setRoomid(e.target.value)}
          ref={inputRef}
          id="roomid"
          autoComplete="off"
        />
      </div>
      <div className="buttonsection">
        <button className="btn btn-connect" onClick={handleJoinRoom}>
          Connect
        </button>
        <button
          className="btn btn-back"
          onClick={() => setWindow("connectonline")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
