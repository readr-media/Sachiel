// 協作專區

import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import SectionHeading from '~/components/shared/section-heading'
import { CollaborationItem } from '~/types/component'

import CollaborationHighlight from './collaboration-highlight'
import CollaborationList from './collaboration-list'
import CollaborationQuoteSlider from './collaboration-quote-slider'
import CollaborationStatus from './collaboration-status'
import { sectionMargin, sectionStyle } from './share-styles'

const Container = styled.section`
  ${sectionStyle}
  ${sectionMargin}

  // 調整 <SectionHeading />
  .section-heading {
    margin: 0 0 20px;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 0 0 40px;
    }
  }
`

const HighlightPart = styled.div`
  margin-bottom: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 24px;
  }
`

type CollaborationSectionProps = {
  quotes: Parameters<typeof CollaborationQuoteSlider>[0]['quotes']
  items: CollaborationItem[]
}

export default function CollaborationSection(
  // eslint-disable-next-line no-unused-vars
  { quotes, items }: CollaborationSectionProps
): JSX.Element {
  const sectionTitle = '協作專區'
  const spreadsheetId = '1vEuoCAAXR8NMoh6qiOnj6kNdLv0lc-CaInLnWUuvySo'
  const [peopleCount, setPeopleCount] = useState(0)
  const [peopleNames, setPeopleNames] = useState('')
  const shouldShowStatus = peopleCount > 0

  async function loadCollaboratorCount() {
    try {
      const response =
        (await axios.get('/api/google-sheets', {
          params: {
            spreadsheetId,
            range: '名稱列表!F1',
          },
        })) || {}

      setPeopleCount(() => Number(response.data?.values?.[0]?.[0]))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  async function loadCollaboratorNames() {
    if (peopleNames) return

    const endRow = peopleCount + 1
    const fetchAmount = 80
    const beginRow = endRow - fetchAmount + 1
    try {
      const response = await axios.get('/api/google-sheets', {
        params: {
          spreadsheetId,
          range: `名稱列表!B${beginRow}:B${endRow}`,
          majorDimension: 'COLUMNS',
        },
      })

      setPeopleNames(() => response.data.values[0].join(' '))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  useEffect(() => {
    loadCollaboratorCount()
  }, [])

  return (
    <Container aria-label={sectionTitle}>
      <SectionHeading
        title={sectionTitle}
        highlightColor="#ebf02c"
        headingLevel={2}
      />
      <HighlightPart>
        <CollaborationHighlight />
        {/* <CollaborationQuoteSlider /> is replaced by <CollaborationHighlight />, but we still keep it for further usage. */}
        {/* <CollaborationQuoteSlider quotes={quotes} /> */}
      </HighlightPart>
      {shouldShowStatus && (
        <CollaborationStatus
          count={peopleCount}
          names={peopleNames}
          loadNames={loadCollaboratorNames}
        />
      )}
      <CollaborationList items={items} />
    </Container>
  )
}
