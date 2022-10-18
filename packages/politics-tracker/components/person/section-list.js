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
  isActive,
  setActive,
  color,
  children,
  title,
}) {
  return (
    <Fragment>
      <SectionToggle
        id={id}
        isActive={isActive}
        setActive={(/** @type {null|string} id */ id) => setActive(id)}
        color={color}
        title={title}
      />
      {children}
    </Fragment>
  )
}
