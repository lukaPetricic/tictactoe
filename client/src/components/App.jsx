import React, { useState } from 'react';
import Board from './Board.jsx';

function App() {
  const emptyBoard = Array.from(Array(3), () => ([0, 0, 0]))
  const [wins, setWins] = useState(0)
  const [board, setBoard] = useState(emptyBoard);
  const [mySign, setMySign] = useState('')
  const [myTurn, setMyTurn] = useState(false);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board board={emptyBoard} setBoard={setBoard} />
    </>
  )
}

export default App;