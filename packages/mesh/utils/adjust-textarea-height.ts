export interface TextareaLike extends HTMLElement {
  scrollHeight: number
  style: CSSStyleDeclaration
}

export const createAdjustTextareaHeight = <T extends TextareaLike>(
  options: {
    minHeight?: number
    maxLines?: number
    lineHeight?: number
  } = {}
) => {
  const { minHeight = 24, maxLines = 4, lineHeight = 24 } = options

  return (textareaElement: T): void => {
    if (textareaElement) {
      textareaElement.style.height = `${minHeight}px`
      const maxHeight = lineHeight * maxLines
      const scrollHeight = textareaElement.scrollHeight
      textareaElement.style.height = `${Math.min(
        Math.max(scrollHeight, minHeight),
        maxHeight
      )}px`
    }
  }
}
