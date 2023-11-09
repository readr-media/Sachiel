import styled from 'styled-components'

import RepeatItem from '~/components/politics-detail/toggle-lists/repeat/repeat-item'
import type { PoliticRepeat } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 12px 0px 40px;
`

type RepeatProps = {
  repeats: PoliticRepeat[]
}
export default function Repeat({ repeats = [] }: RepeatProps): JSX.Element {
  return (
    <Wrapper>
      <ul>
        {repeats.map((value: PoliticRepeat, index: number) => (
          <RepeatItem repeatItem={value} key={index} />
        ))}
      </ul>
    </Wrapper>
  )
}
