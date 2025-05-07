export const validateBasicInfo = (formData: ProfileFormData) => {
  const nameRegex = /^[가-힣]+$/ // 한글만 포함하는지 체크
  const nicknameRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/ // 닉네임 형식(영어이름.영어성) 체크

  const errors: Record<string, string> = {}

  if (!formData.name) {
    errors.name = '이름을 입력해주세요.'
  } else if (formData.name.length < 2 || formData.name.length > 50) {
    errors.name = '이름은 한글 최소 2자 최대 50자까지 입력 가능합니다.'
  } else if (!nameRegex.test(formData.name)) {
    errors.name = '이름은 한글만 입력 가능합니다.'
  }

  if (!formData.nickname) {
    errors.nickname = '닉네임을 입력해주세요.'
  } else if (formData.nickname.length < 2 || formData.nickname.length > 50) {
    errors.nickname = '닉네임은 최소 2자 최대 50자까지 입력 가능합니다.'
  } else if (!nicknameRegex.test(formData.nickname)) {
    errors.nickname = '닉네임 형식을 확인해주세요. 예) joy.lee'
  }

  if (!formData.curriculum) {
    errors.curriculum = '교육 과정을 선택해주세요.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateJobInterest = (formData: ProfileFormData) => {
  const errors: Record<string, string> = {}

  if (formData.jobInterest.length === 0) {
    errors.jobInterest = '희망 직무를 최소 1개 이상 선택해주세요.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateTechStack = (formData: ProfileFormData) => {
  const errors: Record<string, string> = {}

  if (formData.techStack.length === 0) {
    errors.techStack = '기술 스택을 최소 1개 이상 선택해주세요.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateProfileImage = (formData: ProfileFormData) => {
  const errors: Record<string, string> = {}

  if (formData.profileImageUrl) {
    // 파일 확장자 검사
    // 파일 크기 검사
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateSeatLocation = (formData: ProfileFormData) => {
  const errors: Record<string, string> = {}

  if (
    !formData.seatPosition.section ||
    !formData.seatPosition.seat[0] ||
    !formData.seatPosition.seat[1]
  ) {
    errors.seatPosition = '자리가 지정되지 않았습니다.'
  }
  console.log(formData, errors)

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
