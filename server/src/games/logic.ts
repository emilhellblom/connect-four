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







  //   let board = [
  //     ['x', 'x', 'x', null, null, null,],
  //     [null, 'x', 'x', 'x', null, null,],
  //     [null, 'x', 'x', 'x', 'x', 'x',],
  //     [null, null, null, null, null, 'x',],
  //     [null, 'x', null, null, null, null,],
  //     ['x', 'x', null, null, null, 'x',]
  // ]
  
  // const symbol = ['x', 'o']
  
  // const boardSymbol = ['x', 'o', null]
  
  // const slicer = (column, i) => {
  //     if(
  //     column.slice(0,4).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
  //     column.slice(1,5).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
  //     column.slice(2,6).every(cell => (column[i] === cell) && symbol.includes(cell))
  //     ) return true
  // }
  
  // const dRowCheck = (column, incrementColumn, incrementRow) => {
  //     const checkItems = []
  //     column.map((item, i) => {
  //         if (board[i+incrementColumn] !== undefined) 
  //             checkItems.push(board[i+incrementColumn][i+incrementRow])
  //             console.log(checkItems)
  
  //         if ((checkItems.length >= 4) && slicer(checkItems, i)) 
  //             return isDiagonal = true
  //     })
  //     console.log(checkItems)
  // }
  
  // let isHorizontal
  // let checkHorizontal = board.map(column => {
  //     column.map((item, index) => {
  //         if (slicer(column, symbol, index)) return isHorizontal = true
  //     })
  // })
  // let isDiagonal
  // let checkDiagonal = board.map(column => {
  //     dRowCheck(column, 0, 0)
  //     dRowCheck(column, 0, 1)
  //     dRowCheck(column, 0, 2)
  //     dRowCheck(column, 1, 0)
  //     dRowCheck(column, 2, 0)
  // })
  // console.log(isDiagonal, 'Is this true?')
  
  
  