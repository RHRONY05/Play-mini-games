import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import TicTacToe from './components/TicTacToe';
import RockPaperScissors from './components/RockPaperScissors';
import Game2048 from './components/Game2048';
import MemoryMatch from './components/MemoryMatch';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
        <Route path="/2048" element={<Game2048 />} />
        <Route path="/memorymatch" element={<MemoryMatch />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;