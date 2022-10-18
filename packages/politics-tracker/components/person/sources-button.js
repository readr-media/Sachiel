import styled from 'styled-components'

import { EditButtonContainer, EditIcon } from './edit-button'

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

export default function SourcesButton() {
  return (
    <SourcesButtonContainer>
      <span>展開來源</span>
      <i className="arrow up"></i>
      <i className="arrow down"></i>
    </SourcesButtonContainer>
  )
}
