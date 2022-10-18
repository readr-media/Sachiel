import SectionBody from './section-body'
import { UnorderedList, ListItem } from './content-list'
import { Fragment } from 'react'
import styled from 'styled-components'

const ElectionItemContainer = styled(ListItem)`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin-bottom: 16px;
  gap: 4px;

  color: ${({ theme }) => theme.textColor.orange};
  &::before {
    top: 14px;
    background-color: ${({ theme }) => theme.textColor.orange};
  }
`

const ElectionItem = styled.p`
  margin-right: 16px;
`

const PoliticButton = styled.a`
  display: block;
  width: 72px;
  height: 32px;
  text-align: center;
  color: ${({ theme }) => theme.textColor.yellow};
  border-color: ${({ theme }) => theme.borderColor.yellow};
  border-width: 2px;
  border-radius: 24px;
`
/**
 *
 * @param {Object} props
 * @param {boolean} [props.isActive]
 * @param {import('~/types/common').RawPersonElection[]} props.personElectionsData
 * @returns {React.ReactElement}
 */
export default function SectionBodyElection({
  isActive = false,
  personElectionsData,
}) {
  const electionsList = personElectionsData.map((item) => (
    <ElectionItemContainer key={item.id}>
      <ElectionItem>{item.election?.name}</ElectionItem>
      <PoliticButton href="/">政見</PoliticButton>
    </ElectionItemContainer>
  ))
  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <UnorderedList>{electionsList}</UnorderedList>
    </SectionBody>
  )
}
