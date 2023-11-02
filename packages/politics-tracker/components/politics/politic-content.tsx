import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import { logGAEvent } from '~/utils/analytics'

import s from './politic-content.module.css'

type PoliticContentProps = {
  children: string
  dependency?: number
}

export default function PoliticContent(
  props: PoliticContentProps
): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const [isCropped, setIsCropped] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const onResize = useCallback(() => {
    const current = ref.current
    if (current) {
      if (current.scrollHeight > current.clientHeight) {
        setIsCropped(true)
      } else {
        setIsCropped(false)
      }
    }
  }, [])

  useResizeDetector({
    targetRef: ref,
    onResize,
  })

  function toggleExpand() {
    setIsExpanded(!isExpanded)
  }

  const style = classNames(
    s['content'],
    { cropped: isCropped },
    { [s['expanded']]: isExpanded }
  )

  //reset the states of `isCropped` and `isExpanded` when the props.dependency change.
  useEffect(() => {
    setIsExpanded(false)
    onResize()
  }, [onResize, props.dependency])

  function shouldShowControl(isCropped: boolean, isExpanded: boolean): boolean {
    return (isCropped && !isExpanded) || (!isCropped && isExpanded)
  }

  return (
    <>
      <div className={style} ref={ref}>
        {props.children}
      </div>
      {shouldShowControl(isCropped, isExpanded) && (
        <div className={s['mask']}>
          <span
            className={s['control']}
            onClick={() => {
              logGAEvent('click', '點擊過長政見「展開全部」')
              toggleExpand()
            }}
          >
            {isExpanded ? '顯示較少' : '展開全部'}
          </span>
        </div>
      )}
    </>
  )
}
