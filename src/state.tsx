import { NUM_ROWS_COLS, SquareContainer } from './grid'
import { Square } from './grid'

export default class GameState {
  squares: Array<SquareContainer>
  argsquares: [number, number][] = []
  symbol: string = 'X'
  turn: number = -1

  public constructor() {
    this.squares = new Array(Math.pow(NUM_ROWS_COLS, 2)).fill({component: null, info: {value: ""}})
    this.turn = 0
  }

  public getSquares(): SquareContainer[] {
    return this.squares
  }

  public swapSymbol() {
    this.symbol = this.getNextSymbol()
  }

  public getCurrentSymbol(): string {
    return this.symbol
  }

  public getNextSymbol(): string {
    if (this.symbol === 'X') {
      return 'O'
    } else {
      return 'X'
    }
  }

  public pushSquare(row: number, col: number): void {
    if (row < 0 || col < 0 || row > NUM_ROWS_COLS-1 || col > NUM_ROWS_COLS-1) {
      throw("Invalid row or column")
    }
    this.argsquares.push([row, col])
    let symbol: string = this.getCurrentSymbol()
    this.squares[NUM_ROWS_COLS*row + col].info.value = symbol
    this.swapSymbol()
    this.turn++
  }

  getTurn(): number {
    return this.turn
  }

  setTurn(turn: number): void {
    this.turn = turn
  }

  public popSquare() {
    let tuple: [number, number] | undefined = this.argsquares.pop()
    if (tuple) {
      let row: number = tuple[0]
      let col: number = tuple[1]
      if (row < 0 || col < 0 || row > NUM_ROWS_COLS-1 || col > NUM_ROWS_COLS-1) {
        throw new Error("Invalid square")
      }
      this.squares[NUM_ROWS_COLS*row + col].info.value = ""
    } else {
      throw new Error("No square to pop")
    }
  }

  public isArgWinner(val: string): boolean {
    let count_horiz: number = 0
    let count_vert: number = 0
    let count_diag_left: number = 0
    let count_diag_right: number = 0

    let row: number, col: number

    // Check horizontal and vertical
    for (let i = 0; i < NUM_ROWS_COLS; i++) {
      for (let j = 0; j < NUM_ROWS_COLS; j++) {
        row = i
        col = j
        if (this.squares[row * NUM_ROWS_COLS + col].info.value === val) {
          count_horiz++
        }

        row = j
        col = i
        if (this.squares[row * NUM_ROWS_COLS + col].info.value === val) {
          count_vert++
        }
      }
    }

    // Check diagonals
    for (let i = 0; i < NUM_ROWS_COLS; i++) {
      row = i
      col = i
      if (this.squares[row*NUM_ROWS_COLS + col].info.value === val) {
        count_diag_left++
      }

      row = NUM_ROWS_COLS-1 - i
      if (this.squares[row*NUM_ROWS_COLS + col].info.value === val) {
        count_diag_right++
      }
    }

    if (count_horiz === NUM_ROWS_COLS || count_vert === NUM_ROWS_COLS || count_diag_left === NUM_ROWS_COLS || count_diag_right === NUM_ROWS_COLS) {
      return true
    }

    return false
  }
}
