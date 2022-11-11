import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { gaTrackingId } from '~/constants/config'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
