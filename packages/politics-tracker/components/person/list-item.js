import React from 'react'
import styled from 'styled-components'

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  justify-content: start;
  ${({ theme }) => theme.fontSize['title-sub']};
  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: row;
    ${({ theme }) => theme.fontSize['title-sub-md']};
  }
`
const ListItemTitle = styled.div`
  font-weight: 700;
  margin-bottom: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    min-width: 92px;
    margin-right: 40px;
  }
`
const ListItemContent = styled.div`
  display: flex;
  justify-content: start;
  font-weight: 500;
`

/**
 * @param {Object} props
 * @param {String} [props.title]
 * @param {String} [props.content]
 * @returns  {React.ReactElement}
 */
export default function ListItem({
  title = '標題',
  content = '小陳、妮妮、熊妮、開爺、金開、綜藝新苗、內褲歐巴、魔術手、睡眠王子',
}) {
  return (
    <ListItemContainer>
      <ListItemTitle>{title}</ListItemTitle>
      <ListItemContent>{content}</ListItemContent>
    </ListItemContainer>
  )
}
