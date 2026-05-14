import type { JlptLevel, VocabularyWord } from '../data/vocabulary'

const API_BASE_URL = 'https://jlpt-vocab-api.vercel.app'

type RandomWordResponse = {
  word: string
  meaning: string
  furigana: string
  romaji: string
  level: number
  //sentence: string //sentence example
}

type SentenceSearchResponse = {
  data: {
    text: string
    translations: {
      text: string
      is_direct: boolean
    }[]
  }[]
}

export type SentenceExample = {
  sentence: string
  translation: string
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

export async function fetchSentenceExample(query: string): Promise<SentenceExample> {
  const url = new URL('/v1/sentences', 'https://api.tatoeba.org')

  url.searchParams.set('lang', 'jpn')
  url.searchParams.set('q', query)
  url.searchParams.set('is_unapproved', 'no')
  url.searchParams.set('is_native', 'yes')
  url.searchParams.set('origin', 'original')
  url.searchParams.set('trans:lang', 'eng')
  url.searchParams.set('trans:is_direct', 'yes')
  url.searchParams.set('trans:is_unapproved', 'no')
  url.searchParams.set('trans:is_native', 'yes')
  url.searchParams.set('sort', 'relevance')
  url.searchParams.set('limit', '5')
  url.searchParams.set('showtrans:lang', 'eng')
  url.searchParams.set('showtrans:is_direct', 'yes')
  url.searchParams.set('showtrans:is_unapproved', 'no')
  url.searchParams.set('showtrans:is_orphan', 'no')
  url.searchParams.set('showtrans:is_native', 'yes')

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Could not fetch a sentence example.')
  }

  const data = (await response.json()) as SentenceSearchResponse
  const result = data.data[0]
  const sentence = result?.text
  const translation = result?.translations.find(
    (translation) => translation.is_direct,
  )?.text

  if (!sentence) {
    throw new Error('No sentence example found for this word.')
  }

  if (!translation) {
    throw new Error('No direct translation found for this sentence.')
  }

  return {
    sentence,
    translation,
  }
}
