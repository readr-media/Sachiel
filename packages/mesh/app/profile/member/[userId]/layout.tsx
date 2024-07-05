import '@/styles/global.css'

import Body from '../../_components/body'

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex grow flex-col">
      <Body>{children}</Body>
    </main>
  )
}
