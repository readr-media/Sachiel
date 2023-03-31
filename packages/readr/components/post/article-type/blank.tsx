import { Readr } from '@mirrormedia/lilith-draft-renderer'
import styled from 'styled-components'

import Footer from '~/components/layout/footer'
import type { PostDetail } from '~/graphql/query/post'

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
interface BlankProps {
  postData: PostDetail
}

export default function Blank({ postData }: BlankProps): JSX.Element {
  const { DraftRenderer } = Readr

  //remove blocks[0] to avoid extra empty blank before embedded-code
  const contentWithoutEmptyBlank = {
    blocks: postData?.content.blocks.slice(1),
    entityMap: postData?.content.entityMap,
  }

  return (
    <BlankWrapper>
      <DraftRenderer rawContentBlock={contentWithoutEmptyBlank} />
      <Footer />
    </BlankWrapper>
  )
}
