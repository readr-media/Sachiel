// under construction

import CustomImage from '@readr-media/react-image'
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'
import styled from 'styled-components'

import client from '~/apollo-client'
import LayoutGeneral from '~/components/layout/layout-general'
import Credit from '~/components/post/post-credit'
import Title from '~/components/post/post-title'
import type { PostDetail } from '~/graphql/query/post'
import { post } from '~/graphql/query/post'
import type { NextPageWithLayout } from '~/pages/_app'

const Article = styled.article`
  padding: 70px 0 0;
  ${({ theme }) => theme.breakpoint.lg} {
    padding: 86px 0 0;
  }
`

const HeroImage = styled.picture`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 24px;
  height: 50vw;
  max-height: 480px;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 24px auto 60px;
  }
`

const Heading = styled.article`
  width: 100%;
  max-width: 568px;
  margin: 0 auto;
  padding: 0 20px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0.04em;
    color: #000928;
    margin: 0 0 16px;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 36px;
      line-height: 1.5;
      letter-spacing: 0.03em;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 0;
    max-width: 600px;
  }
`

const Post: NextPageWithLayout<{ postData: PostDetail }> = ({ postData }) => {
  return (
    <Article id="post">
      <HeroImage>
        {postData.heroImage?.resized && (
          <CustomImage
            images={postData.heroImage?.resized}
            defaultImage={'/default-image.svg'}
            objectFit="cover"
          />
        )}
      </HeroImage>
      <Heading>
        <Title postData={postData} />
        <Credit postData={postData} />
      </Heading>
    </Article>
  )
}

type PostPageProps = {
  postData: PostDetail
}
export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
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
