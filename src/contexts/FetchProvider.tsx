import React, { useState } from "react";
import Login from "../Login";
import { axiosFetchClient } from "../App";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../const";
import { z } from "zod";

export type LoginInfo = {
  name: string;
  email: string;
}

export type FetchContextType = {
  loginInfo: LoginInfo | null,
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfo | null>>,
  favorites: string[],
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export const FetchContext = React.createContext<FetchContextType | null>(null)

/**
 * React Provider requiring the user to login before accessing the rest of the application.
 * 
 * Stores important information including the user's information and which dogs the user has favorited.
 * 
 * Will automatically refresh the user's login token after 3000 seconds to ensure they do not get logged out. 
 * 
 * @returns A React Provider that will force the user to login before accessing the rest of the application.
 * Additionally, this stores information such as the dogs the user has favorited.
 */
export const FetchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null)

  const [favorites, setFavorites] = useState<string[]>([])

  const login = useQuery({
    queryKey: [QUERY_KEY.LOGIN],
    queryFn: () => axiosFetchClient.post('/auth/login', { name: loginInfo?.name, email: loginInfo?.email }),
    enabled: (loginInfo?.name.length ?? 0) > 0 && z.string().email().safeParse(loginInfo?.email).success,
    staleTime: 3000
  })
  
  return (
    <FetchContext.Provider value={{ loginInfo, setLoginInfo, favorites, setFavorites }}>
      { loginInfo !== null && login.isSuccess ? children : <Login onSubmit={(name, email) => { setLoginInfo({ name, email }) }} /> }
    </FetchContext.Provider>
  )
}
