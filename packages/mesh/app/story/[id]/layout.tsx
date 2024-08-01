import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import Nav from '@/app/_components/nav'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* fixed header */}
      <Header />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container-article">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col items-center bg-white">
          <div className="flex w-full grow justify-around xl:max-w-[theme(width.maxContent)]">
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <Footer />
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav />
    </>
  )
}
