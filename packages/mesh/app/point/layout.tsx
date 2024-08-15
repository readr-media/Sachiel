import Footer from '@/components/layout-template/footer'
import Header from '@/components/layout-template/header'
import Nav from '@/components/layout-template/nav'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* fixed header */}
      <Header type="stateful" />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container bg-white sm:bg-multi-layer-light">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col">
          <div className="flex grow flex-col xl:max-w-[theme(width.maxMain)]">
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav type="default" />
    </>
  )
}
