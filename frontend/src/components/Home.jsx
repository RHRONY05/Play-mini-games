import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const games = [
    {
      name: 'Tic-Tac-Toe',
      image: '/tic.png',
      path: '/tictactoe',
    },
    {
      name: 'Rock-Paper-Scissors',
      image: 'rock-paper-scissors.jpg',
      path: '/rockpaperscissors',
    },
    {
      name: '2048',
      image: '/2048.png',
      path: '/2048',
    },
    {
      name: 'Memory Match',
      image: '/memory-match.png',
      path: '/memorymatch',
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to the Home Page</h2>
        <p className="mb-6">Choose a game to play:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(game.path)}
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{game.name}</h3>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;