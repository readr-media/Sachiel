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
  z-index: 650;
`
interface BlankProps {
  postData: PostDetail
}

export default function Blank({ postData }: BlankProps): JSX.Element {
  const { DraftRenderer } = Readr

  //remove blocks[0] to avoid extra empty blank on top of liveblogs
  const contentWithoutBlank = {
    blocks: postData?.content.blocks.slice(1),
    entityMap: postData?.content.entityMap,
  }

  return (
    <BlankWrapper>
      <DraftRenderer rawContentBlock={contentWithoutBlank} />
      <Footer />
    </BlankWrapper>
  )
}
