import React from 'react'

const Dots = () => {
  return (
    <div className="flex space-x-[3px]">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`size-[6px] animate-pulse rounded-full bg-primary-200 ${
            index === 1
              ? 'animate-delay-200 bg-primary-400'
              : index === 2
              ? 'animate-delay-400 bg-primary-600'
              : ''
          }`}
        />
      ))}
    </div>
  )
}

export default Dots
