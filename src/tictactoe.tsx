import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import Board from "./grid"
import GameState from "./state"
import { GameStatus } from "./status"
import { ErrorClass, ErrorProps, ErrorState } from "./error"

interface TicTacToeProps extends ErrorProps {
  gameState: GameState
}

export default class TicTacToe extends ErrorClass<TicTacToeProps, ErrorState> {
  constructor(props: TicTacToeProps) {
    super(props)
    this.getTurn = this.getTurn.bind(this)
    this.setTurn = this.setTurn.bind(this)
    this.forceUpdate = this.forceUpdate.bind(this)
    this.render = this.render.bind(this)
  }

  getTurn(): number {
    return this.props.gameState.getTurn()
  }

  setTurn(turn: number): void {
    this.props.gameState.setTurn(turn)
  }

  forceUpdate() {
    super.forceUpdate()
  }

  render() {
    let nextSymbol: string = this.props.gameState.getNextSymbol()

    if (this.state.hasError) {
      return <h1>Error rendering {'<TicTacToe>'} component</h1>
    }

    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board rootBoard={this} gameState={this.props.gameState}/>
        <GameStatus symbol={nextSymbol} rootBoard={this} gameState={this.props.gameState}/>
      </div>
    )
  }
}
