import type {
  DraftPolitic,
  DraftPoliticForModification,
} from '~/components/politics/politic-form'
import type { ElectionData, ElectionDataForPerson } from '~/types/politics'

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

export {
  checkIsPartyPage,
  isDraftPoliticForModification,
  isElectionDataForPerson,
}
