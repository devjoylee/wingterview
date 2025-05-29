import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
      question: '선점형 스케줄링과 비선점형 스케줄링의 차이는 무엇인가요?',

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
      name: 'interview-storage',
    }
  )
)
