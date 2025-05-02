// validators.ts

interface FormErrors {
  name: string
  nickname: string
  curriculum: string
}

export const validateBasicInfo = (
  formData: UserProfile
): { isValid: boolean; errors: FormErrors } => {
  const errors = {
    name: '',
    nickname: '',
    curriculum: '',
  }
  let isValid = true

  if (!formData.name?.trim()) {
    errors.name = '이름을 입력해주세요.'
    isValid = false
  } else if (formData.name.length < 2 || formData.name.length > 50) {
    errors.name = '이름은 한글 최소 2자 최대 50자까지 입력 가능합니다.'
    isValid = false
  } else if (!/^[가-힣]+$/.test(formData.name)) {
    errors.name = '이름은 한글만 입력 가능합니다.'
    isValid = false
  }

  if (!formData.nickname?.trim()) {
    errors.nickname = '닉네임을 입력해주세요.'
    isValid = false
  } else if (formData.nickname.length < 2 || formData.nickname.length > 50) {
    errors.nickname = '닉네임은 최소 2자 최대 50자까지 입력 가능합니다.'
    isValid = false
  } else if (!/^[a-zA-Z]+\.[a-zA-Z]+$/.test(formData.nickname)) {
    errors.nickname =
      '닉네임은 (영어 이름) . (영어 성)의 형식으로 작성해주세요. 예) joy.lee'
    isValid = false
  }

  if (!formData.curriculum) {
    errors.curriculum = '교육 과정을 선택해주세요.'
    isValid = false
  }

  return { isValid, errors }
}

// 다른 단계의 유효성 검사 함수들도 여기에 추가
// export const validateJobInterest = (formData) => { ... }
// export const validateTechStack = (formData) => { ... }

export const validateStep = (
  step: number,
  formData: UserProfile
): { isValid: boolean; errors: FormErrors } => {
  switch (step) {
    case 1:
      return validateBasicInfo(formData)
    // case 2:
    //   return validateJobInterest(formData)
    default:
      return { isValid: true, errors: {} as FormErrors }
  }
}
