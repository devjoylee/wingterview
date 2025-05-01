import React, { useState } from 'react'
import { ProfileCard } from '@components/profile'
import { Dropdown } from '@components/common'
import styles from './styles.module.scss'

export const BasicInfoStep: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    course: '',
  })

  const [formErrors, setFormErrors] = useState({
    name: '',
    nickname: '',
    course: '',
  })

  const courses: string[] = ['풀스택 과정', '클라우드 과정', '인공지능 과정']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prev => ({
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

  const handleCourseChange = (course: string): void => {
    setFormData(prev => ({
      ...prev,
      course,
    }))

    setFormErrors(prev => ({
      ...prev,
      course: '',
    }))
  }

  console.log(formData, formErrors)

  return (
    <ProfileCard name="기본 정보">
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="name"
            placeholder="한글 이름"
            className={styles.input}
            value={formData.name}
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
            value={formData.nickname}
            onChange={handleInputChange}
          />
          {formErrors.nickname && (
            <p className={styles.errorText}>{formErrors.nickname}</p>
          )}
        </div>

        <Dropdown
          options={courses}
          placeholder="과정명을 선택해주세요."
          selectedOption={formData.course}
          onChange={handleCourseChange}
          error={formErrors.course}
        />
      </div>
    </ProfileCard>
  )
}
