import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

interface SquareProps {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
  key: number
  children?: string
}

class Square extends React.Component<SquareProps, any> {

  constructor(props: SquareProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: any) {
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
    if (this.props.children) {
      value = this.props.children
    }

    return (
      <div onClick={this.handleClick} className={className}>{value}</div>
    )
  }
}

interface SquareContainer {
  component: Square,
  info: {value: string}
}

interface BoardState {
  squares: Array<SquareContainer>,
}

export class Board extends React.Component<any, BoardState> {

  constructor(props: any) {
    super(props)
    this.state={
      squares: (new Array(9)).fill({component: null, info: {value: ""}}),
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const b: boolean = (row === 2)
        const r: boolean = (col === 2)
        const square: SquareContainer = {
          component: new Square({
            top: true, bottom: b, left: true, right: r, key: row*3 + col, children: ""
          }),
          info: {value: ""},
        }
        this.state.squares[row*3 + col] = square
      }
    }
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
