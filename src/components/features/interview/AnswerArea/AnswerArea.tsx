import { ProfileImage } from '@/components/ui'
import { Volume2 } from 'lucide-react'
import { useProfile } from '@/hooks/profile'
import styles from './styles.module.scss'
import { useAIInterviewStore } from '@/stores'

export const AnswerArea: React.FC<{
  onNextClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}> = ({ onNextClick }) => {
  const keyword = useAIInterviewStore(state => state.keyword)
  const setKeyword = useAIInterviewStore(state => state.setKeyword)

  const { myData } = useProfile('get')

  return (
    <section className={styles.answerArea}>
      <div className={styles.recordingBox}>
        <div className={styles.myImage}>
          {myData && <ProfileImage url={myData.profileImageUrl} size={62} />}
        </div>
        <div className={styles.recording}>
          <Volume2 size={20} />
          <span>
            답변 내용을 <b>녹음 중 </b>입니다.
          </span>
        </div>
      </div>

      <textarea
        className={styles.textArea}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="답변을 간략히 요약해보세요 (최대 200자까지 입력 가능)
입력한 내용을 바탕으로 꼬리 질문을 만들어드려요."
        maxLength={200}
      />

      <p className={styles.helper}>
        답변이 끝났다면 다음 질문 형식을 선택하세요!
      </p>

      <div className={styles.buttons}>
        <button id="followup" onClick={onNextClick}>
          꼬리 질문을 <br />
          해주세요
        </button>
        <button id="new" onClick={onNextClick}>
          새로운 질문을 <br />
          해주세요
        </button>
      </div>
    </section>
  )
}
