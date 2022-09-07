import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import NextPlayer from './status'
import GameState from './state'
import TicTacToe from './tictactoe'
import { ErrorClass, ErrorProps, ErrorState } from "./error"

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
  rootBoard: TicTacToe
  gameState: GameState
  key: number
}

interface SquareState {
  children: string
  moveNumber: number
}

export class Square extends React.Component<SquareProps, SquareState> {

  constructor(props: SquareProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.isShown = this.isShown.bind(this)
    this.state = {children: "", moveNumber: -1}
  }

  componentDidMount() {
    this.setState(this.state)
  }

  handleClick(e: any) {
    if (this.state.children === "" || !this.isShown()) {
      let state: SquareState = this.state
      let row: number = this.props.row
      let col: number = this.props.col
      let symbol: string = this.props.gameState.getCurrentSymbol()
      let turn: number = this.props.gameState.getTurn()

      state.children = symbol
      this.props.gameState.pushSquare(row, col)
      this.props.gameState.setTurn(turn + 1)
      state.moveNumber = turn
      this.state = state
      this.props.rootBoard.forceUpdate()
    }
  }

  getSymbol(): string {
    return this.state.children
  }

  isShown(): boolean {
    if (this.state.moveNumber <= this.props.gameState.getTurn()) {
      return true
    }
    return false
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

    if (this.isShown()) {
      return (
        <div onClick={this.handleClick} className={parentClass}>
          <div className={childClass}>{value}</div>
        </div>
      )
    } else {
      return (
        <div onClick={this.handleClick} className={parentClass}>
          <div className={childClass}/>
        </div>
      )
    }
  }
}

export interface SquareContainer {
  component: Square
  info: {value: string}
}

interface BoardProps extends ErrorProps {
  gameState: GameState
  rootBoard: TicTacToe
}

interface BoardState extends ErrorState {
  squares: Array<SquareContainer>
}

export default class Board extends ErrorClass<BoardProps, BoardState> {

  constructor(props: BoardProps) {
    super(props)
    this.genSquares = this.genSquares.bind(this)
    this.genSquares()
  }

  clickSquare(row: number, col: number, val: any) {
    if (row < 0 || row > NUM_ROWS_COLS-1 || col < 0 || col > NUM_ROWS_COLS-1) {
      throw new Error("Invalid row or column")
    }
    this.state.squares[NUM_ROWS_COLS*row + col] = val
    this.setState(this.state)
  }

  genSquares(): void {
    let squares: SquareContainer[] = new Array(Math.pow(NUM_ROWS_COLS, 2)).fill({component: null, info: {value: ""}})

    for (let row = 0; row < NUM_ROWS_COLS; row++) {
      for (let col = 0; col < NUM_ROWS_COLS; col++) {
        const b: boolean = (row === NUM_ROWS_COLS-1)
        const r: boolean = (col === NUM_ROWS_COLS-1)
        const square: SquareContainer = {
          component: new Square({
            top: true, left: true, bottom: b, right: r, row: row, col: col,
            rootBoard: this.props.rootBoard, gameState: this.props.gameState, key: NUM_ROWS_COLS*row + col,
          }),
          info: {value: ""},
        }

        squares[NUM_ROWS_COLS*row + col] = square
      }
    }

    let state: BoardState = {squares: squares, hasError: false}
    this.state = state
  }

  componentDidMount() {
    this.setState(this.state)
  }

  render() {
    if (this.state.hasError) {
      return <p>Error rendering {'<Board>'} component</p>
    }

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
