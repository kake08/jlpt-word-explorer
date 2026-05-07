import type { To } from 'react-router-dom'

export function withExploreLevel(pathname: string, searchParams: URLSearchParams): To {
  const level = searchParams.get('level')
  const status = searchParams.get('status')
  const nextSearchParams = new URLSearchParams()

  if (level) {
    nextSearchParams.set('level', level)
  }

  if (status) {
    nextSearchParams.set('status', status)
  }

  const search = nextSearchParams.toString()

  if (!search) {
    return pathname
  }

  return {
    pathname,
    search: `?${search}`,
  }
}
