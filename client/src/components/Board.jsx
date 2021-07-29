import React, { useState } from 'react';

function Board({ board, updateBoard, myTurn, mySign }) {
  function handleClick(i, j) {
    if (myTurn && !board[i][j]) {
      updateBoard(i, j)
    }
  }

  return (
    <table>
      <tbody>
        {board.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((field, j) => <td key={j} onClick={() => handleClick(i, j)}>{field ? field : ''}</td>)}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Board;