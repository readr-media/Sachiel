import React from 'react'
import styled from 'styled-components'

import ArrowRight from '~/public/icons/landing/arrow-right.svg'
import Plus from '~/public/icons/plus.svg'

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;

  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;

  > a {
    border-radius: 24px;
    padding: 8px 24px 8px 32px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .politic-detail {
    border: 2px solid #000000;
    background: #f6ba31;

    path {
      fill: #000000;
    }
    &:hover {
      background-color: #b2800d;
    }
  }

  .politic-overview {
    border: 2px solid #b2800d;
    color: #b2800d;

    path {
      fill: #b2800d;
    }

    &:hover {
      background-color: #fffcf3;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
`

type ButtonProps = {
  personId: string
}
export default function LinkButtons({ personId }: ButtonProps): JSX.Element {
  return (
    <ButtonWrapper>
      <a
        href={personId ? `/politics/${personId}/#add-politic-anchor` : '/'}
        target="_blank"
        rel="noopener noreferrer"
        className="politic-detail"
      >
        新增更多政見
        <Plus />
      </a>

      <a
        href={`/politics/${personId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="politic-overview"
      >
        查看所有政見
        <ArrowRight />
      </a>
    </ButtonWrapper>
  )
}
