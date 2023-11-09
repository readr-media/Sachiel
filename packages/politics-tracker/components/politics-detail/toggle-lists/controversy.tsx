import styled from 'styled-components'

import DefaultText from '~/components/politics-detail/default-text'
import EditControversy from '~/components/politics-detail/edit/edit-controversy'
import type { PoliticControversy, PoliticDetail } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding: 20px 0px;
  font-size: 16px;
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.textColor.brown};
    display: inline-block;
    word-break: break-all;
    cursor: pointer;

    &:hover {
      text-decoration-line: underline;
      text-underline-offset: 3.5px;
      text-decoration-thickness: 1.5px;
    }
  }
`

const List = styled.li`
  cursor: pointer;
  display: flex;
  align-items: flex-start;

  & + * {
    margin-top: 15px;
  }

  &::before {
    content: '';
    display: inline-block;
    min-width: 6px;
    min-height: 6px;
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.backgroundColor.landingYellow};
    border-radius: 50%;
    margin-right: 8px;
    margin-top: 10px;
  }
`

type ControversyProps = {
  politic: PoliticDetail
  controversies: PoliticControversy[]
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Controversy({
  politic,
  controversies = [],
  editMode = false,
  setEditMode,
}: ControversyProps): JSX.Element {
  const controversyList = controversies.map((item, index) => {
    const { link, content } = item
    return (
      <List key={index}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </List>
    )
  })

  let jsx

  if (controversyList.length > 0 && !editMode) {
    jsx = <ul>{controversyList}</ul>
  } else if (!editMode) {
    jsx = <DefaultText title="相關爭議" />
  } else {
    jsx = <EditControversy politic={politic} setEditMode={setEditMode} />
  }

  return <Wrapper>{jsx}</Wrapper>
}
