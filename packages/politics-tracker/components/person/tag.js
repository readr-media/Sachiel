import styled from 'styled-components'

const TagItem = styled.div`
  padding: 8px 12px;
  color: ${({ theme }) => theme.textColor.black50};
  ${({ theme }) => theme.fontSize.button};
  border-radius: 24px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.borderColor.black5};
  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['button-md']};
  }
`
/**
 *
 * @param {Object} props
 * @param {string} props.name
 * @returns
 */
export default function Tag({ name }) {
  return <TagItem>#{name}</TagItem>
}
