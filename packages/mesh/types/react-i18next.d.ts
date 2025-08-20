/* eslint-disable filename-rules/match */

// 覆寫 react-i18next 的類型，避免複雜的類型推導
declare module 'react-i18next' {
  // 簡化 useTranslation hook 的返回類型
  export function useTranslation(
    ns?: string | string[],
    options?: Record<string, unknown>
  ): {
    t: (
      key: string,
      defaultValue?: string,
      options?: Record<string, unknown>
    ) => string
    i18n: object
    ready: boolean
  }

  // 簡化其他常用的類型
  export interface TFunction {
    (key: string): string
    (key: string, defaultValue: string): string
    (key: string, options: Record<string, unknown>): string
    (
      key: string,
      defaultValue: string,
      options: Record<string, unknown>
    ): string
  }
}

// 覆寫自定義 i18n 函數的類型
declare module '@/app/i18n/client' {
  export function useT(
    ns: string,
    options?: Record<string, unknown>
  ): {
    t: (
      key: string,
      defaultValue?: string,
      options?: Record<string, unknown>
    ) => string
    i18n: object
    ready: boolean
  }
}

declare module '@/app/i18n' {
  export function getT(
    ns: string,
    options?: Record<string, unknown>
  ): Promise<{
    t: (
      key: string,
      defaultValue?: string,
      options?: Record<string, unknown>
    ) => string
    i18n: object
  }>
}
