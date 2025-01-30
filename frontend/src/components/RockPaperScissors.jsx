import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const choices = ['Rock', 'Paper', 'Scissors'];

  const handleChoice = (choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computer);
    determineWinner(choice, computer);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('It\'s a draw!');
    } else if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Rock-Paper-Scissors</h2>
        <div className="flex gap-4 mb-6">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              className="w-24 h-24 bg-green-100 text-xl font-bold rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {choice}
            </button>
          ))}
        </div>
        {userChoice && (
          <div className="mb-6">
            <p>Your choice: {userChoice}</p>
            <p>Computer's choice: {computerChoice}</p>
            <p className="text-xl font-bold">{result}</p>
          </div>
        )}
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

export default RockPaperScissors;