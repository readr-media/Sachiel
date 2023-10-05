import Image from '@readr-media/react-image'
import styled from 'styled-components'

import RelatedLinks from '~/components/politics-detail/related-links'
import { SOURCE_DELIMITER } from '~/constants/politics'
import type { Repeat } from '~/types/politics-detail'

const ListWrapper = styled.li`
  padding: 20px;
  background: ${({ theme }) => theme.backgroundColor.black5};
  border-radius: 20px;

  & + * {
    margin-top: 12px;
  }
`

const Header = styled.div`
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.black10};
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + * {
    margin-top: 8px;
  }
`

const Content = styled.div`
  margin-bottom: 15px;

  .point {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    text-align: justify;
    color: rgba(15, 45, 53, 0.66);

    & + * {
      margin-top: 12px;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    .point {
      font-size: 18px;
    }
  }
`

const PartnerImage = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;

  margin-right: 8px;
  border-radius: 8px;
  overflow: hidden;
`

const Name = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 1.3;
  color: ${({ theme }) => theme.textColor.black};

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 16px;
  }
`

const PartnerInfo = styled.div`
  display: flex;
  align-items: center;
`

const SubTitle = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textColor.black50};

  svg {
    margin-right: 4px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

const Provider = styled.div`
  width: 100%;
  font-size: 12px;
  line-height: 1.5;
  padding: 4px 8px;
  background: #e8e8e8;
  color: ${({ theme }) => theme.textColor.black50};
  letter-spacing: 0.8px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type RepeatItemProps = {
  repeatItem: Repeat
}
export default function RepeatItem({
  repeatItem,
}: RepeatItemProps): JSX.Element {
  const { link, content, factcheckPartner, contributer } = repeatItem

  const factText = content.split(SOURCE_DELIMITER).map((item, index) => {
    return (
      <p key={index} className="point">
        {item}
      </p>
    )
  })

  return (
    <ListWrapper>
      <Header>
        <Title>
          <PartnerInfo>
            <PartnerImage>
              <Image
                images={{ original: factcheckPartner?.sLogo }}
                defaultImage="/images/default-head-photo.png"
                alt={factcheckPartner?.name}
                priority={false}
              />
            </PartnerImage>
            {factcheckPartner?.name && <Name>{factcheckPartner?.name}</Name>}
          </PartnerInfo>

          <SubTitle>查核單位</SubTitle>
        </Title>

        {contributer && <Provider>由{contributer}協助提供資料</Provider>}
      </Header>

      <Content>{factText}</Content>
      <RelatedLinks links={link} />
    </ListWrapper>
  )
}
