import { act, renderHook } from '@testing-library/react'

import { useCustomTranslation } from '@/hooks/use-custom-translation'

// Mock react-i18next
const mockTranslationFunction = jest.fn()
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockTranslationFunction,
    i18n: { language: 'zh-TW' },
  }),
}))

describe('useCustomTranslation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup default mock behavior
    mockTranslationFunction.mockImplementation(
      (key: string, fallback?: string, options?: object) => {
        const translations: { [key: string]: string } = {
          'Pages.Home.test': 'Translated Text',
          'Components.interpolation': 'Hello {{name}}',
        }

        if (options) {
          let result =
            translations[key] || (fallback !== undefined ? fallback : key)
          Object.entries(options).forEach(([varKey, varValue]) => {
            result = result.replace(`{{${varKey}}}`, String(varValue))
          })
          return result
        }

        return translations[key] || (fallback !== undefined ? fallback : key)
      }
    )
  })

  describe('Server-side fallback behavior', () => {
    it('should return fallback text during initial render (SSR)', () => {
      const { result } = renderHook(() => useCustomTranslation())

      // During initial render, should use serverT (fallback)
      expect(result.current.t('unknown.key', 'Server Fallback')).toBe(
        'Server Fallback'
      )
    })

    it('should handle interpolation in serverT fallback', () => {
      const { result } = renderHook(() => useCustomTranslation())

      const interpolated = result.current.t(
        'unknown.key',
        'Hello {{name}}, today is {{date}}',
        { name: 'John', date: '2025-01-15' }
      )

      expect(interpolated).toBe('Hello John, today is 2025-01-15')
    })

    it('should handle complex interpolation patterns', () => {
      const { result } = renderHook(() => useCustomTranslation())

      const result1 = result.current.t(
        'test',
        '{{count}} items in {{location}}',
        { count: 5, location: 'basket' }
      )

      expect(result1).toBe('5 items in basket')
    })

    it('should return plain fallback when no interpolation options provided', () => {
      const { result } = renderHook(() => useCustomTranslation())

      expect(result.current.t('unknown', 'Plain text')).toBe('Plain text')
    })
  })

  describe('Client-side behavior', () => {
    it('should switch to clientT after useEffect runs', async () => {
      const { result } = renderHook(() => useCustomTranslation())

      // After useEffect runs, should switch to clientT behavior
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(result.current.t('Pages.Home.test', 'Fallback')).toBe(
        'Translated Text'
      )
    })
  })

  describe('Edge cases', () => {
    it('should handle empty keys and fallbacks', () => {
      const { result } = renderHook(() => useCustomTranslation())

      expect(result.current.t('', '')).toBe('')
      expect(result.current.t('nonexistent', '')).toBe('')
    })

    it('should handle undefined interpolation values', () => {
      const { result } = renderHook(() => useCustomTranslation())

      const interpolated = result.current.t('test', 'Value: {{value}}', {
        value: undefined,
      })

      expect(interpolated).toBe('Value: undefined')
    })
  })

  describe('TypeScript compatibility', () => {
    it('should work with proper TypeScript usage', () => {
      const { result } = renderHook(() => useCustomTranslation())

      // These should not cause TypeScript errors
      const translation1: string = result.current.t('key', 'fallback')
      const translation2: string = result.current.t('key', 'fallback', {
        var: 'value',
      })

      expect(typeof translation1).toBe('string')
      expect(typeof translation2).toBe('string')
    })
  })
})
