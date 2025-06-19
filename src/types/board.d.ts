interface BoardListResponse {
  boardList: BoardItem[]
  hasNext: boolean
  nextCursor: string
}

interface BoardItem {
  authorNickname: string
  authorProfileImageUrl: string
  boardId: string
  question: string
  viewCnt: number
  createdAt: string
  isMyPost: boolean
}

interface BoardDetailData {
  authorNickname: string
  authorProfileImageUrl: string
  question: string
  modelAnswer: string
  feedback: string
  authorComment: string
  viewCnt: number
  createdAt: string
}
