import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RockPaperScissors = () => {
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [targetScore, setTargetScore] = useState(5); // Default target score
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [matchEndMessage, setMatchEndMessage] = useState('');

  const choices = ['Rock', 'Paper', 'Scissors'];

  const handleChoice = (choice) => {
    if (gameOver) return;

    const computer = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computer);
    determineWinner(choice, computer);
  };

  const determineWinner = (user, computer) => {
    let newUserScore = userScore;
    let newComputerScore = computerScore;

    if (user === computer) {
      setResult("It's a draw!");
    } else if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) {
      newUserScore += 1;
      setResult('You win this round!');
    } else {
      newComputerScore += 1;
      setResult('You lose this round!');
    }

    setUserScore(newUserScore);
    setComputerScore(newComputerScore);

    if (newUserScore + newComputerScore >= targetScore) {
      setGameOver(true);
      setMatchEndMessage(newUserScore > newComputerScore ? 'You are the winner! 🎉' : 'You lose this game! 😢');
    }
  };

  const resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setGameOver(false);
    setMatchEndMessage('');
  };

  const handleTargetScoreChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 30) {
      setTargetScore(value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Rock-Paper-Scissors</h2>

        {/* Target Score Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetScore">
            Set Target Score (1-30):
          </label>
          <input
            type="number"
            id="targetScore"
            min="1"
            max="30"
            value={targetScore}
            onChange={handleTargetScoreChange}
            className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Score Display */}
        <div className="mb-6">
          <p className="text-xl">
            Your Score: <span className="font-bold">{userScore}</span>
          </p>
          <p className="text-xl">
            Computer Score: <span className="font-bold">{computerScore}</span>
          </p>
        </div>

        {/* Game Choices */}
        <div className="flex gap-4 mb-6">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              disabled={gameOver}
              className="w-24 h-24 bg-green-100 text-xl font-bold rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {choice}
            </button>
          ))}
        </div>

        {/* Result Display */}
        {userChoice && (
          <div className="mb-6">
            <p>Your choice: {userChoice}</p>
            <p>Computer's choice: {computerChoice}</p>
            <p className="text-xl font-bold">{result}</p>
          </div>
        )}

        {/* Match End Message */}
        {gameOver && (
          <div className="mb-6">
            <p className="text-2xl font-bold text-green-600">{matchEndMessage}</p>
          </div>
        )}

        {/* Reset and Back Buttons */}
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