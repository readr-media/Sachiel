import dayjs from 'dayjs'
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
  let currentDate = `${currentTime.getFullYear()}-${
    currentTime.getMonth() + 1
  }-${currentTime.getDate()}`

  function compareDates(dateStr1: string, dateStr2: string) {
    const date1 = dayjs(dateStr1)
    const date2 = dayjs(dateStr2)

    return Boolean(date1.isBefore(date2))
  }

  // compare "election Date" & "current Date"
  const isElectionFinished = compareDates(electionDate, currentDate)

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
