import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/ui'
import styles from './styles.module.scss'

interface PageProps {
  hasNavbar?: boolean
}

export const Page: React.FC<PageProps> = ({ hasNavbar = false }) => {
  return (
    <>
      <div
        className={`${styles.pageContainer} ${hasNavbar ? styles.hasNavbar : ''}`}
      >
        <Outlet />
      </div>
      {hasNavbar && <Navbar />}
    </>
  )
}
