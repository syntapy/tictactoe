import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import NextPlayer from './status'
import GameState from './state'

export const NUM_ROWS_COLS: number = 3

if (NUM_ROWS_COLS > 12) {
  throw new Error('Too many rows/columns')
} else if (NUM_ROWS_COLS < 3) {
  throw new Error('Too few rows/columns')
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

class Square extends React.Component<SquareProps, SquareState> {

  constructor(props: SquareProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {children: ""}
  }

  componentDidMount() {
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
    let parentClass: string = "aspect-square border-black flex flex-col justify-center"

    if (this.props.top) {
      parentClass += " border-t-2" 
    }

    if (this.props.left) {
      parentClass += " border-l-2"
    }

    if (this.props.bottom) {
      parentClass += " border-b-2"
    }

    if (this.props.right) {
      parentClass += " border-r-2"
    }

    let value: string = ""
    if (this.state.children) {
      value = this.state.children
    }

    let childClass: string = "font-sans font-thin text-center text-7xl"

    return (
      <div onClick={this.handleClick} className={parentClass}>
        <div className={childClass}>{value}</div>
      </div>
    )
  }
}

export interface SquareContainer {
  component: Square
  info: {value: string}
}

interface BoardState {
  gameState: GameState
  squares: Array<SquareContainer>
}

export class Board extends React.Component<{}, BoardState> {

  constructor(props: {}) {
    super(props)
    const gameState: GameState = GameState.getInstance()
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
  }

  componentDidMount() {
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
