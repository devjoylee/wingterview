type InterviewPhase = 'PENDING' | 'PROGRESS' | 'FEEDBACK' | 'COMPLETE'

interface InterviewStatusData {
  currentRound: number
  currentPhase: InterviewPhase
}

interface QuestionListData {
  questions: string[]
}

interface RequestQuestionBody {
  question: string | null
  keywords: string | null
}

interface InterviewData {
  interviewId: string
  currentRound: number
  currentPhase: InterviewPhase
  isInterviewer: boolean
  partner: BaseProfile
  questionIdx: number
  selectedQuestion: string
  isAiInterview: boolean
  questionOption: string[]
  timeRemain: number
}
