import Link from 'next/link'
import styled from 'styled-components'

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

const Card = styled.div`
  font-family: 'Noto Sans TC';
  background: #fff;
  width: 280px;
  min-height: 160px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .arr-left {
    position: absolute;
    left: 8px;
    top: 68px;
  }

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
  line-height: 150%;
  color: rgba(0, 9, 40, 0.87);
  position: relative;
  z-index: 1;
  display: inline-block;
  text-align: center;

  &::before {
    content: attr(
      data-name
    ); // Pass the 'name' variable here to ensure that the text-decoration has the same length as the text.
    text-decoration: line-through 10px #ebf02c;
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
  }
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
  }
`

const members = {
  data: {
    authors: [
      {
        id: '60',
        isMember: true,
        name: '海綿寶寶',
        name_en: 'SpongeBob SquarePants',
        title: 'front-end engineer',
        title_en: 'front-end engineer',
        special_number: '1314',
        number_desc: '一森一墅',
        number_desc_en: 'a forest a maison',
        projects: [
          {
            id: '1',
            name: 'P#新聞實驗室',
          },
        ],
      },
      {
        id: '61',
        isMember: true,
        name: '派大星',
        name_en: 'Patrick Star',
        title: 'back-end engineer',
        title_en: 'back-end engineer',
        special_number: '2266',
        number_desc: '我的工作風格',
        number_desc_en: 'My working style',
        projects: [],
      },
    ],
  },
}

export default function Members({ title }: { title: string }): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>
      {members.data.authors.map((member) => (
        <Card key={member.id}>
          <ArrowLeft className="arr-left" />
          <ArrowRight className="arr-right" />
          <InfoWrapper>
            <Position>前端工程師</Position>
            <Name data-name={member.name}>{member.name}</Name>
            <Number>
              {member.special_number.split('').map((digit, index) => {
                return (
                  <div className="digit" key={index}>
                    {digit}
                  </div>
                )
              })}
            </Number>
          </InfoWrapper>
          {member.projects.length === 0 ? (
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
            <Work>
              <Link href={'/'}>相關作品</Link>
            </Work>
          )}
        </Card>
      ))}
    </Container>
  )
}
