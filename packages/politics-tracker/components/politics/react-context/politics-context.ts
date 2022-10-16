import type { PoliticAmount } from '~/types/politics'
import { createContext } from 'react'

const PersonElectionIdContext = createContext<string>('')
const PoliticAmountContext = createContext<{
  amount: PoliticAmount
  setAmount: (amount: PoliticAmount) => void
}>({
  amount: {
    waiting: 0,
    completed: 0,
  },
  setAmount: () => {},
})

export { PersonElectionIdContext, PoliticAmountContext }
