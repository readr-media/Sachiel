import Header from '~/components/header'
import Footer from '~/components/footer'
import ToastProvider from '~/components/toast/toast-provider'
import CustomHead from '../custom-head'
import GAScript from '~/components/ga-script'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <>
      <CustomHead />
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
