import styled from 'styled-components'

import ExpertItem from '~/components/politics-detail/toggle-lists/expert-point/expert-item'
import type { ExpertPoint } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type ExpertPointProps = {
  experts: ExpertPoint[]
}
export default function ExpertPoint({
  experts = [],
}: ExpertPointProps): JSX.Element {
  return (
    <Wrapper>
      <ul>
        {experts.map((value: ExpertPoint, index: number) => (
          <ExpertItem expertItem={value} key={index} />
        ))}
      </ul>
    </Wrapper>
  )
}
