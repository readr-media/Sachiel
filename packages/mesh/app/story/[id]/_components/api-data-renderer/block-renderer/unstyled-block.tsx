'use client'

import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

export interface ApiDataUnstyled extends ApiDataBlockBase {
  type: ApiDataBlockType.Unstyled
  content: string
  alignment: 'center'
}

// inline-block
const Annotation = ({ text, body }: { text: string; body: string }) => {
  const [showBody, setShowBody] = useState(false)

  return (
    <>
      <span
        onClick={() => setShowBody(!showBody)}
        className={showBody ? 'expand' : ''}
      >
        {text}
      </span>
      <div
        className={`body ${showBody ? 'expand' : ''}`}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  )
}

export default function UnstyledBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataUnstyled
}) {
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blockEle = blockRef.current
    const annotationEle = blockEle?.querySelector(
      'span[data-entity-type="annotation"]'
    )
    if (annotationEle) {
      const text = annotationEle.textContent ?? ''
      const body = annotationEle.getAttribute('data-annotation-body') ?? ''
      if (body) {
        const annotationRoot = document.createElement('div')
        annotationRoot.className = 'annotation-block'
        annotationEle.parentNode?.insertBefore(
          annotationRoot,
          annotationEle.nextSibling
        )
        const root = createRoot(annotationRoot)
        root.render(<Annotation text={text} body={body} />)

        annotationEle.parentNode?.removeChild(annotationEle)
      } else {
        annotationEle.parentNode?.removeChild(annotationEle)
      }
    }
  }, [])

  return (
    <div
      ref={blockRef}
      dangerouslySetInnerHTML={{ __html: apiDataBlock.content }}
    />
  )
}
