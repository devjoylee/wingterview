import { TimeSelection } from '@/components/features'
import { useAIInterviewStore, useAuthStore } from '@/stores'
import { Button, LoginButton } from '@/components/ui'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'

interface Props {
  onNext: () => void
}

export const InterviewGuideline: React.FC<Props> = ({ onNext }) => {
  const duration = useAIInterviewStore(state => state.duration)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  return (
    <div className={styles.guideline}>
      <img src={mrWing} alt="mr wing" className={styles.mrwing} />

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
            다음 버튼을 눌러 마이크 테스트를 진행해주세요.
          </p>

          <TimeSelection />

          <span className={styles.alert}>
            * 마이크 권한사용 팝업이 뜨면 "허용" 클릭
          </span>

          <Button text="다음" onClick={onNext} disabled={!duration} />
        </>
      )}
    </div>
  )
}
