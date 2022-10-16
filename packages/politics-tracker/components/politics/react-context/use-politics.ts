import { useContext } from 'react'
import {
  PersonElectionIdContext,
  PoliticAmountContext,
} from './politics-context'

export const usePersonElectionId = () => useContext(PersonElectionIdContext)
export const usePoliticAmount = () => useContext(PoliticAmountContext)
