// under construction

import { ReactElement } from 'react'

import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'

import { NextPageWithLayout } from './_app'

const About: NextPageWithLayout = () => {
  return <p>About Us page is under construction!</p>
}

About.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithLogoOnly>{page}</LayoutWithLogoOnly>
}

export default About
