import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ErrorClass, ErrorProps, ErrorState } from "./error"

interface MoveProps {
  value: number
}

interface NextPlayerProps extends ErrorProps {
    symbol: string
}

class NextPlayerIndicator extends ErrorClass<NextPlayerProps, ErrorState> {
  render() {
    if (this.state.hasError) {
      return (
        <p>Error rendering {'<NextPlayerIndicator>'}</p>
      )
    }

    return (
      <div>
        <p>Next Player: {this.props.symbol}</p>
      </div>
    )
  }
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
      <li>
        <button onClick={this.handleClick}>
          {"Go to move #" + this.props.value.toString()}
        </button>
      </li>
    )
  }
}

interface MoveHistoryProps extends ErrorProps {
  numberOfMoves: number
}

// List of buttons, one for each move
class MoveHistory extends ErrorClass<MoveHistoryProps, ErrorState> {

  constructor(props: MoveHistoryProps) {
    super(props)
    this.state = { hasError: false } as ErrorState
  }

  render() {
    if (this.state.hasError) {
      return <p>Error rendering {'<MoveHistory>'} component</p>
    }

    const movesArray: JSX.Element[] = []
    for (let s: number = 0; s < this.props.numberOfMoves; s++) {
      movesArray.push(<Move value={s} />)
    }

    return (
      <ol>
        {movesArray}
      </ol>
    )
  }
}

interface GameStatusProps extends ErrorProps {
  symbol: string
  numberOfMoves: number
}

export class GameStatus extends ErrorClass<GameStatusProps, ErrorState> {
  constructor(props: GameStatusProps) {
    super(props)
    this.state = { hasError: false } as ErrorState
  }

  render() {

    //let moveHistory: MoveHistory = new MoveHistory({ numberOfMoves: this.props.numberOfMoves })
    
    if (this.state.hasError) {
      return (
        <div>
          <p>Error rendering {'<GameStatus>'} component</p>
        </div>
      )
    }

    return (
      <div>
        <NextPlayerIndicator symbol={this.props.symbol}/>
        <MoveHistory numberOfMoves={this.props.numberOfMoves}/>
      </div>
    )
  }
}

export default NextPlayerIndicator;
