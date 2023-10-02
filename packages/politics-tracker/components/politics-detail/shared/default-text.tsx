import styled from 'styled-components'

const Text = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.textColor.black30};
  font-size: 18px;
  line-height: 1.8;
`

type DefaultBodyProps = {
  title?: string
}
export default function DefaultText({
  title = '',
}: DefaultBodyProps): JSX.Element {
  return <Text>還沒有人新增{title}...</Text>
}
