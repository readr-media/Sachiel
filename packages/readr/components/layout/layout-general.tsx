import { SITE_TITLE } from '~/constants/config'

import CustomHead from './custom-head'
import HeaderGeneral from './header/header-general'

type LayoutProps = {
  title?: string
  description?: string
  children: React.ReactNode
  onCompleteReadingHandle?: () => void
}

export default function LayoutGeneral({
  children,
  title,
  description,
  onCompleteReadingHandle,
}: LayoutProps) {
  const pageTitle = title ? `${title} - ${SITE_TITLE}` : title

  return (
    <>
      <CustomHead title={pageTitle} description={description}></CustomHead>
      <HeaderGeneral onCompleteReadingHandle={onCompleteReadingHandle} />
      <main>{children}</main>
    </>
  )
}
