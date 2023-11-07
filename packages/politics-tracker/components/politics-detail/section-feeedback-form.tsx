import FeedbackForm from '@readr-media/react-feedback'
import type {
  Form,
  SingleField,
  TextField,
} from '@readr-media/react-feedback/dist/typedef'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { EMOTION_FIELD_OPTIONS } from '~/constants/politics'

import { useConfig } from '../react-context/use-global'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 32px;
  background-color: #f3f3f3;
  box-shadow: inset 0px 4px 0px #000000;

  > form {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    margin: 0;
    width: 100%;
    background-color: transparent;
    cursor: default;

    .field-single-option {
      p {
        color: #0f2d35;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 1.3;
        margin-bottom: 16px;
        align-self: center;
      }

      .option-group-wrapper {
        column-gap: 4px;

        .option-label {
          color: rgba(0, 0, 0, 0.3);
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 14px;
          margin-top: 4px;
        }

        .option-icon-wrapper.active ~ .option-label {
          color: rgba(0, 0, 0, 0.87);
        }

        .option-statistic {
          color: rgba(15, 45, 53, 0.3);
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 14px;
          margin-top: 4px;
        }
      }
    }

    .field-comment {
      margin: 20px 0 0 0;

      .input-wrapper {
        textarea {
          background-color: #fff;
          rgba(15, 45, 53, 0.3);
          padding: 8px 16px;
          height: 87px;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 1.8;
          border: 1 solid rgba(0, 0, 0, 0.1);
          border-radius: 0;

          &::placeholder {
            color: rgba(15, 45, 53, 0.3);
          }
        }
      }

      .input-control {
        margin-top: 12px;
        margin-bottom: 20px;

        button {
          width: auto;
          margin: 0;
          padding: 8px 24px 8px 32px;
          background-color: transparent;
          color: #b2800d;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 1.8;
          border: 2px solid #b2800d;
          border-radius: 24px;

          &::after {
            content: url('/icons/arrow-right-yellow.svg');
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: sub;
            margin-left: 4px;
          }
          
          &:not([disabled]):hover, &:active {
            background-color: #fffcf3; 
          }

          &[disabled] {
            background-color: #c5cbcd;
            color: rgba(15, 45, 53, 0.3);
            border-color: rgba(15, 45, 53, 0.1);

            &::after {
              content: url('/icons/arrow-right-gray.svg');
            }
          }
        }
      }

      .list-container {
        margin-top: 40px;
        margin-bottom: 40px;

        .list-title {
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 1.3;
          color: #000928;
          margin-bottom: 4px;
        }

        .default-text {
          margin-top: 12px;
          color: rgba(15, 45, 53, 0.5);
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 21px;
        }

        .comment-wrapper {
          margin-top: 8px;

          .comment-header {
            time {
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 16px;
              color: rgba(0, 9, 40, 0.3);
            }
          }

          .comment-content-wrapper {
            margin-top: 8px;

            // show max 3 lines by default
            max-height: calc(16px * 1.8 * 3);

            &.expanded {
              -webkit-line-clamp: unset;
              max-height: unset;
            }


            .comment-content {
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 1.8;
              color: rgba(0, 9, 40, 0.87);
            }
          }

          .content-expander {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 1.8;
            color: rgba(0, 9, 40, 0.3);
          }
        }

        .list-control {
          button {
            width: auto;
            margin: 0;
            padding: 8px 24px 8px 32px;
            background-color: transparent;
            color: #b2800d;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 1.8;
            border: 2px solid #b2800d;
            border-radius: 24px;

            &::after {
              content: url('/icons/arrow-down-yellow.svg');
              display: inline-block;
              width: 20px;
              height: 20px;
              vertical-align: sub;
              margin-left: 4px;
            }
            
            &:not([disabled]):hover, &:active {
              background-color: #fffcf3; 
            }
          }
        }
      }
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    > form {
      padding: 0 40px;

      .field-single-option {
        p {
          display: block;
        }

        .option-group-wrapper {
          column-gap: 32px;

          .option-label {
            font-size: 14px;
            line-height: 16px;
          }

          .option-statistic {
            display: block;
            font-size: 14px;
            line-height: 16px;
          }
        }
      }
    }
  }

  ${({ theme }) => theme.breakpoint.xl} {
    > form {
      padding: 0 100px;
    }
  }
`

type SectionFeedbackFormProps = {
  politicId: string
}

export default function SectionFeedbackForm({
  politicId,
}: SectionFeedbackFormProps): JSX.Element {
  const config = useConfig()
  const fieldIdentifier = `politic-${politicId}`
  const storageKey = `politic-feedback-${politicId}`
  const [initialized, setInitialized] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const updateSelectedOption = (option: string | null) => {
    if (!initialized) return

    if (option) {
      localStorage.setItem(storageKey, option)
    } else {
      localStorage.removeItem(storageKey)
    }
  }

  const emojiField: SingleField = {
    id: config?.emoji.fieldId ?? '',
    name: '這條政見讓你覺得...',
    type: 'single',
    identifier: fieldIdentifier,
    options: EMOTION_FIELD_OPTIONS,
    selectedItem: selectedOption ?? undefined,
    notifyUpstream(data) {
      updateSelectedOption(data.selectedOption)
    },
  }

  const inputField: TextField = {
    id: config?.text.fieldId ?? '',
    name: '分享你的想法',
    type: 'text',
    identifier: fieldIdentifier,
    commentListTitle: '網友回饋',
    defaultText: '目前還沒有回饋，成為第一個留言的人吧！',
    shouldShowItemControl: false,
  }

  const feedBackFormSetting: Form[] = [
    {
      id: config?.emoji.formId ?? '',
      name: 'feedback',
      fields: [emojiField, inputField],
    },
  ]

  useEffect(
    () => {
      setSelectedOption(localStorage.getItem(storageKey))
      setInitialized(true)
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [storageKey]
  )

  return (
    <Container>
      <FeedbackForm
        shouldUseRecaptcha={true}
        storageKey="politic-tracker-user-id"
        forms={feedBackFormSetting}
      />
    </Container>
  )
}
