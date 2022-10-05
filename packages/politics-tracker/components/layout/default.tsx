import Header from '../Header'

type DefaultLayoutProps = {
  children: React.ReactNode,
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}



