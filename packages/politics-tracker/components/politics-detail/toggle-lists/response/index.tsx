import styled from 'styled-components'

import ResponseItem from '~/components/politics-detail/toggle-lists/response/response-item'
import type { PoliticResponse } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type ResponseProps = {
  responses: PoliticResponse[]
}
export default function Response({
  responses = [],
}: ResponseProps): JSX.Element {
  return (
    <Wrapper>
      <ul>
        {responses.map((value: PoliticResponse) => (
          <ResponseItem responseItem={value} key={value.id} />
        ))}
      </ul>
    </Wrapper>
  )
}
