export const INITIAL_SPOTS = 9

export const WINING_COMBINATIONS = [
  [0, 1, 2], // Horizantal lines
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6], // Vertical Lines
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal Lines
  [2, 4, 6]
]

export const PLAYERS = {
  X: 'x',
  O: 'o'
}

export const checkIfWinnerFound = (spots) => {
  return WINING_COMBINATIONS.find(combination => {
    const [pointA, pointB, pointC] = combination

    if (!!spots[pointA] && spots[pointA] === spots[pointB] && spots[pointB] === spots[pointC]) {
      return true
    }

    return false
  })
}