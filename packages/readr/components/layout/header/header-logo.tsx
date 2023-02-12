import NextLink from 'next/link'
import styled from 'styled-components'

import ReadrLogo from '~/public/icons/readr-logo.svg'

const Link = styled(NextLink)`
  display: block;
`

type HeaderLogoProps = {
  onClick?: () => void
}

export default function HeaderLogo(props: HeaderLogoProps): JSX.Element {
  function clickHander() {
    if (typeof props.onClick === 'function') {
      props.onClick()
    }
  }

  return (
    <Link
      href="/"
      className="header-logo"
      aria-label="首頁"
      onClick={clickHander}
    >
      <ReadrLogo />
    </Link>
  )
}
