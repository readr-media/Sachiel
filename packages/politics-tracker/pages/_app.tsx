import '~/styles/globals.css'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import Script from 'next/script'

type AppOwnProps = { gaTrackingId: string | undefined }
function MyApp({ Component, pageProps, gaTrackingId }: AppProps & AppOwnProps) {
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
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps & AppOwnProps> => {
  const ctx = await App.getInitialProps(context)

  return {
    ...ctx,
    gaTrackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID,
  }
}

export default MyApp
