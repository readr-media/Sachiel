import styled from 'styled-components'

import DefaultText from '~/components/politics-detail/shared/default-text'
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
  const expertItems = experts.map((value: ExpertPoint, index: number) => (
    <ExpertItem expertItem={value} key={index} />
  ))

  return (
    <Wrapper>
      {!!experts.length ? (
        <ul>{expertItems}</ul>
      ) : (
        <DefaultText title="專家看點" />
      )}
    </Wrapper>
  )
}
