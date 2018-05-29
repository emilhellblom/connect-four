import React from 'react'
import './Board.css'

const renderCel = (makeMove, columnIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(columnIndex, cellIndex)}
      key={`${columnIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  )
}

export default ({board, makeMove}) => board.map((cells, columnIndex) =>
  <div key={columnIndex} className='column'>
    {cells.map((symbol, cellIndex) => renderCel(makeMove, columnIndex, cellIndex,symbol,false))}
  </div>
)
