import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PopUpWindow from "../PopUpWindow/PopUpWindow";

export default function PopUpSection(props) {
  const counter = useSelector((state) => state.gameState.counter);
  const [showPopUp, setShowPopUp] = useState(false);
  const player1 = useSelector((state) => state.name.player1);
  const player2 = useSelector((state) => state.name.player2);
  const winner = useSelector((state) => state.gameState.winner);
  const isWin = useSelector((state) => state.gameState.isWin);
  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        setShowPopUp(true);
      }, 1000); // 1000 milliseconds = 1 second
    }
    // eslint-disable-next-line
  }, [isWin]);
  return (
    <>
      {showPopUp && winner !== "D" && (
        <div className="background">
          <PopUpWindow
            str={`${winner === "X" ? player1 : player2} is Win`}
            setShowPopUp={setShowPopUp}
          />
        </div>
      )}

      {counter < 0 && !isWin && (
        <div className="background">
          <PopUpWindow str={`Game Draw`} setShowPopUp={setShowPopUp} />
        </div>
      )}
    </>
  );
}
