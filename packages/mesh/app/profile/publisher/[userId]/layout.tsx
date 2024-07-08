import '@/styles/global.css'

import Nav from '@/app/_components/nav'

import Body from '../../_components/body'
import ProfileFooter from '../../_components/footer'
import ProfileHeader from '../../_components/header'
export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex grow flex-col">
      <ProfileHeader />
      <Body>
        {children}
        <ProfileFooter />
      </Body>
      <Nav />
    </div>
  )
}
