function areAllTheSame(arr) {
  return arr.every(el => el === arr[0] && el)
}

function isThereAWinner(board) {
  if (areAllTheSame(board[0])) return board[0][0]
  if (areAllTheSame(board[1])) return board[0][0]
  if (areAllTheSame(board[2])) return board[0][0]

  if (areAllTheSame([board[0][0], board[1][0], board[2][0]])) return board[0][0]
  if (areAllTheSame([board[0][1], board[1][1], board[2][1]])) return board[0][1]
  if (areAllTheSame([board[0][2], board[1][2], board[2][2]])) return board[0][2]

  if (areAllTheSame([board[0][0], board[1][1], board[2][2]])) return board[1][1]
  if (areAllTheSame([board[0][2], board[1][1], board[2][0]])) return board[1][1]

  return false
}

export default isThereAWinner;
