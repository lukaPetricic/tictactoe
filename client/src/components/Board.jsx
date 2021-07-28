import React, { useState } from 'react';

function Board({ board, setBoard }) {
  return (
    <table>
      <tbody>
        {board.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((field, i) => <td key={i}>{field ? field : ''}</td>)}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Board;