import CustomImage from '@readr-media/react-image'
import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import styled from 'styled-components'

import client from '~/apollo-client'
import Layout from '~/components/layout'
import Credit from '~/components/post/post-credit'
import Title from '~/components/post/post-title'
import GetPostById from '~/graphql/query/get-post.gql'
import type { Post } from '~/types/post'

const Container = styled.div`
  padding: 70px 0 0;

  ${({ theme }) => theme.breakpoint.sm} {
    padding: 86px 0 0;
  }
`

const HeroImage = styled.picture`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 24px;
  height: 0;
  padding-bottom: 50%;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 24px auto 60px;

    img {
      max-height: 480px;
    }
  }

  .readr-media-react-image {
    position: absolute;
  }
`

const Content = styled.article`
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
`

export default function Post({ postData = {} }: Post): JSX.Element {
  return (
    <Container>
      <HeroImage>
        {postData.heroImage?.resized && (
          <CustomImage
            images={postData.heroImage?.resized}
            defaultImage={'/default-image.svg'}
            alt={postData.heroImage?.heroCaption}
            objectFit="cover"
          />
        )}
      </HeroImage>
      <Content>
        <Title postData={postData} />
        <Credit postData={postData} />
      </Content>
    </Container>
  )
}

type PostPageProps = {
  postData: Post
}
export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  query,
}) => {
  const { postId } = query
  try {
    const result = await client.query({
      query: GetPostById,
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
    const { graphQLErrors, clientErrors, networkError }: Error = err
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while getting index page data'
    )

    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          annotatingError,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
        debugPayload: {
          graphQLErrors,
          clientErrors,
          networkError,
        },
      })
    )
    return { notFound: true }
  }
}

Post.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>
