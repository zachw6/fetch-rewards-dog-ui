import Dog from './Dog'
import { useDogs } from '../hooks/useDogs'
import { Grid2 as Grid, Typography } from '@mui/material'

interface DogListProps {
  ids: string[]
  emptyMessage: string
}

function DogList(props: DogListProps) {
  const queryDogs = useDogs(props.ids)
  const dogs = queryDogs.data?.map(dog => <Dog key={dog.id} dog={dog} />) ?? []
  const emptyMessage = <Typography>{props.emptyMessage}</Typography>
  return (
    <Grid container spacing={2} sx={{width: '100%'}}>
      {dogs.length > 0 ? dogs : emptyMessage}
    </Grid>
  )
}

export default DogList
