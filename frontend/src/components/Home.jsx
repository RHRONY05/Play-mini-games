import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to the Home Page</h2>
        <p className="mb-6">Choose a game to play:</p>
        <button
          onClick={() => navigate('/tictactoe')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Play Tic-Tac-Toe
        </button>
        <button
          onClick={() => navigate('/rockpaperscissors')}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Play Rock-Paper-Scissors
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;