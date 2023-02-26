import styled from 'styled-components'

import { SITE_TITLE } from '~/constants/constant'

import CustomHead from './custom-head'
import HeaderLogo from './header/header-logo'

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
  title?: string
  description?: string
  children: React.ReactNode
}

export default function LayoutWithLogoOnly({
  children,
  title,
  description,
}: LayoutProps) {
  const pageTitle = title ? `${title} - ${SITE_TITLE}` : title

  return (
    <>
      <CustomHead title={pageTitle} description={description}></CustomHead>
      <Header>
        <HeaderLogo />
      </Header>
      <main>{children}</main>
    </>
  )
}
