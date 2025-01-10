// 協作專區項目卡片

import SharedImage from '@readr-media/react-image'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import styled, { useTheme } from 'styled-components'

import type { CollaborationItem } from '~/types/component'
import * as gtag from '~/utils/gtag'

type StyledProps = {
  $isInProgress: boolean
}

const Container = styled(NextLink)`
  display: block;
  letter-spacing: 2.5px;
  &:hover img,
  &:focus img {
    transform: scale(1.1);
  }
`
const ImageBlock = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 50%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
`
const InfoLabel = styled.span`
  position: absolute;
  top: 8px;
  left: 7px;
  background-color: #eee500;
  border-radius: 22px;
  font-size: 13px;
  font-weight: 600;
  color: #0b2163;
  line-height: 2;
  padding: 2px 12px;

  ${({ theme }) => theme.breakpoint.md} {
    top: 6px;
    left: 6px;
  }
`
const StatusLabel = styled.span<StyledProps>`
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0b2163;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-align: center;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  width: calc(100% - 14px);
  border: 1px solid #fff;
  border-radius: 2px;

  ${({ $isInProgress }) => $isInProgress && `background-color: #979797;`}

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 160px;
    bottom: 6px;
    left: 6px;
    transform: none;
  }
`
const ContentBlock = styled.div`
  padding: 9px 7px 14px 7px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 11px;
    padding-left: 6px;
    padding-right: 6px;
  }

  > [role='heading'] {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15px;
    font-weight: 700;
    word-wrap: break-word;
    overflow: hidden;
    // 15 * 1.5 * 2
    min-height: 3em;
    margin-bottom: 6px;

    ${({ theme }) => theme.breakpoint.md} {
      margin-bottom: 11px;
      font-size: 18px;
    }
  }
`
const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.66);
  letter-spacing: 1px;
  margin-bottom: 9px;
  // 13 * 1.5 * 2
  min-height: 3em;
  word-wrap: break-word;
  overflow: hidden;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 15px;
    letter-spacing: 1.5px;
    -webkit-line-clamp: 1;
    // 15 * 1.5 * 1
    min-height: 1.5em;
    margin-bottom: 6px;
  }
`
const ProgressContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 2px;
  }

  > progress {
    appearance: none;
    flex: 0 1 68.18%;
    height: 8px;
    overflow: hidden;
    &::-webkit-progress-bar {
      background-color: rgba(216, 216, 216, 0.5);
    }
    &::-webkit-progress-value {
      background-color: #eee500;
    }
    &::-moz-progress-bar {
      background-color: #eee500;
    }

    ${({ theme }) => theme.breakpoint.md} {
      height: 10px;
      flex-basis: 81.82%;
    }
  }

  > span {
    font-size: 15px;
    font-weight: 700;
    text-align: right;
    flex: 0 0 auto;
    margin-left: 12px;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
    }
  }
`
const DateContent = styled.div`
  font-size: 13px;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.66);
`

type CollaborationCardProps = Omit<CollaborationItem, 'id'>

export default function CollaborationCard({
  achvLink,
  collabLink,
  images,
  imagesWebP,
  title,
  description,
  progress,
  endTime,
  requireTime,
}: CollaborationCardProps): JSX.Element {
  const progressText = `${progress}%`
  const href = achvLink || collabLink
  const remainDays = dayjs().diff(dayjs(endTime), 'day') * -1
  const passedEndTime = remainDays < 0
  const remainDaysText = passedEndTime ? '已結束' : `還剩 ${remainDays} 天`
  const canCollaborate = !achvLink && !passedEndTime
  const isInProgress = !achvLink && passedEndTime
  const statusText = canCollaborate
    ? '我要協作'
    : isInProgress
    ? '專題製作中'
    : '前往專題'
  const theme = useTheme()

  return (
    <Container
      href={href}
      target="_blank"
      onClick={() =>
        gtag.sendEvent('homepage', 'click', `collaboration-${title}`)
      }
    >
      <ImageBlock>
        <SharedImage
          images={images}
          imagesWebP={imagesWebP}
          defaultImage={'/icons/default/collaboration.svg'}
          alt={title}
          breakpoint={{
            mobile: `${theme.mediaSize.md - 1}px`,
          }}
          rwd={{
            mobile: '190px',
            default: '342px',
          }}
        />
        {canCollaborate && <InfoLabel>只要 {requireTime} 分鐘</InfoLabel>}
        <StatusLabel $isInProgress={isInProgress}>{statusText}</StatusLabel>
      </ImageBlock>
      <ContentBlock>
        <div role="heading" aria-level={3}>
          {title}
        </div>
        <Description>{description}</Description>
        <ProgressContent>
          <progress value={progress} max={100} />
          <span>{progressText}</span>
        </ProgressContent>
        <DateContent>{remainDaysText}</DateContent>
      </ContentBlock>
    </Container>
  )
}
