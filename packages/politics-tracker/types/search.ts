//programmable search 回傳的搜尋結果
export type ProgrammableSearchResultItem = {
  cacheId: string
  displayLink: string
  formattedUrl: string
  htmlFormattedUrl: string
  htmlSnippet: string
  htmlTitle: string
  kind: string
  link: string
  snippet: string
  title: string
  pagemap: PageMap
}

export type PageMap = {
  cse_image: { src: string }[]
  metatags: { [key: string]: string }[]
}

export type PaginationInfo = {
  pageIndex: number
  startIndex: number
}
