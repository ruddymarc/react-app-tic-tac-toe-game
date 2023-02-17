import React from 'react';
import Square from './Square';

function Board({ squares, onSquareClick }) {
  return (
    <div className='Board'>
      { squares.map((value, key) => (
        <Square key={key} label={value} onClick={() => { onSquareClick(key) }} />
      )) }
    </div>
  )
}

export default Board;
