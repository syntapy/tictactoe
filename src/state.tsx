import { NUM_ROWS_COLS } from './grid'

interface TurnInfo {
  row: number
  col: number
}

export default class GameState {
  turnInfo: Array<TurnInfo>
  squares: Array<number>

  INITIAL_TURN: number = 0
  turn: number = this.INITIAL_TURN

  constructor() {
    this.squares = new Array(Math.pow(NUM_ROWS_COLS, 2)).fill(this.INITIAL_TURN)
    this.turnInfo = []
  }

  getSquares(): Array<number> {
    return this.squares
  }

  getSymbol(turn: number): string {
    if (turn > this.INITIAL_TURN) {
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
      throw new Error("Invalid row or col")
    }
    let turn: number = this.getTurn()
    for (turn = this.getTurn(); turn < this.turnInfo.length; turn++) {
      let i: number = this.turnInfo[turn].row
      let j: number = this.turnInfo[turn].col
      this.argResetTurn(i, j)
    }
    this.turnInfo.length = this.getTurn()
    this.turnInfo.push({row: row, col: col})
    this.setTurn(this.turnInfo.length)
    this.argSetTurn(row, col, this.getTurn())
  }

  argGetTurn(row: number, col: number): number {
    return this.squares[row*NUM_ROWS_COLS + col]
  }

  argSetTurn(row: number, col: number, turn: number): void {
    this.squares[row*NUM_ROWS_COLS + col] = turn
  }

  argResetTurn(row: number, col: number): void {
    this.squares[row*NUM_ROWS_COLS + col] = this.INITIAL_TURN
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
          break
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
          break
        }
      }

      if (winner) {
        return true
      }
    }

    // Check diagonal for winner
    winner = true
    for (row = 0; row < NUM_ROWS_COLS; row++) {
      col = row
      if (this.argGetSymbol(row, col) !== symbol) {
        winner = false
      }
    }

    if (winner) {
      return true
    }

    // Check diagonal for winner
    winner = true
    for (row = NUM_ROWS_COLS-1; row >= 0; row--) {
      col = NUM_ROWS_COLS - row - 1
      if (this.argGetSymbol(row, col) !== symbol) {
        winner = false
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
    if (turn === this.INITIAL_TURN || turn >= this.getTurn()) {
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

  gridToString(): string {
    let row: number
    let col: number
    let grid: string = ""
    for (row = 0; row < NUM_ROWS_COLS; row++) {
      let line: string = ""
      for (col = 0; col < NUM_ROWS_COLS; col++) {
        let symbol: string = this.argGetSymbol(row, col)
        if (symbol === "") {
          symbol = " "
        }
        line += symbol + " "
      }
      grid += line + "\n"
    }

    return grid
  }
}
