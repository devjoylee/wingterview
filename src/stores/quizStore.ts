import { create } from 'zustand'
import { QuizData } from '@/types/quiz'

interface QuizStore {
  quizzes: QuizData[]
  currentIndex: number
  userAnswers: number[]
  setQuizzes: (quizzes: QuizData[]) => void
  setCurrentIndex: (index: number) => void
  setUserAnswer: (index: number, answerIdx: number) => void
}

export const useQuizStore = create<QuizStore>(set => ({
  quizzes: [],
  currentIndex: 0,
  userAnswers: Array(10).fill(-1),

  setQuizzes: quizzes => set({ quizzes }),
  setCurrentIndex: index => set({ currentIndex: index }),
  setUserAnswer: (index, answerIdx) =>
    set(state => {
      const newAnswers = [...state.userAnswers]
      newAnswers[index] = answerIdx
      return { userAnswers: newAnswers }
    }),
}))
