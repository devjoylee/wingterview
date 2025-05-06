import styles from './styles.module.scss'

interface ProfileFormLayoutProps {
  name: string
  children: React.ReactNode
}

export const ProfileFormLayout: React.FC<ProfileFormLayoutProps> = ({
  name,
  children,
}) => {
  return (
    <div className={styles.profileLayout}>
      <div className={styles.container}>
        <h3 className={styles.name}>{name}</h3>
        {children}
      </div>
    </div>
  )
}
