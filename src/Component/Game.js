import React, { useState } from 'react';
import styled from 'styled-components'
import Board from './Board';

function Game() {
  // Mutable states
  const [history, setHistory] = useState([Array(9).fill(null)]); // states of game board
  const [currentMove, setCurrentMove] = useState(0); // Current game board key

  // Inmutable props
  const currentSquares = history.at(currentMove); // Current game board
  const whoPlays = currentMove % 2 === 0 ? 'X' : 'O'; // Current players X or O
  const moves = history.map((_squares, move) => ( // Display history
    <li key={move}>
      <Link onClick={() => setCurrentMove(move)}>
        { move ? `Go to move #${move}` : 'Go to game start' }
      </Link>
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
    <Wrapper>
      <GameStatus>{ status }</GameStatus>
      <GameBoard>
        <Board squares={currentSquares} onSquareClick={onPlay} />
      </GameBoard>
      <GameInfo>
        <ol>{ moves }</ol>
      </GameInfo>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 1em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const GameBoard = styled.div`
  flex: 2;
`;
const GameInfo = styled.div`
  flex: 1;
`;
const GameStatus = styled.h2`
  width: 100%;
  text-align: center;
`;
const Link = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  color: #4096ff;
  font-weight: 700;
  text-transform: uppercase;
`;

export default Game;
