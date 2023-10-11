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
  gap: 4px;

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
  // If there are multiple position-changing statuses that conflict, show only the changed summaries.
  // Check if at least one 'isChanged' value is true.
  const isPositionChanged = positionChange?.some((change) => change.isChanged)
  const filteredPositionChangeArray = isPositionChanged
    ? positionChange.filter((change) => change.isChanged)
    : positionChange

  // If there are multiple fact-checking statuses that conflict, show only the 'incorrect' and 'partial' summaries.
  // Check if all 'factCheckCorrect' values are true.
  const isFactCheckCorrect = factCheck?.every(
    (item) => item.checkResultType === 'correct'
  )
  const filteredFactCheckArray = isFactCheckCorrect
    ? factCheck
    : factCheck.filter(
        (item) =>
          item.checkResultType === 'incorrect' ||
          item.checkResultType === 'partial'
      )

  return (
    <Wrapper>
      {/* 立場變化摘要 */}
      {filteredPositionChangeArray.length >= 1 && (
        <CheckAbstract>
          <div>{isPositionChanged ? <ChangedIcon /> : <ConsistentIcon />}</div>

          <span
            className={
              isPositionChanged ? 'position-changed' : 'position-consistent'
            }
          >
            立場變化：
            {filteredPositionChangeArray.length > 1
              ? filteredPositionChangeArray.map((change, index) => (
                  <span key={index}>
                    {change.positionChangeSummary}
                    {change.factcheckPartner && ` (${change.factcheckPartner})`}
                    {index < filteredPositionChangeArray.length - 1 ? '、' : ''}
                  </span>
                ))
              : filteredPositionChangeArray.length === 1
              ? filteredPositionChangeArray[0]?.positionChangeSummary
              : ''}
          </span>
        </CheckAbstract>
      )}

      {/* 事實釐清摘要*/}
      {filteredFactCheckArray.length >= 1 && (
        <CheckAbstract>
          <div>{isFactCheckCorrect ? <CorrectIcon /> : <IncorrectIcon />}</div>

          <span
            className={isFactCheckCorrect ? 'fact-correct' : 'fact-incorrect'}
          >
            事實釐清：
            {filteredFactCheckArray.length > 1
              ? filteredFactCheckArray.map((fact, index) => (
                  <span key={index}>
                    {fact.factCheckSummary}
                    {fact.factcheckPartner && ` (${fact.factcheckPartner})`}
                    {index < filteredFactCheckArray.length - 1 ? '、' : ''}
                  </span>
                ))
              : filteredFactCheckArray.length === 1
              ? filteredFactCheckArray[0]?.factCheckSummary
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
                    {re.repeatSummary && (
                      <>
                        {re.repeatSummary}
                        {re.factcheckPartner && ` (${re.factcheckPartner})`}
                        {index < repeat.length - 1 ? '、' : ''}
                      </>
                    )}
                  </span>
                ))
              : repeat.length === 1
              ? repeat[0]?.repeatSummary
              : ''}
          </span>
        </CheckAbstract>
      )}
    </Wrapper>
  )
}
