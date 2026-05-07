import type { JlptLevel, VocabularyWord } from '../data/vocabulary'

const API_BASE_URL = 'https://jlpt-vocab-api.vercel.app'

type RandomWordResponse = {
  word: string
  meaning: string
  furigana: string
  romaji: string
  level: number
}

const levelToQueryParam: Record<JlptLevel, number> = {
  N5: 5,
  N4: 4,
  N3: 3,
  N2: 2,
  N1: 1,
}

function formatLevel(level: number): JlptLevel {
  return `N${level}` as JlptLevel
}

export async function fetchRandomWord(selectedLevel: JlptLevel | 'All'): Promise<VocabularyWord> {
  const url = new URL('/api/words/random', API_BASE_URL)

  if (selectedLevel !== 'All') {
    url.searchParams.set('level', String(levelToQueryParam[selectedLevel]))
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not fetch a random vocabulary word.')
  }

  const data = (await response.json()) as RandomWordResponse

  return {
    kanji: data.word,
    kana: data.furigana,
    romaji: data.romaji,
    meaning: data.meaning,
    level: formatLevel(data.level),
    timestamp: Date.now(),
  }
}
