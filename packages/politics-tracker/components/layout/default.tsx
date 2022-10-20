import Header from '~/components/header'
import Footer from '~/components/footer'
import ToastProvider from '~/components/toast/toast-provider'
import GAScript from '~/components/ga-script'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <>
      <GAScript />
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
