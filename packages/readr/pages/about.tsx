// under construction

import type { ReactElement } from 'react'

import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'

import type { NextPageWithLayout } from './_app'

const About: NextPageWithLayout = () => {
  return <p>About Us page is under construction!</p>
}

About.getLayout = function getLayout(page: ReactElement) {
  const pageTitle = '關於我們'

  return <LayoutWithLogoOnly title={pageTitle}>{page}</LayoutWithLogoOnly>
}

export default About
