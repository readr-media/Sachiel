import styled from 'styled-components'

import FactItem from '~/components/politics-detail/toggle-lists/fact-check/fact-item'
import type { PoliticFactCheck } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type FactCheckProps = {
  facts: PoliticFactCheck[]
}
export default function FactCheck({ facts = [] }: FactCheckProps): JSX.Element {
  return (
    <Wrapper>
      <ul>
        {facts.map((value: PoliticFactCheck, index: number) => (
          <FactItem factItem={value} key={index} />
        ))}
      </ul>
    </Wrapper>
  )
}
