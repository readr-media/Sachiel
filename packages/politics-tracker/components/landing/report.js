import React from 'react'
import styled from 'styled-components'
import ArrowTilt from '../icons/arrow-tilt'

const ReportContainer = styled.div`
  width: 100%;
  padding: 40px 15px;
  background: #fffcf3;
  color: ${({ theme }) => theme.textColor.black};
  box-shadow: inset 0px -4px 0px #000000;

  h1 {
    font-weight: 700;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 22px;
    line-height: 1.3;
    text-align: center;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 640px;
    margin: auto;
    margin-bottom: 20px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    ul {
      max-width: 700px;
      gap: 0px 20px;
    }
  }
  ${({ theme }) => theme.breakpoint.xl} {
    h1 {
      font-size: 28px;
      margin-bottom: 40px;
    }
    ul {
      max-width: none;
      gap: 0px 40px;
    }
  }
`
const ReportList = styled.li`
  border: 2px solid #000000;
  background: #ffffff;
  list-style: none;
  width: 100%;
  max-width: 334px;
  height: 70vw;
  min-height: 244px;
  max-height: 267px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    background: #fffcf3;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-height: 255px;
    max-width: 250px;
  }
`

const ReportImage = styled.div`
  height: 30vw;
  width: 100%;
  min-height: 150px;
  max-height: 175px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: all 0.3s ease;
  }
  img:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    max-height: 130px;
    min-height: 0;
  }
`

const ReportInfo = styled.div`
  padding: 12px;
  .reportTitle {
    height: 42px;
    overflow: hidden;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 5px;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .reportDate {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: rgba(15, 45, 53, 0.5);
  }
  ${({ theme }) => theme.breakpoint.xl} {
    .reportTitle {
      font-size: 18px;
      height: 69px;
      -webkit-line-clamp: 3;
    }
    .reportDate {
      font-size: 14px;
    }
  }
`

const ReportButton = styled.button`
  background: #f7ba31;
  border: 2px solid #000000;
  border-radius: 24px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.8;
  color: #0f2d35;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  svg {
    margin-left: 5px;
    fill: #0f2d35;
    color: #ffffff;
  }
  path {
    fill: #0f2d35;
  }
  &:hover {
    cursor: pointer;
    background: #b2800d;
    color: #ffffff;
  }
  &:hover path {
    fill: #ffffff;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    padding: 8px 30px;
    font-size: 18px;
  }
`
/**
 *
 * @returns {React.ReactElement}
 */
// @ts-ignore
export default function TeamIntro({ propsData }) {
  return (
    <ReportContainer>
      <h1>相關報導</h1>
      <ul>
        {propsData?.map(
          (
            // @ts-ignore
            item
          ) => {
            return (
              <ReportList key={item.id}>
                {/* TODO: 上prod之前要換成正式readr網址 */}
                <a
                  href={`https://dev.readr.tw/post/${item.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ReportImage>
                    {item.heroImage !== null ? (
                      <img src={item.heroImage.urlOriginal} alt=""></img>
                    ) : (
                      <img src="/images/default-post-photo.svg" alt=""></img>
                    )}
                  </ReportImage>
                  <ReportInfo>
                    <div className="reportTitle">{item.name}</div>
                    <span className="reportDate">{item.publishTime}</span>
                  </ReportInfo>
                </a>
              </ReportList>
            )
          }
        )}
      </ul>
      <ReportButton>
        <a
          href="https://dev.readr.tw/tag/%E9%81%B8%E8%88%89%E6%94%BF%E8%A6%8B%E8%BF%BD%E8%B9%A4"
          target="_blank"
          rel="noreferrer"
        >
          更多相關報導
          <ArrowTilt />
        </a>
      </ReportButton>
    </ReportContainer>
  )
}
