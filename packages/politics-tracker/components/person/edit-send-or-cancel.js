import styled from 'styled-components'
import { EditIcon } from './edit-button'
import ArrowRight from '../icons/arrow-right'
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
`
const EditSend = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme.borderColor.black};
  padding: 8px 24px 8px 32px;
  background-color: ${({ theme }) => theme.backgroundColor.blue};
  color: ${({ theme }) => theme.textColor.white};
  gap: 4.5px;
`
const ArrowIcon = styled(EditIcon)`
  path {
    fill: ${({ theme }) => theme.textColor.white};
  }
`
/**
 *
 * @param {Object} props
 * @param {function} props.onClick
 * @param {function} props.submitHandler
 * @returns {React.ReactElement}
 */
export default function EditSendOrCancel({ onClick, submitHandler }) {
  return (
    <EditSendOrCancelContainer>
      <EditCancel onClick={() => onClick()}>取消</EditCancel>
      <EditSend onClick={() => submitHandler()}>
        送出審核
        <ArrowIcon>
          <ArrowRight />
        </ArrowIcon>
      </EditSend>
    </EditSendOrCancelContainer>
  )
}
