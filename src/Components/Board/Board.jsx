import React from "react";
import "./Board.css";
import { useSelector } from "react-redux";

export default function Board(props) {
  const updateData = props.updateData;
  const gamestate = useSelector((state) => state.gameState.gamestate);
  return (
    <>
      {gamestate.map((item, index) => (
        <div className="box" key={index} onClick={() => updateData(index)}>
          <span id={`field${index + 1}`}>
            <i
              className={`bi ${
                item === "X" ? "bi-x" : item === "O" ? "bi-circle" : ""
              }`}
            ></i>
          </span>
        </div>
      ))}
    </>
  );
}
