import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

interface MoveProps {
  text: string
  value: string
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
        {this.props.text + this.props.value}
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

interface MoveHistoryState {
  moves: Array<MoveProps>
}

// List of buttons, one for each move
class MoveHistory extends React.Component<{}, MoveHistoryState> {

  constructor(props: {}) {
    super(props)
    this.state = {
      moves: []
    }
  }

  componentDidMount() {
    this.setState(this.state)
  }

  render() {
    const movesArray: JSX.Element[] = []
    for (let s of this.state.moves) {
      movesArray.push(<Move text={s.text} value={s.value} />)
    }
    return (
      <ol>
        {movesArray}
      </ol>
    )
  }
}

export class GameStatus extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <NextPlayerIndicator symbol="X"/>
      </div>
    )
  }
}

export default NextPlayerIndicator;
