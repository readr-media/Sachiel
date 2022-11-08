import styled from 'styled-components'
import { Fragment } from 'react'
import SectionBody from './section-body'
import { SOURCE_DELIMITER } from '~/constants/politics'
import { generateSourceMeta } from '~/utils/utils'

const ExpertContainer = styled.div`
  padding: 20px 5px;
  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: #0f2d35;
  }
  > p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: #b3800d;
  }
`
const ExpertList = styled.li`
  padding: 20px;
  background: rgba(15, 45, 53, 0.05);
  border-radius: 20px;
  margin-bottom: 12px;
  &:before {
    content: '';
    display: inline-block;
    background-color: #f7ba31;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    text-align: center;
    position: absolute;
    left: 0px;
    top: 10px;
  }
`
const ExpertTitle = styled.div`
  display: flex;
  margin-bottom: 12px;
  .professorImage {
    margin-right: 12px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    /* background-size: cover; */
  }
  .professorName {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    color: #0f2d35;
  }
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(15, 45, 53, 0.5);
  }
`
const ExpertContent = styled.div`
  margin-bottom: 12px;
  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: rgba(15, 45, 53, 0.5);
  }
  > p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 180%;
    text-align: justify;
    color: rgba(15, 45, 53, 0.66);
  }
`
const ExpertLinks = styled.div`
  padding: 1px;
  > span {
    display: inline-block;
    background: rgba(15, 45, 53, 0.5);
    padding: 8px;
    color: white;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 12px;
  }
  li {
    list-style: none;
    margin-bottom: 10px;
    padding-left: 15px;
    position: relative;
    cursor: pointer;
    color: #b3800d;
    &:hover {
      text-decoration-line: underline;
    }
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
    top: 10px;
  }
`

// @ts-ignore
export default function PoliticsExpert({ infoList, isActive }) {
  const sourceData = infoList[1].link
    ? infoList[1].link.split(SOURCE_DELIMITER)
    : []
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

  // @ts-ignore
  const info = infoList.map((value) => (
    <ExpertList key={value.id}>
      <ExpertTitle
        // @ts-ignore
        image={value.avatar}
      >
        <div
          className="professorImage"
          // @ts-ignore
          image={value.avatar}
        ></div>
        <div>
          <p className="professorName">{value.contributer}</p>
          <span>{value.title}</span>
        </div>
      </ExpertTitle>
      <ExpertContent>
        <span>{value.reviewDate.substr(0, 10)}</span>
        <p>{value.content}</p>
      </ExpertContent>
      <ExpertLinks>
        {value.link.length !== 0 && (
          <Fragment>
            <span>相關連結</span>
            <ul>{sourceList}</ul>
          </Fragment>
        )}
      </ExpertLinks>
    </ExpertList>
  ))
  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <ExpertContainer>
        <ul>{info}</ul>
      </ExpertContainer>
    </SectionBody>
  )
}
