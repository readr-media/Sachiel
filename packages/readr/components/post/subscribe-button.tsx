import { SubscribeButton } from '@readr-media/react-component'
import styled from 'styled-components'

const SubscribeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04295e;
  padding: 0 20px;
`

export default function Subscribe(): JSX.Element {
  return (
    <SubscribeWrapper>
      <SubscribeButton />
    </SubscribeWrapper>
  )
}
