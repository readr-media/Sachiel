import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import type { Member } from '~/graphql/query/member'
import ArrowLeft from '~/public/icons/arr-left.svg'
import ArrowRight from '~/public/icons/arr-right.svg'
import { ValidJobTitles } from '~/types/common'

const Container = styled.div`
  position: relative;
  margin: 48px 20px;

  ${({ theme }) => `
    ${theme.breakpoint.md} {
      display: flex;
      justify-content: space-between;
      margin: 80px auto;
      max-width: 672px;
    }
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      max-width: 1096px;
    }
  `}
`

const IndexWrapper = styled.div``

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

const CardsList = styled.ul`
  display: grid;
  justify-items: center;
  align-content: start;
  grid-template-columns: 1fr;
  grid-gap: 20px; /* Safari 10-11 */
  gap: 20px; /* Safari 12+ */

  ${({ theme }) => `
    ${theme.breakpoint.md} {
      grid-template-columns: 1fr 1fr;
     
  `}
`

const Card = styled.li`
  position: relative;
  cursor: pointer;
  min-height: 160px;
  width: 280px;

  &.flipped {
    .card-front {
      transform: rotateY(180deg);
    }
    .card-back {
      transform: rotateY(0deg);
    }
  }

  ${({ theme }) => `
    ${theme.breakpoint.md} {
      width: 210.5px;
  `}
  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      min-height: 166px;
      width: 352px;
  `}
`

// Card Front
const CardFront = styled.div`
  font-family: 'Noto Sans TC';
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: transform 0.8s cubic-bezier(0.18, 0.885, 0.32, 1.28);

  .arr-right {
    position: absolute;
    right: 8px;
    top: 44px;
  }
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;

  :hover {
    cursor: pointer;
    svg {
      path {
        fill: #000928;
        fill-opacity: 1;
        transition: 0.3s ease;
      }
    }
    .arr-right {
      transform: translateX(4px);
      transition: transform 0.3s ease;
    }
  }
`

const Position = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #04295e;
  text-align: center;
`
const Name = styled.p`
  margin-top: 6px;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: rgba(0, 9, 40, 0.87);
  position: relative;
  z-index: 1;
  display: inline-block;
  text-align: center;

  &::before {
    content: attr(
      data-name
    ); // Pass the 'name' variable here to ensure that the text-decoration has the same length as the text.

    text-decoration-line: line-through;
    -webkit-text-decoration-line: line-through;
    text-decoration-color: #ebf02c;
    -webkit-text-decoration-color: #ebf02c;
    text-decoration-thickness: 10px;
    -webkit-text-decoration-thickness: 10px;

    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
  }

  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      font-size: 24px;
      line-height: 36px;
  `}
`
const Number = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0.03em;
  color: rgba(0, 9, 40, 0.87);
  display: flex;
  margin-bottom: 38px;
  .digit {
    text-align: center;
    box-shadow: inset 0px -1px 0px rgba(0, 9, 40, 0.87);
    width: 26px;
    height: 26px;
    margin: 8px;
  }
`

const Work = styled.div`
  padding: 12px 0;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #000928;
  width: 100%;
  background-color: #ebf02c;
  border-radius: 0px 0px 6px 6px;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
  &:hover {
    background-color: #04295e;
    color: #fff;
    cursor: pointer;
  }
`

// Card Back

const CardBack = styled.div`
  background: #ebf02c;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(180deg);
  transition: transform 0.8s cubic-bezier(0.18, 0.885, 0.32, 1.28);

  .arr-left {
    position: absolute;
    left: 8px;
    top: 68px;
  }
  :hover {
    svg {
      path {
        fill: #000928;
        fill-opacity: 1;
        transition: 0.3s ease;
      }
    }

    .arr-left {
      transform: translateX(-4px);
      transition: transform 0.3s ease;
    }
  }
  .number-back {
    margin-bottom: 0;
  }
`

const Caption = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  padding: 10px 32px;
  color: rgba(0, 9, 40, 0.66);
`

// Index Filter
const IndexFilter = styled.table`
  font-family: 'Noto Sans TC';
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.66);
  margin: auto;
  margin-bottom: 32px;
  width: 259px;

  ${({ theme }) => `
    ${theme.breakpoint.md} {
      width: 190px;
      margin-left: 21px;
    }
  `}

  ${({ theme }) => `
    ${theme.breakpoint.xl} {
      width: 238px;
    }
  `}
`

const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 0;
  border-bottom: 1px solid #ffffff;
  cursor: pointer;
  position: relative;
  :first-child {
    border-bottom: 3px solid #ffffff;
  }

  &.active {
    .position {
      color: #ebf02c;
    }

    .count {
      color: #ffffff;
    }

    &::before {
      content: '';
      position: absolute;
      top: 18px;
      left: -18px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6.5px 0 6.5px 11.3px;
      border-color: transparent transparent transparent #ebf02c;
    }
  }
`

export default function Members({
  title,
  language,
  members,
}: {
  title: string
  language: string
  members: Member[]
}): JSX.Element {
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState('1')
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members)
  const [indexData, setIndexData] = useState<
    Array<{ position: string; count: number; id: string; members: Member[] }>
  >([])
  const [indexFilterArrays, setIndexFilterArrays] = useState<{
    [key: string]: Member[]
  }>({})

  // Handle cards flip
  const handleClick = (
    memberId: string,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (flippedCards.includes(memberId)) {
      setFlippedCards(flippedCards.filter((id) => id !== memberId))
    } else {
      setFlippedCards([...flippedCards, memberId])
    }
    e.stopPropagation()
  }

  // Handle position translations and format
  type PositionTranslations = Record<string, Record<ValidJobTitles, string>>
  const positionTranslations: PositionTranslations = {
    en: {
      [ValidJobTitles.FRONT_END_ENGINEER]: 'Front-end Engineer',
      [ValidJobTitles.SOCIAL_MEDIA_EDITOR]: 'Social Media Editor, Journalist',
      [ValidJobTitles.JOURNALIST]: 'Journalist',
      [ValidJobTitles.PRODUCT_DESIGNER]: 'Product Designer',
      [ValidJobTitles.BACK_END_ENGINEER]: 'Back-end Engineer',
      [ValidJobTitles.EDITOR_IN_CHIEF]: 'Editor in Chief',
      [ValidJobTitles.FULL_STACK_ENGINEER]: 'Full-stack Engineer',
      [ValidJobTitles.FEATURE_PRODUCER]: 'Feature Producer, Journalist',
      [ValidJobTitles.PRODUCT_MANAGER]: 'Product Manager',
      [ValidJobTitles.APP_ENGINEER]: 'App Engineer',
    },
    ch: {
      [ValidJobTitles.FRONT_END_ENGINEER]: '前端工程師',
      [ValidJobTitles.SOCIAL_MEDIA_EDITOR]: '社群、記者',
      [ValidJobTitles.JOURNALIST]: '記者',
      [ValidJobTitles.PRODUCT_DESIGNER]: '設計師',
      [ValidJobTitles.BACK_END_ENGINEER]: '後端工程師',
      [ValidJobTitles.EDITOR_IN_CHIEF]: '總編輯',
      [ValidJobTitles.FULL_STACK_ENGINEER]: '全端工程師',
      [ValidJobTitles.FEATURE_PRODUCER]: '專題製作人、記者',
      [ValidJobTitles.PRODUCT_MANAGER]: '產品經理',
      [ValidJobTitles.APP_ENGINEER]: 'App工程師',
    },
  }

  const isValidJobTitle = (position: string): position is ValidJobTitles => {
    return Object.values(ValidJobTitles).includes(position as ValidJobTitles)
  }
  const formatAndTranslatePosition = (
    position: string,
    language: string
  ): string => {
    if (isValidJobTitle(position)) {
      return positionTranslations[language][position]
    } else {
      return position
    }
  }

  /*------- Mapping members and Filtering--------*/
  // Mapping members by job titles
  const mappingJobTitles: {
    'index-2': string[]
    'index-3': string[]
    'index-4': string[]
    'index-5': string[]
    'index-6': string[]
    [key: string]: string[]
  } = {
    'index-2': [ValidJobTitles.EDITOR_IN_CHIEF],
    'index-3': [ValidJobTitles.PRODUCT_MANAGER],
    'index-4': [ValidJobTitles.PRODUCT_DESIGNER],
    'index-5': [
      ValidJobTitles.JOURNALIST,
      ValidJobTitles.SOCIAL_MEDIA_EDITOR,
      ValidJobTitles.FEATURE_PRODUCER,
    ],
    'index-6': [
      ValidJobTitles.FRONT_END_ENGINEER,
      ValidJobTitles.BACK_END_ENGINEER,
      ValidJobTitles.FULL_STACK_ENGINEER,
      ValidJobTitles.APP_ENGINEER,
    ],
  }

  const filterByJobTitles = (members: Member[], jobTitles: string[]) => {
    return members.filter((member) => {
      return jobTitles.some((title) => member.title?.includes(title))
    })
  }

  useEffect(() => {
    // Compute the length of each member category and store it in state
    const indexFilterLengths: { [key: string]: number } = {}
    const indexFilterArrays: { [key: string]: any[] } = {}
    Object.keys(mappingJobTitles).forEach((index) => {
      const jobTitles = mappingJobTitles[index]
      const filtered = filterByJobTitles(members, jobTitles)
      indexFilterLengths[index] = filtered.length
      indexFilterArrays[index] = filtered
    })

    setIndexData([
      {
        position: language === 'ch' ? '全體' : 'All',
        count: members.length,
        id: '1',
        members: members,
      },
      {
        position: language === 'ch' ? '技術長' : 'Chief Editor',
        count: indexFilterLengths['index-2'],
        id: '2',
        members: indexFilterArrays['index-2'],
      },
      {
        position: language === 'ch' ? '產品經理' : 'Product Manager',
        count: indexFilterLengths['index-3'],
        id: '3',
        members: indexFilterArrays['index-3'],
      },
      {
        position: language === 'ch' ? '設計師' : 'Designer',
        count: indexFilterLengths['index-4'],
        id: '4',
        members: indexFilterArrays['index-4'],
      },
      {
        position:
          language === 'ch' ? '記者 / 社群' : 'Journalist, Social Media Editor',
        count: indexFilterLengths['index-5'],
        id: '5',
        members: indexFilterArrays['index-5'],
      },
      {
        position: language === 'ch' ? '工程師' : 'Engineer',
        count: indexFilterLengths['index-6'],
        id: '6',
        members: indexFilterArrays['index-6'],
      },
    ])
    setIndexFilterArrays(indexFilterArrays)
  }, [language])

  const filterHandler = (id: string) => {
    setActiveFilter(id)

    switch (id) {
      case '1':
        setFilteredMembers(members)
        break
      case '2':
        setFilteredMembers(indexFilterArrays['index-2'])
        break
      case '3':
        setFilteredMembers(indexFilterArrays['index-3'])
        break
      case '4':
        setFilteredMembers(indexFilterArrays['index-4'])
        break
      case '5':
        setFilteredMembers(indexFilterArrays['index-5'])
        break
      case '6':
        setFilteredMembers(indexFilterArrays['index-6'])
        break
      default:
        setFilteredMembers(members)
        break
    }
  }

  return (
    <Container>
      <IndexWrapper>
        <Title>{title}</Title>
        <IndexFilter>
          <tbody>
            {indexData.map((item) => (
              <Tr
                key={item.id}
                onClick={() => filterHandler(item.id)}
                className={activeFilter === item.id ? 'active' : ''}
              >
                <td className="position">{item.position}</td>
                <td className="count">{item.count}</td>
              </Tr>
            ))}
          </tbody>
        </IndexFilter>
      </IndexWrapper>

      <CardsList>
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            onClick={(e) => handleClick(member.id, e)}
            className={flippedCards.includes(member.id) ? 'flipped' : ''}
          >
            <CardFront className="card-front">
              <InfoWrapper>
                <ArrowRight className="arr-right" />
                <Position>
                  {formatAndTranslatePosition(member?.title ?? '', language)}
                </Position>
                {language === 'en' ? (
                  <>
                    <Name data-name={member.name_en}>{member.name_en}</Name>
                  </>
                ) : (
                  <>
                    <Name data-name={member.name}>{member.name}</Name>
                  </>
                )}
                <Number>
                  {member.special_number?.split('').map((digit, index) => {
                    return (
                      <div className="digit" key={index}>
                        {digit}
                      </div>
                    )
                  })}
                </Number>
              </InfoWrapper>
              {member.projects?.length === 0 ? (
                <Work
                  style={{
                    backgroundColor: '#E5E5E5',
                    color: 'grey',
                    pointerEvents: 'none',
                  }}
                >
                  尚無相關作品
                </Work>
              ) : (
                <Work onClick={(e) => e.stopPropagation()}>
                  <Link href={'/'}>相關作品</Link>
                </Work>
              )}
            </CardFront>
            <CardBack className="card-back">
              <ArrowLeft className="arr-left" />
              <Number className="number-back">
                {member.special_number?.split('').map((digit, index) => {
                  return (
                    <div className="digit" key={index}>
                      {digit}
                    </div>
                  )
                })}
              </Number>
              {language === 'en' ? (
                <Caption>{member.number_desc_en}</Caption>
              ) : (
                <Caption>{member.number_desc}</Caption>
              )}
            </CardBack>
          </Card>
        ))}
      </CardsList>
    </Container>
  )
}
