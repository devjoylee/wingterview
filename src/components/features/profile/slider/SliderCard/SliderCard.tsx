import { Logo } from '@/components/ui'
import styles from './styles.module.scss'

interface SliderCardProps {
  name: string
  children: React.ReactNode
}

export const SliderCard: React.FC<SliderCardProps> = ({ name, children }) => {
  return (
    <div className={styles.sliderCard}>
      <div className={styles.cardContainer}>
        <Logo width={130} />
        <h3 className={styles.name}>{name}</h3>
        {children}
      </div>
    </div>
  )
}
