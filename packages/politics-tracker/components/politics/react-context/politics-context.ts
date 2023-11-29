import { createContext } from 'react'

import type { ElectionData, Politic, PoliticAmount } from '~/types/politics'

const ElectionDataContext = createContext<ElectionData | null>(null)
const PoliticAmountContext = createContext<{
  amount: PoliticAmount
  // this is type definition
  // eslint-disable-next-line
  setAmount: (amount: PoliticAmount) => void
}>({
  amount: {
    waiting: 0,
    completed: 0,
  },
  setAmount: () => {},
})
const PoliticListContext = createContext<{
  politicList: Politic[]
  // this is type definition
  // eslint-disable-next-line
  addToList: (politic: Politic) => void
}>({
  politicList: [],
  addToList: () => {},
})

export { ElectionDataContext, PoliticAmountContext, PoliticListContext }
