import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const SIZE = 4; // 4x4 grid

const Game2048 = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || gameWon) return;
      let newBoard;
      switch (e.key) {
        case "ArrowUp":
          newBoard = moveUp([...board]);
          break;
        case "ArrowDown":
          newBoard = moveDown([...board]);
          break;
        case "ArrowLeft":
          newBoard = moveLeft([...board]);
          break;
        case "ArrowRight":
          newBoard = moveRight([...board]);
          break;
        default:
          return;
      }

      if (newBoard) {
        addRandomTile(newBoard);
        setBoard(newBoard);
        if (checkWin(newBoard)) {
          setGameWon(true);
        }
        if (isGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver, gameWon]);

  const initializeGame = () => {
    const newBoard = createEmptyBoard();
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  const createEmptyBoard = () => {
    return Array(SIZE)
      .fill(null)
      .map(() => Array(SIZE).fill(0));
  };

  const addRandomTile = (board) => {
    const emptyCells = [];
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    if (emptyCells.length === 0) return;

    const { row, col } =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  };

  const checkWin = (board) => {
    return board.some(row => row.includes(2048));
  };

  const moveLeft = (board) => {
    let moved = false;
    const newBoard = board.map((row) => {
      const newRow = row.filter((val) => val !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          setScore((prev) => prev + newRow[i]);
          newRow[i + 1] = 0;
          moved = true;
        }
      }
      const finalRow = [...newRow.filter((val) => val !== 0), ...Array(SIZE - newRow.filter((val) => val !== 0).length).fill(0)];
      if (JSON.stringify(finalRow) !== JSON.stringify(row)) moved = true;
      return finalRow;
    });
    return moved ? newBoard : null;
  };

  const moveRight = (board) => {
    let reversedBoard = board.map((row) => [...row].reverse());
    let newBoard = moveLeft(reversedBoard);
    return newBoard ? newBoard.map((row) => row.reverse()) : null;
  };

  const moveUp = (board) => {
    let transposedBoard = transpose(board);
    let newBoard = moveLeft(transposedBoard);
    return newBoard ? transpose(newBoard) : null;
  };

  const moveDown = (board) => {
    let transposedBoard = transpose(board);
    let newBoard = moveRight(transposedBoard);
    return newBoard ? transpose(newBoard) : null;
  };

  const transpose = (board) => {
    return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-900 text-white p-8">
      <div className="w-1/3 p-4">
        <h2 className="text-2xl font-bold mb-4">How to Play:</h2>
        <p>Use Arrow Keys to move tiles.</p>
        <p>Merge tiles to reach 2048!</p>
      </div>
      <div className="w-2/3 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">2048 Game</h1>
        <div className="text-lg font-semibold mb-4">Score: {score}</div>
        <div className="grid grid-cols-4 gap-2 bg-gray-700 p-4 rounded-lg">
          {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded-md bg-gray-800 ${
                  cell !== 0 ? "text-yellow-400" : ""
                }`}
              >
                {cell !== 0 ? cell : ""}
              </div>
            ))
          )}
        </div>
        {gameWon && <div className="text-3xl text-green-500 mt-4">You Win!</div>}
        {gameOver && <div className="text-3xl text-red-500 mt-4">Game Over!</div>}
        <button onClick={initializeGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Game2048;
