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

// THis function seems to work

// let boardString = [].concat.apply([], board)

// console.log(boardString)
// let isMatch = ''
// let check = board.map(x => {
//     x.map((item, i) => {
        
//         if ((x[i] === x[i+1]) && (x[i] === x[i+2]) && (x[i] === x[i+3]) && (x[i] === ('x' || 'o'))
//         || 
//         (x[i+1] === x[i+2]) && (x[i+1] === x[i+3]) && (x[i+1] === x[i+4]) && (x[i+1] === ('x' || 'o'))
//         || 
//         (x[i+2] === x[i+3]) && (x[i+2] === x[i+4]) && (x[i+2] === x[i+5]) && (x[i+2] === ('x' || 'o')))
//         {
//             return isMatch = 'true'
//         }
//     })
// })

export const calculateWinner = (board, player) => {
const checkVertical = board
  .map(column => {
    if (column
    .map((cell, index) => {
      if (column[index] === column[index+1] && column[index] === column[index+2] && column[index] === column[index+3]) {
        return true
      }
    })
    ) {
      return true
    }  else {
      return false
    }
  })

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
