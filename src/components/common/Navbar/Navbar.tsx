import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Zap, BookCheck, MessageSquare, User } from 'lucide-react'
import styles from './styles.module.scss'

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') setActiveTab('home')
  }, [location.pathname])

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab)
    navigate(path)
  }

  return (
    <div className={styles.navbar}>
      <div
        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => handleTabClick('home', '/')}
      >
        <Home />
        <span>매칭 홈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'interview' ? styles.active : ''}`}
        onClick={() => handleTabClick('interview', '/coming-soon')}
      >
        <Zap />
        <span>면접실</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'quiz' ? styles.active : ''}`}
        onClick={() => handleTabClick('quiz', '/coming-soon')}
      >
        <BookCheck />
        <span>오늘의 퀴즈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'chat' ? styles.active : ''}`}
        onClick={() => handleTabClick('chat', '/coming-soon')}
      >
        <MessageSquare />
        <span>채팅</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'mypage' ? styles.active : ''}`}
        onClick={() => handleTabClick('mypage', '/coming-soon')}
      >
        <User />
        <span>내 정보</span>
      </div>
    </div>
  )
}
