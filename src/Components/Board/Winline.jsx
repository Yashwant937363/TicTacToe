import React from "react";
import { useSelector } from "react-redux";

export default function Winline() {
  const isWin = useSelector((state) => state.gameState.isWin);
  const lineClass = useSelector((state) => state.gameState.lineClass);
  return (
    <>
      <style>
        {`
          .winbox .winline .line {
            width: ${
              lineClass === "column-1" ||
              lineClass === "column-2" ||
              lineClass === "column-3"
                ? "0px"
                : "90%"
            };
            height: ${
              lineClass === "column-1" ||
              lineClass === "column-2" ||
              lineClass === "column-3"
                ? "90%"
                : "0px"
            };
            animation-name: ${isWin ? "popUp" : null};
          }
    `}
      </style>
      {isWin ? (
        <div className="winbox">
          <div className={`winline ${lineClass}`}>
            <div className={`line ${isWin && "popup"}`}></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
