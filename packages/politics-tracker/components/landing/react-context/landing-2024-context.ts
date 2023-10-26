import { createContext } from 'react'

import type { PoliticCategory } from '~/types/politics-detail'

//Provider
const FactCheckPresident = createContext<{
  categories: PoliticCategory[]
  updatedJSON: any
  // this is type definition
  // eslint-disable-next-line
  setUpdatesJSON: (politics: any) => void
}>({
  categories: [],
  updatedJSON: [],
  setUpdatesJSON: () => {},
})

export { FactCheckPresident }
