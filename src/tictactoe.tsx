import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import Board from "./grid";
import GameState from "./state";
import { GameStatus } from "./status";

interface TicTacToeProps {
  gameState: GameState
}

export default class TicTacToe extends React.Component<TicTacToeProps, {}> {
  constructor(props: TicTacToeProps) {
    super(props)
    this.genClickHandler = this.genClickHandler.bind(this)
  }

  genClickHandler(row: number, col: number): () => string {
    let callback: (this: TicTacToe) => string = function handleClick(): string {
      return this.props.gameState.pushSquare(row, col)
    }

    callback = callback.bind(this)

    return callback
  }

  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board genClickHandler={this.genClickHandler}/>
        <GameStatus />
      </div>
    )
  }
}
