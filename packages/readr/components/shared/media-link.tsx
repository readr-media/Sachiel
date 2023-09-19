import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import IconFacebook from '~/public/icons/facebook-circle.svg'
import IconLine from '~/public/icons/line-circle.svg'
import IconLink from '~/public/icons/link-circle.svg'
import IconTwitter from '~/public/icons/twitter-circle.svg'
import * as gtag from '~/utils/gtag'

const MediaLinkWrapper = styled.ul<{ className: string }>`
  display: flex;
  align-items: center;
  margin-top: 16px;

  > li + li {
    margin-left: 16px;
  }

  a,
  button {
    background: #f6f6fb;
    display: inline-block;
    width: 36px;
    height: 36px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
      background-color: rgba(246, 246, 251, 0.3);
    }
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

type ExternalLinkItem = {
  name: string
  href: string
  svgIcon: any
  alt: string
  click: () => void
}

export default function MediaLinkList({
  className = 'media-link-list',
}): JSX.Element {
  const [href, setHref] = useState('')

  useEffect(() => {
    setHref(() => window.location.href)
  }, [])

  const externalLinks: ExternalLinkItem[] = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/share.php?u=${href}`,
      svgIcon: IconFacebook,
      alt: '分享至facebook',
      click: () => gtag.sendEvent('post', 'click', 'post-share-fb'),
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${href}`,
      svgIcon: IconTwitter,
      alt: '分享至twitter',
      click: () => gtag.sendEvent('post', 'click', 'post-share-twitter'),
    },
    {
      name: 'Line',
      href: `https://social-plugins.line.me/lineit/share?url=${href}`,
      svgIcon: IconLine,
      alt: '分享至line',
      click: () => gtag.sendEvent('post', 'click', 'post-share-line'),
    },
  ]
  function handleLinkClick() {
    navigator.clipboard
      .writeText(href)
      .then(() => {
        alert('連結已複製')
      })
      .catch(() => {
        console.error('Failed to copy URL to clipboard')
      })
    gtag.sendEvent('post', 'click', 'post-copylink')
  }

  return (
    <MediaLinkWrapper className={className}>
      {externalLinks.map((item) => {
        return (
          <li key={item.name} aria-label={item.alt} onClick={item.click}>
            <NextLink
              href={item.href}
              target="_blank"
              rel="noopener noreferrer external nofollow"
            >
              <item.svgIcon />
            </NextLink>
          </li>
        )
      })}
      <li key="Line">
        <button type="button" aria-label="複製網站連結">
          <IconLink onClick={handleLinkClick} />
        </button>
      </li>
    </MediaLinkWrapper>
  )
}
