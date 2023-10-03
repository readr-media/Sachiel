import { useContext } from 'react'

import {
  PersonElectionContext,
  PoliticAmountContext,
  PoliticListContext,
} from './politics-context'

export const usePersonElection = () => useContext(PersonElectionContext)
export const usePoliticAmount = () => useContext(PoliticAmountContext)
export const usePoliticList = () => useContext(PoliticListContext)
