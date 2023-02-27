// 編輯精選文章卡片

import NextImage from 'next/image'
import NextLink from 'next/link'
import styled from 'styled-components'

import DateAndReadTimeInfo from '~/components/shared/date-and-read-time-info'
import ReportLabel from '~/components/shared/report-label'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import useFallbackImage from '~/hooks/useFallbackImage'
import IconFeaturedLabel from '~/public/icons/featured-label.svg'

type StyledProps = {
  $isFeatured: boolean
}

const Container = styled(NextLink)<StyledProps>`
  display: block;
  position: relative;
  ${({ theme }) => theme.breakpoint.xl} {
    ${({ $isFeatured }) =>
      $isFeatured
        ? `
          max-width: 720px;
          margin-left: auto;
        `
        : `
          max-width: 296px;
          margin-right: auto;
        `}
  }
  picture {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;

    ${({ $isFeatured, theme }) =>
      $isFeatured
        ? `
        margin: 0 0 24px;
        ${theme.breakpoint.md} {
          margin: 0 0 40px;
        }
        ${theme.breakpoint.xl} {
          margin: 0 0 32px;
        }
        `
        : `margin: 0 0 16px;`}

    &::after {
      content: '';
      display: block;
      padding-top: 52.5%;
    }
    img {
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

const TextWrapper = styled.div<StyledProps>`
  ${({ $isFeatured, theme }) =>
    $isFeatured &&
    `
      position: relative;
      padding: 0 16px 0 24px;
      ${theme.breakpoint.md} {
        padding: 0 0 0 36px;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 8px;
        background-color: #fff;
        ${theme.breakpoint.md} {
          width: 12px;
        }
      }
  `}

  .title {
    text-align: left;
    margin: ${({ $isFeatured }) => ($isFeatured ? '0 0 12px;' : '0 0 8px;')};
    p {
      line-height: 1.5;
      letter-spacing: 0.03em;
      color: #000928;
      ${({ theme }) => theme.breakpoint.md} {
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      &:hover {
        text-decoration: underline;
      }
      ${({ $isFeatured, theme }) =>
        $isFeatured
          ? `
              font-size: 24px;
              font-weight: 900;
              ${theme.breakpoint.md} {
                font-size: 36px;
              }
              ${theme.breakpoint.xl} {
                -webkit-line-clamp: 2;
              }
              &:hover {
                text-decoration-thickness: 2px;
                text-underline-offset: 6px;
              }
            `
          : `
              font-size: 20px;
              font-weight: 700;
              ${theme.breakpoint.md} {
                font-size: 24px;
              }
              ${theme.breakpoint.xl} {
                font-size: 20px;
              }
              &:hover {
                text-decoration-thickness: 1.5px;
                text-underline-offset: 4px;
              }
            `}
    }
  }
`

const FeatureLabel = styled.label`
  display: inline-flex;
  align-items: center;
  background-color: #000928;
  border-radius: 2px;
  padding: 4px 8px;
  margin: 0 0 12px;
  svg {
    width: 16px;
    height: 16px;
    ${({ theme }) => theme.breakpoint.md} {
      width: 18px;
      height: 18px;
    }
  }
  p {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #fff;
    margin: 0 0 0 4px;
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      line-height: 27px;
    }
  }
`

export type EditorChoiceCardProps = {
  href?: string
  title: string
  image?: string
  date?: string
  readTimeText?: string
  isFeatured?: boolean
  isReport?: boolean
}

export default function EditorChoiceCard({
  href = '',
  title = '',
  image = DEFAULT_POST_IMAGE_PATH,
  date = '',
  readTimeText = '',
  isFeatured = false,
  isReport = false,
}: EditorChoiceCardProps): JSX.Element {
  const { imageSrc, onErrorHandle } = useFallbackImage(
    image,
    DEFAULT_POST_IMAGE_PATH
  )

  return (
    <Container href={href} target="_blank" $isFeatured={isFeatured}>
      <picture>
        <NextImage
          src={imageSrc}
          onError={onErrorHandle}
          fill={true}
          unoptimized={true}
          alt={title}
        />
      </picture>
      {isReport && <ReportLabel />}
      <TextWrapper $isFeatured={isFeatured}>
        {isFeatured && (
          <FeatureLabel>
            <IconFeaturedLabel className="label-icon" />
            <p>編輯精選</p>
          </FeatureLabel>
        )}
        <div className="title">
          <p>{title}</p>
        </div>
        <DateAndReadTimeInfo date={date} readTimeText={readTimeText} />
      </TextWrapper>
    </Container>
  )
}
