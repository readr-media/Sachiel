import styled from 'styled-components'
import SectionBody from './section-body'

const TimeContainer = styled.div`
  padding-top: 20px;
  margin-bottom: 25px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  span {
    color: #0f2d35;
    display: block;
    margin-bottom: 4px;
  }
  a {
    color: ${({ theme }) => theme.textColor.brown};
    display: inline-block;
    text-align: justify;
    &:hover {
      text-decoration-line: underline;
    }
  }
  li {
    margin-bottom: 8px;
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
    top: 10px;
  }
  div {
    text-align: center;
    color: rgba(15, 45, 53, 0.3);
    font-weight: 500;
    font-size: 18px;
    line-height: 1.8;
  }
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    li {
      display: flex;
    }
    span {
      min-width: 100px;
      margin-right: 5px;
    }
  }
`
/**
 *
 * @param {Object} props
 * @param {Object[]} props.infoList
 * @param {string} props.infoList[].id
 * @param {string} props.infoList[].eventDate
 * @param {string} props.infoList[].link
 * @param {string} props.infoList[].content
 * @param {Boolean} props.isActive
 * @returns {React.ReactElement}
 */
export default function PoliticsList({ infoList, isActive }) {
  const info = infoList.map((value) => (
    <li key={value.id}>
      <span>{value.eventDate.substr(0, 10)}</span>
      <a href={value.link} target="_blank" rel="noreferrer">
        {value.content}
      </a>
    </li>
  ))
  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <TimeContainer>
        {infoList.length !== 0 ? (
          <ul>{info}</ul>
        ) : (
          <div>還沒有人新增相關進度...</div>
        )}
      </TimeContainer>
    </SectionBody>
  )
}
