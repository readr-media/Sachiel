import { SubscribeButton } from '@readr-media/react-component'
import styled from 'styled-components'

import * as gtag from '~/utils/gtag'

const SubscribeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b2163;
  padding: 0 20px;
`

export default function Subscribe(): JSX.Element {
  return (
    <SubscribeWrapper>
      <SubscribeButton
        onClick={() => gtag.sendEvent('post', 'click', 'post-mailsubscribe')}
      />
    </SubscribeWrapper>
  )
}
