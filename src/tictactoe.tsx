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
      let symbol: string = this.props.gameState.getCurrentSymbol()
      this.props.gameState.pushSquare(row, col)
      this.forceUpdate()
      return symbol
    }

    callback = callback.bind(this)

    return callback
  }

  render() {
    let nextSymbol: string = this.props.gameState.getCurrentSymbol()
    console.log(nextSymbol)
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board genClickHandler={this.genClickHandler}/>
        <GameStatus symbol={nextSymbol}/>
      </div>
    )
  }
}
