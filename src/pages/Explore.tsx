import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fetchRandomWord } from '../api/vocabularyApi'
import { PageContainer } from '../components/PageContainer'
import { SectionHeader } from '../components/SectionHeader'
import { WordCard } from '../components/WordCard'
import { relatedWords } from '../data/vocabulary'
import { useExploreLevelParam } from '../hooks/useExploreLevelParam'
import { useVocabStore } from '../stores/vocabStore'

export function Explore() {
  const { levels, selectedLevel, setSelectedLevel } = useExploreLevelParam()
  const [showRomaji, setShowRomaji] = useState(true)
  const currentWord = useVocabStore((state) => state.currentWord)
  const setGeneratedWord = useVocabStore((state) => state.setGeneratedWord)
  const saveWord = useVocabStore((state) => state.saveWord)
  const isCurrentWordSaved = useVocabStore((state) =>
    state.isWordSaved(state.currentWord),
  )
  const generateWordMutation = useMutation({
    mutationFn: fetchRandomWord,
    onSuccess: setGeneratedWord,
  })

  const isLoading = generateWordMutation.isPending

  function handleGenerateWord() {
    generateWordMutation.mutate(selectedLevel)
  }

  function handleSaveWord() {
    if (currentWord) {
      saveWord(currentWord)
    }
  }

  return (
    <PageContainer>
      <SectionHeader
        title="探検する　（たんけんする）"
        description="Grow your collection of vocabulary."
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setSelectedLevel(level)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
              level === selectedLevel
                ? 'border-ink bg-ink text-linen'
                : 'border-stone-200 bg-paper text-stone-600 hover:border-stone-300 hover:text-ink'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <section className="rounded-[2px] border border-stone-200 bg-[#eee8dc] px-4 py-10 sm:px-8">
        <div className="mb-6 flex justify-center">
          <label className="inline-flex items-center gap-3 rounded-[6px] border border-stone-200 bg-paper px-4 py-2 text-sm font-medium text-stone-600 shadow-subtle">
            <input
              type="checkbox"
              checked={showRomaji}
              onChange={(event) => setShowRomaji(event.target.checked)}
              className="h-4 w-4 accent-clay"
            />
            Show romaji
          </label>
        </div>

        {currentWord ? (
          <WordCard
            key={`${currentWord.kanji}-${currentWord.kana}`}
            word={currentWord}
            featured
            showRomaji={showRomaji}
          />
        ) : (
          <div className="mx-auto w-full max-w-xl rounded-[2px] border border-dashed border-stone-300 bg-paper/80 px-8 py-12 text-center shadow-subtle">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-clay">
              こんにちは!
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Let's start learning.
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-stone-600">
              Press Generate Word and I will find something worth knowing.
            </p>
          </div>
        )}
        {generateWordMutation.isError ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-sm font-medium text-red-800">
            {generateWordMutation.error.message}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleGenerateWord}
            disabled={isLoading}
            className="rounded-[6px] bg-ink px-5 py-3 text-sm font-medium text-linen transition hover:bg-clay"
          >
            {isLoading ? 'Generating...' : 'Generate Word'}
          </button>
          <button
            type="button"
            onClick={handleSaveWord}
            disabled={!currentWord || isCurrentWordSaved}
            className="rounded-[6px] border border-stone-300 bg-paper px-5 py-3 text-sm font-medium text-ink transition enabled:hover:border-stone-400 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400"
          >
            {isCurrentWordSaved ? 'Saved to My Vocab' : 'Add to My Vocab'}
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
