import { StaticTag } from '@/components/common'
import styles from './styles.module.scss'
import defaultImage from '@assets/default-profile.png'
import { useNavigate } from 'react-router-dom'

const interviewee = {
  name: '이주영',
  nickname: 'joy.lee',
  curriculum: '풀스택',
  jobInterest: ['프론트엔드 개발자'],
  techStack: ['React', 'Javascript'],
}

export const InterviewAwaitingPage: React.FC = () => {
  const navigate = useNavigate()

  const handleStartInterview = () => {
    navigate('/interview/question')
  }

  return (
    <div className={styles.container}>
      <div className={styles.awaitingScreen}>
        <h2>
          면접을 시작하려면 <br />
          아래 버튼을 눌러주세요.
        </h2>

        <button onClick={handleStartInterview}>START</button>
      </div>

      <div className={styles.intervieweeCard}>
        <h3>오늘의 면접자</h3>

        <div className={styles.cardInfoWrapper}>
          <img
            src={defaultImage}
            alt="profile"
            className={styles.profileImage}
          />
          <ul className={styles.profileData}>
            <li>이름 : {`${interviewee.nickname} (${interviewee.name})`}</li>
            <li>과정 : {interviewee.curriculum}</li>
            <li>
              희망직무 :
              {interviewee?.jobInterest.map((job, idx) => (
                <StaticTag key={idx} label={job} />
              ))}
            </li>
            <li>
              기술스택 :
              {interviewee?.techStack.map((tech, idx) => (
                <StaticTag key={idx} label={tech} dark />
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
