import styled from 'styled-components'

import ProgressBar from '~/components/politics-detail/progressbar'
import SectionContent from '~/components/politics-detail/section-content'
import SectionTitle from '~/components/politics-detail/section-title'
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
  politicData: PoliticDetail
  electionTerm: PersonElectionTerm
  shouldShowFeedbackForm: boolean
}
export default function Section({
  politicData,
  electionTerm,
  shouldShowFeedbackForm = false,
}: SectionProps): JSX.Element {
  //get election Date (YYYY-MM-DD)
  let electionDate =
    politicData?.person?.election?.election_year_year +
    '-' +
    politicData?.person?.election?.election_year_month +
    '-' +
    politicData?.person?.election?.election_year_day

  // get current Date (YYYY-MM-DD)
  let currentTime = new Date()
  let day = currentTime.getDate()
  let month = currentTime.getMonth() + 1
  let year = currentTime.getFullYear()
  let currentDate = `${year}-${month}-${day}`

  // compare "election Date" & "current Date"
  const electionFinishedOrNot = +new Date(electionDate) < +new Date(currentDate)

  return (
    <SectionContainer>
      <div>
        <SectionTitle politicData={politicData} electionTerm={electionTerm} />
        {electionFinishedOrNot && <ProgressBar politicData={politicData} />}
        <SectionContent politicData={politicData} />
        {shouldShowFeedbackForm && (
          <SectionFeedbackForm politicId={politicData?.id} />
        )}
      </div>
    </SectionContainer>
  )
}
