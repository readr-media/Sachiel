import { css } from 'styled-components'

export const sectionStyle = css`
  max-width: ${({ theme }) => theme.width.main};
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`

export const editorChoiceAndFeatureStyle = css`
  margin: 0 0 48px;
  ${({ theme }) => theme.breakpoint.md} {
    margin: 0 0 60px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 0 0 80px;
  }
`
