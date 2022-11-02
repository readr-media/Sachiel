import { useContext } from 'react'
import {
  PersonElectionIdContext,
  PoliticAmountContext,
  PoliticListContext,
} from './politics-context'

export const usePersonElectionId = () => useContext(PersonElectionIdContext)
export const usePoliticAmount = () => useContext(PoliticAmountContext)
export const usePoliticList = () => useContext(PoliticListContext)
