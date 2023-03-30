// under construction

import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import styled from 'styled-components'

import LayoutGeneral from '~/components/layout/layout-general'
import type { NextPageWithLayout } from '~/pages/_app'

const Article = styled.article`
  height: 100vh;
  line-height: 100vh;
  text-align: center;
`

const Tag: NextPageWithLayout = () => {
  const router = useRouter()

  return <Article id="post">標籤頁 #{router?.query?.name}</Article>
}

Tag.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Tag
