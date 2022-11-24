import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { gaTrackingId } from '~/constants/config'
import NextNProgress from 'nextjs-progressbar'
//React-ga
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initGA, logPageView } from '~/utils/analytics'
import Head from 'next/head'
import CustomHead from '~/components/custom-head'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    initGA()
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) {
      logPageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', logPageView)
    return () => {
      router.events.off('routeChangeComplete', logPageView)
    }
  }, [router.events])

  return (
    <>
      <CustomHead />
      {/* ref: https://nextjs.org/docs/messages/next-script-for-ga#using-gtagjs */}
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?${gaTrackingId}`}
      />
      <Script id="ga-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaTrackingId}');
        `}
      </Script>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
