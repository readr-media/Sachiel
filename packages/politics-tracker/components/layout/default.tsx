import Footer from '~/components/footer'
import Header from '~/components/header'
import ToastProvider from '~/components/toast/toast-provider'

type DefaultLayoutProps = {
  children: React.ReactElement | React.ReactElement[]
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <>
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
