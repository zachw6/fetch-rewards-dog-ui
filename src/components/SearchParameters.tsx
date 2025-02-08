import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Grid2 as Grid, MenuItem, Slider, TextField, Typography } from '@mui/material'
import { MAX_DOG_AGE, SORTABLE_VALUES, SORT_DELIMITER, SORT_DIRECTIONS, SORT_DIRECTION_INDEX, SORT_FIELD_INDEX } from '../const'
import { isNumber } from '../util'
import DogBreedSelector from './DogBreedSelector'
import { ArrowDownward, FilterAlt } from '@mui/icons-material'

const MIN_AGE_INDEX = 0
const MAX_AGE_INDEX = 1

interface SearchParametersProps {
  parameters: DogSearchParameters,
  onChange: (params: DogSearchParameters) => void
}

function SearchParameters(props: SearchParametersProps) {
  
  return (
    <Accordion elevation={1} title='Filters' defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: '0.5rem' }}><FilterAlt /><Typography variant="h3" sx={{ fontSize: '1.5rem' }}>Filters</Typography></Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} p="1rem" >
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <DogBreedSelector breed={props.parameters.breeds} onSelect={(breeds) => { props.onChange({ ...props.parameters, breeds }) }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Autocomplete
              size="small"
              freeSolo
              multiple
              value={props.parameters.zipCodes}
              onChange={(_, value) => {
                const zipCodes = value.filter(isNumber).filter(zipCode => String(zipCode).length === 5)
                // TODO: If what they tried to enter was not a zip code (value and zipCodes are different lengths) send a toast message notifying them.
                props.onChange({
                  ...props.parameters,
                  zipCodes
                })
              }}
              options={[]} // We have 0 options because we are allowing any zip code.
              renderInput={(params) => <TextField {...params} label="Zip Codes" helperText="Type a 5-digit zipcode and press the 'Enter' key. Multiple zip codes may be entered." />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Sort By"
              value={props.parameters.sort.split(SORT_DELIMITER)[SORT_FIELD_INDEX]}
              onChange={(e) => {
                const value = e.target.value
                if (!SORTABLE_VALUES.includes(value)) return // Sanity check to confirm the value is valid
                const sort = props.parameters.sort.split(SORT_DELIMITER)
                sort[SORT_FIELD_INDEX] = value
                props.onChange({...props.parameters, sort: sort.join(SORT_DELIMITER) as ValidSort})
              }}
            >
              <MenuItem value="breed">Breed</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Sort Direction"
              value={props.parameters.sort.split(SORT_DELIMITER)[SORT_DIRECTION_INDEX]}
              onChange={(e) => {
                const value = e.target.value
                if (!SORT_DIRECTIONS.includes(value)) return // Sanity check to confirm the value is valid
                const sort = props.parameters.sort.split(SORT_DELIMITER)
                sort[SORT_DIRECTION_INDEX] = value
                props.onChange({...props.parameters, sort: sort.join(SORT_DELIMITER) as ValidSort})
              }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }} sx={{ textAlign: 'center' }}>
            <Typography>Age Range</Typography>
            <Slider
              sx={{ width: '80%' }}
              aria-label="Age Range"
              value={[props.parameters.ageMin, props.parameters.ageMax]}
              onChange={(_, value) => {
                if (!Array.isArray(value)) return
                props.onChange({
                  ...props.parameters,
                  ageMin: value[MIN_AGE_INDEX],
                  ageMax: value[MAX_AGE_INDEX]
                })
                }}
              max={MAX_DOG_AGE}
              valueLabelDisplay='auto'
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default SearchParameters