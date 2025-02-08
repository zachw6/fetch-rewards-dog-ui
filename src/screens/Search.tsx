import { useEffect, useState } from 'react'
import Box from '@mui/material/Box/Box'
import { Grid2 as Grid, Pagination, Typography } from '@mui/material'
import { MAX_DOG_AGE, QUERY_KEY } from '../const'
import { axiosFetchClient } from '../App'
import { useQuery } from '@tanstack/react-query'
import DogList from '../components/DogList'
import SearchParameters from '../components/SearchParameters'
import FavoritesButton from '../components/FavoritesButton'
import MatchButton from '../components/MatchButton'

const DEFAULT_PAGE_SIZE = 25

async function searchDogs(searchParameters: DogSearchParameters) {
  const response = await axiosFetchClient.get<{
    next: string,
    resultIds: string[],
    total: number
  }>('/dogs/search', {
    params: {
      breeds: searchParameters.breeds.length > 0 ? searchParameters.breeds : undefined,
      zipCodes: searchParameters.zipCodes.length > 0 ? searchParameters.zipCodes : undefined,
      ageMin: searchParameters.ageMin !== 0 ? searchParameters.ageMin : undefined,
      ageMax: searchParameters.ageMax !== MAX_DOG_AGE ? searchParameters.ageMax : undefined,
      from: searchParameters.from,
      size: searchParameters.size,
      sort: searchParameters.sort
    }
  })
  if (!response.data) {
    // TODO: Better error messaging
    throw new Error("An error occurred when searching for dogs.")
  }
  return response.data
}

function Search() {
  const [searchParameters, setSearchParameters] = useState<DogSearchParameters>({
    ageMin: 0,
    ageMax: MAX_DOG_AGE,
    breeds: [],
    zipCodes: [],
    from: 0,
    size: DEFAULT_PAGE_SIZE,
    sort: 'breed:asc'
  })
  const page = Math.floor((searchParameters.from / searchParameters.size) + 1)
  
  const queryDogs = useQuery({
    queryKey: [QUERY_KEY.SEARCH_DOGS, searchParameters],
    queryFn: () => searchDogs(searchParameters),
    staleTime: Infinity
  })

  useEffect(() => {
    // When filters change, we need to reset our page.
    if (searchParameters.from !== 0) {
      setSearchParameters(prev => ({ ...prev, from: 0 }))
    }
  }, [searchParameters.ageMin, searchParameters.ageMax, searchParameters.breeds, searchParameters.zipCodes, searchParameters.size])

  return (
    <Box className='search-screen'>
      <Grid container spacing={2}>
        <Grid size={12}>
          <SearchParameters parameters={searchParameters} onChange={(params) => setSearchParameters(params)} />
        </Grid>
        <Grid size={12} container spacing={2}>
          <Grid>
            <MatchButton />
          </Grid>
          <Grid>
            <FavoritesButton />
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography variant='h2' sx={{ fontSize: '2rem', fontWeight: 600, mb: '1rem' }}>{queryDogs.data?.total ?? 0} Fluffy Friends Match Your Search!</Typography>
          <DogList ids={queryDogs.data?.resultIds ?? []} emptyMessage='Unfortunately, no fluffy friends matched the search parameters. Try removing or changing your filter values to find more dogs.' />
        </Grid>
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={Math.floor(((queryDogs.data?.total ?? 0) / searchParameters.size))} page={page} onChange={(_, page) => { setSearchParameters(prev => ({ ...prev, from: (page - 1) * searchParameters.size })) }} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Search