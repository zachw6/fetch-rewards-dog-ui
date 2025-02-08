import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import { Button } from '@mui/material'
import MatchDialog from './MatchDialog'

/**
 * A button which when clicked displays the dog that the user has matched with.
 * 
 * @returns A React Component that has a button and a dialog which pops up when the button is clicked showing user the dog they have matched with.
 */
function MatchButton() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { favorites } = useFavorites()
  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <>
      <Button variant='contained' onClick={() => setIsDialogOpen(prev => !prev)} disabled={favorites.length === 0}>See My Match!</Button>
      {isDialogOpen && <MatchDialog closeDialog={closeDialog}  />}
    </>
  )
}

export default MatchButton
