import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Game2048 = () => {
  const navigate = useNavigate();

  // 2048 game logic goes here

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">2048</h2>
        <p className="mb-6">2048 game logic will be implemented here.</p>
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

export default Game2048;