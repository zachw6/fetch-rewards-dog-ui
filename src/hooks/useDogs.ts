import { useQuery } from "@tanstack/react-query";
import { axiosFetchClient } from "../App";
import { QUERY_KEY } from "../const";

async function fetchDogs(ids: string[]) {
  const response = await axiosFetchClient.post<Dog[]>('/dogs', ids)
  if (!response.data) {
    throw new Error("There was an error fetching the list of dogs.")
  }

  return response.data
}

export function useDogs(ids: string[]) {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_DOGS_BY_IDS, ids],
    queryFn: () => fetchDogs(ids)
  })
}