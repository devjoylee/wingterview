import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedQuestion {
  idx: number
  question: string
}

interface InterviewState {
  questionHistory: SelectedQuestion[]
  currentQuestionIdx: number

  addToHistory: (question: string) => void
  getQuestionHistory: () => SelectedQuestion[]
  resetHistory: () => void
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      questionHistory: [],
      currentQuestionIdx: 1,

      addToHistory: (question: string) =>
        set(state => {
          const newQuestion: SelectedQuestion = {
            idx: state.currentQuestionIdx,
            question: question,
          }

          return {
            questionHistory: [...state.questionHistory, newQuestion],
            currentQuestionIdx: state.currentQuestionIdx + 1,
          }
        }),

      getQuestionHistory: () => get().questionHistory,

      resetHistory: () =>
        set({
          questionHistory: [],
          currentQuestionIdx: 1,
        }),
    }),
    {
      name: 'interview-storage', // 로컬 스토리지에 저장될 키 이름
    }
  )
)
