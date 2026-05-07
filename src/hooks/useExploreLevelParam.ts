import { useSearchParams } from 'react-router-dom'

export const exploreLevels = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'] as const
export type ExploreLevel = (typeof exploreLevels)[number]

function isExploreLevel(value: string | null): value is ExploreLevel {
  return exploreLevels.includes(value as ExploreLevel)
}

export function useExploreLevelParam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const levelParam = searchParams.get('level')
  const selectedLevel = isExploreLevel(levelParam) ? levelParam : 'All'

  function setSelectedLevel(level: ExploreLevel) {
    setSearchParams(level === 'All' ? {} : { level })
  }

  return {
    levels: exploreLevels,
    selectedLevel,
    setSelectedLevel,
  }
}
