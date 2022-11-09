import styled from 'styled-components'
import SecondArrowUp from '../icons/second-arrow-up'
import SecondArrowDown from '../icons/second-arrow-down'

const ToggleContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  box-shadow: inset 0px -2px 0px #000000;
  padding: 9px 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.05rem;
  cursor: pointer;
  .arrow {
    border-color: ${({ theme }) => theme.textColor.blue};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    &.up {
      transform: rotate(-135deg);
      margin: 5px 5px 0;
    }
    &.down {
      transform: rotate(45deg);
      margin: 0 5px 5px;
    }
  }
  svg {
    margin-right: 9px;
    color: #b3800d;
    border-radius: 50%;
  }
  &:hover svg {
    background: rgba(15, 45, 53, 0.05);
  }
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }
`
/**
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsOpen
 * @returns {React.ReactElement}
 */

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string[]} props.isActive
 * @param {Function} props.toggleActiveID
 * @param {null|string} props.id
 * @param {Object[]} props.activeId
 * @returns {React.ReactElement}
 */
export default function Toggle({ title, isActive, id, toggleActiveID }) {
  return (
    <ToggleContainer
      // @ts-ignore
      isActive={isActive}
      onClick={() => {
        toggleActiveID(id)
      }}
    >
      {isActive ? (
        // @ts-ignore
        <SecondArrowUp className="arrow" />
      ) : (
        // @ts-ignore
        <SecondArrowDown className="arrow" />
      )}

      <span>{title}</span>
    </ToggleContainer>
  )
}
