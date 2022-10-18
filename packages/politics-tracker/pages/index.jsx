import React, { Fragment } from 'react'
import LandingPage from '~/components/landing/main'
import GAScript from '~/components/ga-script'

export default function Home() {
  return (
    <Fragment>
      <GAScript />
      <LandingPage />
    </Fragment>
  )
}
