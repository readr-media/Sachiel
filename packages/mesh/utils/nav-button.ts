export function matchPath(path: string, currentPath: string) {
  const matchMethod = {
    exact: (p: string, c: string) => p === c,
    startsWith: (p: string, c: string) => c.startsWith(p),
  }

  if (path === '/') return matchMethod.exact(path, currentPath)
  return matchMethod.startsWith(path, currentPath)
}
