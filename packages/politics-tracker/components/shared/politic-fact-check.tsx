import styled from 'styled-components'

import ExpertIcon from '~/public/icons/expert-opinion.svg'
import FactCheckIcon from '~/public/icons/fact-check-icon.svg'
import PositionIcon from '~/public/icons/position-icon.svg'
import SimilarIcon from '~/public/icons/similar-policies.svg'
import type {
  ExpertPoint,
  FactCheck,
  FactCheckPartner,
  PositionChange,
  Repeat,
} from '~/types/politics'
import { getCheckResultString, getPositionChangeString } from '~/utils/utils'

type FactCheckAbstractProps = {
  positionChange: PositionChange[]
  factCheck: FactCheck[]
  expertPoint: ExpertPoint[]
  repeat: Repeat[]
  landing: boolean
}

const Wrapper = styled.div<{ landing: boolean }>`
  display: grid;
  row-gap: 8px;
  column-gap: 20px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  padding: ${({ landing }) => (landing ? '0 0 8px' : '12px 0')};

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    line-height: 16px;
    grid-template-columns: ${({ landing }) =>
      landing ? 'auto' : 'repeat(2, 1fr)'};
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
  positionChange = [],
  factCheck = [],
  expertPoint = [],
  repeat = [],
  landing = false,
}: FactCheckAbstractProps): JSX.Element | null {
  if (
    !positionChange.length &&
    !factCheck.length &&
    !expertPoint.length &&
    !repeat.length
  ) {
    return null
  }

  // Create an object to group partners by isChanged
  type FactCheckPartnerGroup = Record<string, FactCheckPartner[]>
  const groupedPartners: FactCheckPartnerGroup = {}

  positionChange.forEach((change) => {
    if (!groupedPartners[change.isChanged]) {
      groupedPartners[change.isChanged] = []
    }
    if (change.factcheckPartner) {
      groupedPartners[change.isChanged].push(change.factcheckPartner)
    }
  })

  function renderPositionChanges(groupedPartners: FactCheckPartnerGroup) {
    const renderedPositionChanges = Object.keys(groupedPartners).map(
      (key, index) => {
        const partners = groupedPartners[key]
        const positionChangeString = getPositionChangeString(key)
        const partnerString = partners.map((item) => item.name).join('、')

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
    <Wrapper landing={landing}>
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
                <span key={fact.id}>
                  {fact.factCheckSummary && (
                    <>
                      {`【${getCheckResultString(
                        fact.checkResultType ?? '10',
                        fact
                      )}】`}
                      {fact.factCheckSummary}
                      {fact.factcheckPartner &&
                        ` (${fact.factcheckPartner.name})`}
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
                    <span key={expert.id}>
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
                    <span key={re.id}>
                      {re.repeatSummary && (
                        <>
                          {re.repeatSummary}
                          {re.factcheckPartner &&
                            ` (${re.factcheckPartner.name})`}
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
