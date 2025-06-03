import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ProfileFormLayout } from '@components/features'
import { ClickableTag, ErrorMessage } from '@/components/ui'
import { useProfileStore } from '@/stores/profileStore'

export const JobInterestStep: React.FC = React.memo(() => {
  const { updateJobInterest, formErrors, formData } = useProfileStore()
  const [selected, setSelected] = useState<string[]>(formData.jobInterest)

  const taglist: string[] = [
    '백엔드 개발자',
    '프론트엔드 개발자',
    '풀스택 개발자',
    '데이터 사이언티스트',
    '솔루션즈 아키텍트',
    '클라우드 엔지니어',
    '머신러닝 엔지니어',
    'AI 백엔드 개발자',
    'DevOps 엔지니어',
  ]

  const toggleTag = (tag: string): void => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(item => item !== tag))
    } else if (selected.length < 3) {
      setSelected([...selected, tag])
    }
  }

  const isMaxTagsSelected: boolean = selected.length >= 3

  useEffect(() => {
    updateJobInterest(selected)
  }, [selected, updateJobInterest])

  return (
    <ProfileFormLayout name="희망 직무">
      <div className={styles.container}>
        <div className={styles.instruction}>
          {formErrors.jobInterest ? (
            <ErrorMessage error={formErrors.jobInterest} />
          ) : (
            <span>최대 3개까지 선택 가능합니다.</span>
          )}
        </div>
        <div className={styles.tagList}>
          {taglist.map(tag => (
            <ClickableTag
              key={tag}
              label={tag}
              selected={selected.includes(tag)}
              onClick={() => toggleTag(tag)}
              disabled={isMaxTagsSelected && !selected.includes(tag)}
            />
          ))}
        </div>
      </div>
    </ProfileFormLayout>
  )
})
