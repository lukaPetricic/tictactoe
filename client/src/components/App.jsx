import React, { useState } from 'react';
import Board from './Board.jsx';
import isThereAWinner from '../controllers/winLogic.js';
import { io } from 'socket.io-client';
const socket = io('http://192.168.86.243:4000');

function App() {
  const emptyBoard = Array.from(Array(3), () => ([0, 0, 0]));
  const [wins, setWins] = useState(0);
  const [board, setBoard] = useState(emptyBoard);
  const [mySign, setMySign] = useState('')
  const [myTurn, setMyTurn] = useState(false);
  const [partnerId, setPartnerId] = useState('');
  const [partnerLeft, setPartnerLeft] = useState(false);
  const [winner, setWinner] = useState(null)

  socket.on('connect', () => {
    socket.emit('new user', socket.id)
  })

  socket.on('partnerId', newPartnerId => {
    setPartnerId(newPartnerId)
  })

  socket.on('sign', (arg) => {
    setMySign(arg)
    arg === 'O' ? setMyTurn(true) : setMyTurn(false)
  })

  socket.on('turn', (args) => {
    const [i, j] = args
    setMyTurn(true);
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[i][j] = mySign === 'X' ? 'O' : 'X';
    setBoard(newBoard);
    setWinner(isThereAWinner(newBoard))
  })

  socket.on('partner left', () => {
    setBoard(emptyBoard);
    setMySign('');
    setMyTurn(false);
    setPartnerId('')
    setPartnerLeft(true)
  })

  function updateBoard(i, j) {
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[i][j] = mySign;
    setBoard(newBoard);
    setMyTurn(false);
    socket.emit('turn', [i, j, partnerId])
    setWinner(isThereAWinner(newBoard))
  }

  function findNewPartner() {
    setBoard(emptyBoard);
    setMySign('');
    setMyTurn(false);
    setPartnerId('')
    setWinner(false)
    socket.emit('new user', socket.id)
  };

  if (partnerId) {
    return (
      <>
        <div>
          <div>{myTurn ? 'Your turn' : 'Your opponent is playing'}</div>
          <div>You are playing as {mySign}</div>
        </div>
        <Board board={board} updateBoard={updateBoard} myTurn={myTurn} mySign={mySign} winner={winner} />
        {winner &&
          <>
            <div>{winner === mySign ? 'You have won!' : 'You lost.'}</div>
            <button onClick={findNewPartner}>Play another round</button>
          </>}
      </>
    )
  } else if (partnerLeft) {
    return (
      <>
        <div>Your opponent left</div>
        <button onClick={findNewPartner}>Play again</button>
      </>
    )
  } else {
    return (
      <div>Looking for your opponent...</div>
    )
  }
}

export default App;