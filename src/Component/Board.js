import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Board({ squares, onSquareClick }) {
  return (
    <Wrapper>
      { squares.map((label, key) => (
        <Square key={key} onClick={() => { onSquareClick(key) }}>
          { label }
        </Square>
      )) }
    </Wrapper>
  )
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.oneOf(['X', 'O'])
  ).isRequired,
  onSquareClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  gap: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const Square = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 20vw;
  font-size: 10vw;
`;

export default Board;
