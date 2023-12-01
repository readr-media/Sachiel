import React, { Fragment } from 'react'

import SectionToggle from './section-toggle'

/**
 * @typedef {Parameters<SectionToggle>[0]} SectionToggleProps
 * @typedef {Object} Props
 * @property {React.ReactElement} [children]
 *
 * @param {Props & SectionToggleProps} props
 * @returns {React.ReactElement}
 */
export default function SectionList2({
  id,
  activeId,
  setActiveId,
  isActive,
  color,
  children,
  title,
  GAClick,
}) {
  return (
    <Fragment>
      <SectionToggle
        id={id}
        activeId={activeId}
        setActiveId={setActiveId}
        color={color}
        title={title}
        isActive={isActive}
        GAClick={GAClick}
      />
      {children}
    </Fragment>
  )
}
