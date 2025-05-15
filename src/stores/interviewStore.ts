import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface InterviewState {
  interviewId: string
  currentRound: number
  currentPhase: string
  isInterviewer: boolean
  partner: BaseProfile | null
  questionIdx: number
  selectedQuestion: string
  isAiInterview: boolean
  questionOption: string[] | null
  timeRemain: number

  setInterviewData: (data: Partial<InterviewData>) => void
  saveSelectedQuestion: (q: string) => void
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    set => ({
      interviewId: '',
      currentRound: 1,
      currentPhase: 'PENDING',
      isInterviewer: false,
      isAiInterview: false,
      partner: null,
      timeRemain: 0,
      questionIdx: 1,
      selectedQuestion: '',
      questionOption: [],

      setInterviewData: data =>
        set(state => ({
          ...state,
          ...data,
        })),

      saveSelectedQuestion: (selected: string) =>
        set(state => ({
          selectedQuestion: selected,
          questionIdx: state.questionIdx === -1 ? 1 : state.questionIdx + 1,
        })),
    }),
    {
      name: 'interview-storage',
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
