import type { VocabularyWord } from '../data/vocabulary'
import { StatusBadge } from './StatusBadge'

type WordCardProps = {
  word: VocabularyWord
  featured?: boolean
  showRomaji?: boolean
}

export function WordCard({
  word,
  featured = false,
  showRomaji = true,
}: WordCardProps) {
  if (featured) {
    return (
      <article className="mx-auto w-full max-w-xl rounded-[2px] border border-stone-200 bg-paper px-8 py-10 text-center shadow-subtle">
        <div className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-clay">
          {word.level}
        </div>
        <h2 className="text-7xl font-medium leading-none text-ink sm:text-8xl">
          {word.kanji}
        </h2>
        <p className="mt-5 text-xl text-stone-700">{word.kana}</p>
        {showRomaji && word.romaji ? (
          <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-stone-400">
            {word.romaji}
          </p>
        ) : null}
        <p className="mt-2 text-lg text-stone-500">"{word.meaning}"</p>
      </article>
    )
  }

  return (
    <article className="rounded-[2px] border border-stone-200 bg-paper p-5 shadow-subtle transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-4xl font-medium leading-none text-ink">
            {word.kanji}
          </h3>
          <p className="mt-3 text-sm text-stone-500">{word.kana}</p>
          {showRomaji && word.romaji ? (
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-stone-400">
              {word.romaji}
            </p>
          ) : null}
        </div>
        <span className="rounded-[4px] border border-stone-200 bg-linen px-2 py-1 text-xs font-medium text-stone-700">
          {word.level}
        </span>
      </div>
      <p className="mt-5 text-sm leading-6 text-stone-700">{word.meaning}</p>
      {word.status ? (
        <div className="mt-5">
          <StatusBadge status={word.status} />
        </div>
      ) : null}
    </article>
  )
}
