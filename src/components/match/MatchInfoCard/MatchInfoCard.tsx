import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { StaticTag } from '@/components/common'

interface MatchInfoCardProps {
  interviewer: BaseProfile
  interviewee: BaseProfile
}

export const MatchInfoCard: React.FC<MatchInfoCardProps> = ({
  interviewer,
  interviewee,
}: MatchInfoCardProps) => {
  console.log(interviewer, interviewee)

  return (
    <div className={styles.matchInfoCard}>
      <div className={`${styles.container} ${styles.interviewerCard}`}>
        <img src={defaultImage} alt="profile" className={styles.profileImage} />
        <div className={styles.profileData}>
          <h3 className={styles.name}>
            {`${interviewer.nickname} (${interviewer.name}) / ${interviewer.curriculum}`}
          </h3>
          <div className={styles.myStacks}>
            <StaticTag label="희망직무" />
            <p>{interviewer.jobInterest.join(' | ')}</p>
          </div>
          <div className={styles.myStacks}>
            <StaticTag label="기술스택" dark />
            <p>{interviewer.techStack.join(' | ')}</p>
          </div>
        </div>
      </div>

      <div className={styles.roleName}>
        <div className={styles.interviewer}>
          <p>INTERVIEWER</p>
        </div>
        <div className={styles.interviewee}>
          <p>INTERVIEWEE</p>
        </div>
      </div>

      <div className={`${styles.container} ${styles.intervieweeCard}`}>
        <div className={styles.profileData}>
          <h3 className={styles.name}>
            {`${interviewee.nickname} (${interviewee.name}) / ${interviewee.curriculum}`}
          </h3>
          <div className={styles.myStacks}>
            <p>{interviewee.jobInterest.join(' | ')}</p>
            <StaticTag label="희망직무" />
          </div>
          <div className={styles.myStacks}>
            <p>{interviewee.techStack.join(' | ')}</p>
            <StaticTag label="기술스택" dark />
          </div>
        </div>
        <img src={defaultImage} alt="profile" className={styles.profileImage} />
      </div>
    </div>
  )
}
