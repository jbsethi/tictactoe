import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useEffect, useState } from 'react'

import { PLAYERS, INITIAL_SPOTS, checkIfWinnerFound } from './utils'

const TicTacToe = () => {
  const [currentTurn, setCurrentTurn] = useState(1)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameDrawn, setGameDrawn] = useState(false)
  const [player, setPlayer] = useState(PLAYERS.X)
  const [spots, setSpots] = useState([...Array(INITIAL_SPOTS)])
  const [history, setHistory] = useState([])

  const selectSpot = (idx) => {
    if (!!spots[idx]) return
    let gameEnded = false

    setCurrentTurn(previousTurn => previousTurn+1)

    setSpots(currentSpots => {
      currentSpots[idx] = player

      gameEnded = checkIfWinnerFound(currentSpots)

      if (gameEnded) {
        setGameEnded(true)
      } else if (currentTurn === INITIAL_SPOTS) {
        setGameDrawn(true)
        setGameEnded(true)
      } else {
        setPlayer(player === PLAYERS.X ? PLAYERS.O : PLAYERS.X)
      }
      return currentSpots
    })
  }

  const resetGame = () => {
    setSpots([...Array(INITIAL_SPOTS)])
    setPlayer(PLAYERS.X)
    setGameEnded(false)
    setGameDrawn(false)
    setCurrentTurn(1)
  }

  useEffect(() => {
    if (gameEnded) {
      setHistory(oldHistoru => {
        return oldHistoru.concat([gameDrawn ? 'Draw' : player])
      })
    }
  }, [gameEnded, player, currentTurn, gameDrawn])

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
        {
          gameDrawn ?
            ('Game is Draw') :
          gameEnded ?
            (`Player ${player} Won`):
            (`Player Turn : ${player}`)
        }
        </div>
        <div>
          <Button onClick={resetGame}>Reset</Button>
        </div>
      </Box>
      <Box sx={{
        width: '50%',
        margin: '20px auto',
        '@media (max-width:780px)': {
          width: '90%'
        }
      }}>
        <Grid container>
        {
          spots.map((playerSpot, idx) => {
            return (
              <Grid item xs={4} key={idx} onClick={() => selectSpot(idx)} style={{
                border: '1px solid #000',
                height: 0,
                paddingBottom: '33.33%',
                position: 'relative',
              }}>
                <Box sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  background: playerSpot ? '#E04DB0' : 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '40px',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}>
                  {playerSpot}
                </Box>
              </Grid>
            )
          })
        }
      </Grid>
      </Box>

      {
        history.length > 0 && (
          <div>
            <Box sx={{ marginTop: '10px' }}>
              <Typography variant="h6">
                Player wins :
              </Typography>

              <Typography>
                Player {PLAYERS.X} won : {history.reduce((acc, player) => {
                  if (player === PLAYERS.X) acc++

                  return acc
                }, 0)}
              </Typography>
              <Typography>
                Player {PLAYERS.O} won : {history.reduce((acc, player) => {
                  if (player === PLAYERS.O) acc++

                  return acc
                }, 0)}
              </Typography>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <Typography variant="h6">
                Game History: 
              </Typography>

              <List>
                {
                  history.map((historyItem, i) => {
                    return (
                      <ListItem key={historyItem + i}>
                        <ListItemText>
                          {
                            historyItem === 'Draw' ? 
                              `Game no ${ i + 1 } was a draw`:
                              `Player ${historyItem} Won Game no ${ i + 1 }`
                          }
                        </ListItemText>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Box>
          </div>
        )
      }
    </Box>
  )
}

export default TicTacToe