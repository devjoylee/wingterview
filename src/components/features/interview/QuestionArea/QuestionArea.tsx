import mrWingMic from '@/assets/mrwing-mic.png'
import styles from './styles.module.scss'

export const QuestionArea: React.FC<{ question: string }> = ({ question }) => {
  return (
    <section className={styles.questionArea}>
      <div className={styles.mrwingProfile}>
        <img src={mrWingMic} alt="mr wing" />
      </div>

      <h2 className={styles.question}>{question}</h2>
    </section>
  )
}
