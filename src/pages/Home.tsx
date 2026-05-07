import { Link, useSearchParams } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { StatCard } from '../components/StatCard'
import { WordCard } from '../components/WordCard'
import { progressStats } from '../data/vocabulary'
import { useVocabStore } from '../stores/vocabStore'
import { withExploreLevel } from '../utils/exploreLevelParams'

export function Home() {
  const [searchParams] = useSearchParams()
  const recentGeneratedWords = useVocabStore(
    (state) => state.recentGeneratedWords,
  )
  const displayedRecentWords = recentGeneratedWords.slice(0, 3)

  return (
    <PageContainer>
      <section className="grid gap-10 border-b border-stone-200 pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-clay">
            Japanese Vocab Explorer - ことばのたんけん
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-medium leading-tight text-ink sm:text-6xl">
            Explore and track Japanese vocabulary.
          </h1>
        </div>
        <p className="max-w-lg text-lg leading-8 text-stone-600">
          A quiet workspace for reviewing words, noticing connections, and
          shaping a personal vocabulary path.
        </p>
      </section>

      <section className="py-10">
        <SectionHeader title="Recently Viewed Words" />
        {displayedRecentWords.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {displayedRecentWords.map((word) => (
              <WordCard key={`${word.kanji}-${word.kana}`} word={word} />
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-dashed border-stone-300 bg-paper/80 p-8 shadow-subtle sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-clay">
                こんにちは!
              </p>
              <h2 className="mt-3 text-2xl font-medium text-ink">
                Let's start learning.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">
                Generate your first word and it will settle in here for later.
              </p>
            </div>
            <Link
              to={withExploreLevel('/explore', searchParams)}
              className="mt-5 inline-flex rounded-[6px] bg-ink px-5 py-3 text-sm font-medium text-linen transition hover:bg-clay sm:mt-0"
            >
              Get started
            </Link>
          </div>
        )}
      </section>

      <section className="grid gap-4 py-2 md:grid-cols-3">
        {progressStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="pt-10">
        <div className="rounded-[8px] border border-stone-200 bg-paper p-6 shadow-subtle sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-ink">Continue Exploring</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Open the discovery view and work with a featured JLPT word.
            </p>
          </div>
          <Link
            to={withExploreLevel('/explore', searchParams)}
            className="mt-5 inline-flex rounded-[6px] bg-ink px-5 py-3 text-sm font-medium text-linen transition hover:bg-clay sm:mt-0"
          >
            Explore words
          </Link>
        </div>
      </section>
    </PageContainer>
  )
}
