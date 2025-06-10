import emptyGood from '@assets/empty-good.png'
import emptySad from '@assets/empty-sad.png'
import styles from './styles.module.scss'

interface Props {
  text: string[]
  type: 'good' | 'sad'
}

export const EmptyPlaceholder: React.FC<Props> = ({ text, type }) => {
  return (
    <div className={styles.emptyPlaceholder}>
      {type === 'good' && <img src={emptyGood} alt="placeholder image" />}
      {type === 'sad' && <img src={emptySad} alt="placeholder image" />}
      {text.map((line, idx) => (
        <p key={idx} className={styles.text}>
          {line}
        </p>
      ))}
    </div>
  )
}
