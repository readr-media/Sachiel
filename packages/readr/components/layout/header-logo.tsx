import NextLink from 'next/link'
import styled from 'styled-components'

import ReadrLogo from '~/public/icons/readr-logo.svg'

const Link = styled(NextLink)`
  display: block;
`

export default function HeaderLogo(): JSX.Element {
  return (
    <Link href="/" className="header-logo">
      <ReadrLogo />
    </Link>
  )
}
