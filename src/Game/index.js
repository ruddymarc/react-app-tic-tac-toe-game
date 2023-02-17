import React, { useState } from 'react';
import Board from './Board';
import './Game.css';

function Game() {
  // Mutable states
  const [history, setHistory] = useState([Array(9).fill(null)]); // states of game board
  const [currentMove, setCurrentMove] = useState(0); // Current game board key

  // Inmutable props
  const currentSquares = history.at(currentMove); // Current game board
  const whoPlays = currentMove % 2 === 0 ? 'X' : 'O'; // Current players X or O
  const moves = history.map((_squares, move) => ( // Display history
    <li key={move}>
      <button type='button' className='Link' onClick={() => setCurrentMove(move)}>
        { move ? `Go to move #${move}` : 'Go to game start' }
      </button>
    </li>
  ));
  const status = winner(currentSquares)
    ? `Winner : ${winner(currentSquares)}`
    : `Player : ${whoPlays}`;

  // Functionctions
  function winner(squares) {
    const winnersPos = [
      [0, 1, 2], // horizontal top
      [3, 4, 5], // horizontal middle
      [6, 7, 8], // horizontal bottom
      [0, 3, 6], // vertical left
      [1, 4, 7], // vertical center
      [2, 5, 8], // vertical right
      // oblics
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winnersPos.length; i++) {
      const [a, b, c] = winnersPos[i];
      if (squares.at(a) && squares.at(a) === squares.at(b) && squares.at(b) === squares.at(c)) {
        return squares.at(a)
      }
    }
    return (null)
  }
  function onPlay(indice) {
    const nextSquares = [...currentSquares];
    // prevent rewriting on square
    if (nextSquares[indice]) {
      return;
    }
    nextSquares[indice] = whoPlays;
    // Mark movements in history state
    setHistory([...history, nextSquares]);
    setCurrentMove(history.length);

    console.log({ 
      indice, currentSquares, history, currentMove, whoPlays
    });
  }

  return (
    <div className='Game'>
      <h2 className='GameStatus'>{ status }</h2>
      <div className='GameBoard'>
        <Board squares={currentSquares} onSquareClick={onPlay} />
      </div>
      <div className='GameInfo'>
        <ol>{ moves }</ol>
      </div>
    </div>
  )
}

export default Game;
