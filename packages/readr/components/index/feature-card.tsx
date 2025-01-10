// 精選文章卡片

import type { Breakpoint, Rwd } from '@readr-media/react-image'
import SharedImage from '@readr-media/react-image'
import NextLink from 'next/link'
import styled, { useTheme } from 'styled-components'

import { DEFAULT_POST_IMAGE_PATH } from '~/constants/constant'
import type { FeaturedArticle } from '~/types/component'
import * as gtag from '~/utils/gtag'

type StyledProps = {
  $isFirst: boolean
  $shouldShow: boolean
}

const Container = styled(NextLink)<Pick<StyledProps, '$isFirst'>>`
  position: relative;
  display: block;

  picture {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: ${({ theme }) => theme.zIndex.maskOfPicture};
      background: linear-gradient(180deg, rgba(0, 9, 40, 0) 0%, #b2b5be 100%);
    }
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

  ${({ theme, $isFirst }) =>
    $isFirst &&
    `
      ${theme.breakpoint.xl} {
        picture {
          &::before {
            top: 66.66%;
          }
        }
      }
    `}
`

const TextWrapper = styled.div<Pick<StyledProps, '$isFirst'>>`
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  text-align: left;
  z-index: ${({ theme }) => theme.zIndex.maskOfPicture + 10};
  ${({ theme }) => theme.breakpoint.md} {
    bottom: 16px;
    left: 24px;
    right: 24px;
  }

  ${({ theme, $isFirst }) =>
    $isFirst &&
    `
      ${theme.breakpoint.xl} {
        text-align: center;
        bottom: 22px;
        left: 200px;
        right: 200px;
      }
    `}
`

const SharedDescWithEmojiStyles = `
  line-height: 1.5;
  letter-spacing: 0.03em;
  color: #000928;
  background-color: #eee500;
  padding: 4px 8px;
`

const DescWithEmoji = styled.div<Pick<StyledProps, '$shouldShow'>>`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.maskOfPicture + 10};
  font-size: 16px;
  ${SharedDescWithEmojiStyles}

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }

  ${({ $shouldShow, theme }) =>
    $shouldShow &&
    `
      ${theme.breakpoint.xl} {
        display: none;
      }
    `}
`

const DescWithEmojiInTextWrapper = styled.div<Pick<StyledProps, '$shouldShow'>>`
  display: none;

  ${({ theme, $shouldShow }) =>
    $shouldShow &&
    `
      ${theme.breakpoint.xl} {
        display: inline-block;
        font-size: 18px;
        margin: 16px;
        ${SharedDescWithEmojiStyles}
      }
    `}
`

const Emoji = styled.span`
  font-weight: normal;
  padding: 0 4px 0 0;
`
const Desc = styled.span`
  font-weight: 700;
`

const Title = styled.div<Pick<StyledProps, '$isFirst'>>`
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.03em;
    color: #fff;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
    word-wrap: break-word;
    overflow: hidden;
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 24px;
    }
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1.5px;
      text-underline-offset: 4px;
    }

    ${({ theme, $isFirst }) =>
      $isFirst &&
      `
        ${theme.breakpoint.xl} {
          font-size: 36px;
          font-weight: 900;
          &:hover {
            text-decoration-thickness: 2px;
            text-underline-offset: 8px;
          }
        }
      `}
  }
`

const Subtitle = styled.span`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 18px;
    line-height: 1.5;
    color: #fff;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
    word-wrap: break-word;
    overflow: hidden;
    margin: 8px 0 0;
    padding: 0 80px;
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 4px;
    }
  }
`

type FeaturedArticleWithIsFirst = Omit<FeaturedArticle, 'id'> & {
  isFirst?: boolean
}

export default function FeatureCard({
  href = '/',
  title = '',
  subtitle = '',
  images = {},
  imagesWebP = {},
  description = '',
  isFirst = false,
}: FeaturedArticleWithIsFirst): JSX.Element {
  const [emoji, textWithoutEmoji] = description.split(' ')
  const theme = useTheme()

  const breakpoint: Breakpoint = {
    mobile: `${theme.mediaSize.md - 1}px`,
    tablet: `${theme.mediaSize.xl - 1}px`,
  }

  const rwd: Rwd = isFirst
    ? { mobile: '100vw', tablet: '50vw', default: '100vw' }
    : { mobile: '100vw', tablet: '50vw', default: '33vw' }

  return (
    <Container
      href={href}
      target="_blank"
      $isFirst={isFirst}
      onClick={() => gtag.sendEvent('homepage', 'click', `feature-${title}`)}
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
      {title && (
        <TextWrapper $isFirst={isFirst}>
          {textWithoutEmoji && (
            <DescWithEmojiInTextWrapper $shouldShow={isFirst}>
              {emoji && <Emoji className="emoji">{emoji}</Emoji>}
              <Desc className="desc">{textWithoutEmoji}</Desc>
            </DescWithEmojiInTextWrapper>
          )}
          <Title $isFirst={isFirst}>
            <p>{title}</p>
          </Title>
          {subtitle && isFirst && <Subtitle>{subtitle}</Subtitle>}
        </TextWrapper>
      )}
      {textWithoutEmoji && (
        <DescWithEmoji $shouldShow={isFirst}>
          {emoji && <Emoji className="emoji">{emoji}</Emoji>}
          <Desc className="desc">{textWithoutEmoji}</Desc>
        </DescWithEmoji>
      )}
    </Container>
  )
}
