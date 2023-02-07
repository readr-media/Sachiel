import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

import client from '~/apollo-client'
import GDPRControl from '~/components/layout/gdpr-control'
import { NormalizeStyles } from '~/components/layout/normalize-styles'
import { ReadrStyles } from '~/components/layout/readr-styles'
import theme from '~/styles/theme'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    /* eslint-disable-line no-unused-vars */ page: ReactElement
  ) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <NormalizeStyles />
      <ReadrStyles />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
          <GDPRControl />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}