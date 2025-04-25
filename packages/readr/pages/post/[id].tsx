import errors from '@twreporter/errors'
import axios from 'axios'
import type { RawDraftContentBlock } from 'draft-js'
import type { GetServerSideProps } from 'next'

import { getGqlClient } from '~/apollo-client'
import CustomHead from '~/components/layout/custom-head'
import Blank from '~/components/post/article-type/blank'
import Frame from '~/components/post/article-type/frame'
import News from '~/components/post/article-type/news'
import ScrollableVideo from '~/components/post/article-type/scrollable-video'
import MisoPageView from '~/components/shared/miso-pageview'
import { SITE_TITLE } from '~/constants/constant'
import { LATEST_POSTS_URL, SITE_URL } from '~/constants/environment-variables'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import { post as postQuery } from '~/graphql/query/post'
import type { NextPageWithLayout } from '~/pages/_app'
import { ResizedImages, ValidPostStyle } from '~/types/common'
import { setCacheControl } from '~/utils/common'

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
        text && text.length > 160
          ? text.trim().slice(0, 160) + '...'
          : text.trim()
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

  const ogTitle = postData?.title
    ? `${postData?.title} - ${SITE_TITLE}`
    : SITE_TITLE

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
      />
      <MisoPageView productIds={postData.id} />
      {articleType}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params,
  res,
}) => {
  setCacheControl(res)

  const client = getGqlClient()
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

      const postStyle = data.posts[0].style
      const postSlug = data.posts[0].slug

      if (postStyle === ValidPostStyle.EMBEDDED) {
        return { notFound: true }
      }

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
      const response = await axios.get<{ posts: Post[] }>(LATEST_POSTS_URL)
      latestPosts =
        response.data?.posts.filter((post) => post.id !== postId).slice(0, 4) ??
        []
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while fetching data at Post page'
    )

    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(annotatingError, {
          withStack: false,
          withPayload: true,
        }),
      })
    )

    throw new Error('Error occurs while fetching data.')
  }

  return {
    props: {
      postData: postData,
      latestPosts: latestPosts,
    },
  }
}

export default Post
