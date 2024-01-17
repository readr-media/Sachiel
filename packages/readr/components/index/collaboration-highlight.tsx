// 協作專區的置頂項目

import NextLink from 'next/link'
import styled, { useTheme } from 'styled-components'

import type { FeaturedCollaboration } from '~/graphql/query/collaboration'
import * as gtag from '~/utils/gtag'

const Container = styled(NextLink)``

type Item = {
  altText: string
  href: string
  desktopImageSrc: string
  tabletImageSrc: string
  defaultImageSrc: string
}

type CollaborationHighlightProps = {
  featured: FeaturedCollaboration
}
export default function CollaborationHighlight({
  featured,
}: CollaborationHighlightProps): JSX.Element {
  const theme = useTheme()

  const item: Item = {
    altText: featured.name || '',
    href: featured.collabLink || '',
    desktopImageSrc: featured.ImageDesktop?.resized?.original || '',
    tabletImageSrc: featured.ImageTablet?.resized?.original || '',
    defaultImageSrc: featured.ImageMobile?.resized?.original || '',
  }

  return (
    <Container
      href={item.href}
      target="_blank"
      rel="noreferrer noopenner"
      onClick={() =>
        gtag.sendEvent('homepage', 'click', 'collaboration-banner')
      }
    >
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
