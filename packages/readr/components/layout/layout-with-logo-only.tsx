import styled from 'styled-components'

import HeaderLogo from './header-logo'

const Header = styled.header`
  background-color: #fff;
  padding-top: 9px;
  padding-bottom: 9px;
  .header-logo {
    width: 48px;
    margin-left: auto;
    margin-right: auto;
  }
`

type LayoutProps = {
  children: React.ReactNode
}

export default function LayoutWithLogoOnly({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <HeaderLogo />
      </Header>
      <main>{children}</main>
    </>
  )
}
