import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { ProfileCard, SliderButtons } from '@components/profile'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BasicInfoStep = () => (
  <ProfileCard name="기본 정보">
    <input type="text" placeholder="한글 이름" />
    <input type="text" placeholder="닉네임 예) joy.lee" />
    <div>드롭다운</div>
  </ProfileCard>
)

const JobInterestStep = () => (
  <ProfileCard name="희망 직무">
    <div>태그 최대 3개</div>
  </ProfileCard>
)

const TechStackStep = () => (
  <ProfileCard name="기술 스택">
    <div>태그 최대 3개</div>
  </ProfileCard>
)

const ProfileImageStep = () => (
  <ProfileCard name="프로필 사진">
    <div>사진 선택</div>
  </ProfileCard>
)

const SeatLocationStep = () => (
  <ProfileCard name="현재 위치 설정">
    <div>내 자리 선택</div>
  </ProfileCard>
)

const FinalConfirmStep = () => (
  <ProfileCard name="최종 정보 확인">
    <div>최종 정보 확인</div>
  </ProfileCard>
)

export const ProfileSlider: React.FC = () => {
  const slides = [
    { id: 1, component: <BasicInfoStep /> },
    { id: 2, component: <JobInterestStep /> },
    { id: 3, component: <TechStackStep /> },
    { id: 4, component: <ProfileImageStep /> },
    { id: 5, component: <SeatLocationStep /> },
    { id: 6, component: <FinalConfirmStep /> },
  ]

  const pagination = {
    clickable: true,
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
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {slides.map(slide => (
          <SwiperSlide>{slide.component}</SwiperSlide>
        ))}
        <SliderButtons />
      </Swiper>
    </div>
  )
}
