import { useRouter } from 'next/router'
import styled from 'styled-components'
import Sources from './sources'
import SectionTitle from './section-title'
import SectionContent from './section-content'
import ProgressBar from './progressbar'
// @ts-ignore: no definition
import Feedback from '@readr-media/react-feedback'
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

/**
 * @param {Object} props
 * @param {import('../../types/politics-detail').PoliticDetail} props.politicData
 * @returns {React.ReactElement}
 */
export default function Section({ politicData }) {
  const router = useRouter()
  const config = useConfig()

  const FeedbackFormProps = {
    forms: [
      {
        id: config.formId,
        name: '',
        type: '',
        active: true,
        fieldsCount: 1,
        fields: [
          {
            id: config.fieldId,
            name: '你覺得這個政見如何？',
            status: '',
            sortOrder: null,
            type: 'single',
            thumbUpLabel: '清楚',
            thumbDownLabel: '模糊',
            identifier: `politics-tracker${router.asPath}`,
          },
        ],
      },
    ],
    shouldUseRecaptcha: false,
    theme: 'politics-tracker',
    storageKey: 'politics-tracker-user-id',
  }

  return (
    <SectionContainer>
      <div>
        <SectionTitle politicData={politicData}></SectionTitle>
        {politicData.person.votes_obtained_number !== '' && (
          <ProgressBar politicData={politicData}></ProgressBar>
        )}
        <SectionContent politicData={politicData}></SectionContent>
        <Sources></Sources>
        <FeedbackFormContainer>
          <Feedback {...FeedbackFormProps} />
        </FeedbackFormContainer>
      </div>
    </SectionContainer>
  )
}
