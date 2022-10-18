import { gaTrackingId } from '~/constants/config'
import Head from 'next/head'
import Header from '~/components/header'
import Footer from '~/components/footer'
import ToastProvider from '~/components/toast/toast-provider'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <>
      <Head>
        {/* ref: https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/ */}
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?${gaTrackingId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaTrackingId}');
            `,
          }}
        />
      </Head>
      <ToastProvider>
        <>
          <Header />
          {children}
          <Footer />
        </>
      </ToastProvider>
    </>
  )
}
