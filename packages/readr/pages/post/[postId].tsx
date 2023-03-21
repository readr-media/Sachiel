// under construction

import { SubscribeButton } from '@readr-media/react-component'
import CustomImage from '@readr-media/react-image'
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'
import styled from 'styled-components'

import client from '~/apollo-client'
import LayoutGeneral from '~/components/layout/layout-general'
import Content from '~/components/post/post-content'
import Report from '~/components/post/report'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { PostDetail } from '~/graphql/query/post'
import { post } from '~/graphql/query/post'
import type { NextPageWithLayout } from '~/pages/_app'

const HeroImage = styled.figure`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 24px;
  height: 50vw;
  max-height: 480px;

  img {
    margin-bottom: 8px;
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
}

const Post: NextPageWithLayout<PostProps> = ({ postData }) => {
  return (
    <>
      <article>
        <HeroImage>
          <CustomImage
            images={postData.heroImage?.resized}
            defaultImage={DEFAULT_POST_IMAGE_PATH}
            objectFit="cover"
          />
        </HeroImage>
        <Content postData={postData} />
      </article>
      <Subscribe>
        <SubscribeButton />
      </Subscribe>
      <Report relatedData={postData?.relatedPosts} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  query,
}) => {
  const { postId } = query
  try {
    const result = await client.query({
      query: post,
      variables: { id: postId },
    })

    const postData = result?.data?.post

    if (!postData) {
      return { notFound: true }
    }

    return {
      props: {
        postData,
      },
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
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Post
