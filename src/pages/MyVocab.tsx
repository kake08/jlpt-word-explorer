import { EmptyState } from '../components/EmptyState'
import { FilterBar } from '../components/FilterBar'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { WordCard } from '../components/WordCard'
import { useVocabStore } from '../stores/vocabStore'

export function MyVocab() {
  const savedWords = useVocabStore((state) => state.savedWords)

  return (
    <PageContainer>
      <SectionHeader
        title="My Vocab"
        description="A static preview of the personal vocabulary tracker, ready for saved words and review states later."
      />

      <FilterBar />

      {savedWords.length > 0 ? (
        <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
          {savedWords.map((word) => (
            <WordCard key={`${word.kanji}-${word.kana}`} word={word} />
          ))}
        </section>
      ) : (
        <div className="pt-8">
          <EmptyState
            title="No saved words yet"
            description="Words you save from Explore will appear here for review."
          />
        </div>
      )}
    </PageContainer>
  )
}
