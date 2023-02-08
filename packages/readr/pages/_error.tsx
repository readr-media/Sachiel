// under construction

import { ReactElement } from 'react'

import LayoutWithLogoOnly from '~/components/layout/layout-with-logo-only'

import { NextPageWithLayout } from './_app'

type ErrorPageProps = { statusCode?: number }

const Error: NextPageWithLayout<ErrorPageProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithLogoOnly>{page}</LayoutWithLogoOnly>
}

export default Error
