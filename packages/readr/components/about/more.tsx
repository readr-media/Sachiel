import Image from '@readr-media/react-image'
import NextLink from 'next/link'
import styled from 'styled-components'

import { PageVariable } from '~/graphql/query/page-variable'

const Container = styled.div`
  position: relative;
  margin: 48px 20px;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      display: flex;
      justify-content: space-between;
      margin: 80px auto;
      max-width: 672px;
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      max-width: 1096px;
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

const ReportList = styled.ul`
  width: 100%;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      width: 441px;
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      width: 724px;
      display: flex;
      flex-wrap: wrap;
    }
  `}
`

const ReportItem = styled.li`
  width: calc(100vw - 40px);
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  :hover {
    .title-with-link {
      text-decoration-line: underline;
    }
    .image-with-link {
      transform: scale(1.1);
    }
  }
  ${({ theme }) => `
  ${theme.breakpoint.md} {
    width: 100%;
    &:first-child {
      margin-top: 0;
    }
  }
  ${theme.breakpoint.xl} {
    width: 352px;
    margin-top: 0;
    &:nth-child(2n) {
      margin-left: 20px
    }
    &:nth-child(n + 3) {
      margin-top: 20px
    }
  }
`}
`

const ImageWrapper = styled.div`
  poaition: relative;
  width: 100%;
  aspect-ratio: 352 / 198;
  transition: all 0.3s ease;
`

const ReportInfo = styled.div`
  padding: 12px 16px;
`

const ReportTitle = styled.h3`
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0.03em;
  color: #212944;
`

const ReportDesc = styled.p`
  margin-top: 8px;
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #7f8493;
`

export default function More({
  title,
  renderedMore,
}: {
  title: string
  renderedMore: PageVariable[]
}): JSX.Element {
  const getDescText = (value: unknown) => {
    if (!value) return ''
    let pureText = ''
    // value.blocks.forEach((paragraph) => {
    //   pureText += paragraph.text
    // })
    return pureText
  }
  return (
    <Container>
      <Title>{title}</Title>
      <ReportList>
        {renderedMore.map((report) => {
          const description = getDescText(report.value)
          return (
            <ReportItem key={report.id}>
              {report.url ? (
                <NextLink
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer external nofollow"
                  aria-label={report.name}
                >
                  <ImageWrapper className="image-with-link">
                    <Image
                      images={report.relatedImage?.resized}
                      defaultImage={'/icons/default/collaboration.svg'}
                      alt={report.name}
                      objectFit="cover"
                      rwd={{
                        default: '100vw',
                        mobile: '441px',
                        tablet: '352px',
                      }}
                    />
                  </ImageWrapper>
                  <ReportInfo>
                    <ReportTitle className="title-with-link">
                      {report.name}
                    </ReportTitle>
                    {description && <ReportDesc>{description}</ReportDesc>}
                  </ReportInfo>
                </NextLink>
              ) : (
                <>
                  <ImageWrapper>
                    <Image
                      images={report.relatedImage?.resized}
                      defaultImage={'/icons/default/collaboration.svg'}
                      alt={report.name}
                      objectFit="cover"
                      rwd={{
                        default: '100vw',
                        mobile: '441px',
                        tablet: '352px',
                      }}
                    />
                  </ImageWrapper>
                  <ReportInfo>
                    <ReportTitle>{report.name}</ReportTitle>
                    {description && <ReportDesc>{description}</ReportDesc>}
                  </ReportInfo>
                </>
              )}
            </ReportItem>
          )
        })}
      </ReportList>
    </Container>
  )
}
