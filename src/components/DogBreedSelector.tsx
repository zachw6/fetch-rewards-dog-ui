import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../const'
import { axiosFetchClient } from '../App'
import { Autocomplete, Skeleton, TextField } from '@mui/material'

async function fetchDogBreeds() {
  const response = await axiosFetchClient.get<string[]>('/dogs/breeds')
  if (!response.data) {
    throw new Error("An error occurred when attempting to fetch the dog breeds.")
  }
  return response.data
}

interface DogBreedSelectorProps {
  breed: string[]
  onSelect: (breed: string[]) => void
}

/**
 * Input for selecting dog breeds. This list is dynamically generated based on the
 * response from Fetch's /dogs/breeds endpoint.
 * 
 * @param props Object which contains the currently selected breeds and a function for updating them.
 * @returns A multi-select input for selecting dog breeds
 */
function DogBreedSelector(props: DogBreedSelectorProps) {
  const queryDogBreeds = useQuery({
    queryKey: [QUERY_KEY.DOG_BREEDS],
    queryFn: fetchDogBreeds
  })

  if (!queryDogBreeds.data) {
    return <Skeleton variant='rectangular' width={200} height={40} />
  }

  return (
    <Autocomplete
      size="small"
      multiple
      value={props.breed}
      options={queryDogBreeds.data}
      renderInput={(params) => <TextField {...params} label="Breed" helperText="Select one or more breeds to filter on." />}
      onChange={(_, value) => {
        props.onSelect(value)
      }}
    />
  )
}

export default DogBreedSelector