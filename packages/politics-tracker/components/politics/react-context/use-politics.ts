import { useContext } from 'react'

import {
  ElectionDataContext,
  PoliticAmountContext,
  PoliticListContext,
} from './politics-context'

export const useElectionData = () => useContext(ElectionDataContext)
export const usePoliticAmount = () => useContext(PoliticAmountContext)
export const usePoliticList = () => useContext(PoliticListContext)
