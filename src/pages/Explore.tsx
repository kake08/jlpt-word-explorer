import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { WordCard } from '../components/WordCard'
import { relatedWords, recentWords } from '../data/vocabulary'

const levels = ['All', 'N5', 'N4', 'N3', 'N2', 'N1']

export function Explore() {
  const featuredWord = recentWords[0]

  return (
    <PageContainer>
      <SectionHeader
        title="Explore Vocabulary"
        description="Move through JLPT vocabulary at a measured pace and collect words for later review."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            className={`rounded-[6px] border px-4 py-2 text-sm font-medium transition ${
              level === 'All'
                ? 'border-ink bg-ink text-linen'
                : 'border-stone-200 bg-paper text-stone-600 hover:border-stone-300 hover:text-ink'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <section className="rounded-[8px] border border-stone-200 bg-[#eee8dc] px-4 py-10 sm:px-8">
        <WordCard word={featuredWord} featured />
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-[6px] bg-ink px-5 py-3 text-sm font-medium text-linen transition hover:bg-clay"
          >
            Generate Word
          </button>
          <button
            type="button"
            className="rounded-[6px] border border-stone-300 bg-paper px-5 py-3 text-sm font-medium text-ink transition hover:border-stone-400"
          >
            Add to My Vocab
          </button>
        </div>
      </section>

      <section className="pt-10">
        <SectionHeader title="Related Words" />
        <div className="flex flex-wrap gap-3">
          {relatedWords.map((word) => (
            <span
              key={word}
              className="rounded-[6px] border border-stone-200 bg-paper px-4 py-3 text-lg font-medium text-ink shadow-subtle"
            >
              {word}
            </span>
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
