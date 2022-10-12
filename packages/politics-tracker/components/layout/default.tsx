import Header from '~/components/header'
import Footer from '~/components/footer'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({
  children,
}: DefaultLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
