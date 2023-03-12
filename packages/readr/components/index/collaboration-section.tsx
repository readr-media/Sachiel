// 協作專區

import styled from 'styled-components'

import SectionHeading from '~/components/shared/section-heading'

import CollaborationHighlight from './collaboration-highlight'
import CollaborationQuoteSlider from './collaboration-quote-slider'
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
}

export default function CollaborationSection(
  // eslint-disable-next-line no-unused-vars
  { quotes }: CollaborationSectionProps
): JSX.Element {
  const sectionTitle = '協作專區'

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
    </Container>
  )
}
