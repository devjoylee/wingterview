import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedQuestion {
  idx: number
  question: string
}

interface InterviewState {
  history: SelectedQuestion[]
  question: string
  questionIdx: number

  addToHistory: (question: string) => void
  getHistory: () => SelectedQuestion[]
  resetHistory: () => void
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      history: [],
      question: '',
      questionIdx: 0,

      addToHistory: (question: string) =>
        set(state => {
          const newQuestion: SelectedQuestion = {
            idx: state.questionIdx,
            question: question,
          }

          return {
            history: [...state.history, newQuestion],
            questionIdx: state.questionIdx + 1,
            question: question,
          }
        }),

      getHistory: () => get().history,

      resetHistory: () => {
        set({
          history: [],
          questionIdx: 0,
        })
        localStorage.removeItem('interview-storage')
      },
    }),
    {
      name: 'interview-storage',
    }
  )
)
