import moment from 'moment'

import type {
  DraftPolitic,
  DraftPoliticForModification,
} from '~/components/politics/politic-form'
import type {
  ElectionData,
  ElectionDataForPerson,
  PersonElectionData,
} from '~/types/politics'

import { isTypeOfOneFromCouple } from './utils'

function checkIsPartyPage(electionData: ElectionData | null) {
  return Boolean(
    electionData && 'isPartyPage' in electionData && electionData.isPartyPage
  )
}

/** distinguish between ElectionDataForPerson and ElectionDataForParty */
function isElectionDataForPerson(
  data: ElectionData | null
): data is ElectionDataForPerson {
  const uniqueKeys: (keyof ElectionDataForPerson)[] = [
    'partyId',
    'incumbent',
    'mainCandidate',
    'electionTerm',
  ]

  return isTypeOfOneFromCouple<ElectionData, ElectionDataForPerson>(
    data,
    uniqueKeys
  )
}

/** distinguish between DraftPoliticForCreation and DraftPoliticForModification */
function isDraftPoliticForModification(
  data: DraftPolitic
): data is DraftPoliticForModification {
  const uniqueKeys: (keyof DraftPoliticForModification)[] = ['id']

  return isTypeOfOneFromCouple<DraftPolitic, DraftPoliticForModification>(
    data,
    uniqueKeys
  )
}

function getLastestElectionData<T extends PersonElectionData>(
  previous: T,
  current: T
): T {
  const latest = previous.election
  const election = current.election

  if (election && latest) {
    const latestTime = moment()
      .year(latest.election_year_year)
      .month(latest.election_year_month - 1)
      .date(latest.election_year_day)
      .unix()
    const currentTime = moment()
      .year(election.election_year_year)
      .month(election.election_year_month - 1)
      .date(election.election_year_day)
      .unix()
    if (currentTime > latestTime) {
      return current
    }
  } else if (election) {
    return current
  }
  return previous
}

export {
  checkIsPartyPage,
  getLastestElectionData,
  isDraftPoliticForModification,
  isElectionDataForPerson,
}
