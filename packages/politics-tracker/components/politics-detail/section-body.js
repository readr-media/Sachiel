import React from 'react'
import styled from 'styled-components'
const SectionBodyContainer = styled.div`
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-height: ${
    /**
     * @param {Object} props
     * @param {boolean} props.shouldShowSectionBody
     */
    ({ shouldShowSectionBody }) => (shouldShowSectionBody ? 'unset' : '0px')
  };
  background-color: ${({ theme }) => theme.backgroundColor.white};

  *,
  * + * {
    display: ${({ shouldShowSectionBody }) => !shouldShowSectionBody && 'none'};
  }
`

/**
 *
 * @param {Object} props
 * @param {boolean} [props.shouldShowSectionBody]
 * @param {React.ReactElement |React.ReactElement[]} [props.children]
 * @returns {React.ReactElement}
 */
export default function SectionBody({
  shouldShowSectionBody = false,
  children,
}) {
  return (
    <SectionBodyContainer shouldShowSectionBody={shouldShowSectionBody}>
      {children}
    </SectionBodyContainer>
  )
}
