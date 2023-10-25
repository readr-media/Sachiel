import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import FactCheckIcon from '~/public/icons/fact-check-icon.svg'
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
  row-gap: 8px;
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

  .title {
    color: #0f2d35a8;
  }
  .text {
    color: #544ac9;
  }
`

export default function FactCheckAbstract({
  positionChange,
  factCheck,
  expertPoint,
  repeat,
}: FactCheckAbstractProps): JSX.Element {
  function getCheckResultString(checkResultType, factCheck) {
    // If no match was found or the checkResultType is not '10' or null, use the mapping object.
    const checkResultMappings = {
      '1': '與所查資料相符',
      '2': '數據符合，但推論錯誤',
      '3': '數據符合，但與推論無關',
      '4': '數據符合，但僅取片段資訊，無法瞭解全貌',
      '5': '片面事實，有一些前提或關鍵事實被隱藏',
      '6': '與所查資料不符合，且推論過於簡化',
      '7': '不知道數據出處為何',
      '8': '數據並非例行統計，今年才發布',
      '9': '其說法並沒有提出證據',
      '10': factCheck.checkResultOther,
    }

    return checkResultMappings[checkResultType] || factCheck.checkResultOther
  }

  // If there are multiple position-changing statuses that conflict, show only the changed summaries.
  // Check if at least one 'isChanged' value is true.
  const isPositionChanged = positionChange?.some((change) => change.isChanged)
  const filteredPositionChangeArray = isPositionChanged
    ? positionChange.filter((change) => change.isChanged)
    : positionChange

  return (
    <Wrapper>
      {/* 事實釐清摘要*/}
      {factCheck.length >= 1 && (
        <CheckAbstract>
          <div>
            <FactCheckIcon />
          </div>
          <span>
            <span className="title">政見提出背景：</span>
            <span className="text">
              {factCheck.length > 1
                ? factCheck.map((fact, index) => (
                    <span key={index}>
                      {fact.factCheckSummary && (
                        <>
                          {`【${getCheckResultString(
                            fact.checkResultType,
                            fact
                          )}】`}
                          {fact.factCheckSummary}
                          {fact.factcheckPartner &&
                            ` (${fact.factcheckPartner})`}
                          {index < factCheck.length - 1 ? '、' : ''}
                        </>
                      )}
                    </span>
                  ))
                : factCheck.length === 1
                ? factCheck[0]?.factCheckSummary
                : ''}
            </span>
          </span>
        </CheckAbstract>
      )}

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

      {/* 專家看點摘要 */}
      {expertPoint.length >= 1 && expertPoint[0].expertPointSummary && (
        <CheckAbstract>
          <div className="mt-[2px]">
            <ExpertIcon />
          </div>
          <span>
            <span className="title">專家看點：</span>
            <span className="text">
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
          </span>
        </CheckAbstract>
      )}

      {/* 相似政策摘要 */}
      {repeat.length >= 1 && (
        <CheckAbstract>
          <div>
            <SimilarIcon />
          </div>
          <span>
            <span className="title">相似政策：</span>
            <span className="text">
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
          </span>
        </CheckAbstract>
      )}
    </Wrapper>
  )
}
