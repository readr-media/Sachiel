// 該元件作為文章卡片上，標示專題類別使用

import styled from 'styled-components'

const Label = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 13px;
  line-height: 19px;
  color: #fff;
  background-color: #7f8493;
  border-radius: 2px;
  padding: 2px 4px;
  ${({ theme }) => theme.breakpoint.sm} {
    top: 8px;
    right: 8px;
  }
`

export default function ReportLabel(): JSX.Element {
  return <Label>專題</Label>
}
