'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import type { Point, Rect } from '@/types/canvas'
import { getCroppedImageFileFromImageElement } from '@/utils/image-blob'

function getClampNumber(value: number, maxValue: number, minValue: number) {
  return Math.max(Math.min(maxValue, value), minValue)
}

type DrawData = {
  imageRect: Rect
  selectionRect: Rect
  scaleRate: number
}

export type ImageEditorCanvasRef = {
  getCroppedImage: () => Promise<File | null>
}

type ImageEditorCanvasProps = { imageFile: File }

const DrawRectWidth = 2

/**
 * This editor canvas is designed to crop the image as aspect ratio 2:1 according to how it displays on the canvas.
 * The canvas will find a way to fit the image and place it horizontally or vertically center.
 *
 * If image is placed horizontally center, the cropped image might contain the transparent spaces in both upper and lower area according to the image's aspect ratio comparing to 2:1.
 * If image is placed vertically center, the cropped image will contain the transparent spaces in both left and right. The selection'x always starts from 0.
 *
 * There are two size of the canvas, canvas dom size and canvas inner size.
 * The former will be the editor space according to the [design](https://www.figma.com/design/wqODc69zqgbu7TZFtQAmnN/2024_READr-Mesh_Web?node-id=13082-325896&t=szEXMP1DWoEICb3F-4).
 * The latter will be count to fit the image by comparing the canvas dom aspect ratio to image's aspect ratio. And canvas inner size will be set big enough to not lose the quality of the image.
 *
 * The editor only support moving the selection area in the direction of Y-axis.
 * When the save button clicked, the cropped image will be produced by the selection area.
 *
 * Related discussions:
 * - Crop the image with transparent area - [link](https://github.com/readr-media/Sachiel/pull/911#discussion_r1837825085)
 * - Canvas height will always bigger than width - [link](https://github.com/readr-media/Sachiel/pull/911#discussion_r1837824917)
 * - Only move the selection area in Y-axis - [link](https://github.com/readr-media/Sachiel/pull/911#discussion_r1837898052)
 */
export default forwardRef<ImageEditorCanvasRef, ImageEditorCanvasProps>(
  function ImageEditorCanvas({ imageFile }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const drawDataRef = useRef<DrawData>()
    const draggingPointRef = useRef<Point | null>(null)

    useImperativeHandle(ref, () => ({
      async getCroppedImage() {
        if (!imgRef.current || !drawDataRef.current) return null
        const { selectionRect, imageRect } = drawDataRef.current

        try {
          return await getCroppedImageFileFromImageElement(
            imgRef.current,
            selectionRect,
            imageRect
          )
        } catch (error) {
          console.error('output cropped image from image editor failed,', error)
          return null
        }
      },
    }))

    const draw = useCallback(() => {
      const canvas = canvasRef.current
      const img = imgRef.current
      const ctx = canvas?.getContext('2d')
      const drawData = drawDataRef.current
      if (!canvas || !img || !ctx || !drawData) return
      const { imageRect, selectionRect, scaleRate } = drawData

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, imageRect.x, imageRect.y)

      ctx.strokeStyle = 'white'
      ctx.lineWidth = DrawRectWidth * scaleRate

      ctx.strokeRect(
        selectionRect.x,
        selectionRect.y,
        selectionRect.width,
        selectionRect.height
      )
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(0, 0, canvas.width, selectionRect.y)
      ctx.fillRect(
        0,
        selectionRect.y + selectionRect.height,
        canvas.width,
        canvas.height - (selectionRect.y + selectionRect.height)
      )
    }, [])

    useEffect(() => {
      const canvas = canvasRef.current
      const img = imgRef.current
      const isFirstLoaded = canvas && !img

      if (isFirstLoaded) {
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const img = new Image()
        img.src = URL.createObjectURL(imageFile)
        img.onload = () => {
          const canvasBoundingRect = canvas.getBoundingClientRect()
          const canvasAspectRatio =
            canvasBoundingRect.width / canvasBoundingRect.height
          const imgAspectRatio = img.naturalWidth / img.naturalHeight

          let imageX = 0,
            imageY = 0,
            scaleRate = 1
          // fixed img width and set image vertically center
          if (imgAspectRatio > canvasAspectRatio) {
            canvas.width = img.naturalWidth
            canvas.height = canvas.width / canvasAspectRatio
            imageX = 0
            imageY = (canvas.height - img.naturalHeight) / 2
            scaleRate = canvas.width / canvasBoundingRect.width
          }
          // fixed img height and set image horizontally center
          else if (imgAspectRatio < canvasAspectRatio) {
            canvas.height = img.naturalHeight
            canvas.width = canvas.height * canvasAspectRatio
            imageX = (canvas.width - img.naturalWidth) / 2
            imageY = 0
            scaleRate = canvas.height / canvasBoundingRect.height
          } // imageAspectRatio === canvasAspectRatio
          else {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            scaleRate = canvas.width / canvasBoundingRect.width
          }

          drawDataRef.current = {
            scaleRate,
            imageRect: {
              x: imageX,
              y: imageY,
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
            selectionRect: {
              x: 0,
              y: (canvas.height - canvas.width / 2) / 2, // in this scenario, the height will never smaller than the width, check [discussion](https://github.com/readr-media/Sachiel/pull/911#discussion_r1828962453)
              width: canvas.width,
              height: canvas.width / 2,
            },
          }

          URL.revokeObjectURL(img.src)

          draw()
        }
        img.onerror = () => {
          console.error('Failed to load image to Image Editor')
        }
        imgRef.current = img
      }
    }, [draw, imageFile])

    useEffect(() => {
      const canvas = canvasRef.current
      if (canvas) {
        const onCanvasMouseDown = (e: MouseEvent) => {
          // block dragging if image is totally inside the selection
          if (
            drawDataRef.current &&
            drawDataRef.current.imageRect.height >
              drawDataRef.current.selectionRect.height
          ) {
            draggingPointRef.current = {
              x: e.clientX,
              y: e.clientY,
            }
          }
        }
        const onCanvasMouseMove = (e: MouseEvent) => {
          const draggingPoint = draggingPointRef.current
          const drawData = drawDataRef?.current
          if (draggingPoint && drawData) {
            const yDiff = (e.clientY - draggingPoint.y) * drawData.scaleRate
            const maxSelectionY =
              drawData.imageRect.y +
              drawData.imageRect.height -
              drawData.selectionRect.height
            const minSelctionY = drawData.imageRect.y
            const newSelctionY = getClampNumber(
              drawData.selectionRect.y + yDiff,
              maxSelectionY,
              minSelctionY
            )
            drawData.selectionRect.y = newSelctionY
            draw()
            draggingPointRef.current = {
              x: e.clientX,
              y: e.clientY,
            }
          }
        }
        const onCanvasMouseUpOrLeave = () => {
          draggingPointRef.current = null
        }
        canvas.addEventListener('mousedown', onCanvasMouseDown)
        canvas.addEventListener('mousemove', onCanvasMouseMove)
        canvas.addEventListener('mouseup', onCanvasMouseUpOrLeave)
        canvas.addEventListener('mouseleave', onCanvasMouseUpOrLeave)

        return () => {
          canvas.removeEventListener('mousedown', onCanvasMouseDown)
          canvas.removeEventListener('mousemove', onCanvasMouseMove)
          canvas.removeEventListener('mouseup', onCanvasMouseUpOrLeave)
          canvas.removeEventListener('mouseleave', onCanvasMouseUpOrLeave)
        }
      }
    }, [draw])
    return (
      <div className="grow">
        <canvas className="size-full " ref={canvasRef} />
      </div>
    )
  }
)
