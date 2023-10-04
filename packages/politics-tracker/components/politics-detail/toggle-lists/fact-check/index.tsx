import styled from 'styled-components'

import FactItem from '~/components/politics-detail/toggle-lists/fact-check/fact-item'
import type { FactCheck } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type FactCheckProps = {
  facts: FactCheck[]
}
export default function FactCheck({ facts = [] }: FactCheckProps): JSX.Element {
  return (
    <Wrapper>
      <ul>
        {facts.map((value: FactCheck, index: number) => (
          <FactItem factItem={value} key={index} />
        ))}
      </ul>
    </Wrapper>
  )
}
