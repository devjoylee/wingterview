import { ChevronLeft } from 'lucide-react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

interface SubPageHeaderProps {
  name: string
  backTo: string
}

export const SubPageHeader: React.FC<SubPageHeaderProps> = ({
  name,
  backTo,
}) => {
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={() => navigate(backTo)}>
        <ChevronLeft size={28} />
      </button>
      <h2>{name}</h2>
    </header>
  )
}
