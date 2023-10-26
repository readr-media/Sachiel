import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import FactCheckIcon from '~/public/icons/fact-check-icon.svg'
import PositionIcon from '~/public/icons/position-icon.svg'
import SimilarIcon from '~/public/icons/similar-policies.svg'
import type {
  ExpertPoint,
  FactCheck,
  PositionChange,
  Repeat,
} from '~/types/politics'

type FactCheckAbstractProps = {
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
  function getCheckResultString(checkResultType: string, factCheck: FactCheck) {
    const checkResultMappings: { [key: string]: string } = {
      '1': '與所查資料相符',
      '2': '數據符合，但推論錯誤',
      '3': '數據符合，但與推論無關',
      '4': '數據符合，但僅取片段資訊，無法瞭解全貌',
      '5': '片面事實，有一些前提或關鍵事實被隱藏',
      '6': '與所查資料不符合，且推論過於簡化',
      '7': '不知道數據出處為何',
      '8': '數據並非例行統計，今年才發布',
      '9': '其說法並沒有提出證據',
    }

    if (checkResultType === '10' && factCheck.checkResultOther) {
      return factCheck.checkResultOther
    }

    return checkResultMappings[checkResultType] || factCheck.checkResultOther
  }

  function getPositionChangeString(isChanged: string) {
    const positionChangeMappings: { [key: string]: string } = {
      same: '曾持相同意見',
      changed: '曾持不同意見',
      noComment: '當時未表態',
    }

    return positionChangeMappings[isChanged] || '曾持相同意見'
  }

  type FactCheckPartner = {
    name: string
  }

  // Create an object to group partners by isChanged
  const groupedPartners: { [key: string]: FactCheckPartner[] } = {}

  positionChange.forEach((change) => {
    if (!groupedPartners[change.isChanged]) {
      groupedPartners[change.isChanged] = []
    }
    if (change.factcheckPartner) {
      groupedPartners[change.isChanged].push(change.factcheckPartner)
    }
  })

  function renderPositionChanges(groupedPartners: {
    [key: string]: FactCheckPartner[]
  }) {
    const renderedPositionChanges = Object.keys(groupedPartners).map(
      (key, index) => {
        const partners = groupedPartners[key]
        const positionChangeString = getPositionChangeString(key)
        const partnerString = partners.join('、')
        return (
          <span key={key}>
            {index > 0 ? '、' : ''}
            {`【${positionChangeString}】`}
            {partnerString && ` (${partnerString})`}
          </span>
        )
      }
    )

    return renderedPositionChanges
  }

  return (
    <Wrapper>
      {/* 政見提出背景摘要*/}
      {factCheck.length >= 1 && (
        <CheckAbstract>
          <div>
            <FactCheckIcon />
          </div>
          <span>
            <span className="title">政見提出背景：</span>
            <span className="text">
              {factCheck.map((fact, index) => (
                <span key={index}>
                  {fact.factCheckSummary && (
                    <>
                      {`【${getCheckResultString(
                        fact.checkResultType ?? '10',
                        fact
                      )}】`}
                      {fact.factCheckSummary}
                      {fact.factcheckPartner && ` (${fact.factcheckPartner})`}
                      {index < factCheck.length - 1 ? '、' : ''}
                    </>
                  )}
                </span>
              ))}
            </span>
          </span>
        </CheckAbstract>
      )}

      {/* 立場變化摘要 */}
      {positionChange.length >= 1 && (
        <CheckAbstract>
          <div>
            <PositionIcon />
          </div>

          <span className="text">
            <span className="title">候選人過去主張：</span>
            {renderPositionChanges(groupedPartners)}
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
          <div className="mt-[2px]">
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
