import type { LearningStatus } from '../data/vocabulary'

type StatusBadgeProps = {
  status: LearningStatus
}

const statusStyles: Record<LearningStatus, string> = {
  Know: 'border-stone-300 bg-stone-100 text-stone-800',
  Familiar: 'border-amber-200 bg-amber-50 text-amber-900',
  Learning: 'border-sage-200 bg-sage-50 text-sage-900',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}
