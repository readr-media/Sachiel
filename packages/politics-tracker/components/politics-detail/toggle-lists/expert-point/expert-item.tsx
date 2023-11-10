import Image from '@readr-media/react-image'
import styled from 'styled-components'

import RelatedLinks from '~/components/politics-detail/related-links'
import { SOURCE_DELIMITER } from '~/constants/politics'
import ExpertIcon from '~/public/icons/expert-opinion.svg'
import type { PoliticExpert } from '~/types/politics-detail'
import { generateSourceMeta } from '~/utils/utils'

const ListWrapper = styled.li`
  padding: 20px;
  background: ${({ theme }) => theme.backgroundColor.black5};
  border-radius: 20px;

  & + * {
    margin-top: 12px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const Content = styled.div`
  margin-bottom: 16px;
`

const ExpertImage = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;

  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.textColor.white};

  ${({ theme }) => theme.breakpoint.md} {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
  }
`

const Name = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.3;
  color: ${({ theme }) => theme.textColor.black};

  & + * {
    margin-top: 4px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }
`

const Title = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme }) => theme.backgroundColor.black50};

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

const Summary = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme }) => theme.textColor.blue};
  margin-bottom: 12px;

  svg {
    margin-right: 4px;

    path {
      fill: ${({ theme }) => theme.textColor.blue};
      fill-opacity: 1;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

const TextGroup = styled.div`
  > p {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    text-align: justify;
    color: rgba(15, 45, 53, 0.66);

    & + * {
      margin-top: 12px;
    }
  }
`

const Contributer = styled.span`
  font-weight: 500;
  font-size: 12px;
  display: inline-block;
  margin-top: 4px;
  color: ${({ theme }) => theme.backgroundColor.black50};

  a {
    color: ${({ theme }) => theme.textColor.brown};
    word-break: break-all;
    cursor: pointer;
    line-height: 1.5;

    &:hover {
      text-decoration-line: underline;
      text-underline-offset: 3.5px;
      text-decoration-thickness: 1.5px;
    }

    & + a::before,
    & + span::before {
      content: '、';
      color: ${({ theme }) => theme.backgroundColor.black50};
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type ExpertItemProps = {
  expertItem: PoliticExpert
}
export default function ExpertItem({
  expertItem,
}: ExpertItemProps): JSX.Element {
  const {
    avatar = '',
    expert = '',
    title = '',
    content = '',
    link = '',
    expertPointSummary = ' ',
    contributer = '',
  } = expertItem

  const pointText = content.split(SOURCE_DELIMITER).map((item, index) => {
    return (
      <p key={index} className="point">
        {item}
      </p>
    )
  })

  const contributers = contributer
    .split(SOURCE_DELIMITER)
    .map((content: string, index: number) => {
      const { isLink, link, text } = generateSourceMeta(content, '', index + 1)

      return isLink ? (
        <a key={index} href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <span key={index}>{text}</span>
      )
    })

  return (
    <ListWrapper>
      <Header>
        <ExpertImage>
          <Image
            images={{ original: avatar }}
            defaultImage="/images/default-head-photo.png"
            alt={expert}
            priority={false}
          />
        </ExpertImage>

        <div>
          {expert && <Name>{expert}</Name>}
          <Title>{title}</Title>
        </div>
      </Header>

      <Content>
        {expertPointSummary && (
          <Summary>
            <ExpertIcon /> {expertPointSummary}
          </Summary>
        )}

        <TextGroup>{pointText}</TextGroup>

        {contributer && <Contributer>資料由 {contributers} 提供</Contributer>}
      </Content>
      <RelatedLinks links={link} />
    </ListWrapper>
  )
}
