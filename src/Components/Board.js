import { useEffect, useState } from 'react';
import './Board.css';
import './winner.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeGameState, clear } from '../store/slice/gamestate';
import { NavLink } from 'react-router-dom';

export default function Board() {
    const dispatch = useDispatch();
    const symbol = useSelector((state) => state.gameState.gamestate);
    const isWin = useSelector((state) => state.gameState.isWin);
    const [counter, setCounter] = useState(8);
    const player1 = useSelector((state) => state.name.player1);
    const player2 = useSelector((state) => state.name.player2);
    const cnp = useSelector((state) => state.toggle.togglecnp);
    const [computer, setComputer] = useState(false);
    const updateData = async (index) => {
        if (symbol[index] !== 'X' && symbol[index] !== 'O') {
            const newArray = [...symbol];
            newArray[index] = counter % 2 === 0 ? 'X' : 'O';

            dispatch(changeGameState(newArray));
            await setCounter((prevCounter) => prevCounter - 1);

        } else {
            console.warn("The place is occupied");
        }
    };

    useEffect(() => {
        if ((!cnp) && (!isWin) && (counter > 0) && (counter % 2 === 1)) {
            setComputer(true);
            setTimeout(() => {
                playComputer();
            }, 1000);
        }//eslint-disable-next-line
    }, [counter])

    const playComputer = () => {
        let index;
        do {
            index = Math.floor(Math.random() * 9);
        } while (counter >= 0 && (symbol[index] === 'X' || symbol[index] === 'O'));

        const newArray = [...symbol];
        newArray[index] = 'O';

        dispatch(changeGameState(newArray));
        setCounter((prevCounter) => prevCounter - 1);
        setComputer(false);
    };

    const lineClass = useSelector((state) => state.gameState.lineClass);
    const winner = useSelector((state) => state.gameState.winner);
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        if (isWin) {
            setTimeout(() => {
                setShowPopUp(true);
            }, 1000); // 1000 milliseconds = 1 second
        }
        // eslint-disable-next-line
    }, [isWin]);
    const handleRestart = () => {
        dispatch(clear());
        setShowPopUp(false);
        setCounter(8);
    }
    useEffect(() => {
        return () => {
            dispatch(clear());
        };
    }, [])
    return (
        <>
            <style>
                {`
                    .winbox .winline .line {
                        width: ${lineClass === 'column-1' || lineClass === 'column-2' || lineClass === 'column-3' ? '0px' : '90%'};
                        height: ${lineClass === 'column-1' || lineClass === 'column-2' || lineClass === 'column-3' ? '90%' : '0px'};
                        animation-name: ${(isWin) ? 'popUp' : null};
                      }
                `}
            </style>
            <div className="board">
                {symbol.map((item, index) => (
                    <div className='box' key={index} onClick={() => updateData(index)}>
                        <span id={`field${index + 1}`}><i className={`bi ${item === 'X' ? 'bi-x' : item === 'O' ? 'bi-circle' : ''}`}></i></span>
                    </div>
                ))}
                {(isWin) ? (
                    <div className='winbox'>
                        <div className={`winline ${lineClass}`}>
                            <div className={`line ${(isWin) ? 'popup' : null}`}></div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className='names'>
                <h1>X for {player1}</h1>
                <h1>O for {player2}</h1>
            </div>
            {(showPopUp) && (
                <div className='background'>
                    <div className='askyesno popup'>
                        <span>{(winner === 'X') ? player1 : player2} is Win</span>
                        <button className="button" onClick={handleRestart}>Restart</button>
                        <NavLink className="button" to="/">Back</NavLink>
                    </div>
                </div>
            )}
            {((counter < 0) && (!isWin)) && (
                <div className='background'>
                    <div className='askyesno popup'>
                        <span>Game Draw</span>
                        <button className="button" onClick={handleRestart}>Restart</button>
                        <NavLink className="button" to="/">Back</NavLink>
                    </div>
                </div>
            )}
            {(computer && !isWin && !(counter < 0)) && (
                <div className='background'>
                    <div className='complay'><i className='bi bi-robot'></i> Wait i am Playing</div>
                </div>
            )
            }
        </>
    )
}