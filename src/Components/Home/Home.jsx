import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../store/slice/name";
import { changeScreen } from "../../store/slice/togglecnp";
import CNPSwitch from "../cnpswitch/cnpswitch";
import { setOnline } from "../../store/slice/onlinestate";
import socket from "../../socket/socket";

export default function Home() {
  const dispatch = useDispatch();
  const [isHome, setHome] = useState(true);
  const handleOfflineStart = () => {
    setHome(!isHome);
    dispatch(setOnline(false));
  };
  const handleOnlineStart = () => {
    dispatch(setOnline(true));
  };
  useEffect(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  }, []);
  return (
    <>
      {isHome ? (
        <div className="HomePage">
          <button className="btn-home" onClick={handleOfflineStart}>
            Start
          </button>
          <Link
            className="btn-home friends-btn"
            to="/connectonline"
            onClick={handleOnlineStart}
          >
            Play With Online Friends
          </Link>
        </div>
      ) : (
        <ChangeName setHome={setHome} />
      )}
    </>
  );
}

function ChangeName({ setHome }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const dispatch = useDispatch();
  const isToggle = useSelector((state) => state.toggle.togglecnp);
  const handleSave = () => {
    dispatch(
      change({ name1: player1, name2: isToggle ? player2 : "Computer" })
    );
  };
  useEffect(() => {
    dispatch(changeScreen());
    return () => {
      dispatch(changeScreen());
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="nameing">
        <div className="card">
          <i className="bi bi-x"></i>
          <input
            type="text"
            placeholder="Enter Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </div>
        <style>
          {`
    .flip-card-inner {
      transform: rotateY(${isToggle ? "0deg" : "180deg"});
    }
  `}
        </style>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <i className="bi bi-circle"></i>
              <input
                type="text"
                placeholder="Enter Player 2 Name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
              />
            </div>
            <div className="flip-card-back">
              <i className="bi bi-circle"></i>
              <div className="label">
                <span>Computer</span>
                <i className="bi bi-robot"></i>
              </div>
            </div>
          </div>
        </div>
        <CNPSwitch className="homeswitch"></CNPSwitch>
      </div>
      <div className="btnsection">
        <button
          className="btn-all btn-back"
          onClick={() => {
            setHome(true);
          }}
        >
          Go Back
        </button>
        <Link
          to="/board/offlineboard"
          className="btn-all btn-save"
          onClick={handleSave}
        >
          Save
        </Link>
      </div>
    </>
  );
}
