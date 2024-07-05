export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-white pb-[theme(height.nav.default)] pt-[theme(height.header.default)] sm:pb-0 sm:pl-[theme(width.nav.sm)] sm:pt-[theme(height.header.sm)] md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
      <div className="flex grow flex-col">{children}</div>
    </main>
  )
}
