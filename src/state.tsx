import { NUM_ROWS_COLS, SquareContainer } from './grid'
import { Square } from './grid'

interface TurnInfo {
  row: number
  col: number
}

export default class GameState {
  turnInfo: Array<TurnInfo> = []
  squares: Array<number>
  turn: number = 0

  constructor() {
    this.squares = new Array(Math.pow(NUM_ROWS_COLS, 2)).fill(-1)
  }

  getSquares(): Array<number> {
    return this.squares
  }

  getSymbol(turn: number): string {
    if (turn >= 0) {
      if (turn % 2 === 1) {
        return 'X'
      } else {
        return 'O'
      }
    }
    
    return ''
  }

  getCurrentSymbol(): string {
    return this.getSymbol(this.getTurn())
  }

  getNextSymbol(): string {
    let turn: number = this.getTurn()
    return this.getSymbol(turn+1)
  }

  pushSquare(row: number, col: number): void {
    if (row < 0 || col < 0 || row > NUM_ROWS_COLS-1 || col > NUM_ROWS_COLS-1) {
      throw("Invalid row or column")
    }
    let turn: number = this.getTurn()
    let symbol: string = this.getSymbol(turn)
    for (turn = this.getTurn(); turn < this.turnInfo.length; turn++) {
      let i: number = this.turnInfo[turn].row
      let j: number = this.turnInfo[turn].col
      this.argResetTurn(i, j)
    }
    this.turnInfo.length = this.getTurn()
    this.turnInfo.push({row: row, col: col})
    this.argSetTurn(row, col, this.getTurn())
    this.setTurn(this.getTurn() + 1)
  }

  argGetTurn(row: number, col: number): number {
    return this.squares[row*NUM_ROWS_COLS + col]
  }

  argSetTurn(row: number, col: number, turn: number): void {
    this.squares[row*NUM_ROWS_COLS + col] = turn
  }

  argResetTurn(row: number, col: number): void {
    this.squares[row*NUM_ROWS_COLS + col] = 0
  }

  argGetSymbol(row: number, col: number): string {
    let turn: number = this.argGetTurn(row, col)
    return this.getSymbol(turn)
  }

  argGetDisplayedSymbol(row: number, col: number): string {
    let turn: number = this.argGetTurn(row, col)
    let symbol: string = this.getSymbol(turn)
    if (turn <= this.getTurn()) {
      return symbol
    }

    return ""
  }

  isWinner(symbol: string): boolean {
    let winner: boolean

    let row: number
    let col: number

    // Check rows for winner
    for (row = 0; row < NUM_ROWS_COLS; row++) {
      winner = true
      for (col = 0; col < NUM_ROWS_COLS; col++) {
        if (this.argGetSymbol(row, col) !== symbol) {
          winner = false
        }
      }

      if (winner) {
        return true
      }
    }

    // Check cols for winner
    for (col = 0; col < NUM_ROWS_COLS; col++) {
      winner = true
      for (row = 0; row < NUM_ROWS_COLS; row++) {
        if (this.argGetSymbol(row, col) !== symbol) {
          winner = false
        }
      }

      if (winner) {
        return true
      }
    }

    // Check diagonal for winner
    winner = true
    for (row = 0; row < NUM_ROWS_COLS; row++) {
      for (col = 0; col < NUM_ROWS_COLS; col++) {
        if (this.argGetSymbol(row, col) !== symbol) {
          winner = false
        }
      }
    }

    if (winner) {
      return true
    }

    // Check diagonal for winner
    for (row = NUM_ROWS_COLS-1; row >= 0; row--) {
      for (col = 0; col < NUM_ROWS_COLS; col++) {
        if (this.argGetSymbol(row, col) !== symbol) {
          winner = false
        }
      }
    }

    if (winner) {
      return true
    }

    return false
  }

  isShown(row: number, col: number): boolean {
    let turn: number = this.argGetTurn(row, col)
    if (turn && turn < this.getTurn()) {
      return true
    }
    return false
  }

  canClick(row: number, col: number): boolean {
    let turn: number = this.argGetTurn(row, col)
    if (!turn || turn >= this.getTurn()) {
      return true
    }
    return false
  }

  getTurn(): number {
    return this.turn
  }

  setTurn(turn: number): void {
    this.turn = turn
  }
}
