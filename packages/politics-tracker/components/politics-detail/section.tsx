import FeedbackForm from '@readr-media/react-feedback'
import type {
  Form,
  SingleField,
  TextField,
} from '@readr-media/react-feedback/dist/typedef'
import styled from 'styled-components'

import ProgressBar from '~/components/politics-detail/progressbar'
import SectionContent from '~/components/politics-detail/section-content'
import SectionTitle from '~/components/politics-detail/section-title'
import { EMOTION_FIELD_OPTIONS } from '~/constants/politics'
import type { PersonElectionTerm, PoliticDetail } from '~/types/politics-detail'

import { useConfig } from '../react-context/use-global'

const SectionContainer = styled.div`
  padding: 40px 15px;
  > div {
    border: 4px solid #000000;
    background: #ffffff;
    max-width: 688px;
    margin: auto;
  }
`

const FeedbackFormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
  box-shadow: inset 0px 4px 0px #000000;
  > form {
    display: inline-block;
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

  const config = useConfig()
  const fieldIdentifier = `politic-${politicData.id}`

  const emojiField: SingleField = {
    id: config?.emoji.fieldId ?? '',
    name: '這段讓你覺得...',
    type: 'single',
    identifier: fieldIdentifier,
    selectedItem: undefined,
    options: EMOTION_FIELD_OPTIONS,
  }

  const inputField: TextField = {
    id: config?.text.fieldId ?? '',
    name: '',
    type: 'text',
    identifier: fieldIdentifier,
    commentListTitle: '網友回饋',
    shouldShowItemControl: false,
  }

  const feedBackFormSetting: Form[] = [
    {
      id: config?.emoji.formId ?? '',
      name: 'feedback',
      fields: [emojiField, inputField],
    },
  ]

  return (
    <SectionContainer>
      <div>
        <SectionTitle
          politicData={politicData}
          personOrganization={personOrganization}
        />
        {electionFinishedOrNot && <ProgressBar politicData={politicData} />}
        <SectionContent politicData={politicData} />
        <FeedbackFormContainer>
          <FeedbackForm
            shouldUseRecaptcha={true}
            forms={feedBackFormSetting}
            storageKey="politic-tracker-user-id"
          />
        </FeedbackFormContainer>
      </div>
    </SectionContainer>
  )
}
