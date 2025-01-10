// 類別專題報導

import SharedImage from '@readr-media/react-image'
import NextLink from 'next/link'
import styled, { useTheme } from 'styled-components'

import DateAndReadTimeInfo from '~/components/shared/date-and-read-time-info'
import ReportLabel from '~/components/shared/report-label'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { ArticleCard } from '~/types/component'
import * as gtag from '~/utils/gtag'

const Container = styled(NextLink)`
  display: block;
  position: relative;
  background-color: #f5f0ff;
  border-radius: 2px;
  padding: 0 0 16px;

  ${({ theme }) => theme.breakpoint.sm} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
    padding: 0 0 24px;
    margin-left: 24px;
    margin-bottom: auto;
    min-width: calc((100% - 24px) / 2);
    max-width: calc((100% - 24px) / 2);
  }

  picture {
    position: relative;
    display: block;
    flex-grow: 1;
    overflow: hidden;
    border-radius: 2px 2px 0 0;
    margin: 0 0 16px;

    ${({ theme }) => theme.breakpoint.sm} {
      margin: 0;
      border-radius: 0 2px 2px 0;
    }

    ${({ theme }) => theme.breakpoint.xl} {
      width: 100%;
      margin: 0 0 24px;
      border-radius: 2px 2px 0 0;
    }

    &::after {
      content: '';
      display: block;
      padding-top: 75%;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      background-color: #d8d8d8;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`

const TextWrapper = styled.div`
  flex-basis: 100%;
  position: relative;
  padding: 0 12px 0 24px;
  ${({ theme }) => theme.breakpoint.sm} {
    flex-basis: 62%;
    padding: 45px 32px 45px 28px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 100%;
    padding: 0 24px 0 28px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 8px;
    background-color: #eee500;
    ${({ theme }) => theme.breakpoint.sm} {
      top: 45px;
      bottom: 45px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      top: 0;
      bottom: 0;
    }
  }

  .title {
    text-align: left;
    margin: 0 0 8px;

    ${({ theme }) => theme.breakpoint.sm} {
      margin: 0 0 12px;
    }

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
      letter-spacing: 0.03em;
      color: #000928;
      word-wrap: break-word;
      overflow: hidden;

      ${({ theme }) => theme.breakpoint.sm} {
        font-size: 24px;
      }
      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 4px;
      }
    }
  }

  // custom style for <DateAndReadTimeInfo />
  .time {
    ${({ theme }) => theme.breakpoint.sm} {
      font-size: 14px;
      line-height: 1.5;
      .read {
        padding: 0 0 0 14px;
        &::before {
          top: 9px;
          left: 4px;
        }
      }
    }
  }
`

type CategoryReportCardProps = {
  report?: ArticleCard
}

export default function CategoryReportCard({
  report,
}: CategoryReportCardProps): JSX.Element {
  const {
    id: reportId = '',
    href = '/',
    title = '',
    images = {},
    date = '',
    readTimeText = '',
    isReport = false,
  } = report ?? {}

  const theme = useTheme()

  return (
    <Container
      href={href}
      target="_blank"
      onClick={() => gtag.sendEvent('homepage', 'click', `latest-${title}`)}
    >
      <picture>
        <SharedImage
          key={reportId}
          images={images}
          defaultImage={DEFAULT_POST_IMAGE_PATH}
          alt={title}
          priority={false}
          rwd={{
            mobile: '100vw',
            tablet: '40vw',
            default: '540px',
          }}
          breakpoint={{
            mobile: `${theme.mediaSize.sm - 1}px`,
            tablet: `${theme.mediaSize.xl - 1}px`,
          }}
        />
      </picture>
      {isReport && <ReportLabel />}
      <TextWrapper>
        <div className="title">
          <p>{title}</p>
        </div>
        <DateAndReadTimeInfo date={date} readTimeText={readTimeText} />
      </TextWrapper>
    </Container>
  )
}
