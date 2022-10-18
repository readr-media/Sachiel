import styled from 'styled-components'

import { EditButtonContainer } from './edit-button'

const SourcesButtonContainer = styled(EditButtonContainer)`
  margin-left: auto;
  margin-top: 8px;
  .arrow {
    border-color: ${({ theme }) => theme.textColor.blue};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    &.up {
      transform: rotate(-135deg);
      margin: 5px 5px 0;
    }
    &.down {
      transform: rotate(45deg);
      margin: 0 5px 5px;
    }
  }
`
/**
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsOpen
 * @returns {React.ReactElement}
 */
export default function SourcesButton({ isOpen, setIsOpen }) {
  return (
    <SourcesButtonContainer onClick={() => setIsOpen(!isOpen)}>
      <span>{isOpen ? '收合' : '展開'}來源</span>
      {isOpen ? <i className="arrow up"></i> : <i className="arrow down"></i>}
    </SourcesButtonContainer>
  )
}
