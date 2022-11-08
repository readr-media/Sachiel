import styled from 'styled-components'
import SectionBody from './section-body'

const ListContainer = styled.div`
  padding: 20px 5px;
  span {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: #0f2d35;
    display: block;
  }
  a {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    color: #b3800d;
    display: inline-block;
    &:hover {
      text-decoration-line: underline;
    }
  }
  li {
    margin-bottom: 10px;
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
`

// @ts-ignore
export default function PoliticsList({ infoList, isActive }) {
  // @ts-ignore
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
      <ListContainer>
        <ul>{info}</ul>
      </ListContainer>
    </SectionBody>
  )
}
