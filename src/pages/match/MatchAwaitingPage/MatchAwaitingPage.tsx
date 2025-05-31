import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Logo, Modal, ProfileCard } from '@/components/common'
import { useApplicantCount, useMatchResult, useMatchStart } from '@/hooks/match'
import { useMatchStore } from '@/stores/matchStore'
import { useProfile } from '@/hooks/profile'
import styles from './styles.module.scss'

export const MatchAwaitingPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [profile, setMyProfile] = useState<MyProfileData>()
  const [isInQueue, setIsInQueue] = useState<boolean>(false)
  const { isMatching, setIsMatching, setMatchResultInStore } = useMatchStore()

  const { myData } = useProfile('get')
  const { data: applicantCount } = useApplicantCount()
  const { data: matchResult } = useMatchResult({
    enablePolling: isMatching,
    isInQueue: isInQueue,
  })

  const { mutate: startMatching } = useMatchStart({
    onSuccess: async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 3000))

      await delay // 로딩 창을 위한 1.5초 지연

      setIsMatching(true)
      setIsInQueue(true)
    },
  })

  const handleMatchStart = useCallback(() => {
    startMatching()
  }, [startMatching])

  useEffect(() => {
    // 1. navigate state 데이터 확인
    if (location.state) {
      const { myProfile, imageURL } = location.state
      setMyProfile({
        ...myProfile,
        profileImageUrl: imageURL,
      })
      return
    }

    // 2. API 데이터 확인
    if (myData) {
      setMyProfile(myData)
      return
    }
  }, [location.state, myData])

  useEffect(() => {
    if (myData) setIsInQueue(myData.isInQueue)
  }, [myData])

  useEffect(() => {
    if (matchResult && matchResult.data) {
      setMatchResultInStore(matchResult.data)
      setIsMatching(false)
      navigate('/match/result', {
        state: { matchResult: matchResult.data },
      })
    }
  }, [matchResult, navigate, setMatchResultInStore, setIsMatching])

  return (
    <div className={styles.matchAwaitingPage}>
      <div className={styles.pageHeader}>
        <Logo width={60} color="light" />
        <h1>
          모의 면접 D-day,
          <br />
          오늘의 파트너는 누가 될까요?
        </h1>
      </div>

      <div className={styles.pageContent}>
        {profile && <ProfileCard profile={profile} />}

        <div className={styles.matchingState}>
          <Button onClick={handleMatchStart} text="1:1 매칭 시작하기" />
        </div>

        <p className={styles.applicantCount}>
          현재 매칭 신청자 수는 <span>{applicantCount}</span> 명입니다.
          <br />
          매칭 신청을 통해 오늘의 면접 상대를 만나보세요!
        </p>
      </div>

      <Modal
        isOpen={isMatching}
        style="loading"
        message={['모의 면접 매칭을 진행 중 입니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
