import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

interface top {
  top: any,
}

interface bottom {
  bottom: any,
}

interface left {
  left: any,
}

interface right {
  right: any,
}

interface haschildren {
  children?: string
}

export class Square extends React.Component<haschildren & (top | bottom | left | right)> {

  constructor(props: any) {
    super(props)
  }

  render() {
    let className: string = "aspect-square border-black p-0 m-0 font-sans text-center width-full height-full "

    if (this.props.hasOwnProperty("top")) {
      className += "border-t-2 " 
    }

    if (this.props.hasOwnProperty("bottom")) {
      className += "border-b-2 "
    }

    if (this.props.hasOwnProperty("left")) {
      className += "border-l-2 "
    }

    if (this.props.hasOwnProperty("right")) {
      className += "border-r-2 "
    }

    let value: string = ""
    if (this.props.children) {
      value = this.props.children
    }

    return (
      <div className={className}>{value}</div>
    )
  }
}

export class Board extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    this.state={
      squares: Array(9).fill(null)
    }
  }

  clickSquare(row: number, col: number, val: string) {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      throw new Error("Invalid row or column")
    }
    this.state.squares[row*3 + col] = val
    this.setState(this.state)
  }

  render() {
    return (
      <div className="w-1/5 aspect-square border-black border-x-0 border-y-0 grid grid-cols-3">
        <Square top left>X</Square>
        <Square top left>O</Square>
        <Square top left right>X</Square>

        <Square top left>O</Square>
        <Square top left>X</Square>
        <Square top left right>O</Square>

        <Square top left bottom>X</Square>
        <Square top left bottom>O</Square>
        <Square top left right bottom>X</Square>
      </div>
    );
  }
}

export default Board;
