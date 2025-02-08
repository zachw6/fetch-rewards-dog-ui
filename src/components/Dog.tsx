import { Favorite } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid2 as Grid, IconButton, Typography } from '@mui/material'
import { useFavorites } from '../hooks/useFavorites'

interface DogProps {
  dog: Dog,
}

const MATCHED_COLOR = 'error'

const UNMATCHED_COLOR = 'disabled'

/**
 * React Component which displays the details of a dog and allows
 * it to be favorited or unfavorited.
 * 
 * @param dog The dog to display the information for 
 * @returns A React Component which displays a dog's details
 */
function Dog({ dog }: DogProps) {
  const { favorites: matches, toggleFavorite: toggleMatch } = useFavorites()

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
      <Card elevation={1} sx={{ border: '1px solid #101218' }}>
        <CardMedia
          image={dog.img}
          title="Dog Picture"
          sx={{height: '20rem'}}
        />
        <CardHeader title={dog.name} subheader={`${dog.breed} - ${dog.age} Years Old`} />
        <CardContent>
          <Typography>Zip Code: {dog.zip_code}</Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => { toggleMatch(dog.id) }}><Favorite color={matches.includes(dog.id) ? MATCHED_COLOR : UNMATCHED_COLOR} /></IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Dog
