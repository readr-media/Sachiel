import { Comment } from '@readr-media/react-feedback/dist/typedef'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;
`

const Header = styled.div``

const Time = styled.time`
  color: rgba(15, 45, 53, 0.5);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`

const Content = styled.div`
  color: #0f2d35;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
`

type CommentItemProps = {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <Wrapper>
      <Header>
        <Time>{comment.date}</Time>
      </Header>
      <Content>{comment.content}</Content>
    </Wrapper>
  )
}
