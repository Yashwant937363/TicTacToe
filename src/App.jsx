import "./styles.css";
import SuccessBar from "./Components/MsgBars/SuccessBar";
import ErrorBar from "./Components/MsgBars/ErrorBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import AboutSection from "./Components/About/About";
import OfflineBoard from "./Components/Board/OfflineBoard";
import OnlineBoard from "./Components/Board/OnlineBoard";
import ConnectOnline from "./Components/ConnectOnline/ConnectOnline";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMsg, setSucessMsg } from "./store/slice/messages";
import { useEffect } from "react";
import BoardNavbar from "./Components/BoardNavbar/BoardNavbar";

function App() {
  const dispatch = useDispatch();
  const successmsg = useSelector((state) => state.message.successmsg);
  const errormsg = useSelector((state) => state.message.errormsg);
  useEffect(() => {
    if (successmsg !== "") {
      setTimeout(() => {
        dispatch(setSucessMsg(""));
      }, 3000);
    }
    if (errormsg !== "") {
      setTimeout(() => {
        dispatch(setErrorMsg(""));
      }, 5000);
    }
  });
  return (
    <>
      {successmsg !== "" && <SuccessBar msg={successmsg} />}
      {errormsg !== "" && <ErrorBar msg={errormsg} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar title="Tic Tac Toe" />}>
            <Route index element={<Home />}></Route>
            <Route path="connectonline" element={<ConnectOnline />} />
            <Route path="about" element={<AboutSection />} />
          </Route>
          <Route path="board" element={<BoardNavbar></BoardNavbar>}>
            <Route path="offlineboard" element={<OfflineBoard />} />
            <Route path="onlineboard" element={<OnlineBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
