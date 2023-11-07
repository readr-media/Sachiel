import FeedbackForm from '@readr-media/react-feedback'
import type {
  Form,
  NotifyObject,
  SingleField,
} from '@readr-media/react-feedback/dist/typedef'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

import {
  EMOTION_FIELD_OPTIONS,
  PREFIX_FEEDBACK_FORM_INDENIFIER,
  PREFIX_STORAGE_KEY,
} from '~/constants/politics'
import type { ExtendedOption } from '~/types/common'

import SVGAddEmoji from '../../public/icons/emoji-field/add-emoji.svg'
import { useConfig } from '../react-context/use-global'
import EmojiSummary from './emoji-summary'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;

  cursor: default;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    line-height: 16px;
  }
`

const LeftPart = styled.span`
  display: inline-block;
`

const RightPart = styled.span`
  display: inline-block;
  position: relative;
`

const AddEmojiButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 4px;

  &:active,
  &:hover {
    color: rgba(0, 0, 0, 0.87);
  }

  .selected-emoji {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #efefef;
    border-radius: 50%;

    > img {
      width: calc(100% - 4px);
      height: calc(100% - 4px);
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
      color: rgba(0, 0, 0, 0.87);
    `}
`

const EmojiFormWrapper = styled.div<{ isOpened: boolean }>`
  display: ${({ isOpened }) => (isOpened ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 60; // highter than site's header

  .form-feedback {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    background-color: #ffffff;
    border-radius: 20px 20px 0px 0px;

    .field-single-option {
      margin-top: 20px;
      margin-bottom: 46px;

      > p {
        color: rgba(0, 0, 0, 0.87);
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
        margin-bottom: 16px;
      }

      .option-wrapper {
        .option-label {
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
          margin-top: 4px;
        }

        .option-statistic {
          display: none;
        }
      }
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    .form-feedback {
      width: auto;

      .field-single-option {
        > p {
          display: block;
        }
      }
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: ${({ isOpened }) => (isOpened ? 'inline-block' : 'none')};
    width: auto;
    height: auto;
    position: absolute;
    top: calc(16px + 8px);
    left: 50%;
    white-space: nowrap;
    z-index: 40; // lower than site's header

    .form-feedback {
      width: 344px;
      position: relative;
      transform: translateX(-50%);
      margin: 0;
      background-color: #ffffff;
      border-radius: 100px;
      box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.1);

      &::after {
        content: '';
        border: 8px solid transparent;
        position: absolute;
        border-bottom-color: white;
        border-top: 0;
        top: -8px;
        left: 50%;
        margin-left: -8px;
      }

      .field-single-option {
        margin-top: 12px;
        margin-bottom: 8px;

        > p {
          display: none;
        }
      }
    }
  }
`

const HiddenMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.5);
  ${({ theme }) => theme.breakpoint.xl} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 1000vh;
    opacity: 0;
  }
`

type UserFeedbackToolkitProps = {
  politicId: string
}

export default function UserFeedbackToolkit({
  politicId,
}: UserFeedbackToolkitProps) {
  const config = useConfig()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [summary, setSummary] = useState<Record<string, number>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [shouldShowEmojiForm, setShouldShowEmojiForm] = useState<boolean>(false)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const fieldIdentifier = `${PREFIX_FEEDBACK_FORM_INDENIFIER}-${politicId}`
  const storageKey = `${PREFIX_STORAGE_KEY}-${politicId}`
  const modalKey = 'data-modal-opened'

  const optionMap = EMOTION_FIELD_OPTIONS.reduce(
    (prev: Record<string, ExtendedOption>, curr: ExtendedOption) => {
      const k = curr.value
      prev[k] = curr
      return prev
    },
    {}
  )

  const handleOpen = () => {
    setShouldShowEmojiForm(true)
    document.body.setAttribute(modalKey, 'true')
  }

  const handleClose = () => {
    setShouldShowEmojiForm(false)
    document.body.setAttribute(modalKey, 'false')
  }

  const updateSelectedOption = (option: string | null) => {
    if (option) {
      localStorage.setItem(storageKey, option)
    } else {
      localStorage.removeItem(storageKey)
    }
    setSelectedOption(option)
    handleClose()
  }

  const onOptionChanged = (data: NotifyObject) => {
    if (!initialized) return

    updateSelectedOption(data.selectedOption)
    setSummary(data.optionSummary)
  }

  const emojiField: SingleField = {
    id: config?.emoji.fieldId ?? '',
    name: '這條政見讓你覺得...',
    type: 'single',
    identifier: fieldIdentifier,
    options: EMOTION_FIELD_OPTIONS,
    selectedItem: selectedOption ?? undefined,
    notifyUpstream: onOptionChanged,
  }

  const emojiFormSetting: Form[] = [
    {
      id: config?.emoji.formId ?? '',
      name: 'feedback-emoji',
      fields: [emojiField],
    },
  ]

  useEffect(() => {
    setSelectedOption(localStorage.getItem(storageKey))
    setInitialized(true)
  }, [storageKey])

  return (
    <Wrapper ref={ref} className="user-feedback-toolkit-wrapper">
      {inView && (
        <>
          <LeftPart>
            <EmojiSummary emojiMap={optionMap} summary={summary} />
          </LeftPart>
          <RightPart>
            <AddEmojiButton onClick={handleOpen} isActive={shouldShowEmojiForm}>
              {selectedOption ? (
                <>
                  <p>你的心情</p>
                  <span className="selected-emoji">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optionMap[selectedOption].iconUrl}
                      alt={optionMap[selectedOption].name}
                    />
                  </span>
                </>
              ) : (
                <>
                  <SVGAddEmoji />
                  <p>加入心情</p>
                </>
              )}
            </AddEmojiButton>
            <EmojiFormWrapper
              isOpened={shouldShowEmojiForm}
              className="emoji-form-wrapper"
            >
              <HiddenMask className="hidden-mask" onClick={handleClose} />
              <FeedbackForm
                shouldUseRecaptcha={false}
                storageKey="politic-tracker-user-id"
                forms={emojiFormSetting}
              />
            </EmojiFormWrapper>
          </RightPart>
        </>
      )}
    </Wrapper>
  )
}
