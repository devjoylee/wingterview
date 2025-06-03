import React, { useEffect, useState } from 'react'
import { Dropdown, ErrorMessage } from '@components/ui'
import styles from './styles.module.scss'
import { useProfileStore } from '@/stores/profileStore'
import { validateBasicInfo } from '@/utils/validators'

export const BasicInfoStep: React.FC = React.memo(() => {
  const { updateBasicInfo, formErrors, formData, setFormErrors } =
    useProfileStore()

  const [userValue, setUserValue] = useState({
    name: formData.name,
    nickname: formData.nickname,
    curriculum: formData.curriculum,
  })

  const curriculum: string[] = ['풀스택', '클라우드', '인공지능']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUserValue(prev => ({
      ...prev,
      [name]: value,
    }))

    const validate = validateBasicInfo({
      ...formData,
      [name]: value,
    })

    setFormErrors({
      ...formErrors,
      [name]: validate.errors[name],
    })
  }

  const handleDropdownChange = (curriculum: string): void => {
    setUserValue(prev => ({
      ...prev,
      curriculum,
    }))

    setFormErrors({
      ...formErrors,
      curriculum: '',
    })
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
          <ErrorMessage size="small" error={formErrors.name} />
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
          <ErrorMessage size="small" error={formErrors.nickname} />
        )}
      </div>

      <div className={styles.inputWrapper}>
        <Dropdown
          options={curriculum}
          placeholder="과정명을 선택해주세요."
          selectedOption={userValue.curriculum}
          onChange={handleDropdownChange}
        />
        {formErrors.curriculum && (
          <ErrorMessage size="small" error={formErrors.curriculum} />
        )}
      </div>
    </div>
  )
})
