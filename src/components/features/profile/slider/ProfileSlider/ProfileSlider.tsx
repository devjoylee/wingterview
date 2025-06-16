import { useCallback, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { useProfileStore } from '@/stores'
import type { Swiper as SwiperType } from 'swiper'

import * as S from '@components/features/profile/steps'
import { SliderCard } from '@components/features'
import styles from './styles.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const ProfileSlider: React.FC<{
  setSwiper: (swiper: SwiperType) => void
}> = ({ setSwiper }) => {
  const { currentStep, setCurrentStep, formData } = useProfileStore()
  const isKTB = formData?.isKTB

  const slides = useMemo(() => {
    const slideArray = [
      { id: 1, name: '기본 정보', component: <S.BasicInfoStep /> },
      { id: 2, name: '희망 직무', component: <S.JobInterestStep /> },
      { id: 3, name: '기술 스택', component: <S.TechStackStep /> },
      { id: 4, name: '프로필 사진', component: <S.ProfileImageStep /> },
    ]

    if (isKTB) {
      slideArray.push({
        id: 5,
        name: '교육장 자리 선택',
        component: <S.SeatLocationStep />,
      })
    }

    slideArray.push({
      id: isKTB ? 6 : 5,
      name: '최종 프로필 확인',
      component: <S.FinalConfirmStep />,
    })

    return slideArray
  }, [isKTB])

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      setCurrentStep(swiper.activeIndex)
    },
    [setCurrentStep]
  )

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
          stretch: 13,
          depth: 50,
          modifier: 3,
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
            <SliderCard name={slide.name}>
              {Math.abs(currentStep - idx) <= 1 ? slide.component : <div></div>}
            </SliderCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
