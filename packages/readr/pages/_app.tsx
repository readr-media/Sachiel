import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { NormalizeStyles } from '~/components/layout/normalize-styles'
import theme from '~/styles/theme'
import Layout from '~/components/layout'

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
