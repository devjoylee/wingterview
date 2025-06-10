import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface InterviewState {
  interviewId: string
  question: string
  duration: number
  keyword: string

  setInterviewId: (id: string) => void
  setQuestion: (question: string) => void
  setDuration: (duration: number) => void
  setKeyword: (keyword: string) => void
  resetInterviewData: () => void
}

export const useAIInterviewStore = create<InterviewState>()(
  persist(
    set => ({
      interviewId: '',
      duration: 0,
      question: '',
      keyword: '',

      setInterviewId: interviewId => set({ interviewId }),
      setQuestion: question => set({ question }),
      setDuration: duration => set({ duration }),
      setKeyword: keyword => set({ keyword }),

      resetInterviewData: () => {
        set({ interviewId: '', duration: 0, question: '', keyword: '' })
        sessionStorage.removeItem('ai-interview-storage')
      },
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
