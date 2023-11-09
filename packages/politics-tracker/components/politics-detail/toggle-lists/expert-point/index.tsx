import styled from 'styled-components'

import DefaultText from '~/components/politics-detail/default-text'
import ExpertItem from '~/components/politics-detail/toggle-lists/expert-point/expert-item'
import type { PoliticExpert } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type ExpertPointProps = {
  experts: PoliticExpert[]
}
export default function ExpertPoint({
  experts = [],
}: ExpertPointProps): JSX.Element {
  return (
    <Wrapper>
      {experts.length > 0 ? (
        <ul>
          {experts.map((value: PoliticExpert, index: number) => (
            <ExpertItem expertItem={value} key={index} />
          ))}
        </ul>
      ) : (
        <DefaultText title="專家看點" />
      )}
    </Wrapper>
  )
}
