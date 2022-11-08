import styled from 'styled-components'
import SectionBody from './section-body'
import { SOURCE_DELIMITER } from '~/constants/politics'
import { generateSourceMeta } from '~/utils/utils'

const DisputeContainer = styled.div`
  padding-top: 20px;
  margin-bottom: 25px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  span {
    color: #0f2d35;
    display: block;
  }
  a {
    color: #b3800d;
    display: inline-block;
    &:hover {
      text-decoration-line: underline;
    }
  }
  li {
    margin-bottom: 9px;
    padding-left: 15px;
    position: relative;
    cursor: pointer;
  }
  li:before {
    content: '';
    display: inline-block;
    background-color: #f7ba31;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    text-align: center;
    position: absolute;
    left: 0px;
    top: 12px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }
`

// @ts-ignore
export default function PoliticsList({ infoList, isActive }) {
  const sourceData = infoList ? infoList.split(SOURCE_DELIMITER) : []
  // @ts-ignore
  const sourceList = sourceData.map((content, index) => {
    const { isLink, link, text } = generateSourceMeta(content, '', index + 1)
    return isLink ? (
      <li key={index}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </li>
    ) : (
      ''
    )
  })
  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <DisputeContainer>
        <ul>{sourceList}</ul>
      </DisputeContainer>
    </SectionBody>
  )
}
