import styled from 'styled-components'

import IconLoadMore from '~/public/icons/load-more.svg'

const Container = styled.div`
  color: #000928;
  font-size: 15px;
  line-height: 1.5;
  padding-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 18px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    padding-top: 30px;
    padding-left: 13.5%;
    padding-right: 13.5%;
    margin-bottom: 22px;
  }
`

const Intro = styled.p`
  font-weight: 700;
  letter-spacing: 2.5px;
  margin-bottom: 18px;

  ${({ theme }) => theme.breakpoint.md} {
    text-align: center;
    margin-bottom: 22px;
  }
`

const ListHeader = styled.div`
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 4px;

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 8px;
  }

  > span:last-child {
    display: none;

    ${({ theme }) => theme.breakpoint.md} {
      display: inline;
    }
  }
`

const ListContainer = styled.ul`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const Control = styled.div`
  text-align: center;
  margin-top: 8px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 10px;
  }
`
const LoadMoreButton = styled.button`
  user-select: none;

  > p {
    color: #000928;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 2.5px;
    // to offset letter-spacing at the rightmost
    margin-left: 2.5px;
    margin-bottom: 8px;
  }
  > svg {
    margin-left: auto;
    margin-right: auto;
  }
`

export default function OpenDataList(): JSX.Element {
  return (
    <Container>
      <Intro>
        READr
        致力於產製資料驅動的新聞報導，並將所使用的資料公開，以下為公開的資料，歡迎再加以利用！
      </Intro>
      <ListHeader>
        <span>資料列表</span>
        <span>資料怎麼用</span>
      </ListHeader>
      <ListContainer></ListContainer>
      <Control>
        <LoadMoreButton>
          <p>看更多</p>
          <IconLoadMore />
        </LoadMoreButton>
      </Control>
    </Container>
  )
}
