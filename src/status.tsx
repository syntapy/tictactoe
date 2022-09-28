import * as React from 'react'
import TicTacToe from './tictactoe'
import GameState from './state'
import { ErrorClass, ErrorProps, ErrorState } from "./error"

interface NextPlayerProps extends ErrorProps {
  className: string
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
      <div className={this.props.className}>
        <p>Next Player: {this.props.symbol}</p>
      </div>
    )
  }
}

interface MoveProps {
  value: number
  gameState: GameState
  rootBoard: TicTacToe
}

class Move extends React.Component<MoveProps, {}> {

  constructor(props: MoveProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.props.gameState.setTurn(this.props.value)
    this.props.rootBoard.forceUpdate()
  }

  render() {
    return (
        <button onClick={this.handleClick}>
          {"Go to move #" + this.props.value.toString()}
        </button>
    )
  }
}

interface MoveHistoryProps extends ErrorProps {
  gameState: GameState
  rootBoard: TicTacToe
  className?: string
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
    for (let s: number = 1; s <= this.props.gameState.getLenTurnInfo(); s++) {
      movesArray.push(<li><Move value={s} gameState={this.props.gameState} rootBoard={this.props.rootBoard}/></li>)
    }

    return (
      <div className={this.props.className}>
        <ol>{movesArray}</ol>
      </div>
    )
  }
}

interface WinnerIndicatorProps extends ErrorProps {
  gameState: GameState
  className: string
}

class WinnerIndicator extends ErrorClass<WinnerIndicatorProps, ErrorState> {
  render() {
    if (this.state.hasError) {
      return (
        <p>Error rendering {'<WinnerIndicator>'}</p>
      )
    }

    let winnerString: string = ""
    if (this.props.gameState.isWinner('X')) {
      winnerString = "Winner is X"
    } else if (this.props.gameState.isWinner('O')) {
      winnerString = "Winner is O"
    }

    return (
      <div className={this.props.className}>
        <p>{winnerString}</p>
      </div>
    )
  }
}

interface GameStatusProps extends ErrorProps {
  symbol: string
  gameState: GameState
  rootBoard: TicTacToe
}

export class GameStatus extends ErrorClass<GameStatusProps, ErrorState> {
  constructor(props: GameStatusProps) {
    super(props)
    this.state = { hasError: false } as ErrorState
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Error rendering {'<GameStatus>'} component</p>
        </div>
      )
    }

    const flexItem: string = "flex-none mx-2"

    return (
      <div>
        <div className="flex">
          <NextPlayerIndicator className={flexItem} symbol={this.props.symbol}/>
          <WinnerIndicator className={flexItem} gameState={this.props.gameState}/>
        </div>
        <MoveHistory className={flexItem} rootBoard={this.props.rootBoard} gameState={this.props.gameState}/>
      </div>
    )
  }
}

export default NextPlayerIndicator;
