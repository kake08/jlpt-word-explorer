import { EmptyState } from '../components/EmptyState'
import { FilterBar } from '../components/FilterBar'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { WordCard } from '../components/WordCard'
import { useMyVocabFilters } from '../hooks/useMyVocabFilters'
import { useVocabStore } from '../stores/vocabStore'

export function MyVocab() {
  const { levelFilter, statusFilter, setLevelFilter, setStatusFilter } =
    useMyVocabFilters()
  const savedWords = useVocabStore((state) => state.savedWords)
  const filteredWords = savedWords.filter((word) => {
    const matchesLevel =
      levelFilter === 'All levels' || word.level === levelFilter
    const matchesStatus =
      statusFilter === 'All statuses' || word.status === statusFilter

    return matchesLevel && matchesStatus
  })
  const hasSavedWords = savedWords.length > 0

  return (
    <PageContainer>
      <SectionHeader
        title="My Vocab"
        description="A static preview of the personal vocabulary tracker, ready for saved words and review states later."
      />

      <FilterBar
        levelFilter={levelFilter}
        statusFilter={statusFilter}
        onLevelFilterChange={setLevelFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {filteredWords.length > 0 ? (
        <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredWords.map((word) => (
            <WordCard key={`${word.kanji}-${word.kana}`} word={word} />
          ))}
        </section>
      ) : (
        <div className="pt-8">
          <EmptyState
            title={hasSavedWords ? 'No matching words' : 'No saved words yet'}
            description={
              hasSavedWords
                ? 'Adjust the filters to bring more vocabulary back into view.'
                : 'Words you save from Explore will appear here for review.'
            }
          />
        </div>
      )}
    </PageContainer>
  )
}
