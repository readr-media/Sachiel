/**
 * Use window.history to add search param to prevent next router reload the page
 */
export function replaceSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(paramName, paramValue)
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}?${searchParams.toString()}`
  )
}

/**
 * Use window.history to add search param to prevent next router reload the page
 */
export function setSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(paramName, paramValue)
  window.history.pushState(
    null,
    '',
    `${window.location.pathname}?${searchParams.toString()}`
  )
}

/**
 * Use Next.js router to update search params, ensuring useSearchParams hook detects the change
 * This function should be used in components that need to trigger re-renders when search params change
 */
export function setSearchParamsWithRouter(
  router: any,
  paramName: string,
  paramValue: string
) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(paramName, paramValue)
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`
  router.push(newUrl, { scroll: false })
}
