import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface InterviewState {
  interviewId: string
  questionIdx: number
  question: string
  timeRemain: number
  duration: number
  keyword: string

  setInterviewId: (id: string) => void
  setQuestion: (question: string) => void
  setInterviewData: (data: Partial<AIInterviewData>) => void
  setDuration: (duration: number) => void
  setKeyword: (keyword: string) => void
  reset: () => void
}

export const useAIInterviewStore = create<InterviewState>()(
  persist(
    set => ({
      interviewId: '',
      duration: 0,
      timeRemain: 0,
      questionIdx: 1,
      question: '',
      keyword: '',

      setInterviewId: interviewId => set({ interviewId }),
      setQuestion: question => set({ question }),
      setDuration: duration => set({ duration }),
      setKeyword: keyword => set({ keyword }),

      setInterviewData: data =>
        set(state => ({
          ...state,
          ...data,
        })),

      reset: () => sessionStorage.removeItem('ai-interview-storage'),
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
