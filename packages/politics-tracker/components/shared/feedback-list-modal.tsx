import { Comment } from '@readr-media/react-feedback/dist/typedef'
import axios from 'axios'
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Z_INDEX } from '~/constants'
import { feedbackFormApi } from '~/constants/environment-variables'
import { useWindowSize } from '~/utils/hooks'

import ArrowTilt from '../icons/arrow-tilt'
import Cross from '../icons/cross'
import { useConfig } from '../react-context/use-global'
import { CommentItem } from './comment-item'

const Wrapper = styled.div<{ isOpened: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  display: ${({ isOpened }) => (isOpened ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: ${Z_INDEX.overHeader}; // higher than site's header

  ${({ theme }) => theme.breakpoint.xl} {
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: inherit;
  height: inherit;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #ffffff;

  ${({ theme }) => theme.breakpoint.xl} {
    width: 600px;
    height: 400px;
    border-radius: 20px;
  }
`
const ModalHead = styled.div`
  display: flex;
  justify-content: start;

  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: end;
  }
`

const ModalClose = styled.button`
  color: #0f2d35;
  width: 32px;
  height: 32px;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 50%;

  &:active,
  &:hover {
    background-color: rgba(15, 45, 53, 0.1);
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin-right: -4px;
`
const ModalBody = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`

const DefaultText = styled.p`
  margin-top: 40px;
  text-align: center;
  color: rgba(15, 45, 53, 0.5);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
`

const Mask = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) calc(100% - 90px)
  );
`

const Navigation = styled(NextLink)`
  display: inline-block;
  align-self: end;
  padding: 8px 12px 8px 20px;
  margin-bottom: 40px;
  color: #0f2d35;
  background: #f6ba31;
  border: 2px solid #000000;
  border-radius: 24px;
  cursor: pointer;

  p {
    display: inline-flex;
    align-items: center;
    column-gap: 4px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.8;
  }

  path {
    fill: #0f2d35;
  }

  &:hover {
    background: #b2800d;
    color: #ffffff;

    path {
      fill: #ffffff;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 8px 24px 8px 32px;

    p {
      font-size: 18px;
    }
  }
`

type RawComment = {
  id: string
  name: string
  result: string
  ip: string
  responseTime: string
}

type ApiResponse = {
  data: {
    formResults: RawComment[]
  }
  skip: number
}

type FeedbackListModalProps = {
  politicId: string
  fieldIdentifier: string
  isShowed: boolean
  onClosed: () => void
  onReady: () => void
}

export function FeedbackListModal({
  politicId,
  fieldIdentifier,
  isShowed,
  onClosed,
  onReady,
}: FeedbackListModalProps) {
  const config = useConfig()
  const apiUrl = `${feedbackFormApi}/api/feedback`
  const [comments, setComments] = useState<Comment[]>([])
  const windowSize = useWindowSize()

  const convertDateFromISO8601 = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }`
  }

  const rawCommentToComment = (rawComment: RawComment): Comment => ({
    id: rawComment.id,
    content: rawComment.result,
    date: convertDateFromISO8601(rawComment.responseTime),
  })

  const fetchComments = useCallback(
    async () => {
      try {
        const { data } = await axios.get<ApiResponse>(apiUrl, {
          params: {
            form: config?.text.formId ?? '',
            field: config?.text.fieldId ?? '',
            identifier: fieldIdentifier,
            take: 5,
          },
        })

        if (data && data.data.formResults.length > 0) {
          setComments(data.data.formResults.map(rawCommentToComment))
        }

        onReady()
      } catch (e) {
        console.error(e)
      }
    },
    /* eslint-disable-line react-hooks/exhaustive-deps */ [
      config,
      fieldIdentifier,
    ]
  )

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const itemList = useMemo(() => {
    let showingComments: Comment[]

    if (windowSize.width < 768) {
      showingComments = comments.slice(0)
    } else {
      showingComments = comments.slice(0, 3)
    }

    if (showingComments.length > 0) {
      return showingComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))
    } else {
      return <DefaultText>還沒有人對這條政見發表意見...</DefaultText>
    }
  }, [comments, windowSize])

  return (
    <Wrapper isOpened={isShowed}>
      <ModalWrapper>
        <ModalHead>
          <ModalClose onClick={onClosed}>
            <Cross />
          </ModalClose>
        </ModalHead>
        <ModalBody>
          {itemList}
          <Mask>
            <Navigation
              href={`/politics/detail/${politicId}`}
              legacyBehavior={false}
            >
              <p>
                {Array.isArray(itemList) && itemList.length > 0
                  ? '查看所有留言'
                  : '前往留言'}
                <ArrowTilt />
              </p>
            </Navigation>
          </Mask>
        </ModalBody>
      </ModalWrapper>
    </Wrapper>
  )
}
