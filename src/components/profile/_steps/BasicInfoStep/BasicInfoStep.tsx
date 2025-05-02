import React, { useEffect, useState } from 'react'
import { ProfileCard } from '@components/profile'
import { Dropdown } from '@components/common'
import styles from './styles.module.scss'
import { useProfileStore } from '@/stores/profileStore'

export const BasicInfoStep: React.FC = () => {
  const { updateBasicInfo } = useProfileStore()

  const [userValue, setUserValue] = useState({
    name: '',
    nickname: '',
    curriculum: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    nickname: '',
    curriculum: '',
  })

  const curriculum: string[] = ['풀스택 과정', '클라우드 과정', '인공지능 과정']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUserValue(prev => ({
      ...prev,
      [name]: value,
    }))

    if (value) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleDropdownChange = (curriculum: string): void => {
    setUserValue(prev => ({
      ...prev,
      curriculum,
    }))

    setFormErrors(prev => ({
      ...prev,
      curriculum: '',
    }))
  }

  useEffect(() => {
    updateBasicInfo(userValue.name, userValue.nickname, userValue.curriculum)
  }, [
    updateBasicInfo,
    userValue.name,
    userValue.nickname,
    userValue.curriculum,
  ])

  return (
    <ProfileCard name="기본 정보">
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="name"
            placeholder="한글 이름"
            className={styles.input}
            value={userValue.name}
            onChange={handleInputChange}
          />
          {formErrors.name && (
            <p className={styles.errorText}>{formErrors.name}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임 예) joy.lee"
            className={styles.input}
            value={userValue.nickname}
            onChange={handleInputChange}
          />
          {formErrors.nickname && (
            <p className={styles.errorText}>{formErrors.nickname}</p>
          )}
        </div>

        <Dropdown
          options={curriculum}
          placeholder="과정명을 선택해주세요."
          selectedOption={userValue.curriculum}
          onChange={handleDropdownChange}
          error={formErrors.curriculum}
        />
      </div>
    </ProfileCard>
  )
}
