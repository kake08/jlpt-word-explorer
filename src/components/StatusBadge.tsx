import { useState } from 'react'
import type { LearningStatus } from '../data/vocabulary'

type StatusBadgeProps = {
  status: LearningStatus
  onStatusChange?: (status: LearningStatus) => void
}

const statusOrder: LearningStatus[] = ['Learning', 'Familiar', 'Know']

const statusStyles: Record<LearningStatus, string> = {
  Know: 'border-stone-300 bg-stone-100 text-stone-800',
  Familiar: 'border-amber-200 bg-amber-50 text-amber-900',
  Learning: 'border-sage-200 bg-sage-50 text-sage-900',
}

function getPreviousStatus(status: LearningStatus) {
  const previousStatus = statusOrder[statusOrder.indexOf(status) - 1]

  return previousStatus
}

function getNextStatus(status: LearningStatus) {
  const nextStatus = statusOrder[statusOrder.indexOf(status) + 1]

  return nextStatus
}

export function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const previousStatus = getPreviousStatus(status)
  const nextStatus = getNextStatus(status)
  const availableStatuses = statusOrder.filter((option) => option !== status)

  function updateStatus(nextStatus: LearningStatus) {
    onStatusChange?.(nextStatus)
    setIsOpen(false)
  }

  if (!onStatusChange) {
    return (
      <span
        className={`inline-flex items-center rounded-[4px] border px-2 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
      >
        {status}
      </span>
    )
  }

  return (
    <div
      className="group relative inline-flex items-center gap-1"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <button
        type="button"
        onClick={() => previousStatus && updateStatus(previousStatus)}
        disabled={!previousStatus}
        className="rounded-[4px] border border-stone-200 bg-linen px-1.5 py-0.5 text-[11px] font-medium text-stone-700 opacity-0 transition group-hover:opacity-100 enabled:hover:border-stone-300 disabled:cursor-not-allowed disabled:text-stone-300 disabled:group-hover:opacity-40"
        aria-label={`Move ${status} left`}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`inline-flex min-w-16 items-center justify-center rounded-[4px] border px-2 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
        aria-expanded={isOpen}
      >
        {status}
      </button>
      <button
        type="button"
        onClick={() => nextStatus && updateStatus(nextStatus)}
        disabled={!nextStatus}
        className="rounded-[4px] border border-stone-200 bg-linen px-1.5 py-0.5 text-[11px] font-medium text-stone-700 opacity-0 transition group-hover:opacity-100 enabled:hover:border-stone-300 disabled:cursor-not-allowed disabled:text-stone-300 disabled:group-hover:opacity-40"
        aria-label={`Move ${status} right`}
      >
        +
      </button>

      {isOpen ? (
        <div className="absolute left-1/2 top-full z-10 mt-2 min-w-24 -translate-x-1/2 rounded-[4px] border border-stone-200 bg-paper p-1 shadow-soft">
          {availableStatuses.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateStatus(option)}
              className="block w-full rounded-[4px] px-2.5 py-1.5 text-left text-[11px] font-medium text-stone-700 hover:bg-linen hover:text-ink"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
