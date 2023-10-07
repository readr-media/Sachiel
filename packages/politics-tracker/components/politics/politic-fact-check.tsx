import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import CorrectIcon from '~/public/icons/factcheck-correct.svg'
import IncorrectIcon from '~/public/icons/factcheck-incorrect.svg'
import ChangedIcon from '~/public/icons/position-changed.svg'
import ConsistentIcon from '~/public/icons/position-consistent.svg'
import SimilarIcon from '~/public/icons/similar-policies.svg'
import type { FactCheck, PositionChange } from '~/types/politics'

interface FactCheckAbstractProps {
  positionChange: PositionChange[]
  factCheck: FactCheck[]
}

const Wrapper = styled.div`
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
}: FactCheckAbstractProps): JSX.Element {
  // Check if at least one isChanged value is true
  const positionChanged = positionChange.some((change) => change.isChanged)

  // Check if all factCheckCorrect is true
  const factCheckCorrect = factCheck.every(
    (item) => item.checkResultType === 'correct'
  )
  console.log({ factCheckCorrect })

  return (
    <Wrapper>
      {/* 立場變化 */}
      {positionChange.length >= 1 && (
        <CheckAbstract>
          {positionChanged ? <ChangedIcon /> : <ConsistentIcon />}

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

      {/* 事實釐清*/}
      <CheckAbstract>
        {factCheckCorrect ? <CorrectIcon /> : <IncorrectIcon />}

        <span className={factCheckCorrect ? 'fact-correct' : 'fact-incorrect'}>
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

      <CheckAbstract>
        <ExpertIcon />
        <span className="expert">專家看點</span>
      </CheckAbstract>

      <CheckAbstract>
        <SimilarIcon />
        <span className="similar">相似政策</span>
      </CheckAbstract>
    </Wrapper>
  )
}
