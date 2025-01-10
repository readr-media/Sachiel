// TODO: replace it with share component

import Image from 'next/image'
import NextLink from 'next/link'
import styled from 'styled-components'

import * as gtag from '~/utils/gtag'

const Link = styled(NextLink)`
  display: block;
`

type HeaderLogoProps = {
  onClick?: () => void
}

export default function HeaderLogo({
  onClick = () => gtag.sendEvent('header', 'click', 'logo'),
}: HeaderLogoProps): JSX.Element {
  function clickHander() {
    if (typeof onClick === 'function') {
      onClick()
    }
  }

  return (
    <Link
      href="/"
      className="header-logo"
      aria-label="首頁"
      onClick={clickHander}
    >
      <Image src="/icons/readr-logo.svg" alt="Readr logo" fill />
    </Link>
  )
}
