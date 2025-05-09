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
