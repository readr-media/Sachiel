'use client'

import { useEffect, useRef } from 'react'

import type { ApiDataBlockBase, ApiDataBlockType } from '../types'

type ContentEmbedCode = {
  caption: string
  scripts: unknown[]
  embeddedCode: string
  embeddedCodeWithoutScript: string
}

export interface ApiDataEmbedCode extends ApiDataBlockBase {
  type: ApiDataBlockType.EmbedCode
  content: [ContentEmbedCode]
  alignment: 'center'
}

export default function EmbedCodeBlock({
  apiDataBlock,
}: {
  apiDataBlock: ApiDataEmbedCode
}) {
  const { caption, embeddedCode } = apiDataBlock.content[0]
  const embedRef = useRef<HTMLDivElement>(null)
  const run = useRef(false)

  const isScrollVideo = caption === 'reporter-scroll-video'
  const showCaption = caption && !isScrollVideo

  useEffect(() => {
    if (embedRef.current && !run.current) {
      const node = embedRef.current
      const fragment = document.createDocumentFragment()

      // `embeddedCode` is a string, which may includes
      // multiple '<script>' tags and other html tags.
      // For executing '<script>' tags on the browser,
      // we need to extract '<script>' tags from `embeddedCode` string first.
      //
      // The approach we have here is to parse html string into elements,
      // and we could use DOM element built-in functions,
      // such as `querySelectorAll` method, to query '<script>' elements,
      // and other non '<script>' elements.
      const parser = new DOMParser()
      const ele = parser.parseFromString(
        `<div id="draft-embed">${embeddedCode}</div>`,
        'text/html'
      )
      const scripts = ele.querySelectorAll('script')
      const nonScripts = ele.querySelectorAll('div#draft-embed > :not(script)')

      nonScripts.forEach((ele) => {
        fragment.appendChild(ele)
      })

      scripts.forEach((s) => {
        const scriptEle = document.createElement('script')
        const attrs = s.attributes
        for (let i = 0; i < attrs.length; i++) {
          scriptEle.setAttribute(attrs[i].name, attrs[i].value)
        }
        scriptEle.text = s.text || ''
        fragment.appendChild(scriptEle)
      })

      node.appendChild(fragment)

      run.current = true
    }
  }, [embeddedCode])

  return (
    <section className="embed-code-block">
      <div
        className={`embed ${isScrollVideo ? 'top-layer' : ''}`}
        ref={embedRef}
      ></div>
      {showCaption && <div className="caption">{caption}</div>}
    </section>
  )
}
