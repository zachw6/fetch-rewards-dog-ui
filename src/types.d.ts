interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

interface Coordinates {
  lat: number;
  lon: number;
}

type SortableFields = 'breed' | 'name' | 'age'

type SortDirection = 'asc' | 'desc'

type ValidSort = `${SortableFields}:${SortDirection}`

type DogSearchParameters = {
  breeds: string[],
  ageMin: number,
  ageMax: number,
  zipCodes: number[],
  size: number,
  from: number,
  sort: ValidSort,
}
