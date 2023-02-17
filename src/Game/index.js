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

  // Functionctions
  const onPlay = (indice) => {
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
