import styled from 'styled-components'

const UnorderedList = styled.ul`
  list-style: none;
  margin: 20px 0;
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

/**
 *
 * @param {Object} props
 * @param {import('~/types/person').Person["biography"]} props.biography
 * @returns {React.ReactElement}
 */
export default function ContentList({ biography }) {
  return (
    <UnorderedList>
      {biography &&
        biography
          ?.split('\n')
          .map((item, index) => <ListItem key={index}>{item}</ListItem>)}
    </UnorderedList>
  )
}
