// 協作專區的置頂項目

import Image from '@readr-media/react-image'
import NextLink from 'next/link'
import styled from 'styled-components'

import type { FeaturedCollaboration } from '~/graphql/query/collaboration'
import type { ResizedImages } from '~/types/common'
import * as gtag from '~/utils/gtag'

const Container = styled(NextLink)`
  .desktop-banner,
  .tablet-banner {
    display: none;
  }

  ${({ theme }) => theme.breakpoint.md} {
    .tablet-banner {
      display: block;
    }

    .desktop-banner,
    .mobile-banner {
      display: none;
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    .desktop-banner {
      display: block;
    }

    .tablet-banner,
    .mobile-banner {
      display: none;
    }
  }

  img {
    width: 100%;
  }
`

type Item = {
  altText: string
  href: string
  desktopImageSrc: ResizedImages
  desktopWebpSrc: ResizedImages
  tabletImageSrc: ResizedImages
  tabletWebpSrc: ResizedImages
  mobileImageSrc: ResizedImages
  mobileWebpSrc: ResizedImages
}

type CollaborationHighlightProps = {
  featured: FeaturedCollaboration
}
export default function CollaborationHighlight({
  featured,
}: CollaborationHighlightProps): JSX.Element | null {
  if (Object.keys(featured).length === 0) return null

  const {
    name,
    collabLink,
    bannerDesktop = null,
    bannerTablet = null,
    bannerMobile = null,
  } = featured

  // if bannerDesktop/bannerTablet/bannerMobile is `null`, banner is hidden.
  if (!bannerDesktop && !bannerTablet && !bannerMobile) {
    return null
  }

  const defaultImageSrc = {
    original: '',
    w480: '',
    w800: '',
    w1200: '',
    w1600: '',
    w2400: '',
  }

  const item: Item = {
    altText: name || '',
    href: collabLink || '/',
    desktopImageSrc: bannerDesktop?.resized || defaultImageSrc,
    desktopWebpSrc: bannerDesktop?.resizedWebp || defaultImageSrc,
    tabletImageSrc: bannerTablet?.resized || defaultImageSrc,
    tabletWebpSrc: bannerTablet?.resizedWebp || defaultImageSrc,
    mobileImageSrc: bannerMobile?.resized || defaultImageSrc,
    mobileWebpSrc: bannerMobile?.resizedWebp || defaultImageSrc,
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
      <picture className="desktop-banner">
        <Image
          images={item.desktopImageSrc}
          imagesWebP={item.desktopWebpSrc}
          alt={item.altText}
          defaultImage={'/icons/default/post.svg'}
        />
      </picture>

      <picture className="tablet-banner">
        <Image
          images={item.tabletImageSrc}
          imagesWebP={item.tabletWebpSrc}
          alt={item.altText}
          defaultImage={'/icons/default/post.svg'}
        />
      </picture>

      <picture className="mobile-banner">
        <Image
          images={item.mobileImageSrc}
          imagesWebP={item.mobileWebpSrc}
          alt={item.altText}
          defaultImage={'/icons/default/post.svg'}
        />
      </picture>
    </Container>
  )
}
