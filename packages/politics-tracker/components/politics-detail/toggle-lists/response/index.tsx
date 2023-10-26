import styled from 'styled-components'

import ResponseItem from '~/components/politics-detail/toggle-lists/response/response-item'
import type { Response } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type ResponseProps = {
  responses: Response[]
}
export default function Response({
  responses = [],
}: ResponseProps): JSX.Element {
  return (
    <Wrapper>
      <ul>
        {responses.map((value: Response, index: number) => (
          <ResponseItem responseItem={value} key={index} />
        ))}
      </ul>
    </Wrapper>
  )
}
