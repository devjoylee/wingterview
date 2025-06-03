import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ProfileFormLayout } from '@components/features'
import { ClickableTag, ErrorMessage } from '@/components/ui'
import { useProfileStore } from '@/stores/profileStore'

export const TechStackStep: React.FC = React.memo(() => {
  const { updateTechStack, formErrors, formData } = useProfileStore()
  const [selected, setSelected] = useState<string[]>(formData.techStack)

  const taglist: string[] = [
    'Typescript',
    'Javascript',
    'Java',
    'Spring',
    'React',
    'Python',
    'AWS',
    'Pytorch',
    'Kubernetes',
    'Fastapi',
    'Langchain',
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
    updateTechStack(selected)
  }, [selected, updateTechStack])

  return (
    <ProfileFormLayout name="기술 스택">
      <div className={styles.container}>
        <div className={styles.instruction}>
          {formErrors.techStack ? (
            <ErrorMessage error={formErrors.techStack} />
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
