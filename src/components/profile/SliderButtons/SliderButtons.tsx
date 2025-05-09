import styles from './styles.module.scss'
import { useSwiper } from 'swiper/react'
import { useState, useEffect } from 'react'
import { useProfileStore } from '@/stores/profileStore'
import { submitUserProfile } from '@/api/profileAPI'
import { useNavigate } from 'react-router-dom'

export const SliderButtons: React.FC = () => {
  const swiper = useSwiper()
  const { formData, validateCurrentStep, prevStep, nextStep } =
    useProfileStore()

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const navigate = useNavigate()

  const isLastStep = currentStep === 5

  const handlePrev = () => prevStep()

  const handleNext = () => {
    const isValid = validateCurrentStep()
    if (isValid) nextStep()
  }

  const handleSubmit = async () => {
    console.log('최종 제출 데이터: ', formData)
    try {
      await submitUserProfile(formData)
      // localStorage.setItem('myProfile', JSON.stringify(formData))
      localStorage.setItem('nickname', formData.nickname.split('.')[0])
      navigate('/', { state: { myProfile: formData } })
      console.log('제출 완료! 🎉')
    } catch (error) {
      console.error('제출 실패:', error)
    }
  }

  useEffect(() => {
    if (!swiper) return

    const updateState = () => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
      setCurrentStep(swiper.activeIndex)
    }

    updateState()

    swiper.on('slideChange', updateState)
    swiper.on('reachBeginning', updateState)
    swiper.on('reachEnd', updateState)

    return () => {
      swiper.off('slideChange', updateState)
      swiper.off('reachBeginning', updateState)
      swiper.off('reachEnd', updateState)
    }
  }, [swiper])

  return (
    <div className={styles.sliderBtns}>
      <button onClick={handlePrev} disabled={isBeginning}>
        이전
      </button>

      {!isLastStep ? (
        <button onClick={handleNext} disabled={isEnd}>
          다음
        </button>
      ) : (
        <button className={styles.active} onClick={handleSubmit}>
          제출하기
        </button>
      )}
    </div>
  )
}
