import '~/styles/globals.css'

import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { ConfigContext } from '~/components/react-context/global'
import { feedbackFormConfig } from '~/constants/config'
import { gaTrackingId } from '~/constants/environment-variables'
import theme from '~/styles/theme'
import type { FeedbackFormConfig } from '~/types/common'
import { initGA, logPageView } from '~/utils/analytics'

type CustomAppProps = AppProps & {
  props: {
    feedbackFormConfig: FeedbackFormConfig
  }
}

function MyApp({ Component, pageProps, props }: CustomAppProps) {
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
      <Script
        id="comScore"
        dangerouslySetInnerHTML={{
          __html: `var _comscore = _comscore || [];
        _comscore.push({ c1: "2", c2: "24318560" });
        (function() {
        var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
        s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
        el.parentNode.insertBefore(s, el);
        })();`,
        }}
      />
      <NextNProgress />
      <ThemeProvider theme={theme}>
        <ConfigContext.Provider value={props.feedbackFormConfig}>
          <Component {...pageProps} />
        </ConfigContext.Provider>
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = App.getInitialProps(context)

  return {
    ...ctx,
    props: {
      feedbackFormConfig,
    },
  }
}

export default MyApp
