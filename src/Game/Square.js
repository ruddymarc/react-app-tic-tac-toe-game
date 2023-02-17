import React from 'react';

function Square({ label, onClick }) {
  return (
    <button type='button' className='Square' onClick={onClick}>
      { label }
    </button>
  )
}

export default Square;
