import type { To } from 'react-router-dom'

export function withExploreLevel(pathname: string, searchParams: URLSearchParams): To {
  const level = searchParams.get('level')

  if (!level) {
    return pathname
  }

  return {
    pathname,
    search: `?level=${encodeURIComponent(level)}`,
  }
}
