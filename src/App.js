import './styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Board from './Components/Board';
import Home from './Components/Home';
import AboutSection from './Components/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar title="Tic Tac Toe" />}>
            <Route index element={<Home />}></Route>
            <Route path='/board' element={<Board />} />
            <Route path='/about' element={<AboutSection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
