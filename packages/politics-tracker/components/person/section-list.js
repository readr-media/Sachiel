import React, { Fragment } from 'react'

import SectionToggle from './section-toggle'

/**
 *
 * @param {Object} props
 * @param {null|string} props.id
 * @param {boolean} props.isActive
 * @param {Array<Object>} props.activeId
 * @param {Function} props.setActiveId
 * @param {Function} props.GAClick
 * @param {string} props.color
 * @param {string} props.title
 * @param {React.ReactElement | React.ReactElement[]} [props.children]
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
