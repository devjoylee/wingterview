import { InterviewStartButton, TimeSelection } from '@/components/interview'
import { useAIInterviewStore, useAuthStore } from '@/stores'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'
import { LoginButton } from '@/components/common'

export const InterviewGuideline: React.FC<{
  onClick: () => void
}> = ({ onClick }) => {
  const duration = useAIInterviewStore(state => state.duration)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  return (
    <div className={styles.guideline}>
      <img src={mrWing} alt="mr wing" className={styles.mrwing} />

      <div className={styles.textBox}>
        <h3>AI 면접관, Mr.윙을 소개합니다!</h3>
        <p>
          본 면접에서는 음성 녹음이 진행됩니다. <br />
          AI 면접관 <b>Mr.윙</b>이 녹음된 파일을 분석하여 <br />
          면접이 끝나면 맞춤형 피드백을 제공합니다.
        </p>

        {!isLoggedIn && (
          <>
            <span className={styles.alert}>
              해당 서비스는 로그인 후 이용 가능합니다.
            </span>
            <LoginButton />
          </>
        )}

        {isLoggedIn && (
          <>
            <p>
              <b>원하는 면접 시간을 선택한 후</b> <br />
              START 버튼을 눌러 면접을 시작해보세요.
            </p>

            <TimeSelection />

            <span className={styles.alert}>
              * 마이크 권한사용 팝업이 뜨면 "허용" 클릭
            </span>

            <InterviewStartButton onClick={onClick} disabled={!duration} />
          </>
        )}
      </div>
    </div>
  )
}
