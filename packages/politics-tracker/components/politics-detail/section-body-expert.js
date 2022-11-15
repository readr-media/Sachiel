import styled from 'styled-components'
import { Fragment, useState } from 'react'
import SectionBody from './section-body'
import { SOURCE_DELIMITER } from '~/constants/politics'
import { generateSourceMeta } from '~/utils/utils'
import ProfileImage from '../person/profile-image'
import Image from 'next/future/image'

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
    margin-bottom: 12px;
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
    color: ${({ theme }) => theme.textColor.brown};
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    word-break: break-all;
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

const ExpertImage = styled(ProfileImage)`
  min-width: 48px;
  min-height: 48px;
  margin-right: 10px;
  img {
    object-fit: cover;
  }
  ${({ theme }) => theme.breakpoint.md} {
    min-width: 60px;
    min-height: 60px;
  }
`

// @ts-ignore
export default function PoliticsExpert({ infoList, isActive }) {
  const [showImage, setShowImage] = useState([])

  // @ts-ignore
  const info = infoList.map((value) => (
    <ExpertList key={value.id}>
      <ExpertTitle>
        {value.avatar &&
        !showImage.includes(
          // @ts-ignore
          value.id
        ) ? (
          <ExpertImage>
            <Image
              alt=""
              src={value.avatar}
              fill
              // @ts-ignore
              sizes={60}
              onError={() => {
                // @ts-ignore
                setShowImage([...showImage, value.id])
              }}
            />
          </ExpertImage>
        ) : (
          <ExpertImage>
            <Image
              alt=""
              src="/images/default-head-photo.png"
              fill
              // @ts-ignore
              sizes={60}
            />
          </ExpertImage>
        )}
        <div>
          <p className="expertName">{value.contributer}</p>
          <span>{value.title}</span>
        </div>
      </ExpertTitle>
      <ExpertContent>
        <span>{value.reviewDate.substr(0, 10)}</span>
        {value.content.split(SOURCE_DELIMITER).map(
          (
            // @ts-ignore
            item
          ) => {
            return <p key={item}>{item}</p>
          }
        )}
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
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <li>
                          <span> {text} </span>
                        </li>
                      </a>
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
