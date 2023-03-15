import { RelatedReport } from '@readr-media/react-component'
import styled from 'styled-components'

import { SITE_URL } from '~/constants/environment-variables'
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
  relatedData?: RelatedPost[]
}

export default function PostContent({ relatedData }: Props): JSX.Element {
  const dataWithLink = relatedData?.map((item) => ({
    ...item,
    link: `http://${SITE_URL}/post/${item.id}`,
  }))

  return (
    <>
      {Array.isArray(relatedData) && relatedData.length && (
        <Wrapper>
          <RelatedReport relatedData={dataWithLink} />
        </Wrapper>
      )}
    </>
  )
}
