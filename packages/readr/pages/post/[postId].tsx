// under construction

import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import styled from 'styled-components'

import LayoutGeneral from '~/components/layout/layout-general'
import type { NextPageWithLayout } from '~/pages/_app'

const Article = styled.article`
  height: 300vh;
  line-height: 300vh;
  text-align: center;
`

const Post: NextPageWithLayout = () => {
  const router = useRouter()

  return <Article id="post">文章頁 #{router?.query?.postId}</Article>
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Post
