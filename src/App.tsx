import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

const NUM_ROWS_COLS: number = 3

interface SquareProps {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
  row: number
  col: number
  parent: Board
  key: number
}

interface SquareState {
  children: string
}

interface BoardState {
  squares: Array<SquareContainer>
}

interface SquareContainer {
  component: Square
  info: {value: string}
}

class Square extends React.Component<SquareProps, SquareState> {

  constructor(props: SquareProps) {
    super(props)

    this.state = {children: ""}

    this.setState(this.state)
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
      <div className={className}>{value}</div>
    )
  }
}

export class Board extends React.Component<{}, BoardState> {

  constructor(props: {}) {
    super(props)
    let state: BoardState = {
      squares: new Array(Math.pow(NUM_ROWS_COLS, 2)).fill({component: null, info: {value: ""}}),
    }

    for (let row = 0; row < NUM_ROWS_COLS; row++) {
      for (let col = 0; col < NUM_ROWS_COLS; col++) {
        const b: boolean = (row === NUM_ROWS_COLS-1)
        const r: boolean = (col === NUM_ROWS_COLS-1)
        const square: SquareContainer = {
          component: new Square({
            top: true, left: true, bottom: b, right: r, row: row, col: col,
            parent: this, key: NUM_ROWS_COLS*row + col,
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
    let style: string = "aspect-square border-black border-x-0 border-y-0 grid "
    style += "grid-cols-" + NUM_ROWS_COLS.toString()
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
