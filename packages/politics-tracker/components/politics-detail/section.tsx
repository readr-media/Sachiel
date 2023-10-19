import styled from 'styled-components'

import ProgressBar from '~/components/politics-detail/progressbar'
import SectionContent from '~/components/politics-detail/section-content'
import SectionTitle from '~/components/politics-detail/section-title'
import type { PersonElectionTerm, PoliticDetail } from '~/types/politics-detail'

import SectionFeedbackForm from './section-feeedback-form'

const SectionContainer = styled.div`
  padding: 40px 15px;
  > div {
    border: 4px solid #000000;
    background: #ffffff;
    max-width: 688px;
    margin: auto;
  }
`

type SectionProps = {
  politicData: PoliticDetail
  personOrganization: PersonElectionTerm
}
export default function Section({
  politicData,
  personOrganization,
}: SectionProps): JSX.Element {
  //judge the politic's election is finished or unfinished
  //if finished: show progress-bar; if unfinished: hidden progress-bar

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
        <SectionTitle
          politicData={politicData}
          personOrganization={personOrganization}
        />
        {electionFinishedOrNot && <ProgressBar politicData={politicData} />}
        <SectionContent politicData={politicData} />
        <SectionFeedbackForm politicId={politicData?.id} />
      </div>
    </SectionContainer>
  )
}
