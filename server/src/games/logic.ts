import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Column } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null ]
    return board.length === 6 &&
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

export const calculateWinner = (board, playerSymbol) => {
  const symbol = ['x', 'o']
  console.log(board)
  const slicer = (column, i) => {
    if(
    column.slice(0,4).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
    column.slice(1,5).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
    column.slice(2,6).every(cell => (column[i] === cell) && symbol.includes(cell))
    ) return true
  }

  // const ttbRowCheck = (column, incrementColumn, incrementRow) => {
  //   const checkItems = []
  //   column.map((item, i) => {
  //       if (board[i+incrementColumn] !== undefined) {
  //           if (board[incrementColumn+i][incrementRow+i] !== undefined)
  //           checkItems.push(board[i+incrementColumn][i+incrementRow])
  //       }
  //       if ((checkItems.length >= 4) && slicer(checkItems, i))
  //         return isDiagonal = true
  //   })
  // }

  // const bttRowCheck = (column, incrementColumn, incrementRow) => {
  //   const checkItems = []
  //   column.map((item, i) => {
  //       if (board[incrementColumn-i] !== undefined) {
  //           if (board[incrementColumn-i][incrementRow+i] !== undefined)
  //           checkItems.push(board[incrementColumn-i][incrementRow+i])
  //       }
  //       if ((checkItems.length >= 4) && slicer(checkItems, i)) 
  //           return isDiagonal = true
  //   })
  // }

  let isVertical

  const verticalFunction = () => board.map(column => {
    column.map((item, index) => {
        if (
            slicer(column, index)
        ) return isVertical = true
    })
  })
  // let isDiagonal

  // const diagonalFunction = () => board.map(column => {
  //   ttbRowCheck(column, 0, 0)
  //   ttbRowCheck(column, 0, 1)
  //   ttbRowCheck(column, 0, 2)
  //   ttbRowCheck(column, 1, 0)
  //   ttbRowCheck(column, 2, 0)
  //   bttRowCheck(column, 5, 0)
  //   bttRowCheck(column, 5, 1)
  //   bttRowCheck(column, 5, 2)
  //   // bttRowCheck(column, 4, 0)
  //   bttRowCheck(column, 3, 0)
  // })

  let isHorizontal

  const checkHorizontal = (column, incrementColumn, incrementRow) => {
      const checkItems = []
      column.map((item, i) => {
          checkItems.push(board[incrementColumn+i][incrementRow])
          if ((checkItems.length >= 4) && slicer(checkItems, i)){
              return isHorizontal = true
          }
      })
      console.log(incrementRow)
      console.log(checkItems)
  }

  const horizontalFunction = () => board.map((column, index) => {
    console.log(column)
    checkHorizontal(column, 0, index)
  })

  horizontalFunction()
  // diagonalFunction()
  verticalFunction()
  console.log(isVertical, 'what about thiiiiiiiiis?')
  if ((isVertical || isHorizontal) === true)
    return playerSymbol
}

export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Column)
    .every(symbol => symbol !== null)
