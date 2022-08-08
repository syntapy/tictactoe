import { NUM_ROWS_COLS, SquareContainer } from './grid'

export default class GameState {
  squares: Array<SquareContainer>
  argsquares: [number, number][] = []
  symbols: [string, string] = ['X', 'O']
  turn: number = -1

  private static _instance: GameState

  private constructor() {
    if (GameState._instance) {
      throw new Error("Error: GameState is a singleton class")
    }
    this.squares = new Array(Math.pow(NUM_ROWS_COLS, 2)).fill({component: null, info: {value: ""}})
    GameState._instance = this
  }

  static getInstance(): GameState {
    if (!GameState._instance) {
      new GameState()
    }
    return GameState._instance
  }

  pushSymbol(): string {
    this.turn = (this.turn + 1) % 2
    return this.symbols[this.turn]
  }

  pushSquare(row: number, col: number): string {
    if (row < 0 || col < 0 || row > NUM_ROWS_COLS-1 || col > NUM_ROWS_COLS-1) {
      throw("Invalid row or column")
    }
    let symbol: string = this.pushSymbol()
    this.argsquares.push([row, col])
    this.squares[NUM_ROWS_COLS*row + col].info.value = symbol

    return symbol
  }

  popSquare() {
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

  isArgWinner(val: string): boolean {
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
