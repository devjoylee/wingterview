interface QuizData {
  question: string
  options: string[]
  answerIdx: number
  commentary: string
}

interface UserAnswerData {
  quizIdx: number
  userSelection: number
  isCorrect: boolean
}

interface QuizHistoryData {
  questionIdx: number
  question: string
  userAnswer: string
  correctAnswer: string
  commentary: string
  isCorrect: boolean
}

interface QuizHistoryResponse {
  quizzes: QuizHistoryData[]
  hasNext: boolean
  nextCursor: string
}
