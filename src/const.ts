export const EMPTY_STRING = ''
export const QUERY_KEY = {
  LOGIN: 'login',
  DOG_BREEDS: 'dog-breeds',
  SEARCH_DOGS: 'search-dogs',
  FETCH_DOGS_BY_IDS: 'fetch-dogs-by-ids',
  FETCH_MATCH: 'fetch-match'
}
export const MAX_DOG_AGE = 15
export const SORT_DELIMITER = ':'
export const SORT_FIELD_INDEX = 0
export const SORT_DIRECTION_INDEX = 1
export const SORTABLE_VALUES = ['breed', 'name', 'age']
export const SORT_DIRECTIONS = ['asc', 'desc']
export const DEFAULT_PAGE_SIZE = 25
export const DEFAULT_SEARCH_PARAMETERS: DogSearchParameters = {
  ageMin: 0,
  ageMax: MAX_DOG_AGE,
  breeds: [],
  zipCodes: [],
  from: 0,
  size: DEFAULT_PAGE_SIZE,
  sort: 'breed:asc'
}