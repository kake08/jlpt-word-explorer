export function FilterBar() {
  return (
    <div className="flex flex-col gap-3 rounded-[2px] border border-stone-200 bg-paper p-4 shadow-subtle sm:flex-row">
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-stone-600">
        Filter by level
        <select className="h-11 rounded-[6px] border border-stone-200 bg-linen px-3 text-sm text-ink outline-none transition hover:border-stone-300 focus:border-clay">
          <option>All levels</option>
          <option>N5</option>
          <option>N4</option>
          <option>N3</option>
          <option>N2</option>
          <option>N1</option>
        </select>
      </label>
      <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-stone-600">
        Filter by status
        <select className="h-11 rounded-[6px] border border-stone-200 bg-linen px-3 text-sm text-ink outline-none transition hover:border-stone-300 focus:border-clay">
          <option>All statuses</option>
          <option>Know</option>
          <option>Familiar</option>
          <option>Learning</option>
        </select>
      </label>
    </div>
  )
}
