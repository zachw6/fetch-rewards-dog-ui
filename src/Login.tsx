import { useState } from 'react'
import { Grid2 as Grid, TextField, Button, Typography, Box } from '@mui/material'
import { EMPTY_STRING } from './const'
import { z } from 'zod'
import DogWalking from './img/dog-walking.svg'


interface LoginProps {
  onSubmit: (name: string, email: string) => void
}

function Login(props: LoginProps) {
  const [name, setName] = useState(EMPTY_STRING)
  const [email, setEmail] = useState(EMPTY_STRING)

  const validation = {
    name: z.string().min(1).safeParse(name).success,
    email: z.string().email().safeParse(email).success
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <img style={{ maxWidth: '25dvw' }} src={DogWalking} alt="Girl walking dog" />
          <Typography variant="h1" sx={{ fontSize: '1.5rem' }}>Please login to continue finding your dream dog!</Typography>
        </Grid>
        <Grid size={12}>
          <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(e) => { setName(e.target.value) }} error={!validation.name} />
        </Grid>
        <Grid size={12}>
          <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => { setEmail(e.target.value) }} error={!validation.email} />
        </Grid>
        <Grid size={12}>
          <Button variant='contained' sx={{ width: '100%' }} disabled={Object.values(validation).some(validation => !validation)} onClick={() => { props.onSubmit(name, email) }}>Log In</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login