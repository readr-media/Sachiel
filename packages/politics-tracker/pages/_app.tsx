import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import GAScript from '~/components/ga-script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GAScript />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
