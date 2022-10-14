import styled from 'styled-components'

const SectionBodyContainer = styled.div`
  //adjust position for fitting place when section-toggle is pressed
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-height: ${
    /**
     * @param {Object} props
     * @param {boolean} props.shouldShowSectionBody
     */
    ({ shouldShowSectionBody }) => (shouldShowSectionBody ? 'unset' : '0px')
  };
  min-height: ${({ shouldShowSectionBody }) =>
    shouldShowSectionBody ? '200px' : '0px'};
  border-color: ${({ theme }) => theme.borderColor.black};
  border-width: 0 4px 4px;
  background-color: ${({ theme }) => theme.backgroundColor.white};
  * {
    display: ${({ shouldShowSectionBody }) =>
      shouldShowSectionBody ? 'block' : 'none'};
  }
`

/**
 *
 * @param {Object} props
 * @param {boolean} [props.isActive]
 * @returns
 */
export default function SectionBody({ isActive = false }) {
  return (
    <SectionBodyContainer shouldShowSectionBody={isActive}>
      <span>{`${isActive}`}</span>
    </SectionBodyContainer>
  )
}
