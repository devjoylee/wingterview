import { MatchInfoCard } from '@/components/match'
import { Button, Logo } from '@/components/common'
import styles from './styles.module.scss'

const dummyData = {
  isFirstInterviewer: false,
  isAiInterview: false,
  interviewer: {
    nickname: 'leo.kim',
    name: '김광현',
    curriculum: '풀스택',
    profileImage: '<Multipart File>',
    jobInterest: ['프론트엔드 개발자', '백엔드 개발자'],
    techStack: ['Java', 'Javascript'],
    seatCode: 'a_3_m',
    seatPosition: { section: 'A', seat: [3, 1] },
  },
  interviewee: {
    nickname: 'joy.lee',
    name: '이주영',
    curriculum: '클라우드',
    profileImage: '<Multipart File>',
    jobInterest: ['DevOps 엔지니어'],
    techStack: ['python'],
  },
  interviewId: 'de305d54-75b4-431b-adb2-eb6b9e546014',
}

export const MatchResultPage: React.FC = () => {
  const iamInterviewer = false

  return (
    <div className={styles.matchResultPage}>
      <div className={styles.pageHeader}>
        <Logo width={60} color="light" />
        <h1>
          1:1 모의면접 매칭이
          <br />
          완료되었습니다!
        </h1>
      </div>

      <div className={styles.pageContent}>
        <MatchInfoCard
          interviewer={dummyData.interviewer}
          interviewee={dummyData.interviewee}
        />

        <div className={styles.myCurrentRole}>
          {iamInterviewer ? (
            <p className={styles.message}>
              joy 님은 <span>1ROUND 면접관</span>입니다.
              <br />
              잠시 후 면접 대기 화면으로 이동합니다.
            </p>
          ) : (
            <>
              <p className={styles.message}>
                joy 님은 <span>1ROUND 면접자</span>입니다.
                <br />
                면접관의 자리로 이동해주세요.
              </p>
              <Button
                text="면접관 자리 보기"
                onClick={() => console.log('hi')}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
