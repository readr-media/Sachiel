// 該 hook 僅作為單次圖片載入失敗的 fallback 處理使用

import { useState } from 'react'

export default function useFallbackImage(
  initialImage: string,
  fallbackImage: string
) {
  const [imageSrc, setImageSrc] = useState(initialImage)

  const onErrorHandle = () => {
    setImageSrc(fallbackImage)
  }

  return {
    imageSrc,
    onErrorHandle,
  }
}
