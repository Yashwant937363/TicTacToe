import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNamePlayer1 } from "../../store/slice/name";
import { startGame } from "../../socket/socket";
import { useNavigate } from "react-router-dom";
import { setStartGame } from "../../store/slice/onlinestate";

export default function StartSection() {
  const dispatch = useDispatch();
  const player1 = useSelector((state) => state.name.player1);
  const roomid = useSelector((state) => state.onlinestate.roomid);
  const navigate = useNavigate();
  const handleStartGame = () => {
    if (player1.trim().length <= 0) {
      dispatch(setNamePlayer1("Player 1"));
    }
    startGame(player1, roomid);
    dispatch(setStartGame(true));
    navigate("/board/onlineboard");
  };
  useEffect(() => {
    dispatch(setNamePlayer1(""));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="startsection">
      <div>Enter Your Name</div>
      <input
        type="text"
        value={player1}
        placeholder="Defalut : Player 1"
        className="input"
        onChange={(e) => dispatch(setNamePlayer1(e.target.value))}
      />
      <button onClick={handleStartGame} className="btn btn-start">
        Start
      </button>
    </div>
  );
}
