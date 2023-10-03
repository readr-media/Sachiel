import { createContext } from 'react'

import type { PersonElection, Politic, PoliticAmount } from '~/types/politics'

const PersonElectionContext = createContext<Partial<PersonElection>>({})
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

export { PersonElectionContext, PoliticAmountContext, PoliticListContext }
