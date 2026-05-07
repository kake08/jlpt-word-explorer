type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[8px] border border-dashed border-stone-300 bg-paper/70 p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-[8px] border border-stone-200 bg-linen text-2xl text-clay">
        詞
      </div>
      <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">
        {description}
      </p>
    </div>
  )
}
