import { useMemo } from 'react'
import styled from 'styled-components'
import { stringToSources } from '~/utils/utils'
import { ContentItemEmpty } from './content-item'

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  ${({ theme }) => theme.fontSize['title-sub']};
  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['title-sub-md']};
  }
`
const ListItem = styled.li`
  position: relative;
  padding-left: 14px;
  margin-top: 8px;
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.backgroundColor.blue};
  }
`
export { UnorderedList, ListItem }

/**
 *
 * @param {Object} props
 * @param {string} props.listData
 * @returns {React.ReactElement}
 */
export default function ContentList({ listData }) {
  const biographyList = useMemo(
    () =>
      listData
        ? stringToSources(listData, '\n').filter((item) => item.value)
        : [],
    [listData]
  )
  return (
    <UnorderedList>
      {biographyList && biographyList.length !== 0 ? (
        biographyList?.map((item) => (
          <ListItem key={item.id}>{item.value}</ListItem>
        ))
      ) : (
        <ContentItemEmpty>這個人還沒有被新增經歷⋯</ContentItemEmpty>
      )}
    </UnorderedList>
  )
}
