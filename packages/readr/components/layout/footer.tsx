import NextLink from 'next/link'
import styled from 'styled-components'

import iconFacebook from '~/public/icons/facebook.svg'
import iconGitHub from '~/public/icons/github.svg'
import iconInstagram from '~/public/icons/instagram.svg'
import iconTwitter from '~/public/icons/twitter.svg'
import * as gtag from '~/utils/gtag'

const Main = styled.footer`
  display: block;
  line-height: 1.5;

  a {
    text-decoration: none;
    color: #000;
  }
`

const Container = styled.div`
  padding: 32px 0 24px 0;
  text-align: center;
  max-width: ${({ theme }) => theme.width.main};
  margin: 0 auto;
  box-sizing: content-box;
`

const MediaLinkList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0 0 30px 0;
  line-height: 1.4;

  ${({ theme }) => theme.breakpoint.lg} {
    margin: 0 0 32px 0;
  }

  li + li {
    margin-left: 24px;
  }
`

const MiscLinkList = styled.ul`
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 32px;

  ${({ theme }) => theme.breakpoint.sm} {
    padding: 0;
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }

  ${({ theme }) => theme.breakpoint.lg} {
    padding: 0;
  }
  li {
    ${({ theme }) => theme.breakpoint.sm} {
      width: auto;
    }
  }
  li + li {
    margin-top: 12px;
    ${({ theme }) => theme.breakpoint.sm} {
      margin-top: 0px;
      margin-left: 40px;
    }
    ${({ theme }) => theme.breakpoint.md} {
      margin-left: 66px;
    }
  }
`

const CompanyInfoSection = styled.address`
  font-style: normal;
  list-style: none;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 0 12px;
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p + p {
    position: relative;
    margin: 8px 0 0;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 0;
      padding: 0 0 0 17px;
      &::before {
        content: '';
        position: absolute;
        top: 1px;
        left: 9px;
        bottom: 2px;
        width: 1px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`

const CopyrightInfo = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.3);
`

type ExternalLinkItem = {
  name: string
  href: string
  svgIcon: any
  clickHandle?: () => void
}

export default function Footer(): JSX.Element {
  function sendGAEvent(label?: string): void {
    gtag.sendEvent('footer', 'click', label)
  }

  const externalLinks: ExternalLinkItem[] = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/readr.tw',
      svgIcon: iconFacebook,
      clickHandle: () => sendGAEvent('fb'),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/READr_news',
      svgIcon: iconTwitter,
      clickHandle: () => sendGAEvent('twitter'),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/readr.tw/',
      svgIcon: iconInstagram,
      clickHandle: () => sendGAEvent('instagram'),
    },
    {
      name: 'Github',
      href: 'https://github.com/readr-media/readr-data',
      svgIcon: iconGitHub,
      clickHandle: () => sendGAEvent('github'),
    },
  ]

  return (
    <Main className="layout-footer">
      <Container>
        <MediaLinkList>
          {externalLinks.map((item) => {
            return (
              <li key={item.name}>
                <NextLink
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer external nofollow"
                  aria-label={item.name}
                  onClick={item.clickHandle}
                >
                  <item.svgIcon />
                </NextLink>
              </li>
            )
          })}
        </MediaLinkList>
        <MiscLinkList>
          <li>
            <NextLink
              href="/about"
              target="_blank"
              rel="noreferrer author"
              onClick={() => sendGAEvent('about')}
            >
              關於我們
            </NextLink>
          </li>
          <li>
            <NextLink
              href="mailto:readr@readr.tw"
              rel="author"
              onClick={() => sendGAEvent('contact us')}
            >
              聯絡我們
            </NextLink>
          </li>
          <li>
            <NextLink
              href="/privacy-rule"
              target="_blank"
              rel="noreferrer license"
              onClick={() => sendGAEvent('privacy-rule')}
            >
              隱私政策
            </NextLink>
          </li>
          <li>
            <NextLink
              href="https://forms.gle/C6B5MGYXLzXrmfSe6"
              target="_blank"
              rel="noopener noreferrer external nofollow"
              onClick={() => sendGAEvent('feedback')}
            >
              意見回饋
            </NextLink>
          </li>
          <li>
            <NextLink
              href={{
                pathname: '/post/[postId]',
                query: {
                  postId: '2901',
                },
              }}
              target="_blank"
              rel="noreferrer license"
              onClick={() => sendGAEvent('agreement')}
            >
              服務條款
            </NextLink>
          </li>
        </MiscLinkList>
        <CompanyInfoSection>
          <p>精鏡傳媒股份有限公司</p>
          <p>114 台北市內湖區堤頂大道一段 365 號 7 樓</p>
          <p>readr@readr.tw</p>
        </CompanyInfoSection>
        <CopyrightInfo>
          &copy; <time>{new Date().getFullYear()}</time> 精鏡傳媒股份有限公司
          All Rights Reserved
        </CopyrightInfo>
      </Container>
    </Main>
  )
}
