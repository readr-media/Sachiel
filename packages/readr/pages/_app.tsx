import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import client from '~/apollo-client'
import Layout from '~/components/layout'
import { NormalizeStyles } from '~/components/layout/normalize-styles'
import theme from '~/styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NormalizeStyles />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}
