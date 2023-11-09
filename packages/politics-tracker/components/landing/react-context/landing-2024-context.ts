import { createContext } from 'react'

import type { CategoryOfJson } from '~/types/landing'

//Provider
const FactCheckPresident = createContext<{
  categories: CategoryOfJson[]
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
