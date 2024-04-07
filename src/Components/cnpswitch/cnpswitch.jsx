import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/slice/togglecnp";
import "./cnpswitch.css";

export default function CNPSwitch(props) {
  const isToggled = useSelector((state) => state.toggle.togglecnp);
  const dispatch = useDispatch();
  return (
    <div className={`toggle-container ${props.className}`}>
      {" "}
      <i className="bi bi-robot"></i>{" "}
      <label className="switch">
        {" "}
        <input
          type="checkbox"
          checked={isToggled}
          onChange={() => dispatch(toggle())}
        />{" "}
        <span className="slider round"></span>{" "}
      </label>{" "}
      <i className="bi bi-people-fill"></i>{" "}
    </div>
  );
}
