export type LearningStatus = 'Know' | 'Familiar' | 'Learning'
export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

export type VocabularyWord = {
  kanji: string
  kana: string
  romaji?: string
  meaning: string
  level: JlptLevel
  status?: LearningStatus
}

export const progressStats = [
  { label: 'Know', value: 48 },
  { label: 'Familiar', value: 72 },
  { label: 'Learning', value: 26 },
]

export const relatedWords = ['能力', '力量', '実験']
