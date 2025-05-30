import { InterviewStartButton } from '../InterviewStartButton/InterviewStartButton'
import styles from './styles.module.scss'
import mrWing from '@/assets/mrwing.png'

interface GuidelineBoxProps {
  onButtonClick: () => void
}

export const GuidelineBox: React.FC<GuidelineBoxProps> = ({
  onButtonClick,
}) => {
  return (
    <div className={styles.guideline}>
      <img src={mrWing} alt="mr wing" className={styles.mrwing} />

      <div className={styles.textBox}>
        <h3>AI 면접관, Mr.윙을 소개합니다!</h3>

        <p>
          본 모의 면접은 음성 인식을 기반으로 진행되며 <br />
          AI 면접관 <b>Mr.윙</b>이 답변을 분석하여 <br />
          면접 종료 후 맞춤형 피드백을 제공합니다. <br />
          START 버튼을 눌러 면접을 시작해보세요.
        </p>

        <span className={styles.alert}>
          * 마이크 권한사용 팝업이 뜨면 "허용" 클릭
        </span>

        <InterviewStartButton onClick={onButtonClick} />
      </div>
    </div>
  )
}
