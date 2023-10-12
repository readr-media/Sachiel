import { useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import styled from 'styled-components'

import ArrowRight from '../icons/arrow-right'

const EditSendOrCancelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  border: solid ${({ theme }) => theme.borderColor.black};
  padding-bottom: 20px;
  border-width: 0 0 2px;

  svg {
    width: 20px;
    height: 20px;
  }
`
const EditCancel = styled.button<{ colorType: string }>`
  color: ${({ theme }) => theme.textColor.gray};
  user-select: none;

  &:hover {
    color: ${({ theme, colorType }) => theme.textColor[colorType]};
  }
`
const EditSend = styled.button<{ colorType: string }>`
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  border-radius: 24px;
  border: 2px solid
    ${({ disabled, theme }) =>
      disabled ? theme.borderColor.black10 : theme.borderColor.black};
  padding: 8px 24px 8px 32px;

  color: ${({ colorType, disabled, theme }) =>
    disabled
      ? theme.textColor.black30
      : colorType === 'yellow'
      ? theme.textColor.black
      : theme.textColor.white};

  gap: 4.5px;
  background-color: ${({ disabled, theme, colorType }) =>
    disabled
      ? theme.backgroundColor.disable
      : theme.backgroundColor[colorType]};

  path {
    fill: ${({ colorType, disabled, theme }) =>
      disabled
        ? theme.textColor.black30
        : colorType === 'yellow'
        ? theme.textColor.black
        : theme.textColor.white};
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ disabled, theme, colorType }) =>
      disabled ? theme.backgroundColor.disable : theme.textColor[colorType]};
  }
`

type EditSendOrCancelProps = {
  isDisable?: boolean
  colorType: 'blue' | 'yellow'
  onClick: () => void
  submitHandler: () => void
}
export default function EditSendOrCancel({
  isDisable,
  colorType = 'blue',
  onClick,
  submitHandler,
}: EditSendOrCancelProps): JSX.Element {
  const [startLoading, setStartLoading] = useState(false)
  return (
    <EditSendOrCancelContainer>
      <EditCancel onClick={() => onClick()} colorType={colorType}>
        取消
      </EditCancel>
      <EditSend
        colorType={colorType}
        disabled={isDisable}
        onClick={() => {
          setStartLoading(true)
          setTimeout(() => {
            submitHandler()
            setStartLoading(false)
          }, 1000)
        }}
      >
        <PulseLoader
          color="rgba(255, 255, 255, 0.80)"
          loading={startLoading}
          margin={3}
          size={6}
          speedMultiplier={0.7}
        />
        {!startLoading && '送出審核'}
        {!startLoading && <ArrowRight />}
      </EditSend>
    </EditSendOrCancelContainer>
  )
}
