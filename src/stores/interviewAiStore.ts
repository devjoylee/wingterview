import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface InterviewState {
  interviewId: string
  currentPhase: string
  questionIdx: number
  question: string
  timeRemain: number

  setInterviewId: (id: string) => void
  setQuestion: (question: string) => void
  setCurrentPhase: (currentPhase: string) => void
  setInterviewData: (data: Partial<AIInterviewData>) => void
}

export const useAIInterviewStore = create<InterviewState>()(
  persist(
    set => ({
      interviewId: '',
      currentPhase: 'PENDING',
      timeRemain: 0,
      questionIdx: 1,
      question: '',

      setInterviewId: interviewId => set({ interviewId }),
      setQuestion: question => set({ question }),
      setCurrentPhase: currentPhase => set({ currentPhase }),

      setInterviewData: data =>
        set(state => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: 'ai-interview-storage',
      storage: {
        getItem: key => {
          const value = sessionStorage.getItem(key)
          return value
            ? (JSON.parse(value) as StorageValue<InterviewState>)
            : null
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value))
        },
        removeItem: key => {
          sessionStorage.removeItem(key)
        },
      },
    }
  )
)
