import { useSearchParams } from 'react-router-dom'
import type { LevelFilter, StatusFilter } from '../components/FilterBar'
import type { JlptLevel, LearningStatus } from '../data/vocabulary'

const levelFilters: LevelFilter[] = ['All levels', 'N5', 'N4', 'N3', 'N2', 'N1']
const statusFilters: StatusFilter[] = [
  'All statuses',
  'Know',
  'Familiar',
  'Learning',
]

function isLevelFilter(value: string | null): value is JlptLevel {
  return levelFilters.includes(value as LevelFilter) && value !== 'All levels'
}

function isStatusFilter(value: string | null): value is LearningStatus {
  return (
    statusFilters.includes(value as StatusFilter) && value !== 'All statuses'
  )
}

export function useMyVocabFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const levelParam = searchParams.get('level')
  const statusParam = searchParams.get('status')
  const levelFilter: LevelFilter = isLevelFilter(levelParam)
    ? levelParam
    : 'All levels'
  const statusFilter: StatusFilter = isStatusFilter(statusParam)
    ? statusParam
    : 'All statuses'

  function setFilters(nextLevel: LevelFilter, nextStatus: StatusFilter) {
    setSearchParams({
      ...(nextLevel !== 'All levels' ? { level: nextLevel } : {}),
      ...(nextStatus !== 'All statuses' ? { status: nextStatus } : {}),
    })
  }

  return {
    levelFilter,
    statusFilter,
    setLevelFilter: (level: LevelFilter) => setFilters(level, statusFilter),
    setStatusFilter: (status: StatusFilter) => setFilters(levelFilter, status),
  }
}
