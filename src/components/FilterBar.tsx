import type { JlptLevel, LearningStatus } from '../data/vocabulary'

export type LevelFilter = 'All levels' | JlptLevel
export type StatusFilter = 'All statuses' | LearningStatus

type FilterBarProps = {
  levelFilter: LevelFilter
  statusFilter: StatusFilter
  onLevelFilterChange: (level: LevelFilter) => void
  onStatusFilterChange: (status: StatusFilter) => void
}

const levelOptions: LevelFilter[] = ['All levels', 'N5', 'N4', 'N3', 'N2', 'N1']
const statusOptions: StatusFilter[] = [
  'All statuses',
  'Know',
  'Familiar',
  'Learning',
]

export function FilterBar({
  levelFilter,
  statusFilter,
  onLevelFilterChange,
  onStatusFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[2px] border border-stone-200 bg-paper p-4 shadow-subtle sm:flex-row">
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-stone-600">
        Filter by level
        <select
          value={levelFilter}
          onChange={(event) =>
            onLevelFilterChange(event.target.value as LevelFilter)
          }
          className="h-11 rounded-[6px] border border-stone-200 bg-linen px-3 text-sm text-ink outline-none transition hover:border-stone-300 focus:border-clay"
        >
          {levelOptions.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-stone-600">
        Filter by status
        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as StatusFilter)
          }
          className="h-11 rounded-[6px] border border-stone-200 bg-linen px-3 text-sm text-ink outline-none transition hover:border-stone-300 focus:border-clay"
        >
          {statusOptions.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
