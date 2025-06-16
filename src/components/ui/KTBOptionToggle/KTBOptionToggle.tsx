import ryanImage from '@assets/ryan.png'
import styles from './styles.module.scss'

interface Props {
  isKTB: boolean
  onChange: (isKTB: boolean) => void
}

export const KTBOptionToggle: React.FC<Props> = ({ isKTB, onChange }) => {
  return (
    <div className={styles.ktbOption}>
      <p className={styles.text}>
        카카오테크 부트캠프를 <br /> 수강 중이신가요?
      </p>

      <div
        className={`${styles.toggleButton} ${isKTB ? styles.yes : styles.no}`}
        onClick={() => onChange(!isKTB)}
      >
        <span className={styles.label}>{isKTB ? 'YES' : 'NO'}</span>
        <div className={styles.ryanButton}>
          <img src={ryanImage} alt="ryan" />
        </div>
      </div>
    </div>
  )
}
