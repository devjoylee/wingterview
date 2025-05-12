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

  setInterviewData: (data: InterviewData) => void
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
}))
