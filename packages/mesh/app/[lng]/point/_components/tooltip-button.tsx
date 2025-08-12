'use client'
import { useId } from 'react'
import { useRef, useState } from 'react'

import Icon from '@/components/icon'
import useClickOutside from '@/hooks/use-click-outside'

export default function TooltipButton({
  color,
  direction,
  buttonContent,
  tooltipContent,
}: {
  color: 'light' | 'dark'
  direction: 'right' | 'left' | 'top' | 'bottom'
  buttonContent: React.ReactNode
  tooltipContent: React.ReactNode
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipId = useId()
  useClickOutside(tooltipRef, () => setIsTooltipVisible(false))

  const getTooltipPositionClass = () => {
    switch (direction) {
      case 'right':
        return 'left-[calc(100%+4px)] -top-2 -translate-y-6'
      case 'left':
        return 'right-[calc(100%+4px)] -top-2 -translate-y-1/2'
      case 'top':
        return 'bottom-8 left-1/2 -translate-x-1/2'
      default:
        return 'top-[calc(100%+4px)] left-1/2 -translate-x-1/2 sm:-translate-x-1/4'
    }
  }

  const getArrowPositionClass = () => {
    switch (direction) {
      case 'right':
        return 'left-full bottom-3 rotate-45'
      case 'left':
        return 'bottom-3 -translate-x-2 rotate-45'
      case 'top':
        return 'left-1/2 bottom-7 -translate-x-1/2 rotate-45'
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 rotate-45'
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
    <div className="relative">
      <button
        aria-expanded={isTooltipVisible}
        aria-controls={tooltipId}
        aria-describedby={tooltipId}
        onClick={() => setIsTooltipVisible(true)}
        onMouseEnter={() => setIsTooltipVisible(true)}
        className="inline-flex items-center"
      >
        {buttonContent}
      </button>
      {isTooltipVisible && (
        <div
          className="drop-shadow transition-opacity duration-300"
          ref={tooltipRef}
        >
          <span
            className={`absolute size-2 border-l border-t ${getArrowPositionClass()} ${getArrowColorClass()}`}
          ></span>
          <div
            className={`absolute w-[280px] rounded p-3 ${getTooltipColorClass()} ${getTooltipPositionClass()}`}
          >
            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1" id={tooltipId} role="tooltip">
                {tooltipContent}
              </div>
              <button
                className="size-6"
                onClick={() => setIsTooltipVisible(false)}
              >
                <Icon
                  iconName={
                    color === 'dark'
                      ? 'icon-modal-close-white'
                      : 'icon-modal-close'
                  }
                  size="l"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
