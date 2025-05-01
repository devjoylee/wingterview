import styles from './styles.module.scss'

interface ProfileCardProps {
  name: string
  children: React.ReactNode
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, children }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.container}>
        <h3 className={styles.name}>{name}</h3>
        {children}
      </div>
    </div>
  )
}
