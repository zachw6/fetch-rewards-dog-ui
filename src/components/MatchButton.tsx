import { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import { Button } from '@mui/material'
import MatchDialog from './MatchDialog'

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
