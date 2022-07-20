import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

class GameState {
  squares: Array<SquareContainer>
  argsquares: [number, number][] = []
  symbols: [string, string] = ['X', 'O']
  turn: number = -1

  constructor() {
    this.squares = new Array(9).fill({component: null, info: {value: ""}})
  }

  pushSymbol(): string {
    this.turn = (this.turn + 1) % 2
    return this.symbols[this.turn]
  }

  pushSquare(row: number, col: number): string {
    let symbol: string = this.pushSymbol()
    this.argsquares.push([row, col])
    this.squares[row*3 + col].info.value = symbol

    return symbol
  }

  popSquare() {
    let tuple: [number, number] | undefined = this.argsquares.pop()
    if (tuple) {
      let row: number = tuple[0]
      let col: number = tuple[1]
      if (row < 0 || col < 0 || row > 2 || col > 2) {
        throw new Error("Invalid square")
      }
      this.squares[row * 3 + col].info.value = ""
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        row = i
        col = j
        if (this.squares[row * 3 + col].info.value === val) {
          count_horiz++
        }

        row = j
        col = i
        if (this.squares[row * 3 + col].info.value === val) {
          count_vert++
        }
      }
    }

    // Check diagonals
    for (let i = 0; i < 3; i++) {
      row = i
      col = i
      if (this.squares[row * 3 + col].info.value === val) {
        count_diag_left++
      }

      row = 2 - i
      if (this.squares[row * 3 + col].info.value === val) {
        count_diag_right++
      }
    }

    if (count_horiz === 3 || count_vert === 3 || count_diag_left === 3 || count_diag_right === 3) {
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
}

interface BoardState {
  gameState: GameState
  squares: Array<SquareContainer>
}

interface SquareContainer {
  component: Square
  info: {value: string}
}

class Square extends React.Component<SquareProps, any> {

  square_key: number

  constructor(props: SquareProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {children: "", gameState: props.gameState}
    this.square_key = props.row * 3 + props.col

    this.setState(this.state)
  }

  handleClick(e: any) {
    let symbol: string = this.state.gameState.pushSquare(this.props.row, this.props.col)
    let state: any = this.state
    state.children = symbol
    this.setState(state)
    console.log("Square " + this.square_key + " clicked")
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
      squares: new Array(9).fill({component: null, info: {value: ""}}),
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const b: boolean = (row === 2)
        const r: boolean = (col === 2)
        const square: SquareContainer = {
          component: new Square({
            top: true, left: true, bottom: b, right: r, row: row, col: col,
            gameState: state.gameState, parent: this
          }),
          info: {value: ""},
        }
        state.squares[row*3 + col] = square
      }
    }

    this.setState(state)
  }

  clickSquare(row: number, col: number, val: any) {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      throw new Error("Invalid row or column")
    }
    this.state.squares[row*3 + col] = val
    this.setState(this.state)
  }

  render() {
    return (
      <div className="w-1/5 aspect-square border-black border-x-0 border-y-0 grid grid-cols-3">
        {this.state.squares.map((squareinfo: SquareContainer, index: number) => { 
          return squareinfo.component.render() 
        })}
      </div>
    );
  }
}

export default Board;
