// 編輯精選文章卡片

import type { Breakpoint, Rwd } from '@readr-media/react-image'
import SharedImage from '@readr-media/react-image'
import NextLink from 'next/link'
import styled, { useTheme } from 'styled-components'

import DateAndReadTimeInfo from '~/components/shared/date-and-read-time-info'
import ReportLabel from '~/components/shared/report-label'
import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import IconFeaturedLabel from '~/public/icons/featured-label.svg'
import type { ArticleCard } from '~/types/component'

type StyledProps = {
  $isFeatured: boolean
}

const Container = styled(NextLink)<StyledProps>`
  display: block;
  position: relative;
  ${({ theme }) => theme.breakpoint.xl} {
    ${({ $isFeatured, theme }) =>
      $isFeatured
        ? `
          max-width: ${theme.width.featuredEditorChoiceCard};
          margin-left: auto;
        `
        : `
          max-width: ${theme.width.editorChoiceCard};
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

const FeatureLabel = styled.span`
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

type EditorChoiceCardProps = Omit<ArticleCard, 'id'> & {
  isFeatured?: boolean
  shouldHideBottomInfos?: boolean
  onClick?: () => void
}

export default function EditorChoiceCard({
  href = '/',
  title = '',
  images = {},
  imagesWebP = {},
  date = '',
  readTimeText = '',
  isFeatured = false,
  isReport = false,
  shouldHideBottomInfos = false,
  onClick,
}: EditorChoiceCardProps): JSX.Element {
  const theme = useTheme()

  const breakpoint: Breakpoint = isFeatured
    ? {
        mobile: `${theme.mediaSize.xl - 1}px`,
      }
    : {
        mobile: `${theme.mediaSize.md - 1}px`,
        tablet: `${theme.mediaSize.xl - 1}px`,
      }

  const rwd: Rwd = isFeatured
    ? { mobile: '100vw', default: '720px' }
    : { mobile: '100vw', tablet: '50vw', default: '300px' }

  return (
    <Container
      href={href}
      target="_blank"
      $isFeatured={isFeatured}
      onClick={onClick}
    >
      <picture>
        <SharedImage
          images={images}
          imagesWebP={imagesWebP}
          defaultImage={DEFAULT_POST_IMAGE_PATH}
          alt={title}
          priority={true}
          rwd={rwd}
          breakpoint={breakpoint}
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
        {!shouldHideBottomInfos && (
          <DateAndReadTimeInfo date={date} readTimeText={readTimeText} />
        )}
      </TextWrapper>
    </Container>
  )
}
