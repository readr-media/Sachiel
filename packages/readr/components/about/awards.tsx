import dayjs from 'dayjs'
import NextLink from 'next/link'
import styled from 'styled-components'

import IconTailArrow from '~/public/icons/tail-arrow.svg'
import type { RenderedAward as RenderedAwardType } from '~/types/about'

const Container = styled.div`
  position: relative;
  margin: 48px 20px;
  .tail-arrow {
    height: 37px;
    margin-top: 44px;
  }
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      display: flex;
      justify-content: space-between;
      margin: 80px auto;
      max-width: 672px;
      .tail-arrow {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      max-width: 1096px;
      .tail-arrow {
        height: 73px;
      }
    }
  `}
`

const Title = styled.h2`
  font-family: 'Noto Sans TC';
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 20px;
  min-width: fit-content;
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      font-size: 36px;
    }
  `}
`

const AwardList = styled.ul`
  width: 100%;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      width: 441px;
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      width: 724px;
    }
  `}
`

const AwardItem = styled.li`
  & + & {
    padding-top: 24px;
    border-top: 1px solid #fff;
  }
  &:not(:last-child) {
    padding-bottom: 24px;
  }
  ${({ theme }) => `
  ${theme.breakpoint.md} {
    display: flex;
    align-items: flex-start;
  }
`}
`

const AwardDate = styled.div`
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: justify;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  align-items: center;
  :before {
    display: block;
    content: '';
    border-radius: 50%;
    width: 8px;
    min-width: 8px;
    height: 8px;
    background: #eee500;
    margin-right: 8px;
  }
  ${({ theme }) => `
  ${theme.breakpoint.md} {
    min-width: fit-content;
    margin-right: 20px;
    :before {
      margin-right: 20px;
    }
  }
`}
`

const AwardLeft = styled.div``

const AwardName = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: justify;
  letter-spacing: 0.03em;
  color: #eee500;
  margin-top: 9px;
  ${({ theme }) => `
  ${theme.breakpoint.md} {
    margin-top: 0;
  }
`}
`

const AwardReport = styled.span<{ isLink?: string }>`
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  text-align: justify;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.87);
  padding-bottom: 3px;
  transition: 0.5s;
  margin-top: 4px;

  ${(props) =>
    props.isLink &&
    `
    border-bottom: 1px solid #EEE500;
    :hover {
      color: #EEE500;
    }
  `}
`

const AwardDesc = styled.p`
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: justify;
  color: rgba(255, 255, 255, 0.66);
  margin-top: 12px;
`

export default function Awards({
  renderedAwards,
  title,
}: {
  renderedAwards: RenderedAwardType[]
  title: string
}): JSX.Element {
  const formatedDate = (date: any): string => {
    return dayjs(date).format('YYYY-MM')
  }
  return (
    <Container>
      <Title>{title}</Title>
      <AwardList>
        {renderedAwards.map((award, index) => {
          return (
            <AwardItem key={index}>
              <AwardDate>{formatedDate(award.awardTime)}</AwardDate>
              <AwardLeft>
                <AwardName>{award.name}</AwardName>
                <AwardReport isLink={award.url}>
                  {award.url ? (
                    <NextLink
                      href={award.url}
                      target="_blank"
                      rel="noopener noreferrer external nofollow"
                      aria-label={award.name}
                    >
                      {award.report}
                    </NextLink>
                  ) : (
                    award.report
                  )}
                </AwardReport>
                {award.desc && <AwardDesc>{award.desc}</AwardDesc>}
              </AwardLeft>
            </AwardItem>
          )
        })}
      </AwardList>
      <IconTailArrow />
    </Container>
  )
}
