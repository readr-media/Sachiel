import { useMemo } from 'react'
import styled from 'styled-components'
import { stringToSources } from '~/utils/utils'
const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
`
const ListItem = styled.li`
  position: relative;
  padding-left: 14px;
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
    () => (listData ? stringToSources(listData, '\n') : []),
    [listData]
  )
  return (
    <UnorderedList>
      {biographyList &&
        biographyList?.map((item) => (
          <ListItem key={item.id}>{item.value}</ListItem>
        ))}
    </UnorderedList>
  )
}
