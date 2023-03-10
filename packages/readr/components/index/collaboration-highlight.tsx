// 協作專區的置頂項目

import NextLink from 'next/link'
import styled, { useTheme } from 'styled-components'

const Container = styled(NextLink)`
  margin-bottom: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 24px;
  }
`

type Item = {
  altText: string
  href: string
  desktopImageSrc: string
  tabletImageSrc: string
  defaultImageSrc: string
}

export default function CollaborationHighlight(): JSX.Element {
  const theme = useTheme()
  const path = '/images/collaboration'
  const directory = '/open-relation'

  function createUrlPath(file: string) {
    return [path, directory, file].join('/')
  }

  const item: Item = {
    altText: 'open-relation-banner',
    href: 'https://whoareyou.readr.tw/',
    desktopImageSrc: createUrlPath('desktop_1096x241.png'),
    tabletImageSrc: createUrlPath('tablet_710x215.png'),
    defaultImageSrc: createUrlPath('mobile_280x172.png'),
  }

  return (
    <Container href={item.href} target="_blank" rel="noreferrer noopenner">
      <picture>
        <source
          srcSet={item.desktopImageSrc}
          media={`(min-width: ${theme.mediaSize.xl}px)`}
        />
        <source
          srcSet={item.tabletImageSrc}
          media={`(min-width: ${theme.mediaSize.md}px)`}
        />
        <img src={item.defaultImageSrc} alt={item.altText} />
      </picture>
    </Container>
  )
}
