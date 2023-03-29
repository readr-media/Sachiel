// under construction

import { SubscribeButton } from '@readr-media/react-component'
import SharedImage from '@readr-media/react-image'
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'
import styled from 'styled-components'

import client from '~/apollo-client'
import LayoutGeneral from '~/components/layout/layout-general'
import Content from '~/components/post/post-content'
import Report from '~/components/post/report'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import { post } from '~/graphql/query/post'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import type { NextPageWithLayout } from '~/pages/_app'

const HeroImage = styled.figure`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 24px;

  //style for <SharedImage /> ( @readr-media/react-image )
  .readr-media-react-image {
    max-height: 480px;
  }

  figcaption {
    font-size: 14px;
    line-height: 21px;
    color: rgba(0, 9, 40, 0.5);
    padding: 0 20px;
    margin: 8px 0 0;

    ${({ theme }) => theme.breakpoint.md} {
      /* display: block; */
      width: 568px;
      padding: 0;
      margin: 12px auto 0;
    }

    ${({ theme }) => theme.breakpoint.xl} {
      width: 960px;
    }
  }

  ${({ theme }) => theme.breakpoint.lg} {
    margin: 30px auto 60px;
  }
`

const Subscribe = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04295e;
  padding: 0 20px;
`

interface PostProps {
  postData: PostDetail
  latestPosts: Post[]
}

const Post: NextPageWithLayout<PostProps> = ({ postData, latestPosts }) => {
  return (
    <>
      <article>
        <HeroImage>
          <SharedImage
            images={postData?.heroImage?.resized}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            alt={postData?.title}
            priority={false}
          />
          <figcaption>{postData?.heroCaption}</figcaption>
        </HeroImage>

        <Content postData={postData} />
      </article>
      <Subscribe>
        <SubscribeButton />
      </Subscribe>
      <Report relatedPosts={postData?.relatedPosts} latestPosts={latestPosts} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  query,
}) => {
  let postData, latestPosts

  //get `postData` by id
  try {
    const { postId } = query
    const { data, errors: gqlErrors } = await client.query({
      query: post,
      variables: { id: postId },
    })

    if (gqlErrors) {
      const annotatingError = errors.helpers.wrap(
        'GraphQLError',
        'failed to complete `postData`',
        { errors: gqlErrors }
      )

      throw annotatingError
    }

    postData = data.post ?? []
  } catch (err) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return { notFound: true }
  }

  //get `latestPosts`
  try {
    const { data, errors: gqlErrors } = await client.query<{
      latestPosts: Post[]
    }>({
      query: latestPostsQuery,
      variables: {
        first: 4,
      },
    })

    if (gqlErrors) {
      const annotatingError = errors.helpers.wrap(
        'GraphQLError',
        'failed to complete `latestPosts`',
        { errors: gqlErrors }
      )

      throw annotatingError
    }
    latestPosts = data.latestPosts ?? []
  } catch (err) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return { notFound: true }
  }

  return {
    props: {
      postData: postData ?? [],
      latestPosts: latestPosts ?? [],
    },
  }
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Post
