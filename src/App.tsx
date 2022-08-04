import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

const NUM_ROWS_COLS: number = 3

if (NUM_ROWS_COLS > 12) {
  throw new Error('Too many rows/columns')
} else if (NUM_ROWS_COLS < 3) {
  throw new Error('Too few rows/columns')
}

class GameState {
  squares: Array<SquareContainer>
  argsquares: [number, number][] = []
  symbols: [string, string] = ['X', 'O']
  turn: number = -1

  constructor() {
    this.squares = new Array(Math.pow(NUM_ROWS_COLS, 2)).fill({component: null, info: {value: ""}})
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
      if (this.squares[row * NUM_ROWS_COLS + col].info.value === val) {
        count_diag_left++
      }

      row = NUM_ROWS_COLS-1 - i
      if (this.squares[row * NUM_ROWS_COLS + col].info.value === val) {
        count_diag_right++
      }
    }

    if (count_horiz === NUM_ROWS_COLS || count_vert === NUM_ROWS_COLS || count_diag_left === NUM_ROWS_COLS || count_diag_right === NUM_ROWS_COLS) {
      return true
    }

    return false
  }
}

interface SquareProps {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
  row: number
  col: number
  gameState: GameState
  parent: Board
  key: number
}

interface SquareState {
  children: string
}

interface BoardState {
  gameState: GameState
  squares: Array<SquareContainer>
}

interface SquareContainer {
  component: Square
  info: {value: string}
}

class Square extends React.Component<SquareProps, SquareState> {

  constructor(props: SquareProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {children: ""}

    this.setState(this.state)
  }

  handleClick(e: any) {
    let state: any = this.state
    if (state.children === "") {
      let symbol: string = this.props.gameState.pushSquare(this.props.row, this.props.col)
      state.children = symbol
      this.props.parent.forceUpdate()
      this.setState(state)
    }
  }

  render() {
    let className: string = "aspect-square border-black p-0 m-0 font-sans text-center width-full height-full "

    if (this.props.top) {
      className += "border-t-2 " 
    }

    if (this.props.left) {
      className += "border-l-2 "
    }

    if (this.props.bottom) {
      className += "border-b-2 "
    }

    if (this.props.right) {
      className += "border-r-2 "
    }

    let value: string = ""
    if (this.state.children) {
      value = this.state.children
    }

    return (
      <div onClick={this.handleClick} className={className}>{value}</div>
    )
  }
}

export class Board extends React.Component<{}, BoardState> {

  constructor(props: {}) {
    super(props)
    const gameState: GameState = new GameState()
    let state: BoardState = {
      gameState: gameState,
      squares: new Array(Math.pow(NUM_ROWS_COLS, 2)).fill({component: null, info: {value: ""}}),
    }

    for (let row = 0; row < NUM_ROWS_COLS; row++) {
      for (let col = 0; col < NUM_ROWS_COLS; col++) {
        const b: boolean = (row === NUM_ROWS_COLS-1)
        const r: boolean = (col === NUM_ROWS_COLS-1)
        const square: SquareContainer = {
          component: new Square({
            top: true, left: true, bottom: b, right: r, row: row, col: col,
            gameState: state.gameState, parent: this, key: NUM_ROWS_COLS*row + col,
          }),
          info: {value: ""},
        }
        state.squares[NUM_ROWS_COLS*row + col] = square
      }
    }

    this.state=state
    this.setState(this.state)
  }

  clickSquare(row: number, col: number, val: any) {
    if (row < 0 || row > NUM_ROWS_COLS-1 || col < 0 || col > NUM_ROWS_COLS-1) {
      throw new Error("Invalid row or column")
    }
    this.state.squares[NUM_ROWS_COLS*row + col] = val
    this.setState(this.state)
  }

  render() {
    let style: string = "w-1/3 aspect-square border-black border-x-0 border-y-0 grid "
    style += "grid-cols-" + NUM_ROWS_COLS
    console.log(style.toString())
    return (
      <div className={style}>
        {this.state.squares.map((squareinfo: SquareContainer, index: number) => { 
          return squareinfo.component.render() 
        })}
      </div>
    );
  }
}

export default Board;
