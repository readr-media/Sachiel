'use client'

import { useEffect, useState } from 'react'

import { getAnswerWithProgress } from '@/app/actions/hybrid-search'
import type { AnswerResponse } from '@/types/miso'
import processAnswerText from '@/utils/miso-ask-process'

type UseAiAnswerState = {
  data: AnswerResponse | null
  loading: boolean
  error: Error | null
}

export default function useAiAnswer(questionId: string): UseAiAnswerState {
  const [state, setState] = useState<UseAiAnswerState>({
    data: null,
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!questionId) {
      setState({ data: null, loading: false, error: null })
      return
    }

    const fetchAnswer = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const result = await getAnswerWithProgress(questionId)
        if (result) {
          // Process answer text
          const processedResult = {
            ...result,
            data: {
              ...result.data,
              answer: processAnswerText(result.data.answer ?? ''),
            },
          }
          setState({ data: processedResult, loading: false, error: null })
        } else {
          setState({ data: null, loading: false, error: null })
        }
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error })
      }
    }

    fetchAnswer()
  }, [questionId])

  return state
}
