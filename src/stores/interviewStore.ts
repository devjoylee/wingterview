import { create } from 'zustand'

interface InterviewState {
  interviewId: string
  currentRound: number
  currentPhase: string
  isInterviewer: boolean
  partner: BaseProfile | null
  questionIdx: number
  selectedQuestion: string
  isAiInterview: boolean
  questionOption: string[]
  timeRemain: number

  setInterviewData: (data: Partial<InterviewData>) => void
  saveSelectedQuestion: (q: string) => void
}

export const useInterviewStore = create<InterviewState>(set => ({
  interviewId: '',
  currentRound: 1,
  currentPhase: 'PENDING',
  isInterviewer: false,
  isAiInterview: false,
  partner: null,
  timeRemain: 0,
  questionIdx: 0,
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
      questionIdx: state.questionIdx + 1,
    })),
}))
