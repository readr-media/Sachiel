import { css } from 'styled-components'

export const sectionStyle = css`
  max-width: ${({ theme }) => theme.width.main};
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    padding-left: 0;
    padding-right: 0;
  }
`

export const sectionMargin = css`
  margin-bottom: 48px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 60px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 80px;
  }
`
