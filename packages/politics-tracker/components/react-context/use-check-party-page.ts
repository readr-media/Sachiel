import { createContext } from 'react'
import { useContext } from 'react'

//Provider
const CheckPartyPage = createContext<{
  isPartyPage: boolean
}>({
  isPartyPage: false,
})

export { CheckPartyPage }

//useContext
export const useIsPartyPage = () => useContext(CheckPartyPage)
