import { ArrowBack } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, DialogContent, LinearProgress, Box, Typography } from '@mui/material'
import { useFavorites } from '../hooks/useFavorites'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../const'
import { axiosFetchClient } from '../App'
import { useDogs } from '../hooks/useDogs'

/**
 * Fetches the dog the user has matched with based on a list of their favorite dogs IDs.
 * 
 * @param favoriteIds A list of the dogs that the user has favorited
 * @returns A single ID for a dog that the user has matched with
 */
async function fetchMatch(favoriteIds: string[]) {
  const response = await axiosFetchClient.post<{
    match: string
  }>('/dogs/match', favoriteIds)
  if (!response.data) {
    throw new Error("An error occurred when attempting to fetch the match based on the user's favorite dogs.")
  }
  return response.data
}

/**
 * A React component that shows a dialog with the dog the user has matched with.
 * 
 * @param props an object containing a function for closing the dialog.
 * @returns A Modal which shows the user the dog they have matched with.
 */
function MatchDialog(props: { closeDialog: () => void }) {
  const { favorites } = useFavorites()
  const queryMatch = useQuery({
    queryKey: [QUERY_KEY.FETCH_MATCH, favorites],
    queryFn: () => fetchMatch(favorites),
    enabled: favorites.length > 0
  })
  const dogs = useDogs(queryMatch?.data?.match !== undefined ? [queryMatch.data.match] : [])
  const matchedDog = dogs?.data?.[0]

  const matchedDogDisplay = matchedDog !== undefined ? (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Typography sx={{ fontSize: '2rem', fontWeight: 600 }}>WOOF! Your new dog, {matchedDog.name}, is waiting for you!</Typography>
      <img src={matchedDog.img} width="auto" />
    </Box>
  ) : null

  return (
    <Dialog fullScreen open={true} onClose={props.closeDialog}>
      <DialogTitle><IconButton sx={{ mr: '1rem' }} onClick={props.closeDialog}><ArrowBack /></IconButton>{matchedDog === undefined ? 'Finding Your Match!' : `You've matched with ${matchedDog.name}!`}</DialogTitle>
      <DialogContent>
        {
          queryMatch.isFetching || queryMatch.data === undefined ?
          <LinearProgress /> :
          matchedDogDisplay
        }
      </DialogContent>
    </Dialog>
  )
}

export default MatchDialog
