import { RelatedReport } from '@readr-media/react-component'
import styled from 'styled-components'

import { GenericPhoto } from '~/types/common'

const Wrapper = styled.div`
  width: 100%;
  background-color: #ebf02c;
  padding: 48px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 0;
  }
`

type RelatedPost = {
  id: string | undefined
  publishTime?: string
  name?: string
  readingTime?: number
  heroImage?: GenericPhoto | null | undefined
}

interface Props {
  data?: RelatedPost[]
}

export default function PostContent({ data }: Props): JSX.Element {
  return (
    <>
      {data?.length !== 0 && (
        <Wrapper>
          <RelatedReport relatedData={data} />
        </Wrapper>
      )}
    </>
  )
}
