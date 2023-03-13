import styled from 'styled-components'

import type { CollaborationItem } from '~/types/component'

import CollaborationCard from './collaboration-card'

const Container = styled.div`
  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
  overflow-y: auto;
  margin-left: -20px;
  margin-right: -20px;

  ${({ theme }) => theme.breakpoint.lg} {
    // (1096px - 20px * 2 - 100vw) / 2
    margin-left: min(528px - 50vw, -20px);
    margin-right: min(528px - 50vw, -20px);
  }
`

const List = styled.ul`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;

  ${({ theme }) => theme.breakpoint.lg} {
    // (100vw - 1096px - 20px * 2) / 2
    padding-left: max(50vw - 528px, 20px);
    padding-right: max(50vw - 528px, 20px);
  }
`

const Item = styled.li`
  flex: 0 0 auto;
  width: 100%;
  max-width: 190px;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 342px;
  }

  & + & {
    margin-left: 15px;

    ${({ theme }) => theme.breakpoint.md} {
      margin-left: 35px;
    }
  }

  &:last-child {
    box-sizing: content-box;
    padding-right: 20px;

    ${({ theme }) => theme.breakpoint.lg} {
      // (100vw - 1096px - 20px * 2) / 2
      padding-right: max(50vw - 528px, 20px);
    }
  }
`

type CollaborationListProps = {
  items: CollaborationItem[]
}

export default function CollaborationList({
  items,
}: CollaborationListProps): JSX.Element {
  const collaborationItems = items.map((item) => (
    <Item key={item.id}>
      <CollaborationCard {...item} />
    </Item>
  ))

  return (
    <Container>
      <List>{collaborationItems}</List>
    </Container>
  )
}
