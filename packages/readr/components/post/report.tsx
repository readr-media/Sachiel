import { RelatedReport } from '@readr-media/react-component'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { SITE_URL } from '~/constants/environment-variables'
import type { Post } from '~/graphql/fragments/post'
import type { RelatedPost } from '~/graphql/query/post'

const Wrapper = styled.div`
  width: 100%;
  background-color: #ebf02c;
  padding: 48px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 0;
  }
`
interface Props {
  relatedPosts?: RelatedPost[]
  latestPosts?: Post[]
}

export default function Report({
  relatedPosts,
  latestPosts,
}: Props): JSX.Element {
  const [protocol, setProtocol] = useState('http:')

  useEffect(() => {
    setProtocol(window.location.protocol)
  }, [])

  function addLinkToPosts(posts: RelatedPost[]) {
    const dataWithLink = posts?.map((post: RelatedPost) => ({
      ...post,
      link: `${protocol}//${SITE_URL}/post/${post.id}`,
    }))
    return dataWithLink
  }

  return (
    <>
      <Wrapper>
        {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
          <RelatedReport relatedData={addLinkToPosts(relatedPosts)} />
        )}
        {Array.isArray(latestPosts) && latestPosts.length > 0 && (
          <RelatedReport relatedData={addLinkToPosts(latestPosts)} />
        )}
      </Wrapper>
    </>
  )
}
