import { useState } from 'react'

export default function TooltipButton({
  className = '',
  color,
  direction,
  buttonContent,
  tooltipText,
  onClick,
}: {
  className?: string
  color: 'light' | 'dark'
  direction: 'right' | 'left' | 'top' | 'bottom'
  buttonContent: any
  tooltipText: string
  onClick: () => void
}) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible)
  }

  const getTooltipPositionClass = () => {
    switch (direction) {
      case 'right':
        return 'left-[calc(100%+4px)] -top-2 transform -translate-y-6'
      case 'left':
        return 'right-[calc(100%+4px)] -top-2 transform -translate-y-1/2'
      case 'top':
        return 'bottom-8 left-1/2 transform -translate-x-1/2'
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 sm:-translate-x-1/4'
    }
  }

  const getArrowPositionClass = () => {
    switch (direction) {
      case 'right':
        return 'left-full bottom-3 rotate-45'
      case 'left':
        return 'bottom-3 transform -translate-x-2 rotate-45'
      case 'top':
        return 'left-1/2 bottom-7 transform -translate-x-1/2 rotate-45'
      default:
        return '-top-1 left-1/2 transform -translate-x-1/2 rotate-45'
    }
  }

  const getTooltipColorClass = () => {
    if (color === 'dark') {
      return 'bg-primary-700 text-primary-200'
    } else {
      return 'bg-primary-200 text-primary-800'
    }
  }

  const getArrowColorClass = () => {
    if (color === 'dark') {
      return 'border-primary-700 bg-primary-700'
    } else {
      return 'border-primary-200 bg-primary-200'
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
        onClick={onClick}
      >
        {buttonContent}
      </button>
      {tooltipVisible && (
        <div className="drop-shadow transition-opacity duration-300">
          <span
            className={`absolute h-2 w-2 border-l border-t ${getArrowPositionClass()} ${getArrowColorClass()}`}
          ></span>
          <div
            className={`caption-1 absolute w-[280px] rounded p-2 ${getTooltipColorClass()} ${getTooltipPositionClass()}`}
          >
            {tooltipText}
          </div>
        </div>
      )}
    </div>
  )
}
