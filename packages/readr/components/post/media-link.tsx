import NextLink from 'next/link'
import styled from 'styled-components'

import iconFacebook from '~/public/icons/facebook-circle.svg'
import iconLine from '~/public/icons/line-circle.svg'
import iconLink from '~/public/icons/link-circle.svg'
import iconTwitter from '~/public/icons/twitter-circle.svg'

interface MediaLinkProps {
  margin: string
}
const MediaLink = styled.ul<MediaLinkProps>`
  width: 100%;
  max-width: 192px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};

  > li {
    background: #f6f6fb;
    display: inline-block;
    width: 36px;
    height: 36px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  > li:hover {
    cursor: pointer;
    background-color: rgba(246, 246, 251, 0.3);
  }

  li + li {
    margin-left: 16px;
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
}

export default function MediaLinkList({ margin = '0 auto 48px' }): JSX.Element {
  const externalLinks: ExternalLinkItem[] = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/readr.tw',
      svgIcon: iconFacebook,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/READr_news',
      svgIcon: iconTwitter,
    },
    {
      name: 'Line',
      href: 'https://twitter.com/READr_news',
      svgIcon: iconLine,
    },
    {
      name: 'Link',
      href: 'https://www.instagram.com/readrteam_daily/',
      svgIcon: iconLink,
    },
  ]
  return (
    <MediaLink margin={margin} className="media-link-list">
      {externalLinks.map((item) => {
        return (
          <li key={item.name}>
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
    </MediaLink>
  )
}
