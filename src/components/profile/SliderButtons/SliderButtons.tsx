import { useState, useEffect } from 'react'
import { useSwiper } from 'swiper/react'
import { useProfileStore } from '@/stores/profileStore'
import styles from './styles.module.scss'

export const SliderButtons: React.FC<{ onSubmit: () => void }> = ({
  onSubmit,
}) => {
  const swiper = useSwiper()
  const { validateCurrentStep, prevStep, nextStep } = useProfileStore()

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const isLastStep = currentStep === 5

  const handlePrev = () => prevStep()

  const handleNext = () => {
    const isValid = validateCurrentStep()
    if (isValid) nextStep()
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
        <button className={styles.submit} onClick={onSubmit}>
          제출하기
        </button>
      )}
    </div>
  )
}
