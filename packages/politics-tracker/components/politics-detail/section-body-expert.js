import styled from 'styled-components'
import { Fragment } from 'react'
import SectionBody from './section-body'
import Image from 'next/future/image'
import { SOURCE_DELIMITER } from '~/constants/politics'
import { generateSourceMeta } from '~/utils/utils'
const ExpertContainer = styled.div`
  padding-top: 12px;
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
  align-items: center;
  margin-bottom: 12px;
  .expertName {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    color: #0f2d35;
    margin-bottom: 2px;
  }
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(15, 45, 53, 0.5);
  }
  ${({ theme }) => theme.breakpoint.md} {
    .expertName {
      font-size: 18px;
    }
    span {
      font-size: 16px;
    }
  }
`
const ExpertContent = styled.div`
  margin-bottom: 15px;
  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 3px;
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
  ${({ theme }) => theme.breakpoint.md} {
    span {
      font-size: 14px;
    }
    p {
      font-size: 18px;
    }
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
    margin-bottom: 8px;
    padding-left: 15px;
    position: relative;
    cursor: pointer;
    color: #b3800d;
    font-size: 16px;
    font-weight: 500;
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
    top: 12px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    > span {
      font-size: 14px;
    }
    li {
      font-size: 18px;
    }
    li:before {
      top: 14px;
    }
  }
`

const ExpertImage = styled.div`
  border-color: ${({ theme }) => theme.borderColor.white};
  border-width: 2px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: url('/images/default-head-photo.png') center center no-repeat
    contain;
  img {
    min-width: 48px;
    min-height: 48px;
    height: 100%;
    object-fit: cover;
    z-index: 100;
  }
  ${({ theme }) => theme.breakpoint.md} {
    min-width: 60px;
    min-height: 60px;
  }
  .avatar_show {
    display: block;
  }
  .avatar_hidden {
    display: none;
  }
`

// @ts-ignore
export default function PoliticsExpert({ infoList, isActive }) {
  // @ts-ignore
  const info = infoList.map((value) => (
    <ExpertList key={value.id}>
      <ExpertTitle>
        {value.avatar ? (
          <ExpertImage>
            <Image src={value.avatar} fill className="avatar_show" alt="" />
          </ExpertImage>
        ) : (
          <ExpertImage></ExpertImage>
        )}
        <div>
          <p className="expertName">{value.contributer}</p>
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
            <ul>
              {value.link.split(SOURCE_DELIMITER).map(
                (
                  // @ts-ignore
                  content,
                  // @ts-ignore
                  index
                ) => {
                  const { isLink, link, text } = generateSourceMeta(
                    content,
                    '',
                    index + 1
                  )
                  return (
                    isLink && (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {text}
                        </a>
                      </li>
                    )
                  )
                }
              )}
            </ul>
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
