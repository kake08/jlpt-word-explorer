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

function getTimestamp(word: VocabularyWord) {
  return word.timestamp ?? 0
}

function sortNewestFirst(words: VocabularyWord[]) {
  return [...words].sort((firstWord, secondWord) => {
    return getTimestamp(secondWord) - getTimestamp(firstWord)
  })
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
            recentGeneratedWords: sortNewestFirst([word, ...dedupedWords]).slice(
              0,
              12,
            ),
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
            savedWords: sortNewestFirst([
              { ...word, status: word.status ?? 'Learning' },
              ...state.savedWords,
            ]),
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
