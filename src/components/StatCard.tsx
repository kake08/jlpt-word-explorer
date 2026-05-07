type StatCardProps = {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="rounded-[2px] border border-stone-200 bg-paper p-5 shadow-subtle">
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-3 text-4xl font-medium text-ink">{value}</p>
    </article>
  )
}
