import CustomImage from '@readr-media/react-image'
import React from 'react'
import styled from 'styled-components'

import CountGroup from '~/components/landing/election-2024/fact-check-group/president-comparison/count-group'
import PercentageBar from '~/components/landing/election-2024/fact-check-group/president-comparison/percentage-bar'
import Plus from '~/public/icons/plus.svg'

const Wrapper = styled.div`
  width: 100%;
  border-radius: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.backgroundColor.white};
  margin: auto;

  font-size: 12px;
  font-weight: 500;
  line-height: 14px;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0 auto;
    max-width: 790px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: calc(50% - 8px);
    margin: 0;
  }

  /* ${({ theme }) => theme.breakpoint.xxl} {
    max-width: 600px;
    margin: 0;
  } */
`

const Top = styled.div`
  padding: 16px 16px 20px;
  position: relative;

  color: rgba(15, 45, 53, 0.5);

  //dashed style
  background-image: linear-gradient(
    to right,
    rgba(15, 45, 53, 0.1) 50%,
    transparent 50%
  );
  background-size: 12px 1px;
  background-repeat: repeat-x;
  background-position: bottom;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 32px 32px 20px;
    display: flex;
    align-items: center;
    gap: 40px;
  }
`

const Bottom = styled.div`
  padding: 12px 16px 16px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 12px 20px 20px;
  }
`

const Button = styled.a`
  border-radius: 24px;
  padding: 8px 24px 8px 32px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 2px solid #000000;
  background: #f6ba31;

  color: #0f2d35;
  font-size: 16px;
  line-height: 1.8;

  &:hover {
    background-color: #b2800d;
  }

  svg {
    width: 20px;
    height: 20px;

    path {
      fill: #000000;
    }
  }
`

const SortTable = styled.div``

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin-top: 8px;

  > li {
    display: flex;
    align-items: center;
    color: rgba(15, 45, 53, 0.5);
    font-size: 12px;
    line-height: 14px;
  }

  .number {
    margin: 0px 4px 8px 0px;
  }
`

//FIXME: adjust style
const HeadShot = styled.div`
  margin: 0px auto 20px;
  width: 128px;
  height: 120px;

  ${({ theme }) => theme.breakpoint.md} {
    min-width: 166px;
    width: 166px;
    height: 156px;
  }
`

const CategoryTitle = styled.span<{ color: string }>`
  color: ${({ color }) => color || 'rgba(15, 45, 53, 0.5)'};
  font-size: 16px;
  line-height: 1.3;
  margin-right: 2px;
`

export default function ComparisonItem({ candidate }: any): JSX.Element {
  const {
    person_id = {},
    politicCategories = [],
    positionChangeCount = 0,
    factCheckCount = 0,
    expertPointCount = 0,
    repeatCount = 0,
    politicsCount = 0,
  } = candidate

  // get president candidate image
  let imageUrl: string = '/images/default-head-phot.png'

  switch (person_id.name) {
    case '賴清德':
      imageUrl = '/images/lai-ching-te-colored.png'
      break

    case '郭台銘':
      imageUrl = '/images/guo-tai-ming-colored.png'
      break

    case '侯友宜':
      imageUrl = '/images/hou-yu-ih-colored.png'
      break

    case '柯文哲':
      imageUrl = '/images/ko-wen-je-colored.png'
      break
  }

  return (
    <Wrapper>
      <Top>
        <HeadShot>
          <CustomImage
            images={{ original: imageUrl }}
            priority={true}
            alt={person_id.name}
          />
        </HeadShot>
        <div>
          <PercentageBar
            categories={politicCategories}
            candidateName={person_id.name}
            politicCount={politicsCount}
          />

          <SortTable>
            <p>Top 5 類別</p>
            <Categories>
              {politicCategories.map((category: any, index: number) => (
                <li key={category.id}>
                  <span className="number">{index + 1}</span>
                  <CategoryTitle color={category.displayColor}>
                    {category.name}
                  </CategoryTitle>
                  ({category.politicsCount})
                </li>
              ))}
            </Categories>
          </SortTable>
        </div>
      </Top>

      <Bottom>
        <CountGroup
          positionChangeCount={positionChangeCount}
          factCheckCount={factCheckCount}
          expertPointCount={expertPointCount}
          repeatCount={repeatCount}
        />

        <Button
          href={person_id.id ? `/politics/${person_id.id}/#addPolitic` : '/'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="add-politics"
        >
          新增更多政見
          <Plus />
        </Button>
      </Bottom>
    </Wrapper>
  )
}
