import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import CorrectIcon from '~/public/icons/factcheck-correct.svg'
import IncorrectIcon from '~/public/icons/factcheck-incorrect.svg'
import ChangedIcon from '~/public/icons/position-changed.svg'
import ConsistentIcon from '~/public/icons/position-consistent.svg'
import SimilarIcon from '~/public/icons/similar-policies.svg'
import type {
  ExpertPoint,
  FactCheck,
  PositionChange,
  Repeat,
} from '~/types/politics'

interface FactCheckAbstractProps {
  positionChange: PositionChange[]
  factCheck: FactCheck[]
  expertPoint: ExpertPoint[]
  repeat: Repeat[]
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 4px;
  column-gap: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  padding: 12px 0;

  font-size: 12px;
  font-weight: 500;
  line-height: 14px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    line-height: 16px;
  }
`
const CheckAbstract = styled.div`
  display: flex;

  span {
    margin-left: 4px;
  }

  .position-changed {
    color: #b2800d;
  }
  .position-consistent {
    color: #838383;
  }
  .fact-correct {
    color: #208f96;
  }
  .fact-incorrect {
    color: #c0374f;
  }
  .expert {
    color: #544ac9;
  }
  .similar {
    color: #838383;
  }
`

export default function FactCheckAbstract({
  positionChange,
  factCheck,
  expertPoint,
  repeat,
}: FactCheckAbstractProps): JSX.Element {
  // Check if at least one isChanged value is true
  const positionChanged = positionChange?.some((change) => change.isChanged)

  // Check if all factCheckCorrect is true
  const factCheckCorrect = factCheck?.every(
    (item) => item.checkResultType === 'correct'
  )

  return (
    <Wrapper>
      {/* 立場變化摘要 */}
      {positionChange.length >= 1 && (
        <CheckAbstract>
          <div>{positionChanged ? <ChangedIcon /> : <ConsistentIcon />}</div>

          <span
            className={
              positionChanged ? 'position-changed' : 'position-consistent'
            }
          >
            立場變化：
            {positionChange.length > 1
              ? positionChange.map((change, index) => (
                  <span key={index}>
                    {change.positionChangeSummary}
                    {change.factcheckPartner && ` (${change.factcheckPartner})`}
                    {index < positionChange.length - 1 ? '、' : ''}
                  </span>
                ))
              : positionChange.length === 1
              ? positionChange[0]?.positionChangeSummary
              : ''}
          </span>
        </CheckAbstract>
      )}

      {/* 事實釐清摘要*/}
      {factCheck.length >= 1 && (
        <CheckAbstract>
          <div>{factCheckCorrect ? <CorrectIcon /> : <IncorrectIcon />}</div>

          <span
            className={factCheckCorrect ? 'fact-correct' : 'fact-incorrect'}
          >
            事實釐清：
            {factCheck.length > 1
              ? factCheck.map((fact, index) => (
                  <span key={index}>
                    {fact.factCheckSummary}
                    {fact.factcheckPartner && ` (${fact.factcheckPartner})`}
                    {index < factCheck.length - 1 ? '、' : ''}
                  </span>
                ))
              : factCheck.length === 1
              ? factCheck[0]?.factCheckSummary
              : ''}
          </span>
        </CheckAbstract>
      )}

      {/* 專家看點摘要 */}
      {expertPoint.length >= 1 && expertPoint[0].expertPointSummary && (
        <CheckAbstract>
          <div>
            <ExpertIcon />
          </div>
          <span className="expert">
            專家看點：
            {expertPoint.length > 1
              ? expertPoint.map((expert, index) => (
                  <span key={index}>
                    {expert.expertPointSummary}
                    {expert.expert && ` (${expert.expert})`}
                    {index < expertPoint.length - 1 ? '、' : ''}
                  </span>
                ))
              : expertPoint.length === 1
              ? expertPoint[0]?.expertPointSummary
              : ''}
          </span>
        </CheckAbstract>
      )}

      {/* 相似政策摘要 */}
      {repeat.length >= 1 && (
        <CheckAbstract>
          <div>
            <SimilarIcon />
          </div>
          <span className="similar">
            相似政策：
            {repeat.length > 1
              ? repeat.map((re, index) => (
                  <span key={index}>
                    {re.content}
                    {re.factcheckPartner && ` (${re.factcheckPartner})`}
                    {index < repeat.length - 1 ? '、' : ''}
                  </span>
                ))
              : repeat.length === 1
              ? repeat[0]?.content
              : ''}
          </span>
        </CheckAbstract>
      )}
    </Wrapper>
  )
}
