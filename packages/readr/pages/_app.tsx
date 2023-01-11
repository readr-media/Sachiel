import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import Layout from '~/components/layout'
import { NormalizeStyles } from '~/components/layout/normalize-styles'
import theme from '~/styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NormalizeStyles />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
