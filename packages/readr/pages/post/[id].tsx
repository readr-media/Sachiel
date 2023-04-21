import errors from '@twreporter/errors'
import type { RawDraftContentBlock } from 'draft-js'
import type { GetServerSideProps } from 'next'

import client from '~/apollo-client'
import CustomHead from '~/components/layout/custom-head'
import Blank from '~/components/post/article-type/blank'
import Frame from '~/components/post/article-type/frame'
import News from '~/components/post/article-type/news'
import ScrollableVideo from '~/components/post/article-type/scrollable-video'
import { SITE_URL } from '~/constants/environment-variables'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import { post as postQuery } from '~/graphql/query/post'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import type { NextPageWithLayout } from '~/pages/_app'
import { ResizedImages, ValidPostStyle } from '~/types/common'

type PageProps = {
  postData: PostDetail
  latestPosts: Post[]
}

const Post: NextPageWithLayout<PageProps> = ({ postData, latestPosts }) => {
  let articleType: JSX.Element

  switch (postData.style) {
    case ValidPostStyle.NEWS:
    case ValidPostStyle.EMBEDDED:
      articleType = <News postData={postData} latestPosts={latestPosts} />
      break
    case ValidPostStyle.SCROLLABLE_VIDEO:
      articleType = (
        <ScrollableVideo postData={postData} latestPosts={latestPosts} />
      )
      break
    case ValidPostStyle.BLANK:
      articleType = <Blank postData={postData} />
      break
    case ValidPostStyle.FRAME:
      articleType = <Frame postData={postData} latestPosts={latestPosts} />
      break
    default:
      articleType = <News postData={postData} latestPosts={latestPosts} />
      break
  }

  // head info
  function convertDraftToText(blocks: RawDraftContentBlock[]) {
    if (blocks) {
      const text = blocks.map((block) => block.text).join('')
      const ogDescription =
        text && text.length > 160 ? text.slice(0, 160) + '...' : text
      return ogDescription
    }
  }

  // phase 1
  function getResizedUrl(
    resized: ResizedImages | undefined | null
  ): string | undefined {
    return resized?.original
  }

  // phase 2 - debug imageUrl onError
  // function getResizedUrl(
  //   resized: ResizedImages | undefined | null
  // ): string | undefined {
  //   return (
  //     resized?.w480 ||
  //     resized?.w800 ||
  //     resized?.w1200 ||
  //     resized?.w1600 ||
  //     resized?.w2400 ||
  //     resized?.original
  //   )
  // }

  const ogTitle = postData.title

  const ogDescription =
    postData?.ogDescription ||
    convertDraftToText(postData?.summary?.blocks) ||
    convertDraftToText(postData?.content?.blocks)

  const ogImageUrl =
    getResizedUrl(postData?.ogImage?.resized) ||
    getResizedUrl(postData?.heroImage?.resized)

  return (
    <>
      <CustomHead
        title={ogTitle}
        description={ogDescription}
        imageUrl={ogImageUrl}
      ></CustomHead>
      {articleType}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
}) => {
  let postData: PostDetail, latestPosts: Post[]

  try {
    {
      // fetch post data by id
      const postId = params?.id
      const { data, errors: gqlErrors } = await client.query<{
        posts: PostDetail[]
      }>({
        query: postQuery,
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

      if (!data.posts[0]) {
        return { notFound: true }
      }

      if (data.posts[0].style === ValidPostStyle.EMBEDDED) {
        return { notFound: true }
      }

      const postStyle = data.posts[0].style
      const postSlug = data.posts[0].slug

      if (postStyle === ValidPostStyle.REPORT) {
        return {
          redirect: {
            destination: `https://${SITE_URL}/project/${postSlug}/`,
            permanent: false,
          },
        }
      } else if (postStyle === ValidPostStyle.PROJECT3) {
        return {
          redirect: {
            destination: `https://${SITE_URL}/project/3/${postSlug}/`,
            permanent: false,
          },
        }
      }

      postData = data.posts[0]
    }

    {
      // fetch the latest 4 reports
      const postId = params?.id
      const { data, errors: gqlErrors } = await client.query<{
        latestPosts: Post[]
      }>({
        query: latestPostsQuery,
        variables: {
          first: 4,
          skipId: postId,
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
    }
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
      postData: postData,
      latestPosts: latestPosts,
    },
  }
}

export default Post
