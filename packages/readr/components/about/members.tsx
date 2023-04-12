import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import type { Member } from '~/graphql/query/member'
import ArrowLeft from '~/public/icons/arr-left.svg'
import ArrowRight from '~/public/icons/arr-right.svg'

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

  &.active {
    border-bottom: 3px solid #ffffff;

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
  console.log({ language }, members)
  const [flippedCards, setFlippedCards] = useState<string[]>([])

  const handleClick = (
    memberId: string,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (flippedCards.includes(memberId)) {
      setFlippedCards(flippedCards.filter((id) => id !== memberId))
      console.log(`Card ${memberId} unflipped`)
    } else {
      setFlippedCards([...flippedCards, memberId])
      console.log(`Card ${memberId} flipped`)
    }
    e.stopPropagation()
  }

  const positionTranslations: {
    [key: string]: {
      [key: string]: string
    }
  } = {
    en: {
      'front-end engineer': 'Front-end Engineer',
      'social media editor': 'Social Media Editor, Journalist',
      journalist: 'Journalist',
      'product designer': 'Product Designer',
      'back-end engineer': 'Back-end Engineer',
      'editor in chief': 'Editor in Chief',
      'full-stack engineer': 'Full-stack Engineer',
      'Feature Producer': 'Feature Producer, Journalist',
      'product manager': 'Product Manager',
      'App engineer': 'App Engineer',
    },
    ch: {
      'front-end engineer': '前端工程師',
      'social media editor': '社群、記者',
      journalist: '記者',
      'product designer': '設計師',
      'back-end engineer': '後端工程師',
      'editor in chief': '總編輯',
      'full-stack engineer': '全端工程師',
      'Feature Producer': '專題製作人、記者',
      'product manager': '產品經理',
      'App engineer': 'App工程師',
    },
  }

  const formatPosition = (position: string, language: string): string => {
    return positionTranslations[language]?.[position] ?? position
  }

  let indexData: Array<{ position: string; count: number }> = [
    { position: 'all', count: 0 },
    { position: 'Chief Editor', count: 0 },
    { position: 'Product Manager', count: 0 },
    { position: 'Designer', count: 0 },
    { position: 'Journalist, Social Media Editor', count: 0 },
    { position: 'Engineer', count: 0 },
  ]

  // Count the number of each position
  let chiefEditorCount = 0
  let productManagerCount = 0
  let designerCount = 0
  let engineerCount = 0
  let journalistCount = 0
  let allCount = 0

  members?.forEach((member) => {
    if (member.title?.includes('editor in chief')) {
      const chiefEditor = indexData.find(
        (item) => item.position === 'Chief Editor'
      )
      if (chiefEditor) {
        chiefEditor.count++
        chiefEditorCount++
      }
    } else if (member.title?.includes('product manager')) {
      const productManager = indexData.find(
        (item) => item.position === 'Product Manager'
      )
      if (productManager) {
        productManager.count++
        productManagerCount++
      }
    } else if (member.title?.includes('designer')) {
      const designer = indexData.find((item) => item.position === 'Designer')
      if (designer) {
        designer.count++
        designerCount++
      }
    } else if (
      member.title?.includes('front-end engineer') ||
      member.title?.includes('back-end engineer') ||
      member.title?.includes('full-stack engineer') ||
      member.title?.includes('App engineer')
    ) {
      const engineer = indexData.find((item) => item.position === 'Engineer')
      if (engineer) {
        engineer.count++
        engineerCount++
      }
    } else if (
      member.title?.includes('journalist') ||
      member.title?.includes('social media editor') ||
      member.title?.includes('Feature Producer')
    ) {
      const journalist = indexData.find(
        (item) => item.position === 'Journalist, Social Media Editor'
      )
      if (journalist) {
        journalist.count++
        journalistCount++
      }
    }
    // Increment the count for 'all' positions
    const all = indexData.find((item) => item.position === 'all')
    if (all) {
      all.count++
      allCount++
    }
  })

  // Set the indexData array with updated counts for each position
  if (language === 'en') {
    indexData = [
      { position: 'all', count: allCount },
      { position: 'Chief Editor', count: chiefEditorCount },
      { position: 'Product Manager', count: productManagerCount },
      { position: 'Designer', count: designerCount },
      { position: 'Journalist, Social Media Editor', count: journalistCount },
      { position: 'Engineer', count: engineerCount },
    ]
  } else if (language === 'ch') {
    indexData = [
      { position: '全體', count: allCount },
      { position: '技術長', count: chiefEditorCount },
      { position: '產品經理', count: productManagerCount },
      { position: '設計師', count: designerCount },
      { position: '記者 / 社群', count: journalistCount },
      { position: '工程師', count: engineerCount },
    ]
  }

  return (
    <Container>
      <IndexWrapper>
        <Title>{title}</Title>
        <IndexFilter>
          <tbody>
            {indexData.map((item, index) => (
              <Tr key={index}>
                <td className="position">{item.position}</td>
                <td className="count">{item.count}</td>
              </Tr>
            ))}
          </tbody>
        </IndexFilter>
      </IndexWrapper>

      <CardsList>
        {members.map((member) => (
          <Card
            key={member.id}
            onClick={(e) => handleClick(member.id, e)}
            className={flippedCards.includes(member.id) ? 'flipped' : ''}
          >
            <CardFront className="card-front">
              <InfoWrapper>
                <ArrowRight className="arr-right" />
                <Position>
                  {formatPosition(member?.title ?? '', language)}
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
