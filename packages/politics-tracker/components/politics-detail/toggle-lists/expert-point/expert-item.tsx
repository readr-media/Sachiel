import Image from '@readr-media/react-image'
import styled from 'styled-components'

import RelatedLinks from '~/components/politics-detail/related-links'
import { SOURCE_DELIMITER } from '~/constants/politics'
import ExpertIcon from '~/public/icons/expert-opinion.svg'
import type { ExpertPoint } from '~/types/politics-detail'

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
  display: flex;
  flex-direction: column;
  gap: 12px;

  > p {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    text-align: justify;
    color: rgba(15, 45, 53, 0.66);
  }
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

type ExpertItemProps = {
  expertItem: ExpertPoint
}
export default function ExpertItem({
  expertItem,
}: ExpertItemProps): JSX.Element {
  const { avatar, expert, title, content, link, expertPointSummary } =
    expertItem

  const pointText = content.split(SOURCE_DELIMITER).map((item, index) => {
    return (
      <p key={index} className="point">
        {item}
      </p>
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

        {pointText}
      </Content>
      <RelatedLinks links={link} />
    </ListWrapper>
  )
}
