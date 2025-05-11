import logoDark from '@assets/logo-dark.png'
import logoLight from '@assets/logo-light.png'
import styles from './styles.module.scss'

interface LogoProps {
  width: number
  color?: 'light' | 'dark'
}

export const Logo: React.FC<LogoProps> = ({ width, color }) => (
  <img
    src={color === 'light' ? logoLight : logoDark}
    alt="logo"
    className={styles.logo}
    style={{ width: width }}
  />
)
