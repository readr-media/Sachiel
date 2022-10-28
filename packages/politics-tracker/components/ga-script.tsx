import Script from 'next/script'
import getConfig from 'next/config'

export default function GAScript(): JSX.Element {
  const { publicRuntimeConfig } = getConfig()

  return (
    <>
      {/* ref: https://nextjs.org/docs/messages/next-script-for-ga#using-gtagjs */}
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?${publicRuntimeConfig?.gaTrackingId}`}
      />
      <Script id="ga-script" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${publicRuntimeConfig?.gaTrackingId}');
      `}
      </Script>
    </>
  )
}
