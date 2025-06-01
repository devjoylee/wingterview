import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Zap, BookCheck, MessageSquare, User } from 'lucide-react'
import { getAIInterviewRouteByPhase } from '@/utils'
import { useAIInterviewStore } from '@/stores'
import styles from './styles.module.scss'

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const currentPhase = useAIInterviewStore(state => state.currentPhase)

  useEffect(() => {
    const path = location.pathname

    if (path === '/') {
      setActiveTab('home')
    } else if (path.includes('interview')) {
      setActiveTab('interview')
    } else if (path.includes('quiz')) {
      setActiveTab('quiz')
    } else if (path.includes('chat')) {
      setActiveTab('chat')
    } else if (path.includes('mypage') || path.includes('profile')) {
      setActiveTab('mypage')
    }
  }, [location.pathname])

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab)
    navigate(path)
  }

  // const handleInterviewTabClick = () => {
  //   const interviewPath = getInterviewRouteByPhase(
  //     currentPhase,
  //     questionOption,
  //     selectedQuestion
  //   )
  //   handleTabClick('interview', interviewPath)
  // }

  const handleAIInterviewTabClick = () => {
    const path = getAIInterviewRouteByPhase(currentPhase)
    handleTabClick('interview', path)
  }

  return (
    <div className={styles.navbar}>
      <div
        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => handleTabClick('home', '/')}
      >
        <Home />
        <span>홈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'interview' ? styles.active : ''}`}
        onClick={handleAIInterviewTabClick}
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
        <span>게시판</span>
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
