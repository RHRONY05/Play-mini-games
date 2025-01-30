import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const navigate = useNavigate();

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? 'Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Tic-Tac-Toe</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 bg-blue-100 text-2xl font-bold rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {value}
            </button>
          ))}
        </div>
        <p className="text-xl mb-6">{status}</p>
        <button
          onClick={resetGame}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Reset Game
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;