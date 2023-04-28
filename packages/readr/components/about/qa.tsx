import styled from 'styled-components'

import QAList from '~/components/readr-media-react-qa-list-v2.0.1'
//Components copied from @readr-media-react-qa-list v2.0.1
import type { QaList } from '~/graphql/query/qa'
import IconTailArrow from '~/public/icons/tail-arrow.svg'

const Container = styled.div`
  position: relative;
  margin: 48px 20px;
  .tail-arrow {
    height: 37px;
    margin-top: 44px;
  }
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      display: flex;
      justify-content: space-between;
      margin: 80px auto;
      max-width: 672px;
      .tail-arrow {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      max-width: 1096px;
      .tail-arrow {
        height: 73px;
      }
    }
  `}
`

const Title = styled.h2`
  font-family: 'Noto Sans TC';
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 20px;
  min-width: fit-content;
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      font-size: 36px;
    }
  `}
`

const QaWrapper = styled.ul`
  min-height: 100px;
  width: 100%;
  ${({ theme }) => `
    ${theme.breakpoint.md} {
      width: 441px;
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      width: 724px;
    }
  `}
`

export default function Qa({
  language,
  title,
  qaLists,
}: {
  language: string
  title: string
  qaLists: QaList[]
}): JSX.Element {
  const questions =
    (language === 'ch' ? qaLists[1]?.items : qaLists[0]?.items) ?? []

  return (
    <Container>
      <Title>{title}</Title>
      <QaWrapper>{questions && <QAList questions={questions} />}</QaWrapper>
      <IconTailArrow />
    </Container>
  )
}
