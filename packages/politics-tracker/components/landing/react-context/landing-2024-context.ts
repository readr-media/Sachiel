import { createContext } from 'react'

import type { CategoryOfJson, PresidentFactCheckJson } from '~/types/landing'

//Provider
const FactCheckPresident = createContext<{
  categories: CategoryOfJson[]
  updatedJSON: PresidentFactCheckJson[]
  // this is type definition
  // eslint-disable-next-line
  setUpdatesJSON: (politics: PresidentFactCheckJson[]) => void
}>({
  categories: [],
  updatedJSON: [],
  setUpdatesJSON: () => {},
})

export { FactCheckPresident }
