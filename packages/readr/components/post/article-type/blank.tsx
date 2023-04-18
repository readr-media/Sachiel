import styled from 'styled-components'

import Footer from '~/components/layout/footer'
import LeadingEmbeddedCode from '~/components/post/leadingEmbeddedCode'
import type { PostDetail } from '~/graphql/query/post'
import useScrollToEnd from '~/hooks/useScrollToEnd'
import * as gtag from '~/utils/gtag'

const BlankWrapper = styled.article`
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.articleType};

  //modify the style of <Footer />.
  .layout-footer {
    background: #ffffff;
  }
`

const HiddenAnchor = styled.div`
  display: block;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
`
interface BlankProps {
  postData: PostDetail
}

export default function Blank({ postData }: BlankProps): JSX.Element {
  const anchorRef = useScrollToEnd(() =>
    gtag.sendEvent('post', 'scroll', 'scroll to end')
  )

  return (
    <BlankWrapper>
      {postData?.leadingEmbeddedCode && (
        <LeadingEmbeddedCode embeddedCode={postData?.leadingEmbeddedCode} />
      )}
      <Footer />
      <HiddenAnchor ref={anchorRef} />
    </BlankWrapper>
  )
}
