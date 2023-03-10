// 協作專區

import styled from 'styled-components'

import SectionHeading from '~/components/shared/section-heading'

import CollaborationHighlight from './collaboration-highlight'
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

export default function CollaborationSection(): JSX.Element {
  const sectionTitle = '協作專區'

  return (
    <Container aria-label={sectionTitle}>
      <SectionHeading
        title={sectionTitle}
        highlightColor="#ebf02c"
        headingLevel={2}
      />
      <CollaborationHighlight />
    </Container>
  )
}
