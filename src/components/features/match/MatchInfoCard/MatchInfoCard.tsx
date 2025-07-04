import { ProfileImage, StaticTag } from '@/components/ui'
import { MapPin } from 'lucide-react'
import styles from './styles.module.scss'

interface MatchInfoCardProps {
  interviewer: InterviewerData
  interviewee: IntervieweeData
}

export const MatchInfoCard: React.FC<MatchInfoCardProps> = ({
  interviewer,
  interviewee,
}: MatchInfoCardProps) => {
  return (
    <div className={styles.matchInfoCard}>
      <div className={`${styles.container} ${styles.interviewerCard}`}>
        <div className={styles.imageWrapper}>
          <ProfileImage url={interviewer.profileImageUrl} />
          <span className={styles.seatCode}>
            <MapPin />
            {interviewer.seatCode}
          </span>
        </div>
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
        <ProfileImage url={interviewee.profileImageUrl} />
      </div>
    </div>
  )
}
