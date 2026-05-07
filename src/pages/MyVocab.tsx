import { EmptyState } from '../components/EmptyState'
import { FilterBar } from '../components/FilterBar'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { WordCard } from '../components/WordCard'
import { savedWords } from '../data/vocabulary'

export function MyVocab() {
  return (
    <PageContainer>
      <SectionHeader
        title="My Vocab"
        description="A static preview of the personal vocabulary tracker, ready for saved words and review states later."
      />

      <FilterBar />

      <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
        {savedWords.map((word) => (
          <WordCard key={`${word.kanji}-${word.status}`} word={word} />
        ))}
      </section>

      <EmptyState
        title="No saved words yet"
        description="This reusable state will appear when filters or future saved vocabulary lists have no matching words."
      />
    </PageContainer>
  )
}
