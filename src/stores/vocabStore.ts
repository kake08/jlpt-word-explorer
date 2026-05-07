import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VocabularyWord } from '../data/vocabulary'

type VocabState = {
  currentWord: VocabularyWord | null
  recentGeneratedWords: VocabularyWord[]
  setGeneratedWord: (word: VocabularyWord) => void
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set) => ({
      currentWord: null,
      recentGeneratedWords: [],
      setGeneratedWord: (word) =>
        set((state) => {
          const dedupedWords = state.recentGeneratedWords.filter(
            (recentWord) =>
              `${recentWord.kanji}-${recentWord.kana}` !==
              `${word.kanji}-${word.kana}`,
          )

          return {
            currentWord: word,
            recentGeneratedWords: [word, ...dedupedWords].slice(0, 12),
          }
        }),
    }),
    {
      name: 'japanese-knowledge-explorer-vocab',
    },
  ),
)
