import styled from 'styled-components'

const TagItem = styled.div`
  padding: 8px 12px;
  color: ${({ theme }) => theme.textColor.black50};
  font-size: ${({ theme }) => theme.fontSize.button};
  border-radius: 24px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.borderColor.black5};
  ${({ theme }) => theme.breakpoint.md} {
    font-size: ${({ theme }) => theme.fontSize['button-md']};
  }
`
/**
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.name
 * @returns
 */
export default function Tag({ id, name }) {
  return <TagItem>#{name}</TagItem>
}
