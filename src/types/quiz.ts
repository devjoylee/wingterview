export interface QuizData {
  question: string
  options: string[]
  answerIdx: number
  commentary: string
}

export interface UserAnswerData {
  quizIdx: number
  userSelection: number
  isCorrect: boolean
}
