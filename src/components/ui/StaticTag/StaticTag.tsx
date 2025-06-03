import styles from './styles.module.scss'

interface StaticTagProps {
  label: string
  dark?: boolean
}

export const StaticTag: React.FC<StaticTagProps> = ({
  label,
  dark = false,
}) => (
  <div className={`${styles.tag} ${dark ? styles.darkTag : styles.lightTag}`}>
    {label}
  </div>
)
