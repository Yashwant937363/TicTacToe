import React, { useState } from "react";
import { ArrowClockwise, HouseFill } from "react-bootstrap-icons";
import { Outlet, useNavigate } from "react-router-dom";
import "./BoardNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { clearOnlineState } from "../../store/slice/onlinestate";
import { clear } from "../../store/slice/gamestate";
import { changedefault } from "../../store/slice/name";
import YesNoPopUpWindow from "../PopUpWindow/YesNoPopUpWInodw";

export default function BoardNavbar() {
  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.onlinestate.isOnline);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [popup, setPopUp] = useState(false);
  const [str, setString] = useState("");
  const waitForAns = () => {
    return new Promise((resolve, reject) => {
      const checkAns = setInterval(() => {
        if (answer !== null) {
          clearInterval(checkAns);
          resolve(answer);
        }
      }, 1000);
    });
  };
  const handleOnClickHome = async () => {
    setString("Do You Really Want to Go Home");
    setPopUp(true);
    const ans = await waitForAns();
    if (ans) {
      if (isOnline) {
      } else {
        dispatch(clearOnlineState());
        dispatch(clear());
        dispatch(changedefault());
        navigate("/");
      }
    }
    setAnswer(null);
    setPopUp(false);
  };
  const handleOnClickRestart = async () => {
    setString("Do You Want to Restart the Game!!!");
    setPopUp(true);
    const ans = await waitForAns();
    if (ans) {
      if (isOnline) {
      } else {
      }
    }

    setPopUp(false);
    setString("");
    setAnswer(null);
  };
  return (
    <>
      <div className="boardnavbar">
        <HouseFill className="btn btn-home" onClick={handleOnClickHome} />
        <ArrowClockwise
          className="btn btn-restart"
          onClick={handleOnClickRestart}
        />
      </div>
      {popup && (
        <YesNoPopUpWindow
          str={str}
          trueFunction={() => setAnswer(true)}
          falseFunction={() => setAnswer(false)}
        ></YesNoPopUpWindow>
      )}
      <Outlet></Outlet>
    </>
  );
}
