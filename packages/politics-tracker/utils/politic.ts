import { ElectionData } from '~/types/politics'

function checkIsPartyPage(electionData: ElectionData | null) {
  return Boolean(
    electionData && 'isPartyPage' in electionData && electionData.isPartyPage
  )
}

export { checkIsPartyPage }
