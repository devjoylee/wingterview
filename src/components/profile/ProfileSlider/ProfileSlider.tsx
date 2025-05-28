import { useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { useProfileStore } from '@/stores'
import type { Swiper as SwiperType } from 'swiper'

import * as S from '@components/profile/_steps'
import styles from './styles.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const ProfileSlider: React.FC<{
  setSwiper: (swiper: SwiperType) => void
}> = ({ setSwiper }) => {
  const { currentStep, setCurrentStep } = useProfileStore()

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      setCurrentStep(swiper.activeIndex)
    },
    [setCurrentStep]
  )

  const slides = [
    { id: 1, component: <S.BasicInfoStep /> },
    { id: 2, component: <S.JobInterestStep /> },
    { id: 3, component: <S.TechStackStep /> },
    { id: 4, component: <S.ProfileImageStep /> },
    { id: 5, component: <S.SeatLocationStep /> },
    { id: 6, component: <S.FinalConfirmStep /> },
  ]

  const pagination = {
    clickable: false,
    renderBullet: (idx: number) => {
      return `<span class='swiper-pagination-bullet'>${idx + 1}</span>`
    },
  }

  return (
    <div className={styles.slider}>
      <Swiper
        effect={'coverflow'}
        loop={false}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 30,
          depth: 100,
          modifier: 2,
        }}
        pagination={pagination}
        allowTouchMove={false}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
        onSlideChange={handleSlideChange}
        onSwiper={swiper => {
          setSwiper(swiper)
          swiper.slideTo(currentStep, 0)
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            {/* prev, current, next 단계만 렌더링 */}
            {Math.abs(currentStep - idx) <= 1 ? slide.component : <div></div>}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
