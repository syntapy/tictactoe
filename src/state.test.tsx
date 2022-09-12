import GameState from './state';

test('test initial conditions', () => {
  let gameState: GameState = new GameState()
  let turn: number = gameState.getTurn()
  expect(turn).toBe(gameState.INITIAL_TURN)
})

test('test push square', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  let turn: number = gameState.getTurn()
  expect(turn).toBe(1)
})

test('test first nextSymbol', () => {
  let gameState: GameState = new GameState()
  let nextSymbol: string = gameState.getNextSymbol()
  expect(nextSymbol).toBe('X')
})

test('test push square 2', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  gameState.pushSquare(1, 1)
  let turn: number = gameState.getTurn()
  expect(turn).toBe(2)
})

test('test get symbol', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  let symbol: string = gameState.argGetSymbol(0, 0)
  expect(symbol).toBe('X')
})

test('test get symbol 2', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  gameState.pushSquare(1, 1)
  let symbol: string = gameState.argGetSymbol(1, 1)
  expect(symbol).toBe('O')
})

test('test get argGetSymbol empty', () => {
  let gameState: GameState = new GameState()
  let symbol: string = gameState.argGetSymbol(0, 0)
  expect(symbol).toBe('')
})

test('test argGetTurn', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  let turn: number = gameState.argGetTurn(0, 0)
  expect(turn).toBe(1)
})

test('test argGetTurn 2', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  gameState.pushSquare(1, 1)
  let turn: number = gameState.argGetTurn(1, 1)
  expect(turn).toBe(2)
})

test('test argGetDisplayedSymbol', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  let symbol: string = gameState.argGetDisplayedSymbol(0, 0)
  expect(symbol).toBe('X')
})

test('test argGetDisplayedSymbol 2', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0)
  gameState.pushSquare(1, 1)
  let symbol: string = gameState.argGetDisplayedSymbol(1, 1)
  expect(symbol).toBe('O')
})

test('test argGetDisplayedSymbol & argGetSymbol -> revert back several times', () => {
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0) // 1
  gameState.pushSquare(1, 1) // 2
  gameState.pushSquare(2, 1) // 3
  gameState.pushSquare(1, 2) // 4
  gameState.pushSquare(2, 2) // 5
  gameState.setTurn(1)

  let symbol: string = gameState.argGetDisplayedSymbol(1, 2)
  expect(symbol).toBe('')

  symbol = gameState.argGetSymbol(1, 2)
  expect(symbol).toBe('O')

  symbol = gameState.argGetDisplayedSymbol(0, 0)
  expect(symbol).toBe('X')

  symbol = gameState.argGetDisplayedSymbol(1, 1)
  expect(symbol).toBe('')

  symbol = gameState.argGetSymbol(1, 1)
  expect(symbol).toBe('O')
})

test('test gameState no winner', () => {
  // X X O
  // X O O
  // O X X
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0) // X
  gameState.pushSquare(1, 0) // O
  gameState.pushSquare(2, 1) // X
  gameState.pushSquare(1, 2) // O
  gameState.pushSquare(2, 2) // X
  gameState.pushSquare(0, 2) // O
  gameState.pushSquare(0, 1) // X
  gameState.pushSquare(2, 0) // O
  console.log(gameState.gridToString())
  let xIsWinner: boolean = gameState.isWinner('X')
  expect(xIsWinner).toBe(false)
  let oIsWinner: boolean = gameState.isWinner('O')
  expect(oIsWinner).toBe(false)
})

test('test gameState X winner', () => {
  // X X X
  // O O
  //
  let gameState: GameState = new GameState()
  gameState.pushSquare(0, 0) // X
  gameState.pushSquare(1, 1) // O
  gameState.pushSquare(0, 1) // X
  gameState.pushSquare(1, 0) // O
  gameState.pushSquare(0, 2) // X
  console.log(gameState.gridToString())
  let xIsWinner: boolean = gameState.isWinner('X')
  expect(xIsWinner).toBe(true)
  let oIsWinner: boolean = gameState.isWinner('O')
  expect(oIsWinner).toBe(false)
})
