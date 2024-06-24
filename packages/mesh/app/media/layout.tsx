import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'
import Nav from '@/app/_components/nav'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {/* fixed header */}
      <Header />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="flex min-h-screen flex-col pb-[theme(height.nav.default)] pt-[theme(height.header.default)]  sm:pb-0 sm:pl-[theme(width.nav.sm)] sm:pt-[theme(height.header.sm)] md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="bg-gray-50">
          <div className="grow xl:max-w-[theme(width.maxMain)]">{children}</div>
        </div>
        {/* footer after main content */}
        <Footer />
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <Nav />
    </main>
  )
}
