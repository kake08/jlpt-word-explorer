import { Link } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { StatCard } from '../components/StatCard'
import { WordCard } from '../components/WordCard'
import { progressStats, recentWords } from '../data/vocabulary'

export function Home() {
  return (
    <PageContainer>
      <section className="grid gap-10 border-b border-stone-200 pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-clay">
            Japanese Knowledge Explorer
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
        <div className="grid gap-4 md:grid-cols-3">
          {recentWords.map((word) => (
            <WordCard key={word.kanji} word={word} />
          ))}
        </div>
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
            to="/explore"
            className="mt-5 inline-flex rounded-[6px] bg-ink px-5 py-3 text-sm font-medium text-linen transition hover:bg-clay sm:mt-0"
          >
            Explore words
          </Link>
        </div>
      </section>
    </PageContainer>
  )
}
