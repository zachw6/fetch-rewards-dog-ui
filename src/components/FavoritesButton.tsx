import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import DogList from './DogList'
import { ArrowBack } from '@mui/icons-material'

/**
 * A button which when clicked displays a list of dogs that the user has favorited.
 * 
 * @returns A React Component that has a button and a dialog which pops up when the button is clicked showing the user all their favorited dogs.
 */
function FavoritesButton() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { favorites } = useFavorites()

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Button color='secondary' variant='contained' onClick={() => setIsDialogOpen(prev => !prev)} disabled={favorites.length === 0}>See My Favorites</Button>
      {isDialogOpen && (
        <Dialog fullScreen open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle><IconButton sx={{ mr: '1rem' }} onClick={closeDialog}><ArrowBack /></IconButton>My Favorite Dogs</DialogTitle>
          <DialogContent>
            <DogList ids={favorites} emptyMessage='You do not have any dogs selected as favorites! Try finding some dogs you love and come back here later.' />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default FavoritesButton
