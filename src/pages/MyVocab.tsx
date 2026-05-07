import { EmptyState } from '../components/EmptyState'
import { FilterBar } from '../components/FilterBar'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'

export function MyVocab() {
  return (
    <PageContainer>
      <SectionHeader
        title="My Vocab"
        description="A static preview of the personal vocabulary tracker, ready for saved words and review states later."
      />

      <FilterBar />

      <EmptyState
        title="No saved words yet"
        description="Words you save from Explore will appear here once saving is wired up."
      />
    </PageContainer>
  )
}
