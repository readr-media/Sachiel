'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  getAnswerWithProgress,
  searchWithHybrid,
} from '@/app/actions/hybrid-search'
import { useUser } from '@/context/user'
import type {
  AnswerResponse,
  HybridSearchRequest,
  HybridSearchResponse,
} from '@/types/miso'

interface UseHybridSearchWithAnswerOptions {
  userId?: string
  autoFetchAnswer?: boolean
  searchOptions?: Partial<HybridSearchRequest>
}

export default function useHybridSearchWithAnswer(
  options: UseHybridSearchWithAnswerOptions = {}
) {
  const { user } = useUser()
  const {
    userId = user?.memberId,
    autoFetchAnswer = true,
    searchOptions = {},
  } = options

  // 搜尋相關狀態
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<HybridSearchResponse | null>(null)
  const [currentQuery, setCurrentQuery] = useState<string>('')

  // 答案相關狀態
  const [answer, setAnswer] = useState<AnswerResponse | null>(null)
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
  const [answerError, setAnswerError] = useState<string | null>(null)

  // 打字機效果狀態
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const previousAnswerRef = useRef<string>('')

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) return

      // 防止重複調用相同查詢
      if (isLoading || searchQuery === currentQuery) {
        console.log(
          '🚫 [useHybridSearch] Skipping duplicate search for:',
          searchQuery
        )
        return
      }

      try {
        setCurrentQuery(searchQuery)
        setIsLoading(true)
        setError(null)
        // 清空之前的答案
        setAnswer(null)
        setAnswerError(null)
        setDisplayedText('')
        setIsTyping(false)
        previousAnswerRef.current = ''

        const response = await searchWithHybrid(searchQuery, userId, {
          rows: 10,
          facets: ['custom_attributes.article:section'],
          order_by: 'relevance',
          ...searchOptions,
        })

        console.log('📊 [useHybridSearch] Search completed:', response)
        setResults(response)

        // 自動獲取 AI 答案
        if (autoFetchAnswer && response?.data.question_id) {
          console.log(
            '🤖 [useHybridSearch] Auto-fetching answer for question:',
            response.data.question_id
          )
          fetchAnswer(response.data.question_id)
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Search failed'
        console.error('❌ [useHybridSearch] Search error:', err)
        setError(errorMessage)
        setResults(null)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, currentQuery, userId, autoFetchAnswer, searchOptions]
  )

  const fetchAnswer = useCallback(async (questionId: string) => {
    try {
      setIsLoadingAnswer(true)
      setAnswerError(null)
      setDisplayedText('')
      setIsTyping(false)
      previousAnswerRef.current = ''
      console.log(
        '🤖 [useHybridSearch] Fetching answer for question:',
        questionId
      )

      // 客戶端輪詢機制
      const maxRetries = 10
      const pollInterval = 500
      let attempts = 0

      while (attempts < maxRetries) {
        const response = await getAnswerWithProgress(questionId)

        if (response) {
          console.log(
            `📝 [useHybridSearch] Attempt ${attempts + 1}, finished: ${
              response.data.finished
            }, stage: ${response.data.answer_stage}`
          )

          // 每次都更新答案內容（觸發打字機效果）
          setAnswer(response)

          // 如果完成了，退出迴圈
          if (response.data.finished) {
            console.log('✅ [useHybridSearch] Answer completed!')
            break
          }
        } else {
          console.warn('⚠️ [useHybridSearch] No response received')
        }

        attempts++

        // 如果還沒完成且未達到最大重試次數，等待後繼續
        if (attempts < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval))
        }
      }

      if (attempts >= maxRetries) {
        console.warn('⚠️ [useHybridSearch] Max retries reached')
        setAnswerError('答案生成超時，請重試')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get answer'
      console.error('❌ [useHybridSearch] Answer error:', err)
      setAnswerError(errorMessage)
    } finally {
      setIsLoadingAnswer(false)
    }
  }, [])

  // 處理答案中的格式轉換
  const processAnswerText = useCallback((text: string) => {
    let processedText = text
      // 處理粗體文字 **text** -> <strong>text</strong> (先處理，避免和列表衝突)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // 處理列表項目 - 內容 -> <li>內容</li>
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      // 處理引用連結 [[1]](url) -> <a>連結</a>
      .replace(
        /\[\[(\d+)\]\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="caption-1 inline-flex size-5 flex-wrap items-center justify-center rounded-full bg-primary-200 text-primary-700 mr-2 last-of-type:mr-0">$1</a>'
      )
      // 處理換行符號 \n -> <br>
      .replace(/\n/g, '<br>')

    // 將連續的 <li> 項目包在 <ul> 中
    processedText = processedText.replace(
      /(<li>.*?<\/li>)(<br>)*(<li>.*?<\/li>)*/g,
      (match) => {
        // 移除 <br> 標籤，因為list不需要
        const cleanMatch = match.replace(/<br>/g, '')
        return `<ul class="list-disc list-inside space-y-1 my-2">${cleanMatch}</ul>`
      }
    )

    return processedText
  }, [])

  // 重試搜尋
  const retrySearch = useCallback(() => {
    if (currentQuery) {
      performSearch(currentQuery)
    }
  }, [currentQuery, performSearch])

  // 重試答案
  const retryAnswer = useCallback(() => {
    if (results?.data.question_id) {
      fetchAnswer(results.data.question_id)
    }
  }, [results?.data.question_id, fetchAnswer])

  // 打字機效果邏輯
  useEffect(() => {
    if (!answer?.data.answer) {
      setDisplayedText('')
      return
    }

    const fullText = processAnswerText(answer.data.answer)

    // 如果內容沒變，不需要重新打字
    if (fullText === previousAnswerRef.current) return

    // 檢查是否是內容擴展
    const isExtension =
      fullText.startsWith(previousAnswerRef.current.replace(/<[^>]*>/g, '')) ||
      previousAnswerRef.current === ''

    if (isExtension) {
      setIsTyping(true)

      // 提取純文字來計算要打字的內容
      const plainText = fullText.replace(/<[^>]*>/g, '')
      const currentPlainText = displayedText.replace(/<[^>]*>/g, '')

      if (plainText.length > currentPlainText.length) {
        let index = currentPlainText.length
        const typingSpeed = 30 // 每字符間隔 30ms

        const typeNext = () => {
          if (index < plainText.length) {
            // 找到下一個要顯示的 HTML 位置
            let htmlIndex = 0
            let plainIndex = 0

            for (let i = 0; i < fullText.length; i++) {
              if (fullText[i] === '<') {
                // 跳過整個標籤
                while (i < fullText.length && fullText[i] !== '>') i++
                htmlIndex = i + 1
              } else {
                if (plainIndex === index) {
                  htmlIndex = i + 1
                  break
                }
                plainIndex++
              }
            }

            setDisplayedText(fullText.substring(0, htmlIndex))
            index++
            setTimeout(typeNext, typingSpeed)
          } else {
            setIsTyping(false)
            previousAnswerRef.current = fullText
          }
        }

        typeNext()
      } else {
        setDisplayedText(fullText)
        setIsTyping(false)
        previousAnswerRef.current = fullText
      }
    } else {
      // 全新內容，直接重新開始打字
      setDisplayedText('')
      setIsTyping(true)

      const plainText = fullText.replace(/<[^>]*>/g, '')
      let index = 0
      const typingSpeed = 30

      const typeNext = () => {
        if (index < plainText.length) {
          let htmlIndex = 0
          let plainIndex = 0

          for (let i = 0; i < fullText.length; i++) {
            if (fullText[i] === '<') {
              while (i < fullText.length && fullText[i] !== '>') i++
              htmlIndex = i + 1
            } else {
              if (plainIndex === index) {
                htmlIndex = i + 1
                break
              }
              plainIndex++
            }
          }

          setDisplayedText(fullText.substring(0, htmlIndex))
          index++
          setTimeout(typeNext, typingSpeed)
        } else {
          setIsTyping(false)
          previousAnswerRef.current = fullText
        }
      }

      typeNext()
    }
  }, [answer?.data.answer, processAnswerText])

  return {
    // 搜尋狀態
    isLoading,
    error,
    results,
    currentQuery,

    // 答案狀態
    answer,
    isLoadingAnswer,
    answerError,
    displayedText,
    isTyping,

    // 操作函數
    performSearch,
    fetchAnswer,
    retrySearch,
    retryAnswer,
  }
}
