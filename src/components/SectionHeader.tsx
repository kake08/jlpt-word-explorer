type SectionHeaderProps = {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex max-w-2xl flex-col gap-2">
      <h2 className="text-2xl font-medium text-ink">{title}</h2>
      {description ? (
        <p className="text-base leading-7 text-stone-600">{description}</p>
      ) : null}
    </div>
  )
}
