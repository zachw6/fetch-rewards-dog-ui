import { useQuery } from "@tanstack/react-query";
import { axiosFetchClient } from "../App";
import { QUERY_KEY } from "../const";

/**
 * Fetches a list of dogs based on a list of their IDs.
 * 
 * @param ids List of dog IDs
 * @returns list of dogs based on their IDs
 */
async function fetchDogs(ids: string[]) {
  const response = await axiosFetchClient.post<Dog[]>('/dogs', ids)
  if (!response.data) {
    throw new Error("There was an error fetching the list of dogs.")
  }

  return response.data
}

/**
 * React Query hook used for fetching dogs based on their IDs.
 * 
 * @param ids A list of dog's IDs
 * @returns a React Query hook that is responsible for querying the dogs from their IDs
 */
export function useDogs(ids: string[]) {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_DOGS_BY_IDS, ids],
    queryFn: () => fetchDogs(ids)
  })
}