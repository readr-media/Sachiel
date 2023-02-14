// under construction

import type { ReactElement } from 'react'

import LayoutGeneral from '~/components/layout/layout-general'

import type { NextPageWithLayout } from './_app'

const Index: NextPageWithLayout = () => {
  return <p>首頁</p>
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Index
