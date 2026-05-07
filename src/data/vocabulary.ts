export type LearningStatus = 'Know' | 'Familiar' | 'Learning'
export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

export type VocabularyWord = {
  kanji: string
  kana: string
  meaning: string
  level: JlptLevel
  status?: LearningStatus
}

export const recentWords: VocabularyWord[] = [
  {
    kanji: '実力',
    kana: 'じつりょく',
    meaning: 'actual ability',
    level: 'N3',
    status: 'Learning',
  },
  {
    kanji: '能力',
    kana: 'のうりょく',
    meaning: 'ability; capacity',
    level: 'N3',
    status: 'Familiar',
  },
  {
    kanji: '挑戦',
    kana: 'ちょうせん',
    meaning: 'challenge; attempt',
    level: 'N3',
    status: 'Know',
  },
]

export const savedWords: VocabularyWord[] = [
  ...recentWords,
  {
    kanji: '経験',
    kana: 'けいけん',
    meaning: 'experience',
    level: 'N4',
    status: 'Familiar',
  },
  {
    kanji: '理解',
    kana: 'りかい',
    meaning: 'understanding',
    level: 'N3',
    status: 'Learning',
  },
  {
    kanji: '目的',
    kana: 'もくてき',
    meaning: 'purpose; goal',
    level: 'N4',
    status: 'Know',
  },
]

export const progressStats = [
  { label: 'Know', value: 48 },
  { label: 'Familiar', value: 72 },
  { label: 'Learning', value: 26 },
]

export const relatedWords = ['能力', '力量', '実験']
