import { useContext } from "react"
import { FetchContext } from "../contexts/FetchProvider"

type UseMatchesValues = {
  favorites: string[],
  toggleFavorite: (id: string) => void
}

/**
 * Exposes the favorites from the Fetch Context to the user. This will allow for
 * favorites to be accessed in any component that is under the FetchProvider.
 * 
 * @returns The current favorites and methods add or remove a favorite.
 */
export function useFavorites(): UseMatchesValues {
  const fetchContext = useContext(FetchContext)
  if (fetchContext === null) {
    throw new Error("useMatches must be used within a FetchProvider")
  }
  
  function toggleFavorite(toggledId: string) {
    if (!fetchContext!.favorites.includes(toggledId)) {
      fetchContext!.setFavorites(prev => Array.from(new Set([...prev, toggledId])))
      return
    }
    fetchContext!.setFavorites(prev => prev.filter(id => id !== toggledId ))
  }

  return {
    toggleFavorite,
    favorites: fetchContext.favorites
  }
}