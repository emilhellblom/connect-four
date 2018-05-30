import React from 'react'
import './Board.css'

const renderCel = (makeMove, columnIndex, cellIndex, symbol, hasTurn) => {
  if(symbol === 'x')
  {
    return (    
      <button
        className="board-tile red"
        disabled={hasTurn}
        onClick={() => makeMove(columnIndex, cellIndex)}
        key={`${columnIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  }
  else if (symbol === 'o')
  {
    return (    
      <button
        className="board-tile blue"
        disabled={hasTurn}
        onClick={() => makeMove(columnIndex, cellIndex)}
        key={`${columnIndex}-${cellIndex}`}
      >{symbol || '-'}</button>
    )
  }
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
