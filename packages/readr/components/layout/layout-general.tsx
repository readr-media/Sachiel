import styled from 'styled-components'

import { SITE_TITLE } from '~/constants/constant'

import CustomHead from './custom-head'
import HeaderGeneral from './header/header-general'

const Main = styled.main`
  min-height: 100vh;
  padding: 64px 0 0;
  overflow: hidden;
  ${({ theme }) => theme.breakpoint.sm} {
    padding: 80px 0 0;
  }
`

type LayoutProps = {
  title?: string
  description?: string
  imageUrl?: string
  children: React.ReactNode
  onCompleteReadingHandle?: () => void
}

export default function LayoutGeneral({
  children,
  title,
  description,
  imageUrl,
  onCompleteReadingHandle,
}: LayoutProps) {
  const pageTitle = title ? `${title} - ${SITE_TITLE}` : title

  return (
    <>
      <CustomHead
        title={pageTitle}
        description={description}
        imageUrl={imageUrl}
      ></CustomHead>
      <HeaderGeneral onCompleteReadingHandle={onCompleteReadingHandle} />
      <Main>{children}</Main>
    </>
  )
}
