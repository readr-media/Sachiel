import { useState } from 'react'
import styled from 'styled-components'
import { EditIcon } from './edit-button'
import ArrowRight from '../icons/arrow-right'
import PulseLoader from 'react-spinners/PulseLoader'
const EditSendOrCancelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  border: solid ${({ theme }) => theme.borderColor.black};
  padding-bottom: 20px;
  border-width: 0 0 2px;
`
const EditCancel = styled.button`
  color: ${({ theme }) => theme.textColor.gray};
  user-select: none;
  &:hover {
    color: ${({ theme }) => theme.textColor.blue};
  }
`
const EditSend = styled.button`
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
  color: ${({ disabled, theme }) =>
    disabled ? theme.textColor.black30 : theme.textColor.white};
  gap: 4.5px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.backgroundColor.disable : theme.backgroundColor.blue};
  path {
    fill: ${({ disabled, theme }) =>
      disabled ? theme.textColor.black30 : theme.textColor.white};
  }
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.backgroundColor.disable : theme.textColor.blue};
  }
`
/**
 *
 * @param {Object} props
 * @param {boolean} props.isDisable
 * @param {function} props.onClick
 * @param {function} props.submitHandler
 * @returns {React.ReactElement}
 */
export default function EditSendOrCancel({
  isDisable,
  onClick,
  submitHandler,
}) {
  const [startLoading, setStartLoading] = useState(false)
  return (
    <EditSendOrCancelContainer>
      <EditCancel onClick={() => onClick()}>取消</EditCancel>
      <EditSend
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
          color="#8379F8"
          loading={startLoading}
          margin={3}
          size={6}
          speedMultiplier={0.7}
        />
        {!startLoading && '送出審核'}
        {!startLoading && (
          <EditIcon>
            <ArrowRight />
          </EditIcon>
        )}
      </EditSend>
    </EditSendOrCancelContainer>
  )
}
