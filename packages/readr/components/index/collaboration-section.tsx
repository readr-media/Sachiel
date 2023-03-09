// 協作專區

import styled from 'styled-components'

import SectionHeading from '~/components/shared/section-heading'

import { sectionMargin } from './share-styles'

const Container = styled.section`
  ${sectionMargin}
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
    </Container>
  )
}
