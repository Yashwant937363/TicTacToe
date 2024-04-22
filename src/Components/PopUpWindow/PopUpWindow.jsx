import React from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../store/slice/gamestate";
import { NavLink } from "react-router-dom";
import "./PopUpWindow.css";
import { clearOnlineState } from "../../store/slice/onlinestate";

export default function PopUpWindow(props) {
  const dispatch = useDispatch();
  const { str, setShowPopUp } = props;
  const handleRestart = () => {
    dispatch(clear());
    setShowPopUp(false);
  };
  const handleClear = () => {
    dispatch(clear());
    dispatch(clearOnlineState());
  };
  return (
    <div className="askyesno popup">
      <span>{str}</span>
      <button className="button" onClick={handleRestart}>
        Restart
      </button>
      <NavLink className="button" onClick={handleClear} to="/">
        Close
      </NavLink>
    </div>
  );
}
