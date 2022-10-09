import Header from '../header'

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
    </>
  )
}
