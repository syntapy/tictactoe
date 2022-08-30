import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ErrorClass, ErrorProps, ErrorState } from "./error"

interface MoveProps {
  value: number
}

class Move extends React.Component<MoveProps, {}> {

  constructor(props: MoveProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(this.props.value)
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {"Go to move #" + this.props.value.toString()}
      </button>
    )
  }
}

interface NextPlayerProps {
    symbol: string
}

class NextPlayerIndicator extends React.Component<NextPlayerProps, {}> {
  render() {
    return (
      <div>
        <p>Next Player: {this.props.symbol}</p>
      </div>
    )
  }
}

interface MoveHistoryProps {
  numberOfMoves: number
}

// List of buttons, one for each move
class MoveHistory extends React.Component<MoveHistoryProps, {}> {

  constructor(props: MoveHistoryProps) {
    super(props)
  }

  render() {
    const movesArray: JSX.Element[] = []
    for (let s: number = 0; s <= this.props.numberOfMoves; s++) {
      movesArray.push(<Move value={s} />)
    }
    return (
      <ol>
        {movesArray}
      </ol>
    )
  }
}

interface GameStatusProps extends ErrorProps{
  symbol: string
  numberOfMoves: number
}

export class GameStatus extends ErrorClass<GameStatusProps, ErrorState> {
  render() {

    if (this.state.hasError) {
      return (
        <div>
          <p>Error rendering {'<GameStatus>'} component</p>
        </div>
      )
    }
    let moveHistory: MoveHistory = new MoveHistory({ numberOfMoves: this.props.numberOfMoves})
    
    return (
      <div>
        <NextPlayerIndicator symbol={this.props.symbol}/>
        <>{moveHistory}</>
      </div>
    )
  }
}

export default NextPlayerIndicator;
