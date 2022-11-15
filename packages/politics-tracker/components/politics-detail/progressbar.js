import React from 'react'
import styled from 'styled-components'

const ProgressBar = styled.div`
  overflow: hidden;
  height: 44px;
  box-shadow: inset 0px -4px 0px #000000;
  .clearfix:after {
    content: '';
    display: block;
    height: 0;
  }

  .arrow-steps {
    box-shadow: inset 0px -4px 0px #000000;
    display: flex;
    align-items: center;
  }

  .step {
    font-size: 14px;
    color: #777;
    width: 100%;
    position: relative;
    background-color: #ddd;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step:after,
  .step:before {
    content: '';
    position: absolute;
    top: 0;
    right: -17px;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 17px solid #ddd;
    z-index: 2;
  }

  .step:before {
    right: auto;
    left: 0;
    border-left: 17px solid #fff;
    z-index: 0;
  }

  .step:first-child:before {
    border: none;
  }

  .step:last-child:after {
    border: none;
  }

  .step > span {
    position: relative;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    display: inline-block;
  }

  //progress-1
  .step1 {
    color: ${({ theme }) => theme.textColor.white};
    background-color: #8379f8;
  }

  .step1:after {
    border-left: 17px solid #8379f8;
  }

  //progress-2
  .step2 {
    color: ${({ theme }) => theme.textColor.white};
    background-color: #db4c65;
  }
  .bg-gray {
    background-color: #838383;
    color: white;
  }
  .bg-gray:after {
    border-left: 17px solid #838383;
  }
  .bg-yellow {
    background-color: #f7ba31;
    color: #0f2d35;
  }
  .bg-yellow:after {
    border-left: 17px solid #f7ba31;
  }
  .bg-red {
    background-color: #db4c65;
    color: white;
  }
  .bg-red:after {
    border-left: 17px solid #db4c65;
  }

  //progress-3
  .step3 {
    color: rgba(15, 45, 53, 0.3);
    background-color: #c5cbcd;
  }

  .step3:after {
    border-left: 17px solid #c5cbcd;
  }
  .bg-green {
    background: #2fb7bf;
    color: #ffffff;
  }

  //progress: no election
  .step4 {
    width: 50%;
  }
`
/**
 * @param {Object} props
 * @param {import('../../types/politics-detail').PoliticDetail} props.politicData
 * @param {Object} props.politicData
 * @param {Object} props.politicData.progress
 * @param {String} props.politicData.progress.progress
 * @returns {React.ReactElement}
 */
export default function SectionTitle({ politicData }) {
  // @ts-ignore
  const electResult = politicData.person.elected

  // @ts-ignore
  const progressType = politicData.current_progress

  return (
    <ProgressBar>
      <div className="arrow-steps clearfix">
        {electResult ? (
          <>
            <div className="step step1">
              <span>提出政見</span>
            </div>
            {(progressType === 'no-progress' || progressType === undefined) && (
              <div className="step step2 bg-gray">
                <span>未開始</span>
              </div>
            )}
            {(progressType === 'in-progress' ||
              progressType === 'complete') && (
              <div className="step step2 bg-yellow">
                <span>進行中</span>
              </div>
            )}
            {progressType === 'in-trouble' && (
              <div className="step step2 bg-red">
                <span>卡關中</span>
              </div>
            )}
            {progressType === 'complete' ? (
              <div className="step step3 bg-green">
                <span>已完成</span>
              </div>
            ) : (
              <div className="step step3">
                <span>已完成</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="step step1 step4">
              <span>提出政見</span>
            </div>
            <div className="step step3">
              <span>未當選</span>
            </div>
          </>
        )}
      </div>
    </ProgressBar>
  )
}
