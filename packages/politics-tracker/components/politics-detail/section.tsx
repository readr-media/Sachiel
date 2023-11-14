import styled from 'styled-components'

import ProgressBar from '~/components/politics-detail/progressbar'
import SectionContent from '~/components/politics-detail/section-content'
import SectionTitle from '~/components/politics-detail/section-title'
import { useIsPartyPage } from '~/components/react-context/use-check-party-page'
import type { LegislatorAtLarge } from '~/types/politics'
import type { PersonElectionTerm, PoliticDetail } from '~/types/politics-detail'

import SectionFeedbackForm from './section-feeedback-form'

const SectionContainer = styled.div`
  padding: 40px 15px;
  > div {
    border: 4px solid ${({ theme }) => theme.borderColor.black};
    background: ${({ theme }) => theme.backgroundColor.white};
    max-width: 688px;
    margin: auto;
  }
`

type SectionProps = {
  politic: PoliticDetail
  electionTerm: PersonElectionTerm
  shouldShowFeedbackForm: boolean
  legislators?: LegislatorAtLarge[]
}
export default function Section({
  politic,
  electionTerm,
  shouldShowFeedbackForm = false,
  legislators = [],
}: SectionProps): JSX.Element {
  const { isPartyPage } = useIsPartyPage()
  const { organization, person } = politic

  //get election Date (YYYY-MM-DD)
  let electionDate: string = ''

  if (isPartyPage) {
    electionDate =
      organization?.elections?.election_year_year +
      '-' +
      organization?.elections?.election_year_month +
      '-' +
      organization?.elections?.election_year_day
  } else {
    electionDate =
      person?.election?.election_year_year +
      '-' +
      person?.election?.election_year_month +
      '-' +
      person?.election?.election_year_day
  }

  // get current Date (YYYY-MM-DD)
  let currentTime = new Date()
  let day = currentTime.getDate()
  let month = currentTime.getMonth() + 1
  let year = currentTime.getFullYear()
  let currentDate = `${year}-${month}-${day}`

  // compare "election Date" & "current Date"
  const isElectionFinished = +new Date(electionDate) < +new Date(currentDate)

  return (
    <SectionContainer>
      <div>
        <SectionTitle politic={politic} electionTerm={electionTerm} />
        {isElectionFinished && <ProgressBar politic={politic} />}
        <SectionContent
          politic={politic}
          legislators={legislators}
          isElectionFinished={isElectionFinished}
        />
        {shouldShowFeedbackForm && (
          <SectionFeedbackForm politicId={politic?.id} />
        )}
      </div>
    </SectionContainer>
  )
}
