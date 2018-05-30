import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Column } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null ]
    return board.length === 7 &&
      board.every(column =>
        column.length === 6 &&
        column.every(symbol => symbols.includes(symbol))
      )
  }
}

// export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
//   const changes = from
//     .map(
//       (column, columnIndex) => column.map((symbol, columnIndex) => ({
//         from: symbol, 
//         to: to[columnIndex][columnIndex]
//       }))
//     )
//     .reduce((a,b) => a.concat(b))
//     .filter(change => change.from !== change.to)

//   return changes.length === 1 && 
//     changes[0].to === playerSymbol && 
//     changes[0].from === null
// }

export const calculateWinner = (board, player) => {
const checkVertical = board
  .map(column => column
    .map((cell, index) => {
      if (column[index] === cell[index+1] && cell[index] === cell[index+2] && cell[index] === cell[index+3]) {
      return true
      }
    })
  )
console.log(checkVertical, 'checkingign')
if (checkVertical) {
  return player.symbol
 } else return null
}
  // .concat(
  //   [
  //     // diagonal winner ltr
  //     [0, 1, 2, 3, 4, 5].map(n => board[n][n]),
  //     // diagonal winner rtl
  //     [0, 1, 2, 3, 4, 5].map(n => board[5-n][n])
  //   ]
  // )
  // .map(column => console.log(column, 'what is this?'))
  // .filter(column => column[0] && column.every(symbol => symbol === column[0]))
  // .map(column => column[0])[0]

export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Column)
    .every(symbol => symbol !== null)
