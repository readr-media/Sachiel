import Image from '@readr-media/react-image'
import styled from 'styled-components'

import RelatedLinks from '~/components/politics-detail/related-links'
import { SOURCE_DELIMITER } from '~/constants/politics'
import type { PoliticResponse } from '~/types/politics-detail'

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
  margin-bottom: 15px;

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

const ResponseImage = styled.div`
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
  line-height: 1.5;
  color: ${({ theme }) => theme.backgroundColor.black50};

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type ResponseItemProps = {
  responseItem: PoliticResponse
}
export default function ResponseItem({
  responseItem,
}: ResponseItemProps): JSX.Element {
  const {
    responseName = '',
    responsePic = '',
    responseTitle = '',
    content = '',
    link = '',
  } = responseItem

  const responseText = content.split(SOURCE_DELIMITER).map((item, index) => {
    return <p key={index}>{item}</p>
  })

  return (
    <ListWrapper>
      <Header>
        <ResponseImage>
          <Image
            images={{ original: responsePic }}
            defaultImage="/images/default-head-photo.png"
            alt={responseName}
            priority={false}
          />
        </ResponseImage>

        <div>
          {responseName && <Name>{responseName}</Name>}
          <Title>{responseTitle}</Title>
        </div>
      </Header>

      <Content>{responseText}</Content>
      <RelatedLinks links={link} />
    </ListWrapper>
  )
}
