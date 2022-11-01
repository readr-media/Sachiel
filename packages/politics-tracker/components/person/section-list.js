import React, { Fragment } from 'react'

import SectionToggle from './section-toggle'

/**
 *
 * @param {Object} props
 * @param {null|string} props.id
 * @param {boolean} props.isActive
 * @param {Function} props.setActive
 * @param {string} props.color
 * @param {string} props.title
 * @param {React.ReactElement} [props.children]
 * @returns {React.ReactElement}
 */
export default function SectionList2({
  id,
  // @ts-ignore
  activeId,
  // @ts-ignore
  setActiveId,
  isActive,
  color,
  children,
  title,
}) {
  return (
    <Fragment>
      <SectionToggle
        id={id}
        activeId={activeId}
        // @ts-ignore
        setActiveId={setActiveId}
        color={color}
        title={title}
        isActive={isActive}
      />
      {children}
    </Fragment>
  )
}
