import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Column } from './entities'
import { AdvancedConsoleLogger } from 'typeorm';

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

export const calculateWinner = (board, playerSymbol) => {
  const symbol = ['x', 'o']
  const slicer = (column, i) => {
    if (column.length === 7)
        if(
            column.slice(0,4).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
            column.slice(1,5).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
            column.slice(2,6).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
            column.slice(3,7).every(cell => (column[i] === cell) && symbol.includes(cell))
    )   return true
    if (column.length === 6)
        if(
            column.slice(0,4).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
            column.slice(1,5).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
            column.slice(2,6).every(cell => (column[i] === cell) && symbol.includes(cell))
        )   return true
    if (column.length === 5)
        if(
            column.slice(0,4).every(cell => (column[i] === cell) && symbol.includes(cell)) ||
            column.slice(1,5).every(cell => (column[i] === cell) && symbol.includes(cell)) 
        )   return true
    if (column.length === 4)
        if(column.slice(0, 4).every(cell => (column[i] === cell) && symbol.includes(cell)))
            return true
}

  const ttbRowCheck = (column, incrementColumn, incrementRow) => {
    const checkItems = []
    column.map((item, i) => {
        if (board[i+incrementColumn] !== undefined) {
            if (board[incrementColumn+i][incrementRow+i] !== undefined)
            checkItems.push(board[i+incrementColumn][i+incrementRow])
        }
        if ((checkItems.length >= 4) && slicer(checkItems, i))
          return isDiagonal = true
    })
    console.log('top to bottom check', checkItems)
  }

  const bttRowCheck = (column, incrementColumn, incrementRow) => {
    const checkItems = []
    column.map((item, i) => {
        if (board[incrementColumn-i] !== undefined) {
            if (board[incrementColumn-i][incrementRow+i] !== undefined)
            checkItems.push(board[incrementColumn-i][incrementRow+i])
        }
        if ((checkItems.length >= 4) && slicer(checkItems, i)) 
            return isDiagonal = true
    })
    console.log('bottom to top check', checkItems)
  }
  let isDiagonal

  const diagonalFunction = () => board.map(column => {
    ttbRowCheck(column, 0, 0)
    ttbRowCheck(column, 0, 1)
    ttbRowCheck(column, 0, 2)
    ttbRowCheck(column, 0, 3)
    ttbRowCheck(column, 1, 0)
    ttbRowCheck(column, 2, 0)
    bttRowCheck(column, 6, 0)
    bttRowCheck(column, 6, 1)
    bttRowCheck(column, 6, 2)
    bttRowCheck(column, 5, 0)
    bttRowCheck(column, 4, 0)
    bttRowCheck(column, 3, 0)
  })

  let isVertical

  const verticalFunction = () => board.map(column => {
    column.map((item, index) => {
        if (
            slicer(column, index)
        ) return isVertical = true
    })
  })

  let isHorizontal

  const checkHorizontal = (column, incrementColumn, incrementRow) => {
      const checkItems = []
      column.map((item, i) => {
          checkItems.push(board[incrementColumn+i][incrementRow])
          if ((checkItems.length >= 4) && slicer(checkItems, i)){
              return isHorizontal = true
          }
      })
  }

  const horizontalFunction = () => board.map((column, index) => {
    console.log(column)
    checkHorizontal(column, 0, index)
  })

  horizontalFunction()
  diagonalFunction()
  verticalFunction()
  if ((isVertical || isHorizontal || isDiagonal) === true)
    return playerSymbol

    console.log('board after finish', board)
}


export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Column)
    .every(symbol => symbol !== null)
