import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VocabularyWord } from '../data/vocabulary'

type VocabState = {
  currentWord: VocabularyWord | null
  recentGeneratedWords: VocabularyWord[]
  savedWords: VocabularyWord[]
  setGeneratedWord: (word: VocabularyWord) => void
  saveWord: (word: VocabularyWord) => void
  isWordSaved: (word: VocabularyWord | null) => boolean
}

function getWordKey(word: VocabularyWord) {
  return `${word.kanji}-${word.kana}`
}

export const useVocabStore = create<VocabState>()(
  persist(
    (set, get) => ({
      currentWord: null,
      recentGeneratedWords: [],
      savedWords: [],
      setGeneratedWord: (word) =>
        set((state) => {
          const dedupedWords = state.recentGeneratedWords.filter(
            (recentWord) => getWordKey(recentWord) !== getWordKey(word),
          )

          return {
            currentWord: word,
            recentGeneratedWords: [word, ...dedupedWords].slice(0, 12),
          }
        }),
      saveWord: (word) =>
        set((state) => {
          const isAlreadySaved = state.savedWords.some(
            (savedWord) => getWordKey(savedWord) === getWordKey(word),
          )

          if (isAlreadySaved) {
            return state
          }

          return {
            savedWords: [{ ...word, status: word.status ?? 'Learning' }, ...state.savedWords],
          }
        }),
      isWordSaved: (word) => {
        if (!word) {
          return false
        }

        return get().savedWords.some(
          (savedWord) => getWordKey(savedWord) === getWordKey(word),
        )
      },
    }),
    {
      name: 'japanese-knowledge-explorer-vocab',
    },
  ),
)
