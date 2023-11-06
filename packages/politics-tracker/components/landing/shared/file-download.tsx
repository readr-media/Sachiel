import React from 'react'
import styled from 'styled-components'

import type { DownloadItem } from '~/constants/landing'
import ArrowRight from '~/public/icons/landing/arrow_right_black.svg'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  color: ${({ theme }) => theme.textColor.black};

  .content {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 40px;
  } ;
`

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0px auto 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
`

const Subtitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0px auto 20px;
  ${({ theme }) => theme.fontSize['title-sub']};
  font-weight: 700;

  ${({ theme }) => theme.breakpoint.xl} {
    ${({ theme }) => theme.fontSize['title-sub-md']};
    max-width: 810px;
  }
`

const ButtonGroup = styled.div`
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`

const Button = styled.a<{ href: string }>`
  min-width: 200px;
  padding: 8px 12px 8px 20px;
  border-radius: 24px;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  max-width: 200px;
  margin: auto;

  border: 2px solid
    ${({ theme, href }) =>
      href ? theme.borderColor.black : 'rgba(15, 45, 53, 0.1)'};
  color: ${({ href }) => (href ? '#0F2D35' : 'rgba(15, 45, 53, 0.3)')};
  background: ${({ theme, href }) =>
    href ? theme.backgroundColor.white : '#c5cbcd'};
  cursor: ${({ href }) => (href ? 'pointer' : 'not-allowed')};

  svg {
    path {
      fill: ${({ href }) => (href ? 'auto' : 'rgba(15, 45, 53, 0.3)')};
    }
  }

  &:hover {
    background: ${({ theme, href }) =>
      href ? theme.backgroundColor.skinDark : '#c5cbcd'};
  }

  & + a {
    margin-top: 20px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 8px 24px 8px 32px;
    margin: 0;
    max-width: none;

    & + a {
      margin-top: 0px;
    }
  }
`

type FileDownloadProps = {
  links: DownloadItem[]
  children?: React.ReactNode
}
export default function FileDownload({
  links = [],
  children,
}: FileDownloadProps): JSX.Element {
  return (
    <Wrapper>
      <div className="content">
        <Title>下載資料</Title>
        <Subtitle>
          READr
          致力於產製資料驅動的新聞報導，並將所使用的資料公開，歡迎加以利用！（License：CC0）
        </Subtitle>

        <ButtonGroup>
          {links.map((link) => {
            return (
              <Button
                href={link.link}
                target="_blank"
                rel="noreferrer noopenner"
                key={link.title}
              >
                <p>{link.title}</p>
                <ArrowRight />
              </Button>
            )
          })}
        </ButtonGroup>

        {children}
      </div>
    </Wrapper>
  )
}
