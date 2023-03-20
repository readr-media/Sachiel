// 協作專區項目清單

import styled, { css } from 'styled-components'

import type { CollaborationItem } from '~/types/component'

import CollaborationCard from './collaboration-card'

// 應與 `components/index/share-styles 的 sectionStyle 同步
const sectionPadding = css`
  ---section-padding: 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    ---section-padding: 0px;
  }
`

// (1096px - 20px * 2 - 100vw) / 2
const marginFormula =
  'min(calc((var(--main-width) - var(---section-padding) * 2 - 100vw) / 2), var(--margin))'

const Container = styled.div`
  ${sectionPadding}

  --main-width: ${({ theme }) => theme.width.main};
  --margin: calc(var(---section-padding) * -1);
  --margin-formula: ${marginFormula};

  color: rgba(0, 0, 0, 0.87);
  line-height: 1.5;
  overflow-y: auto;
  margin-left: var(--margin);
  margin-right: var(--margin);

  ${({ theme }) => theme.breakpoint.lg} {
    margin-left: var(--margin-formula);
    margin-right: var(--margin-formula);
  }
`

// (100vw - (1096px - 20px * 2)) / 2
const paddingFormula =
  'max(calc((100vw - var(--main-width) + var(---section-padding) * 2) / 2), var(--padding))'

const List = styled.ul`
  ${sectionPadding}

  --main-width: ${({ theme }) => theme.width.main};
  --padding: var(---section-padding);
  --padding-formula: ${paddingFormula};

  display: flex;
  padding-left: var(--padding);
  padding-right: var(--padding);

  ${({ theme }) => theme.breakpoint.lg} {
    padding-left: var(--padding-formula);
    padding-right: var(--padding-formula);
  }
`

const Item = styled.li`
  ${sectionPadding}

  --main-width: ${({ theme }) => theme.width.main};
  --padding: var(---section-padding);
  --padding-formula: ${paddingFormula};

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
    padding-right: var(--padding);

    ${({ theme }) => theme.breakpoint.lg} {
      padding-right: var(--padding-formula);
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
