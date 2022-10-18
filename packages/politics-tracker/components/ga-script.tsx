import Script from 'next/script'
import { gaTrackingId } from '~/constants/config'

export default function GAScript(): JSX.Element {
  return (
    <>
      {/* ref: https://blog.jarrodwatts.com/track-user-behaviour-on-your-website-with-google-analytics-and-nextjs */}
      {/* Google tag (gtag.js) */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?${gaTrackingId}`}
      />
      <Script id="ga-script" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}');
      `}
      </Script>
    </>
  )
}
