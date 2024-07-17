'use client'

import { useEffect, useRef, useState } from 'react'

import Icon from '@/components/icon'

export default function TooltipButton({
  color,
  direction,
  buttonContent,
  tooltipContent,
}: {
  color: 'light' | 'dark'
  direction: 'right' | 'left' | 'top' | 'bottom'
  buttonContent: React.ReactNode
  tooltipContent: React.ReactElement
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false)
      }
    }

    if (isTooltipVisible) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isTooltipVisible])

  const getTooltipPositionClass = () => {
    switch (direction) {
      case 'right':
        return 'left-[calc(100%+4px)] -top-2 transform -translate-y-6'
      case 'left':
        return 'right-[calc(100%+4px)] -top-2 transform -translate-y-1/2'
      case 'top':
        return 'bottom-8 left-1/2 transform -translate-x-1/2'
      default:
        return 'top-[calc(100%+4px)] left-1/2 transform -translate-x-1/2 sm:-translate-x-1/4'
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
        return 'top-1/2 left-1/2 transform -translate-x-1/2 rotate-45'
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
        onClick={() => setIsTooltipVisible(true)}
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
            className={`absolute h-2 w-2 border-l border-t ${getArrowPositionClass()} ${getArrowColorClass()}`}
          ></span>
          <div
            className={`absolute w-[280px] rounded p-3 ${getTooltipColorClass()} ${getTooltipPositionClass()}`}
          >
            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">{tooltipContent}</div>
              <button
                className="h-6 w-6"
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
